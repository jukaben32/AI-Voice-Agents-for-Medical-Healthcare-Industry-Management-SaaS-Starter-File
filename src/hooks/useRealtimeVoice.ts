'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export type RealtimeVoiceStatus = 'idle' | 'initializing' | 'connecting' | 'connected' | 'listening' | 'thinking' | 'speaking' | 'disconnected' | 'error'

export interface RealtimeMessage {
  id: string
  role: 'agent' | 'caller' | 'system'
  content: string
  createdAt: string
}

export interface RealtimeConnectOptions {
  businessSlug: string
  widgetSlug?: string | null
  voice?: string | null
  language?: string | null
  onToolCall?: (toolName: string, args: Record<string, unknown>) => Promise<unknown>
}

interface RealtimeServerEvent {
  type: string
  item_id?: string
  response_id?: string
  delta?: string
  transcript?: string
  call_id?: string
  name?: string
  arguments?: string
  error?: { message?: string }
}

export interface VoiceSessionPayload {
  business: { id: string; name: string; slug: string; timezone: string }
  widget: { id: string; name: string; slug?: string; greetingMessage?: string }
  session: {
    model: string
    voice?: string
    client_secret?: { value: string; expires_at: number }
  }
  instructions: string
  tools: Array<{
    type: 'function'
    name: string
    description: string
    parameters: Record<string, unknown>
  }>
}

let messageId = 0
const genId = () => `msg_${Date.now()}_${messageId++}`

export function useRealtimeVoice() {
  const [status, setStatus] = useState<RealtimeVoiceStatus>('idle')
  const [messages, setMessages] = useState<RealtimeMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState('')
  const [amplitude, setAmplitude] = useState(0)
  const [session, setSession] = useState<VoiceSessionPayload | null>(null)

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const partialAgentTextRef = useRef<Record<string, string>>({})
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const onToolCallRef = useRef<RealtimeConnectOptions['onToolCall']>(undefined)

  const appendMessage = useCallback((role: RealtimeMessage['role'], content: string) => {
    const trimmed = content.trim()
    if (!trimmed) return
    setMessages((current) => [...current, { id: genId(), role, content: trimmed, createdAt: new Date().toISOString() }])
  }, [])

  const cleanup = useCallback(() => {
    dcRef.current?.close()
    dcRef.current = null
    pcRef.current?.getSenders().forEach((sender) => sender.track?.stop())
    pcRef.current?.close()
    pcRef.current = null
    micStreamRef.current?.getTracks().forEach((track) => track.stop())
    micStreamRef.current = null
    if (audioElRef.current) {
      audioElRef.current.srcObject = null
      audioElRef.current.remove()
      audioElRef.current = null
    }
    partialAgentTextRef.current = {}
    if (processorRef.current && analyserRef.current && audioContextRef.current) {
      processorRef.current.disconnect()
      analyserRef.current = null
      processorRef.current = null
    }
    audioContextRef.current?.close()
    audioContextRef.current = null
  }, [])

  useEffect(() => cleanup, [cleanup])

  const disconnect = useCallback(() => {
    cleanup()
    setStatus('disconnected')
  }, [cleanup])

  const sendToolResult = useCallback((callId: string, output: unknown) => {
    const dc = dcRef.current
    if (!dc || dc.readyState !== 'open') return
    dc.send(
      JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: callId,
          output: JSON.stringify(output ?? {}),
        },
      })
    )
    dc.send(JSON.stringify({ type: 'response.create' }))
  }, [])

  const handleServerEvent = useCallback(
    (event: RealtimeServerEvent, opts: RealtimeConnectOptions) => {
      switch (event.type) {
        case 'response.audio_transcript.delta': {
          const key = event.item_id || event.response_id || 'agent'
          partialAgentTextRef.current[key] = (partialAgentTextRef.current[key] || '') + (event.delta || '')
          break
        }
        case 'response.audio_transcript.done': {
          const key = event.item_id || event.response_id || 'agent'
          const text = partialAgentTextRef.current[key] || event.transcript || ''
          delete partialAgentTextRef.current[key]
          appendMessage('agent', text)
          break
        }
        case 'conversation.item.input_audio_transcription.completed': {
          appendMessage('caller', event.transcript || '')
          break
        }
        case 'response.function_call_arguments.done': {
          const toolName = event.name || ''
          const callId = event.call_id || ''
          let args: Record<string, unknown> = {}
          try {
            args = event.arguments ? JSON.parse(event.arguments) : {}
          } catch {
            args = {}
          }
          void (async () => {
            try {
              const result = onToolCallRef.current ? await onToolCallRef.current(toolName, args) : await opts.onToolCall?.(toolName, args) ?? { ok: true }
              sendToolResult(callId, result ?? { ok: true })
            } catch (toolError) {
              sendToolResult(callId, { error: toolError instanceof Error ? toolError.message : 'Tool call failed' })
            }
          })()
          break
        }
        case 'error': {
          setError(event.error?.message || 'Realtime error')
          setStatus('error')
          break
        }
        default:
          break
      }
    },
    [appendMessage, sendToolResult]
  )

  const connect = useCallback(
    async (opts: RealtimeConnectOptions) => {
      cleanup()
      setError(null)
      setMessages([])
      setTranscript('')
      onToolCallRef.current = opts.onToolCall
      setStatus('connecting')

      try {
      const sessionResponse = await fetch('/api/realtime/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessSlug: opts.businessSlug,
          widgetSlug: opts.widgetSlug ?? undefined,
          voice: opts.voice ?? undefined,
          language: opts.language ?? undefined,
        }),
      })
      if (!sessionResponse.ok) {
        throw new Error(await sessionResponse.text())
      }
      const sessionData: VoiceSessionPayload = await sessionResponse.json()
      setSession(sessionData)

      const model = sessionData.session?.model || 'gpt-realtime'

      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = micStream

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      })
      pcRef.current = pc

      const audioEl = document.createElement('audio')
      audioEl.autoplay = true
      audioElRef.current = audioEl

      pc.ontrack = (event) => {
        audioEl.srcObject = event.streams[0]
      }

      micStream.getTracks().forEach((track) => pc.addTrack(track, micStream))

      const dc = pc.createDataChannel('oai')
      dcRef.current = dc
      dc.onmessage = (event) => {
        try {
          handleServerEvent(JSON.parse(event.data), opts)
        } catch {
          // Ignore malformed/unrecognized events rather than tearing down the call.
        }
      }
      dc.onopen = () => {
        dc.send(JSON.stringify({
          type: 'session.update',
          session: {
            model,
            voice: opts.voice || 'alloy',
            instructions: sessionData.instructions,
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: { model: 'whisper-1' },
            tools: sessionData.tools || [],
            turn_detection: { type: 'server_vad', threshold: 0.5, prefix_padding_ms: 300, silence_duration_ms: 500 },
          },
        }))
        setStatus('listening')
      }

      // Add audio transceiver so the SDP offer includes an audio m-line for
      // OpenAI to attach its response track to.
      pc.addTransceiver('audio', { direction: 'sendrecv' })

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      // SDP exchange via server-side proxy (keeps OpenAI API key secure)
      const sdpResponse = await fetch('/api/realtime/sdp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessSlug: opts.businessSlug,
          widgetSlug: opts.widgetSlug ?? null,
          language: opts.language ?? 'en',
          sdp: offer.sdp,
        }),
      })
      if (!sdpResponse.ok) {
        throw new Error(`Realtime connection failed (${sdpResponse.status})`)
      }
      const { sdpAnswer } = await sdpResponse.json()
      await pc.setRemoteDescription({ type: 'answer', sdp: sdpAnswer })

      setStatus('connected')
      setStatus('listening')
      startMicCapture()
      } catch (err) {
        cleanup()
        const message = err instanceof Error ? err.message : 'Failed to start voice call'
        setError(message)
        setStatus('error')
        throw err
      }
    },
    [cleanup, handleServerEvent]
  )

  function startMicCapture() {
    if (!micStreamRef.current || !audioContextRef.current) return
    const ctx = audioContextRef.current
    const source = ctx.createMediaStreamSource(micStreamRef.current)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    analyserRef.current = analyser
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const onAmplitude = () => {
      if (!analyserRef.current) return
      analyserRef.current.getByteFrequencyData(dataArray)
      const avg = dataArray.reduce((a, b) => a + b) / dataArray.length
      setAmplitude(avg / 255)
      requestAnimationFrame(onAmplitude)
    }
    onAmplitude()
    const processor = ctx.createScriptProcessor(8000, 1, 1)
    processorRef.current = processor
    source.connect(processor)
    processor.connect(ctx.destination)
    processor.onaudioprocess = (event) => {
      if (dcRef.current?.readyState === 'open') {
        const input = event.inputBuffer.getChannelData(0)
        const int16 = floatTo16(input)
        const base64Audio = arrayBufferToBase64(int16.buffer as ArrayBuffer)
        dcRef.current.send(JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64Audio,
        }))
      }
    }
  }

  const startListening = useCallback(async () => {
    if (!session) return
    setStatus('listening')
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 })
      audioContextRef.current = audioContext
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mic access failed')
      setStatus('error')
    }
  }, [session])

  const stopListening = useCallback(() => {
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify({ type: 'input_audio_buffer.commit' }))
    }
    setStatus('listening')
  }, [])

  return {
    status,
    messages,
    error,
    transcript,
    amplitude,
    session,
    connect,
    disconnect,
    startListening,
    stopListening,
    sendToolResult,
    reset: disconnect,
  }
}

// Audio utilities
function floatTo16(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length)
  for (let i = 0; i < input.length; i++) {
    output[i] = Math.max(-1, Math.min(1, input[i])) * 0x7fff
  }
  return output
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export default useRealtimeVoice

'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

type ToolCall = {
  id: string
  name: string
  arguments: string
}

type TranscriptMessage = {
  id: string
  role: 'agent' | 'caller' | 'system'
  content: string
  createdAt: string
}

export type VoiceWidgetStatus =
  | 'idle'
  | 'initializing'
  | 'connecting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'disconnected'
  | 'error'

export type VoiceSessionPayload = {
  business: { id: string; name: string; slug: string; timezone: string }
  widget: { id: string; name: string; slug?: string; greetingMessage?: string }
  session: {
    client_secret: { value: string; expires_at: number }
    id: string
    model: string
  }
  instructions: string
  tools: Array<{
    type: 'function'
    name: string
    description: string
    parameters: Record<string, unknown>
  }>
}

type VoiceState = {
  status: VoiceWidgetStatus
  session: VoiceSessionPayload | null
  messages: TranscriptMessage[]
  transcript: string
  amplitude: number
  error: string | null
}

type VoiceActions = {
  connect: (payload: { businessSlug: string; widgetSlug?: string }) => Promise<void>
  disconnect: () => void
  startListening: () => Promise<void>
  stopListening: () => void
  sendToolResult: (toolCallId: string, result: Record<string, unknown>) => void
  reset: () => void
}

let messageId = 0
const genId = () => `msg_${Date.now()}_${messageId++}`

const OPENAI_BASE = 'https://api.openai.com/v1/realtime'

export function useRealtimeVoice(): VoiceState & VoiceActions {
  const [state, setState] = useState<VoiceState>({
    status: 'idle',
    session: null,
    messages: [],
    transcript: '',
    amplitude: 0,
    error: null,
  })

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)

  useEffect(() => {
    return () => cleanup()
  }, [])

  function cleanup() {
    pcRef.current?.close()
    pcRef.current = null
    dcRef.current = null

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }

    processorRef.current?.disconnect()
    analyzerClean()
    audioContextRef.current?.close()
    audioContextRef.current = null
  }

  function analyzerClean() {
    if (processorRef.current && analyserRef.current && audioContextRef.current) {
      processorRef.current.disconnect()
      analyserRef.current = null
      processorRef.current = null
    }
  }

  // --- Connect: fetch session + create WebRTC ---
  const connect = useCallback(async (payload: { businessSlug: string; widgetSlug?: string }) => {
    setState((s) => ({ ...s, status: 'connecting', error: null }))

    try {
      const response = await fetch('/api/realtime/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const session: VoiceSessionPayload = await response.json()
      setState((s) => ({ ...s, session, status: 'idle' }))

      await initRealtimeConnection(session)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to connect'
      setState((s) => ({ ...s, status: 'error', error: message }))
    }
  }, [])

  async function initRealtimeConnection(session: VoiceSessionPayload) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })
    pcRef.current = peerConnection

    // Handle audio track from OpenAI
    peerConnection.ontrack = (event) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      event.streams[0].getAudioTracks().forEach((track) => {
        const source = ctx.createMediaStreamSource(new MediaStream([track]))
        source.connect(ctx.destination)
      })
    }

    // Create data channel for control messages
    const dataChannel = peerConnection.createDataChannel('oai')
    dcRef.current = dataChannel
    dataChannel.onmessage = handleServerMessage
    dataChannel.onopen = () => {
      dataChannel.send(
        JSON.stringify({
          type: 'session.update',
          session: {
            model: session.session.model,
            voice: 'alloy',
            instructions: session.instructions,
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: { model: 'whisper-1' },
            tools: session.tools,
            tool_choice: 'auto',
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500,
            },
          },
        })
      )
    }

    // ICE candidate handling
    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate && dcRef.current?.readyState === 'open') {
        dcRef.current.send(JSON.stringify({ ice: candidate }))
      }
    }

    // Create WebRTC offer
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    // SDP exchange via server-side proxy (keeps API key secure)
    const sdpResponse = await fetch('/api/realtime/sdp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessSlug: session.business.slug,
        widgetSlug: session.widget?.slug,
        sdp: offer.sdp,
      }),
    })

    if (!sdpResponse.ok) {
      const errorText = await sdpResponse.text()
      throw new Error(`WebRTC handshake failed: ${errorText}`)
    }

    const sdpResult = await sdpResponse.json()
    const answerSdp = sdpResult.sdpAnswer
    const answer = new RTCSessionDescription({ type: 'answer', sdp: answerSdp })
    await peerConnection.setRemoteDescription(answer)
  }

  function handleServerMessage(event: MessageEvent) {
    let data: any
    try {
      data = JSON.parse(event.data)
    } catch {
      return
    }

    switch (data.type) {
      case 'conversation.item.created':
        if (data.item?.role === 'user' || data.item?.role === 'assistant') {
          const role: 'caller' | 'agent' = data.item.role === 'user' ? 'caller' : 'agent'
          addMessage({ role, content: data.item?.content?.[0]?.text || '' })
        }
        break

      case 'response.audioTranscript.done':
        if (data.transcript) {
          appendAgentMessage(data.transcript)
        }
        break

      case 'input_audio_buffer.speech_started':
        setState((s) => ({ ...s, status: 'listening', transcript: '' }))
        break

      case 'response.in_progress':
        setState((s) => ({ ...s, status: 'thinking' }))
        break

      case 'response.audio.done':
        setState((s) => ({ ...s, status: 'speaking' }))
        break

      case 'response.done':
        setState((s) => ({ ...s, status: 'listening' }))
        break

      case 'conversation.interrupted':
        setState((s) => ({ ...s, status: 'listening' }))
        break

      case 'response.function_call_arguments':
        setState((s) => ({ ...s, status: 'thinking', transcript: `Llamando a ${data.name}...` }))
        break

      case 'rate_limits.updated':
        // Handle rate limiting
        break

      default:
        break
    }
  }

  // --- Microphone + audio processing ---
  const startListening = useCallback(async () => {
    if (!state.session) return

    setState((s) => ({ ...s, status: 'listening' }))

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      })

      mediaStreamRef.current = stream

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      })
      audioContextRef.current = audioContext

      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const onAmplitude = () => {
        if (!analyserRef.current) return
        analyserRef.current.getByteFrequencyData(dataArray)
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length
        setState((s) => ({ ...s, amplitude: avg / 255 }))
        if (source.context?.state !== 'closed') {
          requestAnimationFrame(onAmplitude)
        }
      }
      onAmplitude()

      // Send audio to OpenAI via data channel
      const processor = audioContext.createScriptProcessor(8000, 1, 1)
      processorRef.current = processor
      source.connect(processor)
      processor.connect(audioContextRef.current.destination)

      processor.onaudioprocess = (event) => {
        if (dcRef.current?.readyState === 'open') {
          const input = event.inputBuffer.getChannelData(0)
          const int16 = floatTo16(input)
          const base64Audio = arrayBufferToBase64(int16.buffer as ArrayBuffer)
          dcRef.current.send(
            JSON.stringify({
              type: 'input_audio_buffer.append',
              audio: base64Audio,
            })
          )
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Mic access failed'
      setState((s) => ({ ...s, status: 'error', error: message }))
    }
  }, [state.session])

  const stopListening = useCallback(() => {
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify({ type: 'input_audio_buffer.commit' }))
    }
    analyzerClean()
    setState((s) => ({ ...s, status: 'listening', amplitude: 0 }))
  }, [])

  const disconnect = useCallback(() => {
    cleanup()
    setState((s) => ({
      ...s,
      status: 'disconnected',
      session: null,
      messages: [],
      transcript: '',
      amplitude: 0,
    }))
  }, [])

  const sendToolResult = useCallback((toolCallId: string, result: Record<string, unknown>) => {
    if (dcRef.current && dcRef.current.readyState === 'open') {
      dcRef.current.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: toolCallId,
          output: JSON.stringify(result),
        },
      }))
      dcRef.current.send(JSON.stringify({ type: 'response.create' }))
    }
    addMessage({ role: 'system', content: `Resultado: ${JSON.stringify(result)}` })
  }, [])

  const reset = useCallback(() => {
    disconnect()
    setState({
      status: 'idle',
      session: null,
      messages: [],
      transcript: '',
      amplitude: 0,
      error: null,
    })
  }, [disconnect])

  // Helpers
  function addMessage(msg: Omit<TranscriptMessage, 'id' | 'createdAt'>) {
    setState((s) => ({
      ...s,
      messages: [...s.messages, { ...msg, id: genId(), createdAt: new Date().toISOString() }],
    }))
  }

  function appendAgentMessage(content: string) {
    setState((s) => {
      const lastMsg = s.messages[s.messages.length - 1]
      if (lastMsg && lastMsg.role === 'agent') {
        return {
          ...s,
          messages: [...s.messages.slice(0, -1), { ...lastMsg, content: lastMsg.content + content }],
        }
      }
      return {
        ...s,
        messages: [...s.messages, { role: 'agent', content, id: genId(), createdAt: new Date().toISOString() }],
      }
    })
  }

  return {
    ...state,
    connect,
    disconnect,
    startListening,
    stopListening,
    sendToolResult,
    reset,
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

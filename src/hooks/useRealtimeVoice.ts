import { useCallback, useEffect, useRef, useState } from 'react'

export type RealtimeVoiceStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'

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

export function useRealtimeVoice() {
  const [status, setStatus] = useState<RealtimeVoiceStatus>('idle')
  const [messages, setMessages] = useState<RealtimeMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const partialAgentTextRef = useRef<Record<string, string>>({})

  const appendMessage = useCallback((role: RealtimeMessage['role'], content: string) => {
    const trimmed = content.trim()
    if (!trimmed) return
    setMessages((current) => [...current, { id: crypto.randomUUID(), role, content: trimmed, createdAt: new Date().toISOString() }])
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
              const result = opts.onToolCall ? await opts.onToolCall(toolName, args) : { ok: true }
              sendToolResult(callId, result ?? { ok: true })
            } catch (toolError) {
              sendToolResult(callId, { error: toolError instanceof Error ? toolError.message : 'Tool call failed' })
            }
          })()
          break
        }
        case 'error': {
          setError(event.error?.message || 'Realtime error')
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
            mode: 'voice',
          }),
        })
        if (!sessionResponse.ok) {
          throw new Error(await sessionResponse.text())
        }
        const sessionData = await sessionResponse.json()
        const clientSecret: string | undefined = sessionData.clientSecret
        const model: string | undefined = sessionData.model
        if (!clientSecret || !model) {
          throw new Error('Realtime session did not return a client secret')
        }

        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        micStreamRef.current = micStream

        const pc = new RTCPeerConnection()
        pcRef.current = pc

        const audioEl = document.createElement('audio')
        audioEl.autoplay = true
        audioElRef.current = audioEl
        pc.ontrack = (event) => {
          audioEl.srcObject = event.streams[0]
        }

        micStream.getTracks().forEach((track) => pc.addTrack(track, micStream))

        const dc = pc.createDataChannel('oai-events')
        dcRef.current = dc
        dc.addEventListener('message', (event) => {
          try {
            handleServerEvent(JSON.parse(event.data), opts)
          } catch {
            // Ignore malformed/unrecognized events rather than tearing down the call.
          }
        })
        dc.addEventListener('open', () => setStatus('connected'))

        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)

        const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${clientSecret}`,
            'Content-Type': 'application/sdp',
          },
          body: offer.sdp,
        })
        if (!sdpResponse.ok) {
          throw new Error(`Realtime connection failed (${sdpResponse.status})`)
        }
        const answerSdp = await sdpResponse.text()
        await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp })
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

  return {
    status,
    messages,
    error,
    connect,
    disconnect,
  }
}

export default useRealtimeVoice

export class RealtimeNotConfiguredError extends Error {}

// Mints a short-lived client secret the browser can use to open a WebRTC
// connection directly to OpenAI's Realtime API, without ever exposing
// OPENAI_API_KEY client-side. `session` is the same payload built by
// buildRealtimeSessionPayload (model/voice/instructions/tools/etc).
export async function mintRealtimeClientSecret(
  session: Record<string, unknown>
): Promise<{ value: string; expiresAt: number | null }> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new RealtimeNotConfiguredError('OPENAI_API_KEY is not configured')
  }

  const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'realtime=v1',
    },
    body: JSON.stringify(session),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`OpenAI realtime session request failed (${response.status}): ${detail.slice(0, 300)}`)
  }

  const data = await response.json()
  const value = data?.client_secret?.value
  if (!value) {
    throw new Error('OpenAI did not return a realtime client secret')
  }

  return { value, expiresAt: data?.client_secret?.expires_at ?? null }
}

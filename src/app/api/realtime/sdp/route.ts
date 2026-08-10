// Proxy endpoint: performs OpenAI Realtime WebRTC SDP exchange server-side
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { apiError, json, readJson } from '@/lib/api'
import { resolveRealtimeClinicContext } from '@/lib/realtime'
import { realtimeSessionSchema } from '@/validations'

const sdpAnswerSchema = z.object({
  businessSlug: z.string(),
  widgetSlug: z.string().optional(),
  language: z.string().optional(),
  sdp: z.string(),
})

const OPENAI_REALTIME_URL = 'https://api.openai.com/v1/realtime'

export async function POST(request: Request) {
  const body = await readJson(request)
  const parsed = sdpAnswerSchema.safeParse(body)

  if (!parsed.success) {
    return apiError('Invalid payload for SDP exchange', 400, { issues: parsed.error.flatten() })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return apiError('OpenAI API key not configured', 500)
  }

  try {
    const admin = createAdminClient()
    const context = await resolveRealtimeClinicContext(admin, {
      businessSlug: parsed.data.businessSlug,
      widgetSlug: parsed.data.widgetSlug ?? null,
      language: parsed.data.language ?? 'en',
    })

    // Perform SDP exchange with OpenAI Realtime API
    const model = context.session.model
    const response = await fetch(`${OPENAI_REALTIME_URL}?model=${model}`, {
      method: 'POST',
      body: parsed.data.sdp,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/sdp',
        'Accept': 'application/sdp',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return apiError(`OpenAI SDP exchange failed: ${response.status} ${errorText}`, 502)
    }

    const answerSdp = await response.text()

    return json({
      business: context.business,
      widget: context.widget,
      instructions: context.context.instructions,
      session: context.session,
      tools: context.session.tools || [],
      sdpAnswer: answerSdp,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SDP exchange failed'
    return apiError(message, 500)
  }
}

import { createAdminClient } from '@/lib/supabase/admin'
import { apiError, json, readJson } from '@/lib/api'
import { resolveRealtimeClinicContext } from '@/lib/realtime'
import { clinicRealtimeTools } from '@/ai/tools'
import { mintRealtimeClientSecret, RealtimeNotConfiguredError } from '@/lib/openaiRealtime'
import { realtimeSessionSchema } from '@/validations'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await readJson(request)
  } catch {
    return apiError('Invalid JSON body', 400)
  }

  const parsed = realtimeSessionSchema.safeParse(body)
  if (!parsed.success) {
    return apiError('Invalid realtime session payload', 422, { issues: parsed.error.flatten() })
  }

  const admin = createAdminClient()

  try {
    const context = await resolveRealtimeClinicContext(admin, {
      businessSlug: parsed.data.businessSlug,
      widgetSlug: parsed.data.widgetSlug ?? null,
      voice: parsed.data.voice ?? null,
      language: parsed.data.language ?? 'en',
    })

    // The browser never sees OPENAI_API_KEY: it gets a short-lived client
    // secret scoped to this one session, which is what it uses to open the
    // WebRTC connection directly to OpenAI.
    const clientSecret = await mintRealtimeClientSecret(context.session)

    return json({
      business: context.business,
      widget: context.widget,
      instructions: context.context.instructions,
      model: context.session.model,
      voice: context.session.voice,
      tools: clinicRealtimeTools,
      clientSecret: clientSecret.value,
      expiresAt: clientSecret.expiresAt,
    })
  } catch (error) {
    if (error instanceof RealtimeNotConfiguredError) {
      return apiError(error.message, 503, { notConfigured: true })
    }
    const message = error instanceof Error ? error.message : 'Unable to create realtime session'
    return apiError(message, 404)
  }
}

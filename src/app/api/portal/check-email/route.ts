import { createClient as createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { apiError, json, readJson } from '@/lib/api'
import { portalCheckEmailSchema } from '@/validations'
import { getBusinessBySlug } from '@/services/business'
import { getPatientByEmail } from '@/services/patients'

export async function POST(request: Request) {
  const origin = new URL(request.url).origin
  let body: unknown
  try {
    body = await readJson(request)
  } catch {
    return apiError('Invalid JSON body', 400)
  }

  const parsed = portalCheckEmailSchema.safeParse(body)
  if (!parsed.success) {
    return apiError('Invalid email payload', 422, { issues: parsed.error.flatten() })
  }

  const businessSlug = parsed.data.businessSlug || new URL(request.url).searchParams.get('businessSlug') || ''
  if (!businessSlug) {
    return apiError('businessSlug is required', 400)
  }

  const admin = createAdminClient()
  const business = await getBusinessBySlug(admin, businessSlug)
  if (!business) {
    return apiError('Business not found', 404)
  }

  const patient = await getPatientByEmail(admin, business.id, parsed.data.email)
  const supabase = await createServerSupabaseClient()
  const redirectUrl = new URL('/api/auth/callback', origin)
  redirectUrl.searchParams.set('next', `/portal?businessSlug=${encodeURIComponent(business.slug)}`)

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: redirectUrl.toString(),
    },
  })

  if (error) {
    return apiError(error.message, 400)
  }

  return json({
    sent: true,
    business: {
      id: business.id,
      name: business.name,
      slug: business.slug,
    },
    patientExists: Boolean(patient),
  })
}

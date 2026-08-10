// Test endpoint: lista businesses existentes o crea uno de demo
import { createAdminClient } from '@/lib/supabase/admin'
import { json, apiError } from '@/lib/api'

export async function GET() {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from('businesses')
      .select('id, slug, name, specialty, onboarding_step')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error
    return json({ businesses: data, count: data?.length })
  } catch (error: any) {
    return apiError(error?.message || error?.error?.message || 'DB error', 500, {
      details: error?.details || error?.error?.details,
      hint: error?.hint || error?.error?.hint,
      code: error?.code || error?.error?.code,
    })
  }
}

export async function POST() {
  try {
    const admin = createAdminClient()

    // Check if any business exists
    const { data: existing } = await admin
      .from('businesses')
      .select('slug')
      .limit(1)

    if (existing?.length) {
      return json({ message: 'Business already exists', slug: existing[0].slug })
    }

    // Create demo business
    const { data, error } = await admin
      .from('businesses')
      .insert({
        owner_id: '00000000-0000-0000-0000-000000000000',
        name: 'Test Clinic',
        slug: 'test-clinic-demo',
        specialty: 'General Practice',
        description: 'Demo business for Voice Widget testing',
        timezone: 'America/Mexico_City',
        booking_deposit_amount: 49,
        payment_currency: 'USD',
        payment_chain_id: 137,
        onboarding_step: 'profile',
      })
      .select()

    if (error) throw error
    return json({ created: data })
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'DB error', 500)
  }
}

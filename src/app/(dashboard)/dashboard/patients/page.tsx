import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { listPatientsForBusiness } from '@/services/patients'
import { listAppointmentsForBusiness } from '@/services/appointments'
import { PatientsManager } from '@/components/clinic/PatientsManager'

export default async function PatientsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const [patients, appointments] = await Promise.all([
    listPatientsForBusiness(supabase, business.id),
    listAppointmentsForBusiness(supabase, business.id, { limit: 200 }),
  ])

  return <PatientsManager initialPatients={patients} appointments={appointments} businessId={business.id} />
}

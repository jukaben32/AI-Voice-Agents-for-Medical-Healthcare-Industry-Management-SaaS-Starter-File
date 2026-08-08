import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { listAppointmentsForBusiness } from '@/services/appointments'
import { CalendarManager } from '@/components/clinic/CalendarManager'

export default async function SchedulePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 7)

  const allAppointments = await listAppointmentsForBusiness(supabase, business.id, { limit: 300 })
  const weekAppointments = allAppointments.filter((a) => {
    const t = new Date(a.scheduledAt).getTime()
    return t >= weekStart.getTime() && t < weekEnd.getTime()
  })

  const weekLabel = `${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(weekStart)} - ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(weekEnd.getTime() - 1))}`

  return <CalendarManager weekAppointments={weekAppointments} weekLabel={weekLabel} timezone={business.timezone} />
}

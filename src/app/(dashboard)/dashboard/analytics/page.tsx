import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser, getDashboardAnalytics } from '@/services/business'
import { listAppointmentsForBusiness } from '@/services/appointments'
import { listPatientsForBusiness } from '@/services/patients'
import { listConversationsForBusiness } from '@/services/conversations'
import { getBillingSummary } from '@/services/billing'
import { AnalyticsManager } from '@/components/clinic/AnalyticsManager'

function pct(numerator: number, denominator: number) {
  if (denominator === 0) return 0
  return Math.round((numerator / denominator) * 100)
}

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const [analytics, appointments, patients, conversations, billingSummary] = await Promise.all([
    getDashboardAnalytics(supabase, business.id),
    listAppointmentsForBusiness(supabase, business.id, { limit: 300 }),
    listPatientsForBusiness(supabase, business.id),
    listConversationsForBusiness(supabase, business.id, 200),
    getBillingSummary(supabase, business.id),
  ])

  const monthTotal = analytics.completedAppointments + analytics.cancelledAppointments + analytics.noShowAppointments
  const completionRate = pct(analytics.completedAppointments, monthTotal)
  const noShowRate = pct(analytics.noShowAppointments, monthTotal)

  const conversionRate = pct(conversations.filter((c) => c.outcome === 'booked_appointment').length, conversations.length)

  const widgetConversations = conversations.filter((c) => c.channel === 'widget_voice' || c.channel === 'widget_chat')
  const widgetConversionRate = pct(widgetConversations.filter((c) => c.outcome === 'booked_appointment').length, widgetConversations.length)

  const patientVisitCounts = new Map<string, number>()
  for (const appt of appointments) {
    if (!appt.patientId) continue
    patientVisitCounts.set(appt.patientId, (patientVisitCounts.get(appt.patientId) ?? 0) + 1)
  }
  const patientsWithVisits = patients.filter((p) => (patientVisitCounts.get(p.id) ?? 0) > 0)
  const repeatPatients = patientsWithVisits.filter((p) => (patientVisitCounts.get(p.id) ?? 0) > 1)
  const repeatPatientRate = pct(repeatPatients.length, patientsWithVisits.length)

  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  const weeklyVolume = [0, 0, 0, 0, 0, 0, 0]
  for (const appt of appointments) {
    const created = new Date(appt.createdAt)
    if (created >= startOfWeek) {
      weeklyVolume[created.getDay()] += 1
    }
  }

  return (
    <AnalyticsManager
      conversionRate={conversionRate}
      noShowRate={noShowRate}
      completionRate={completionRate}
      revenueTracked={billingSummary.confirmed}
      weeklyVolume={weeklyVolume}
      repeatPatientRate={repeatPatientRate}
      widgetConversionRate={widgetConversionRate}
    />
  )
}

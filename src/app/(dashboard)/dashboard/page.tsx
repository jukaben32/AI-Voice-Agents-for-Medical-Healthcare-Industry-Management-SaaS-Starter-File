import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser, getDashboardAnalytics } from '@/services/business'
import { listAppointmentsForBusiness } from '@/services/appointments'
import { listPatientsForBusiness } from '@/services/patients'
import { listConversationsForBusiness } from '@/services/conversations'
import { getLiveAgentForBusiness } from '@/services/agents'
import { listKnowledgeDocuments } from '@/services/faqs'
import { getBillingSummary } from '@/services/billing'
import { DashboardOverviewManager } from '@/components/clinic/DashboardOverviewManager'

function pct(numerator: number, denominator: number) {
  if (denominator === 0) return 0
  return Math.round((numerator / denominator) * 100)
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const [analytics, appointments, patients, conversations, liveAgent, knowledgeDocs, billingSummary] = await Promise.all([
    getDashboardAnalytics(supabase, business.id),
    listAppointmentsForBusiness(supabase, business.id, { limit: 300 }),
    listPatientsForBusiness(supabase, business.id),
    listConversationsForBusiness(supabase, business.id, 200),
    getLiveAgentForBusiness(supabase, business.id),
    listKnowledgeDocuments(supabase, business.id),
    getBillingSummary(supabase, business.id),
  ])

  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)

  const todayAppointments = appointments
    .filter((a) => {
      const t = new Date(a.scheduledAt).getTime()
      return t >= startOfToday.getTime() && t < endOfToday.getTime() && a.status !== 'cancelled'
    })
    .sort((a, b) => (a.scheduledAt < b.scheduledAt ? -1 : 1))

  const upcomingAppointments = appointments
    .filter((a) => new Date(a.scheduledAt).getTime() >= endOfToday.getTime() && a.status !== 'cancelled')
    .sort((a, b) => (a.scheduledAt < b.scheduledAt ? -1 : 1))
    .slice(0, 4)

  const monthTotal = analytics.completedAppointments + analytics.cancelledAppointments + analytics.noShowAppointments
  const completionRate = pct(analytics.completedAppointments, monthTotal)
  const noShowRate = pct(analytics.noShowAppointments, monthTotal)

  const widgetConversations = conversations.filter((c) => c.channel === 'widget_voice' || c.channel === 'widget_chat')
  const widgetConversionRate = pct(widgetConversations.filter((c) => c.outcome === 'booked_appointment').length, widgetConversations.length)

  const startOfWeek = new Date(now)
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  const newPatientsThisWeek = patients.filter((p) => new Date(p.createdAt).getTime() >= startOfWeek.getTime()).length

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const todayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(now)

  return (
    <DashboardOverviewManager
      businessName={business.name}
      greeting={greeting}
      todayLabel={todayLabel}
      todayAppointments={todayAppointments}
      upcomingAppointments={upcomingAppointments}
      timezone={business.timezone}
      stats={{
        appointmentsToday: analytics.appointmentsToday,
        upcomingAppointments: analytics.upcomingAppointments,
        totalPatients: analytics.totalPatients,
        cancelledAppointments: analytics.cancelledAppointments,
      }}
      completionRate={completionRate}
      widgetConversionRate={widgetConversionRate}
      noShowRate={noShowRate}
      liveAgent={liveAgent}
      knowledgeDocsTotal={knowledgeDocs.length}
      knowledgeDocsActive={knowledgeDocs.filter((d) => d.isActive).length}
      newPatientsThisWeek={newPatientsThisWeek}
      unreadNotifications={analytics.unreadNotifications}
      revenueTracked={billingSummary.confirmed}
    />
  )
}

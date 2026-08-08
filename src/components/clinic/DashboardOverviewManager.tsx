import { CalendarDays, Clock3, Users, X, CheckCircle2, Activity, FileText, MessageCircle, Mail, CircleDollarSign } from 'lucide-react'
import type { AiAgent, AppointmentWithRelations } from '@/types'
import { ArrowLink, ButtonLink, MetricCard, ProgressRail, StatusBadge, SurfaceCard, ValueCard } from '@/components/clinic/shared'

const STATUS_LABEL: Record<string, string> = {
  scheduled: 'Booked',
  pending_confirmation: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No show',
}

function formatTime(iso: string, timezone: string) {
  return new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: 'numeric', minute: '2-digit' }).format(new Date(iso))
}

export function DashboardOverviewManager({
  businessName,
  greeting,
  todayLabel,
  todayAppointments,
  upcomingAppointments,
  timezone,
  stats,
  completionRate,
  widgetConversionRate,
  noShowRate,
  liveAgent,
  knowledgeDocsTotal,
  knowledgeDocsActive,
  newPatientsThisWeek,
  unreadNotifications,
  revenueTracked,
}: {
  businessName: string
  greeting: string
  todayLabel: string
  todayAppointments: AppointmentWithRelations[]
  upcomingAppointments: AppointmentWithRelations[]
  timezone: string
  stats: {
    appointmentsToday: number
    upcomingAppointments: number
    totalPatients: number
    cancelledAppointments: number
  }
  completionRate: number
  widgetConversionRate: number
  noShowRate: number
  liveAgent: AiAgent | null
  knowledgeDocsTotal: number
  knowledgeDocsActive: number
  newPatientsThisWeek: number
  unreadNotifications: number
  revenueTracked: number
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border border-[var(--border-soft)] bg-[var(--panel)] px-6 py-5 shadow-[2px_2px_0_0_var(--border-soft)] md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Live dashboard</div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-strong)]">
            {greeting}, {businessName}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {todayLabel}, the clinic has {stats.appointmentsToday} appointment{stats.appointmentsToday === 1 ? '' : 's'} today and {stats.upcomingAppointments} upcoming.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/dashboard/appointments" icon="none">
            View all appointments
          </ButtonLink>
          <ButtonLink href="/dashboard/widget" variant="secondary" icon="none">
            Widget settings
          </ButtonLink>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Today" value={String(stats.appointmentsToday)} delta="Scheduled today" icon={CalendarDays} tone="teal" />
        <MetricCard label="Upcoming" value={String(stats.upcomingAppointments)} delta="Booked & confirmed" icon={Clock3} tone="blue" />
        <MetricCard label="Patients" value={String(stats.totalPatients)} delta={`+${newPatientsThisWeek} this week`} icon={Users} tone="emerald" />
        <MetricCard label="Cancelled" value={String(stats.cancelledAppointments)} delta="This month" icon={X} tone="rose" />
        <MetricCard label="Completion" value={`${completionRate}%`} delta="This month" icon={CheckCircle2} tone="teal" />
        <MetricCard label="No-shows" value={`${noShowRate}%`} delta="This month" icon={Activity} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.34fr_0.86fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Today&apos;s schedule</div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">Bookings confirmed today</h2>
            </div>
            <StatusBadge tone="teal">{todayAppointments.length} appointment{todayAppointments.length === 1 ? '' : 's'}</StatusBadge>
          </div>
          <div className="mt-6 overflow-hidden border border-[var(--border-soft)]">
            <div className="grid grid-cols-12 gap-3 bg-[var(--panel-soft)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              <div className="col-span-4">Patient</div>
              <div className="col-span-3">Service</div>
              <div className="col-span-3">Time</div>
              <div className="col-span-2">Status</div>
            </div>
            <div className="divide-y divide-[var(--border-soft)] bg-[var(--panel)]">
              {todayAppointments.length === 0 && (
                <div className="px-5 py-6 text-sm text-[var(--text-muted)]">No appointments scheduled today.</div>
              )}
              {todayAppointments.map((appt) => (
                <div key={appt.id} className="grid grid-cols-12 gap-3 px-5 py-4 text-sm">
                  <div className="col-span-4 font-semibold text-[var(--text-strong)]">{appt.patient?.name ?? 'Unknown'}</div>
                  <div className="col-span-3 text-[var(--text-muted)]">{appt.service?.name ?? '—'}</div>
                  <div className="col-span-3 text-[var(--text-muted)]">{formatTime(appt.scheduledAt, timezone)}</div>
                  <div className="col-span-2">
                    <StatusBadge tone={appt.status === 'completed' ? 'emerald' : appt.status === 'confirmed' ? 'blue' : 'teal'}>
                      {STATUS_LABEL[appt.status] ?? appt.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Upcoming</div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">Next patients</h3>
            </div>
            <ArrowLink href="/dashboard/appointments">See all</ArrowLink>
          </div>
          <div className="mt-5 space-y-3">
            {upcomingAppointments.length === 0 && <p className="text-sm text-[var(--text-muted)]">No upcoming appointments.</p>}
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{appt.patient?.name ?? 'Unknown'}</div>
                    <div className="text-xs text-[var(--text-muted)]">{appt.service?.name ?? '—'}</div>
                  </div>
                  <StatusBadge tone="teal">{STATUS_LABEL[appt.status] ?? appt.status}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border border-[var(--border-soft)] bg-[var(--panel)] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Assistant activity</div>
            <div className="mt-4 space-y-4">
              <ProgressRail value={completionRate} label="Appointment completion" />
              <ProgressRail value={widgetConversionRate} label="Widget conversion" />
              <ProgressRail value={noShowRate} label="No-show rate" />
            </div>
          </div>
        </SurfaceCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">AI assistant</div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                {liveAgent ? `${liveAgent.name} is online and ready` : 'No live agent configured'}
              </h3>
            </div>
            <StatusBadge tone={liveAgent ? 'emerald' : 'slate'}>{liveAgent ? 'Realtime' : 'Offline'}</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <div className="border border-[var(--border-soft)] px-5 py-4 text-white" style={{ background: 'var(--surface-dark)' }}>
              <div className="text-sm font-bold">Welcome message</div>
              <p className="mt-2 text-sm leading-7 text-white/74">
                {liveAgent?.greetingMessage ?? 'Set up an AI agent in AI Agents to greet patients automatically.'}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ValueCard label="Knowledge docs" value={String(knowledgeDocsTotal)} icon={FileText} tone="teal" />
              <ValueCard label="FAQs active" value={String(knowledgeDocsActive)} icon={MessageCircle} tone="blue" />
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Operational snapshot</div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">What&apos;s happening in the clinic</h3>
            </div>
            <ButtonLink href="/dashboard/analytics" variant="secondary" icon="arrow">
              Open analytics
            </ButtonLink>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <ValueCard label="New patients" value={String(newPatientsThisWeek)} subtitle="This week" icon={Users} tone="emerald" />
            <ValueCard label="Unread alerts" value={String(unreadNotifications)} icon={Mail} tone="blue" />
            <ValueCard label="Revenue confirmed" value={`$${revenueTracked.toFixed(2)}`} icon={CircleDollarSign} tone="rose" />
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

import { ChartNoAxesCombined, ShieldAlert, ListChecks, CircleDollarSign } from 'lucide-react'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge, MetricCard, ProgressRail } from '@/components/clinic/shared'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function AnalyticsManager({
  conversionRate,
  noShowRate,
  completionRate,
  revenueTracked,
  weeklyVolume,
  repeatPatientRate,
  widgetConversionRate,
}: {
  conversionRate: number
  noShowRate: number
  completionRate: number
  revenueTracked: number
  weeklyVolume: number[]
  repeatPatientRate: number
  widgetConversionRate: number
}) {
  const maxVolume = Math.max(...weeklyVolume, 1)

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Analytics</SectionEyebrow>}
        title="Booking trends and operational health"
        description="Conversions, no-shows, patient growth, and appointment completion computed from real activity this month."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Conversion rate" value={`${conversionRate}%`} delta="Conversations to booking" icon={ChartNoAxesCombined} tone="teal" />
        <MetricCard label="No-show rate" value={`${noShowRate}%`} delta="This month" icon={ShieldAlert} tone="rose" />
        <MetricCard label="Completion" value={`${completionRate}%`} delta="This month" icon={ListChecks} tone="emerald" />
        <MetricCard label="Revenue tracked" value={`$${revenueTracked.toFixed(2)}`} delta="Confirmed transactions" icon={CircleDollarSign} tone="blue" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Trend</div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">Weekly booking volume</h2>
            </div>
            <StatusBadge tone="teal">This week</StatusBadge>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-3">
            {weeklyVolume.map((value, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="flex h-48 w-full items-end border border-[var(--border-soft)] bg-[var(--panel-soft)] p-3">
                  <div className="w-full" style={{ height: `${Math.round((value / maxVolume) * 100)}%`, background: 'var(--brand)' }} />
                </div>
                <div className="text-[11px] font-semibold text-[var(--text-muted)]">{WEEKDAY_LABELS[index]}</div>
                <div className="text-[11px] text-[var(--text-muted)]">{value}</div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Insights</div>
          <div className="mt-4 space-y-4">
            <ProgressRail value={completionRate} label="Appointment completion" />
            <ProgressRail value={repeatPatientRate} label="Repeat patient rate" />
            <ProgressRail value={widgetConversionRate} label="Widget conversion" />
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

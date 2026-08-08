'use client'

import { useMemo, useState } from 'react'
import type { AppointmentStatus, AppointmentWithRelations } from '@/types'
import { SurfaceCard, StatusBadge } from '@/components/clinic/shared'
import { cn } from '@/lib/utils'

const TABS: { label: string; status: AppointmentStatus | 'all' }[] = [
  { label: 'All', status: 'all' },
  { label: 'Booked', status: 'scheduled' },
  { label: 'Confirmed', status: 'confirmed' },
  { label: 'Completed', status: 'completed' },
  { label: 'Cancelled', status: 'cancelled' },
  { label: 'No show', status: 'no_show' },
]

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  scheduled: 'Booked',
  pending_confirmation: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No show',
}

const STATUS_TONE: Record<AppointmentStatus, 'blue' | 'amber' | 'emerald' | 'rose' | 'teal'> = {
  scheduled: 'blue',
  pending_confirmation: 'amber',
  confirmed: 'emerald',
  completed: 'teal',
  cancelled: 'rose',
  no_show: 'amber',
}

const SOURCE_LABEL: Record<string, string> = {
  widget: 'AI Widget',
  portal: 'Portal',
  manual: 'Manual',
  ai_call: 'AI Call',
  phone: 'Phone',
}

function formatDateTime(iso: string, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function AppointmentsManager({
  initialAppointments,
  timezone,
}: {
  initialAppointments: AppointmentWithRelations[]
  timezone: string
}) {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(initialAppointments[0]?.id ?? null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? appointments : appointments.filter((a) => a.status === filter)),
    [appointments, filter]
  )
  const selected = appointments.find((a) => a.id === selectedId) ?? filtered[0] ?? null

  async function changeStatus(appointmentId: string, status: AppointmentStatus) {
    setBusy(true)
    setError(null)
    const res = await fetch('/api/appointments/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentId, status }),
    })
    const data = await res.json().catch(() => ({}))
    setBusy(false)
    if (!res.ok) {
      setError(data.error ?? 'No se pudo actualizar la cita')
      return
    }
    setAppointments((prev) => prev.map((a) => (a.id === appointmentId ? { ...a, ...data.appointment } : a)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/90 px-6 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Appointments</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--text-strong)]">Track every booking and status change</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setFilter(tab.status)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                filter === tab.status
                  ? 'bg-[var(--brand)] text-white shadow-[0_10px_24px_rgba(13,148,136,0.22)]'
                  : 'bg-white text-[var(--text-muted)] hover:bg-teal-50 hover:text-[var(--text-strong)]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm font-medium text-[var(--coral)]">{error}</p>}

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-12 gap-3 border-b border-slate-200/80 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            <div className="col-span-4">Patient</div>
            <div className="col-span-3">Service</div>
            <div className="col-span-3">Date &amp; time</div>
            <div className="col-span-2">Status</div>
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.length === 0 && <p className="px-5 py-6 text-sm text-[var(--text-muted)]">No appointments in this filter.</p>}
            {filtered.map((appt) => (
              <button
                key={appt.id}
                type="button"
                onClick={() => setSelectedId(appt.id)}
                className={cn(
                  'grid w-full grid-cols-12 gap-3 px-5 py-4 text-left text-sm transition',
                  selected?.id === appt.id ? 'bg-teal-50/60' : 'hover:bg-slate-50'
                )}
              >
                <div className="col-span-4 font-semibold text-[var(--text-strong)]">{appt.patient?.name ?? 'Unknown patient'}</div>
                <div className="col-span-3 text-[var(--text-muted)]">{appt.service?.name ?? '—'}</div>
                <div className="col-span-3 text-[var(--text-muted)]">{formatDateTime(appt.scheduledAt, timezone)}</div>
                <div className="col-span-2">
                  <StatusBadge tone={STATUS_TONE[appt.status]}>{STATUS_LABEL[appt.status]}</StatusBadge>
                </div>
              </button>
            ))}
          </div>
        </div>

        <SurfaceCard className="p-6">
          {!selected ? (
            <p className="text-sm text-[var(--text-muted)]">Select an appointment to see details.</p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Selected appointment</div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">{selected.service?.name ?? 'Appointment'}</h2>
                </div>
                <StatusBadge tone={STATUS_TONE[selected.status]}>{STATUS_LABEL[selected.status]}</StatusBadge>
              </div>
              <div className="mt-5 space-y-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[var(--text-muted)]">Patient</span>
                  <strong className="text-sm text-[var(--text-strong)]">{selected.patient?.name ?? 'Unknown'}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[var(--text-muted)]">Time</span>
                  <strong className="text-sm text-[var(--text-strong)]">{formatDateTime(selected.scheduledAt, timezone)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[var(--text-muted)]">Source</span>
                  <strong className="text-sm text-[var(--text-strong)]">{SOURCE_LABEL[selected.source] ?? selected.source}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[var(--text-muted)]">Payment</span>
                  <strong className="text-sm capitalize text-[var(--text-strong)]">{selected.paymentStatus.replace('_', ' ')}</strong>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void changeStatus(selected.id, 'confirmed')}
                  className="btn-primary w-full justify-center"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void changeStatus(selected.id, 'completed')}
                  className="btn-secondary w-full justify-center"
                >
                  Mark completed
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void changeStatus(selected.id, 'no_show')}
                  className="btn-secondary w-full justify-center"
                >
                  No show
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void changeStatus(selected.id, 'cancelled')}
                  className="btn-secondary w-full justify-center !text-[var(--coral)]"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </SurfaceCard>
      </div>
    </div>
  )
}

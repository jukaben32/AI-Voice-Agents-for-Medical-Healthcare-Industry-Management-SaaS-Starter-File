'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, LineChart, X } from 'lucide-react'
import type { AppointmentWithRelations, Patient } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { createPatient } from '@/services/patients'
import { SurfaceCard, StatusBadge, ValueCard } from '@/components/clinic/shared'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso))
}

export function PatientsManager({
  initialPatients,
  appointments,
  businessId,
}: {
  initialPatients: Patient[]
  appointments: AppointmentWithRelations[]
  businessId: string
}) {
  const [patients, setPatients] = useState(initialPatients)
  const [selectedId, setSelectedId] = useState<string | null>(initialPatients[0]?.id ?? null)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [insuranceProvider, setInsuranceProvider] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selected = patients.find((p) => p.id === selectedId) ?? null
  const selectedAppointments = useMemo(
    () => appointments.filter((a) => a.patientId === selectedId).sort((a, b) => (a.scheduledAt < b.scheduledAt ? 1 : -1)),
    [appointments, selectedId]
  )
  const completedCount = selectedAppointments.filter((a) => a.status === 'completed').length
  const thisMonthCount = selectedAppointments.filter((a) => {
    const now = new Date()
    const d = new Date(a.scheduledAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('El nombre del paciente es requerido')
      return
    }
    setCreating(true)
    try {
      const supabase = createClient()
      const created = await createPatient(supabase, businessId, {
        name: name.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
        insuranceProvider: insuranceProvider.trim() || null,
        source: 'manual',
      })
      setPatients((prev) => [created, ...prev])
      setSelectedId(created.id)
      setName('')
      setEmail('')
      setPhone('')
      setInsuranceProvider('')
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el paciente')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">Patients</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--text-strong)]">Patient records and appointment history in one place</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
          Keep notes, insurance details, and booking context together so the front desk and assistants work from the same data.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Patient list</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Recent visitors</h2>
            </div>
            <button type="button" onClick={() => setShowForm((v) => !v)} className="btn-primary !px-4 !py-2 !text-xs">
              Add patient
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleCreate} className="mt-5 space-y-3 rounded-none border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
              {error && <p className="text-sm font-medium text-[var(--coral)]">{error}</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="input-field w-full" required />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="input-field w-full" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field w-full" />
                <input value={insuranceProvider} onChange={(e) => setInsuranceProvider(e.target.value)} placeholder="Insurance provider" className="input-field w-full" />
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={creating} className="btn-primary !px-4 !py-2 !text-xs">
                  {creating ? 'Saving…' : 'Save patient'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary !px-4 !py-2 !text-xs">
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 space-y-3">
            {patients.length === 0 && <p className="text-sm text-[var(--text-muted)]">No patients yet.</p>}
            {patients.map((patient) => {
              const lastAppt = appointments
                .filter((a) => a.patientId === patient.id)
                .sort((a, b) => (a.scheduledAt < b.scheduledAt ? 1 : -1))[0]
              return (
                <button
                  key={patient.id}
                  type="button"
                  onClick={() => setSelectedId(patient.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-none border px-4 py-3 text-left transition ${
                    selectedId === patient.id ? 'border-[var(--brand)] bg-[var(--brand-soft)]' : 'border-[var(--border-soft)] bg-[var(--panel-soft)]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{patient.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{patient.insuranceProvider ?? patient.email ?? patient.phone ?? '—'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[var(--text-strong)]">{lastAppt?.service?.name ?? 'No visits yet'}</div>
                    <div className="text-xs text-[var(--text-muted)]">{lastAppt ? formatDate(lastAppt.scheduledAt) : ''}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          {!selected ? (
            <p className="text-sm text-[var(--text-muted)]">Select a patient to see their profile.</p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Patient profile</div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">{selected.name}</h2>
                </div>
                <StatusBadge tone="emerald">Active</StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <ValueCard label="Total appointments" value={String(selectedAppointments.length)} icon={CalendarDays} tone="teal" />
                <ValueCard label="Completed" value={String(completedCount)} icon={CheckCircle2} tone="emerald" />
                <ValueCard label="This month" value={String(thisMonthCount)} icon={LineChart} tone="blue" />
              </div>
              <div className="mt-6 space-y-3 rounded-none border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[var(--text-muted)]">Phone</span>
                  <strong className="text-sm text-[var(--text-strong)]">{selected.phone ?? 'Not on file'}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[var(--text-muted)]">Insurance</span>
                  <strong className="text-sm text-[var(--text-strong)]">{selected.insuranceProvider ?? 'Self pay'}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[var(--text-muted)]">Last visit</span>
                  <strong className="text-sm text-[var(--text-strong)]">
                    {selectedAppointments[0] ? formatDate(selectedAppointments[0].scheduledAt) : 'No visits yet'}
                  </strong>
                </div>
                {selected.notes && (
                  <div className="pt-2">
                    <span className="text-sm text-[var(--text-muted)]">Notes</span>
                    <p className="mt-1 text-sm text-[var(--text-strong)]">{selected.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </SurfaceCard>
      </div>
    </div>
  )
}

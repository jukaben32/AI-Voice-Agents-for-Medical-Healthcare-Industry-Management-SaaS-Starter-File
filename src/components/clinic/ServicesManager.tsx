'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import type { ClinicService } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { createClinicService, deleteClinicService, setClinicServiceActive } from '@/services/services'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge } from '@/components/clinic/shared'

export function ServicesManager({ initialServices, businessId }: { initialServices: ClinicService[]; businessId: string }) {
  const [services, setServices] = useState(initialServices)
  const [name, setName] = useState('')
  const [durationMinutes, setDurationMinutes] = useState('30')
  const [price, setPrice] = useState('')
  const [instructions, setInstructions] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('El nombre del servicio es requerido')
      return
    }

    setCreating(true)
    try {
      const supabase = createClient()
      const created = await createClinicService(supabase, businessId, {
        name: name.trim(),
        durationMinutes: durationMinutes ? Number(durationMinutes) : 30,
        price: price ? Number(price) : null,
        priceType: 'fixed',
        instructions: instructions.trim() || null,
        sortOrder: services.length,
      })
      setServices((prev) => [...prev, created])
      setName('')
      setDurationMinutes('30')
      setPrice('')
      setInstructions('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el servicio')
    } finally {
      setCreating(false)
    }
  }

  async function toggleActive(service: ClinicService) {
    const supabase = createClient()
    const updated = await setClinicServiceActive(supabase, businessId, service.id, !service.active)
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
  }

  async function remove(service: ClinicService) {
    if (!confirm(`¿Eliminar "${service.name}"?`)) return
    const supabase = createClient()
    await deleteClinicService(supabase, businessId, service.id)
    setServices((prev) => prev.filter((s) => s.id !== service.id))
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Services</SectionEyebrow>}
        title="Clinic services map directly to the booking flow"
        description="Services define the slot length, price, and assistant instructions Clara uses during the conversation."
      />

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {services.length === 0 && (
            <SurfaceCard className="p-5 md:col-span-2">
              <p className="text-sm text-[var(--text-muted)]">No hay servicios todavía — crea el primero con el panel de la derecha.</p>
            </SurfaceCard>
          )}
          {services.map((service) => (
            <SurfaceCard key={service.id} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => void toggleActive(service)}>
                  <StatusBadge tone={service.active ? 'emerald' : 'slate'}>{service.active ? 'Active' : 'Inactive'}</StatusBadge>
                </button>
                <button type="button" onClick={() => void remove(service)} className="text-[var(--coral)]" aria-label="Delete service">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--text-strong)]">{service.name}</h3>
              <div className="mt-2 text-sm text-[var(--text-muted)]">
                {service.durationMinutes} min{service.price ? ` · $${service.price}` : ''}
              </div>
              {service.instructions && <p className="mt-3 text-xs text-[var(--text-muted)]">{service.instructions}</p>}
            </SurfaceCard>
          ))}
        </div>

        <SurfaceCard className="p-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Add service</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Quick create panel</h2>
          </div>

          {error && <p className="mt-3 text-sm font-medium text-[var(--coral)]">{error}</p>}

          <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">Service name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="General Consultation" className="input-field w-full" required />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Duration (minutes)</label>
                <input value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} type="number" min={5} className="input-field w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min={0} placeholder="90" className="input-field w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                placeholder="Ask patients to arrive 15 minutes early and bring previous medical records."
                className="input-field w-full"
              />
            </div>
            <button type="submit" disabled={creating} className="btn-primary w-full justify-center">
              <Plus className="h-4 w-4" />
              {creating ? 'Creating…' : 'Create service'}
            </button>
          </form>
        </SurfaceCard>
      </div>
    </div>
  )
}

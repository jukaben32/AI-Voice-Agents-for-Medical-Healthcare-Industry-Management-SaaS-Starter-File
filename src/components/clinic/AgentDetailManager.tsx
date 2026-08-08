'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Phone, CalendarDays, LifeBuoy, Trash2 } from 'lucide-react'
import type { AiAgent } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { updateAgent, deleteAgent } from '@/services/agents'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge, ValueCard } from '@/components/clinic/shared'

const STATUS_TONE: Record<AiAgent['status'], 'emerald' | 'amber' | 'slate'> = {
  live: 'emerald',
  paused: 'amber',
  draft: 'slate',
}

const VOICE_OPTIONS = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']

export function AgentDetailManager({ agent, businessId }: { agent: AiAgent; businessId: string }) {
  const router = useRouter()
  const [form, setForm] = useState(agent)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaved(false)
    setSaving(true)
    try {
      const supabase = createClient()
      const updated = await updateAgent(supabase, businessId, agent.id, {
        name: form.name,
        title: form.title,
        specialty: form.specialty,
        voice: form.voice,
        personality: form.personality,
        greetingMessage: form.greetingMessage,
        systemPrompt: form.systemPrompt,
        status: form.status,
        language: form.language,
      })
      setForm(updated)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el agente')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar el agente "${form.name}"?`)) return
    const supabase = createClient()
    await deleteAgent(supabase, businessId, agent.id)
    router.push('/dashboard/agents')
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Agent detail</SectionEyebrow>}
        title={form.name}
        description="Edit the agent's profile, voice, and system prompt."
      />

      {error && <p className="text-sm font-medium text-[var(--coral)]">{error}</p>}
      {saved && <p className="text-sm font-medium" style={{ color: 'var(--brand-strong)' }}>Agent saved.</p>}

      <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Profile</div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">{form.name}</h2>
            </div>
            <StatusBadge tone={STATUS_TONE[form.status]}>{form.status}</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <ValueCard label="Calls handled" value={String(form.callsHandled)} icon={Phone} tone="teal" />
            <ValueCard label="Language" value={form.language.toUpperCase()} icon={CalendarDays} tone="blue" />
            <ValueCard label="Voice" value={form.voice} icon={LifeBuoy} tone="rose" />
          </div>
          <button type="button" onClick={() => void handleDelete()} className="btn-secondary mt-5 w-full justify-center !text-[var(--coral)]">
            <Trash2 className="h-4 w-4" />
            Delete agent
          </button>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input-field w-full" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Title</label>
                <input value={form.title ?? ''} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value || null }))} placeholder="Front desk voice agent" className="input-field w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Voice</label>
                <select value={form.voice} onChange={(e) => setForm((f) => ({ ...f, voice: e.target.value }))} className="input-field w-full">
                  {VOICE_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AiAgent['status'] }))} className="input-field w-full">
                  <option value="draft">draft</option>
                  <option value="live">live</option>
                  <option value="paused">paused</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">Greeting message</label>
              <textarea
                value={form.greetingMessage}
                onChange={(e) => setForm((f) => ({ ...f, greetingMessage: e.target.value }))}
                rows={2}
                className="input-field w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">System prompt</label>
              <textarea
                value={form.systemPrompt}
                onChange={(e) => setForm((f) => ({ ...f, systemPrompt: e.target.value }))}
                rows={8}
                className="input-field w-full font-mono text-xs"
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving…' : 'Save agent'}
            </button>
          </form>
        </SurfaceCard>
      </div>
    </div>
  )
}

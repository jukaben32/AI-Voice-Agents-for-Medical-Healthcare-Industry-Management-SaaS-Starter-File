'use client'

import { useState } from 'react'
import { Clock3, Sparkles, Copy, Check } from 'lucide-react'
import type { Widget } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { updateWidget } from '@/services/widgets'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge, ValueCard, PhoneFrame } from '@/components/clinic/shared'

const COLOR_OPTIONS = ['#0f766e', '#0ea5e9', '#ef4444', '#f59e0b', '#8b5cf6']
const TONE_OPTIONS = ['professional', 'friendly', 'concise']

const widgetSteps = [
  { title: 'Choose a service', detail: 'The assistant lists the clinic services with duration and pricing.' },
  { title: 'Pick a date and time', detail: 'The agent only shows slots that are open in the clinic schedule.' },
  { title: 'Add your details', detail: 'Patients enter their name, phone, and optional email in the conversation.' },
  { title: 'Confirm booking', detail: 'The appointment is saved, confirmed, and the notification pipeline fires.' },
]

export function WidgetManager({ widget, businessSlug, siteOrigin }: { widget: Widget; businessSlug: string; siteOrigin: string }) {
  const [form, setForm] = useState(widget)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleSave() {
    setError(null)
    setSaved(false)
    setSaving(true)
    try {
      const supabase = createClient()
      const updated = await updateWidget(supabase, widget.businessId, widget.id, {
        primaryColor: form.primaryColor,
        secondaryColor: form.secondaryColor,
        tone: form.tone,
        welcomeMessage: form.welcomeMessage,
        slotDuration: form.slotDuration,
        enabled: form.enabled,
      })
      setForm(updated)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el widget')
    } finally {
      setSaving(false)
    }
  }

  const embedSnippet = `<script src="${siteOrigin}/api/widget-script?businessSlug=${businessSlug}&widgetSlug=${form.slug}"></script>`

  async function handleCopy() {
    await navigator.clipboard.writeText(embedSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Widget</SectionEyebrow>}
        title="Match the booking widget to the clinic brand"
        description="Configure colors, tone, slot duration, welcome copy, and the booking CTA. The embed code updates instantly."
      />

      {error && <p className="text-sm font-medium text-[var(--coral)]">{error}</p>}
      {saved && <p className="text-sm font-medium" style={{ color: 'var(--brand-strong)' }}>Widget saved.</p>}

      <div className="grid gap-6 xl:grid-cols-[1fr_0.86fr]">
        <SurfaceCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Appearance</div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">Widget color and tone</h2>
            </div>
            <button type="button" onClick={() => setForm((f) => ({ ...f, enabled: !f.enabled }))}>
              <StatusBadge tone={form.enabled ? 'emerald' : 'slate'}>{form.enabled ? 'Live widget' : 'Disabled'}</StatusBadge>
            </button>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border border-[var(--border-soft)] bg-[var(--panel)] p-5">
              <div className="text-sm font-bold text-[var(--text-strong)]">Primary color</div>
              <div className="mt-4 flex items-center gap-3">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, primaryColor: color }))}
                    className="h-8 w-8 rounded-full border-2"
                    style={{ backgroundColor: color, borderColor: form.primaryColor === color ? 'var(--text-strong)' : 'transparent' }}
                    aria-label={color}
                  />
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-strong)]">Slot duration (min)</label>
                  <input
                    type="number"
                    min={5}
                    value={form.slotDuration}
                    onChange={(e) => setForm((f) => ({ ...f, slotDuration: Number(e.target.value) }))}
                    className="input-field w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-strong)]">Tone</label>
                  <select value={form.tone} onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))} className="input-field w-full">
                    {TONE_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-strong)]">Welcome message</label>
                  <textarea
                    value={form.welcomeMessage}
                    onChange={(e) => setForm((f) => ({ ...f, welcomeMessage: e.target.value }))}
                    rows={2}
                    className="input-field w-full"
                  />
                </div>
              </div>
              <button type="button" onClick={() => void handleSave()} disabled={saving} className="btn-primary mt-5 w-full justify-center">
                {saving ? 'Saving…' : 'Save widget'}
              </button>
            </div>
            <div className="border border-[var(--border-soft)] p-5 text-white" style={{ background: 'var(--surface-dark)' }}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Embed code</div>
              <pre className="mt-4 overflow-auto border border-white/14 bg-black/20 p-4 text-[11px] leading-6" style={{ color: 'var(--brand-soft)' }}>
                {embedSnippet}
              </pre>
              <button type="button" onClick={() => void handleCopy()} className="btn-secondary mt-5 !border-white/40 !text-white hover:!bg-white/10">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy snippet'}
              </button>
            </div>
          </div>
        </SurfaceCard>

        <PhoneFrame title="AI Assistant" subtitle="AI Assistant Online">
          <div className="space-y-3">
            <div className="border border-[var(--border-soft)] bg-[var(--brand-soft)] px-4 py-3 text-sm text-[var(--brand-strong)]">
              {form.welcomeMessage}
            </div>
            {widgetSteps.map((step) => (
              <div key={step.title} className="border border-[var(--border-soft)] px-4 py-3">
                <div className="text-sm font-bold text-[var(--text-strong)]">{step.title}</div>
                <div className="text-xs leading-6 text-[var(--text-muted)]">{step.detail}</div>
              </div>
            ))}
          </div>
        </PhoneFrame>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ValueCard label="Slot duration" value={`${form.slotDuration} min`} icon={Clock3} tone="teal" />
        <ValueCard label="Tone" value={form.tone} icon={Sparkles} tone="blue" />
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bot, Plus } from 'lucide-react'
import type { AiAgent } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { createAgent, setAgentStatus } from '@/services/agents'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge } from '@/components/clinic/shared'

const STATUS_TONE: Record<AiAgent['status'], 'emerald' | 'amber' | 'slate'> = {
  live: 'emerald',
  paused: 'amber',
  draft: 'slate',
}

const VOICE_OPTIONS = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']

export function AgentsManager({ initialAgents, businessId }: { initialAgents: AiAgent[]; businessId: string }) {
  const [agents, setAgents] = useState(initialAgents)
  const [name, setName] = useState('')
  const [voice, setVoice] = useState('alloy')
  const [personality, setPersonality] = useState('friendly')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('El nombre del agente es requerido')
      return
    }
    setCreating(true)
    try {
      const supabase = createClient()
      const created = await createAgent(supabase, businessId, { name: name.trim(), voice, personality })
      setAgents((prev) => [created, ...prev])
      setName('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el agente')
    } finally {
      setCreating(false)
    }
  }

  async function toggleStatus(agent: AiAgent) {
    const supabase = createClient()
    const next = agent.status === 'live' ? 'paused' : 'live'
    const updated = await setAgentStatus(supabase, businessId, agent.id, next)
    setAgents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>AI Agents</SectionEyebrow>}
        title="Agents, prompts, and voice tools"
        description="Use one or more agents for booking, follow-up, billing, and triage. Each agent keeps its own voice, prompt, and status."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {agents.length === 0 && (
            <SurfaceCard className="p-5 md:col-span-2">
              <p className="text-sm text-[var(--text-muted)]">No agents yet — create the first one with the panel on the right.</p>
            </SurfaceCard>
          )}
          {agents.map((agent) => (
            <SurfaceCard key={agent.id} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => void toggleStatus(agent)}>
                  <StatusBadge tone={STATUS_TONE[agent.status]}>{agent.status}</StatusBadge>
                </button>
                <Bot className="h-5 w-5" style={{ color: 'var(--brand)' }} />
              </div>
              <Link href={`/dashboard/agents/${agent.id}`} className="mt-4 block font-display text-lg font-bold tracking-tight text-[var(--text-strong)] hover:text-[var(--brand-strong)]">
                {agent.name}
              </Link>
              <div className="mt-1 text-sm text-[var(--text-muted)]">{agent.title ?? agent.personality}</div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Calls handled</span>
                <strong className="text-[var(--text-strong)]">{agent.callsHandled}</strong>
              </div>
            </SurfaceCard>
          ))}
        </div>

        <SurfaceCard className="p-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Add agent</div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">Quick create panel</h2>
          </div>

          {error && <p className="mt-3 text-sm font-medium text-[var(--coral)]">{error}</p>}

          <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-none border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">Agent name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Clara" className="input-field w-full" required />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Voice</label>
                <select value={voice} onChange={(e) => setVoice(e.target.value)} className="input-field w-full">
                  {VOICE_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-strong)]">Personality</label>
                <input value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="friendly" className="input-field w-full" />
              </div>
            </div>
            <button type="submit" disabled={creating} className="btn-primary w-full justify-center">
              <Plus className="h-4 w-4" />
              {creating ? 'Creating…' : 'Create agent'}
            </button>
          </form>
        </SurfaceCard>
      </div>
    </div>
  )
}

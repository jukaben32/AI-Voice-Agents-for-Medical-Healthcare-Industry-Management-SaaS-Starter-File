'use client'

import { useEffect, useState } from 'react'
import type { Conversation, ConversationMessage } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { listConversationMessages } from '@/services/conversations'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge } from '@/components/clinic/shared'

const SENTIMENT_TONE: Record<string, 'emerald' | 'blue' | 'rose'> = {
  positive: 'emerald',
  neutral: 'blue',
  negative: 'rose',
}

const OUTCOME_LABEL: Record<string, string> = {
  booked_appointment: 'Booked appointment',
  qualified_lead: 'Qualified lead',
  no_action: 'No action',
  escalated: 'Escalated',
}

const CHANNEL_LABEL: Record<string, string> = {
  widget_voice: 'Widget · Voice',
  widget_chat: 'Widget · Chat',
  phone: 'Phone',
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(iso))
}

export function ConversationsManager({
  initialConversations,
  patientNames,
  agentNames,
  businessId,
}: {
  initialConversations: Conversation[]
  patientNames: Record<string, string>
  agentNames: Record<string, string>
  businessId: string
}) {
  const [conversations] = useState(initialConversations)
  const [selectedId, setSelectedId] = useState<string | null>(initialConversations[0]?.id ?? null)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [loading, setLoading] = useState(false)

  const selected = conversations.find((c) => c.id === selectedId) ?? null

  useEffect(() => {
    if (!selectedId) {
      setMessages([])
      return
    }
    let cancelled = false
    setLoading(true)
    const supabase = createClient()
    listConversationMessages(supabase, businessId, selectedId)
      .then((data) => {
        if (!cancelled) setMessages(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [selectedId, businessId])

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Conversations</SectionEyebrow>}
        title="Call transcripts and chatbot history"
        description="Review what the agent said, how the call ended, and whether the conversation produced a booking."
      />
      <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <SurfaceCard className="p-6">
          {conversations.length === 0 && <p className="text-sm text-[var(--text-muted)]">No conversations yet.</p>}
          <div className="space-y-3">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedId(conv.id)}
                className={`block w-full border px-4 py-3 text-left ${selectedId === conv.id ? 'border-[var(--brand)] bg-[var(--brand-soft)]' : 'border-[var(--border-soft)] bg-[var(--panel-soft)]'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">
                      {conv.patientId ? (patientNames[conv.patientId] ?? 'Unknown patient') : 'Unknown patient'}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {CHANNEL_LABEL[conv.channel] ?? conv.channel} · {conv.agentId ? (agentNames[conv.agentId] ?? 'Agent') : 'Agent'}
                    </div>
                  </div>
                  {conv.sentiment && <StatusBadge tone={SENTIMENT_TONE[conv.sentiment] ?? 'blue'}>{conv.sentiment}</StatusBadge>}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{conv.outcome ? OUTCOME_LABEL[conv.outcome] ?? conv.outcome : conv.status}</span>
                  <span>{formatDate(conv.startedAt)}</span>
                </div>
              </button>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          {!selected ? (
            <p className="text-sm text-[var(--text-muted)]">Select a conversation to see its transcript.</p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Transcript</div>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                    {selected.transcriptSummary ?? 'Conversation'}
                  </h2>
                </div>
                <StatusBadge tone="teal">{formatDuration(selected.durationSeconds)}</StatusBadge>
              </div>
              <div className="mt-5 space-y-3">
                {loading && <p className="text-sm text-[var(--text-muted)]">Loading transcript…</p>}
                {!loading && messages.length === 0 && <p className="text-sm text-[var(--text-muted)]">No messages recorded for this conversation.</p>}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === 'agent'
                        ? 'ml-auto max-w-[85%] border px-4 py-3 text-sm text-white'
                        : 'max-w-[85%] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-strong)]'
                    }
                    style={message.role === 'agent' ? { background: 'var(--brand)', borderColor: 'var(--brand)' } : undefined}
                  >
                    <span className="font-semibold">{message.role === 'agent' ? 'Agent' : message.role === 'caller' ? 'Patient' : 'System'}:</span> {message.content}
                  </div>
                ))}
              </div>
            </>
          )}
        </SurfaceCard>
      </div>
    </div>
  )
}

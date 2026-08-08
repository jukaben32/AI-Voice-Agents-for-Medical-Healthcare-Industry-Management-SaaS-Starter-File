'use client'

import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import type { SupportMessage, SupportTicket, SupportTicketStatus } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { listSupportMessages, appendSupportMessage, updateSupportTicketStatus } from '@/services/support'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge } from '@/components/clinic/shared'

const STATUS_TONE: Record<SupportTicketStatus, 'rose' | 'amber' | 'emerald' | 'slate'> = {
  open: 'rose',
  pending: 'amber',
  resolved: 'emerald',
  closed: 'slate',
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(iso))
}

export function SupportManager({ initialTickets, businessId }: { initialTickets: SupportTicket[]; businessId: string }) {
  const [tickets, setTickets] = useState(initialTickets)
  const [selectedId, setSelectedId] = useState<string | null>(initialTickets[0]?.id ?? null)
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  const selected = tickets.find((t) => t.id === selectedId) ?? null

  useEffect(() => {
    if (!selectedId) {
      setMessages([])
      return
    }
    let cancelled = false
    setLoading(true)
    const supabase = createClient()
    listSupportMessages(supabase, businessId, selectedId)
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

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedId || !reply.trim()) return
    setSending(true)
    try {
      const supabase = createClient()
      const message = await appendSupportMessage(supabase, businessId, selectedId, { senderType: 'staff', content: reply.trim() })
      setMessages((prev) => [...prev, message])
      setReply('')
    } finally {
      setSending(false)
    }
  }

  async function changeStatus(status: SupportTicketStatus) {
    if (!selectedId) return
    const supabase = createClient()
    const updated = await updateSupportTicketStatus(supabase, businessId, selectedId, status)
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <SurfaceCard className="p-6">
        <SectionHeading
          eyebrow={<SectionEyebrow>Support</SectionEyebrow>}
          title="Tickets and patient requests"
          description="Collect issues from the portal, widget, or front desk and keep the support thread tied to the appointment."
        />
        <div className="mt-6 space-y-3">
          {tickets.length === 0 && <p className="text-sm text-[var(--text-muted)]">No support tickets yet.</p>}
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedId(ticket.id)}
              className={`block w-full border px-4 py-3 text-left ${selectedId === ticket.id ? 'border-[var(--brand)] bg-[var(--brand-soft)]' : 'border-[var(--border-soft)] bg-[var(--panel-soft)]'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[var(--text-strong)]">{ticket.subject}</div>
                  <div className="text-xs text-[var(--text-muted)]">{ticket.priority} priority · {formatDate(ticket.createdAt)}</div>
                </div>
                <StatusBadge tone={STATUS_TONE[ticket.status]}>{ticket.status}</StatusBadge>
              </div>
            </button>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-6">
        {!selected ? (
          <p className="text-sm text-[var(--text-muted)]">Select a ticket to see its thread.</p>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Thread</div>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">{selected.subject}</h2>
              </div>
              <StatusBadge tone={STATUS_TONE[selected.status]}>{selected.status}</StatusBadge>
            </div>

            <div className="mt-5 space-y-3">
              {loading && <p className="text-sm text-[var(--text-muted)]">Loading thread…</p>}
              {!loading && messages.length === 0 && <p className="text-sm text-[var(--text-muted)]">No messages yet.</p>}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.senderType === 'staff'
                      ? 'ml-auto max-w-[85%] border px-4 py-3 text-sm text-white'
                      : 'max-w-[85%] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-strong)]'
                  }
                  style={message.senderType === 'staff' ? { background: 'var(--brand)', borderColor: 'var(--brand)' } : undefined}
                >
                  {message.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="mt-6 border border-[var(--border-soft)] bg-[var(--panel-soft)] p-4">
              <div className="flex items-center gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Compose a reply…"
                  className="input-field flex-1 !border-transparent !bg-transparent !p-0 focus:!ring-0"
                />
                <button type="submit" disabled={sending || !reply.trim()} className="btn-primary !px-3 !py-2">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {(['open', 'pending', 'resolved', 'closed'] as SupportTicketStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => void changeStatus(status)}
                  className={`border px-3 py-1.5 text-xs font-semibold ${selected.status === status ? 'border-[var(--brand)] bg-[var(--brand)] text-white' : 'border-[var(--border-soft)] text-[var(--text-muted)]'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </>
        )}
      </SurfaceCard>
    </div>
  )
}

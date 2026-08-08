'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import type { KnowledgeDocument } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { upsertKnowledgeDocument, deleteKnowledgeDocument } from '@/services/faqs'
import { SectionEyebrow, SectionHeading, SurfaceCard, StatusBadge } from '@/components/clinic/shared'

export function KnowledgeManager({ initialDocuments, businessId }: { initialDocuments: KnowledgeDocument[]; businessId: string }) {
  const [documents, setDocuments] = useState(initialDocuments)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!question.trim() || !answer.trim()) {
      setError('La pregunta y la respuesta son requeridas')
      return
    }
    setSaving(true)
    try {
      const supabase = createClient()
      const created = await upsertKnowledgeDocument(supabase, businessId, {
        title: question.trim(),
        question: question.trim(),
        answer: answer.trim(),
        isActive: true,
      })
      setDocuments((prev) => [created, ...prev])
      setQuestion('')
      setAnswer('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el artículo')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(doc: KnowledgeDocument) {
    const supabase = createClient()
    const updated = await upsertKnowledgeDocument(supabase, businessId, {
      id: doc.id,
      title: doc.title,
      question: doc.question,
      answer: doc.answer,
      category: doc.category,
      catalogKey: doc.catalogKey,
      isActive: !doc.isActive,
    })
    setDocuments((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
  }

  async function remove(doc: KnowledgeDocument) {
    if (!confirm(`¿Eliminar "${doc.title}"?`)) return
    const supabase = createClient()
    await deleteKnowledgeDocument(supabase, businessId, doc.id)
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id))
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Knowledge</SectionEyebrow>}
        title="Teach Clara the answers patients ask most"
        description="Structured Q&A the AI agent uses to answer parking, cancellation, insurance, and policy questions during a call or chat."
      />

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="grid gap-4">
          {documents.length === 0 && (
            <SurfaceCard className="p-5">
              <p className="text-sm text-[var(--text-muted)]">No hay artículos todavía — crea el primero con el panel de la derecha.</p>
            </SurfaceCard>
          )}
          {documents.map((doc) => (
            <SurfaceCard key={doc.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-bold text-[var(--text-strong)]">{doc.question ?? doc.title}</div>
                <div className="flex shrink-0 items-center gap-3">
                  <button type="button" onClick={() => void toggleActive(doc)}>
                    <StatusBadge tone={doc.isActive ? 'emerald' : 'slate'}>{doc.isActive ? 'Active' : 'Inactive'}</StatusBadge>
                  </button>
                  <button type="button" onClick={() => void remove(doc)} className="text-[var(--coral)]" aria-label="Delete article">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {doc.answer && <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{doc.answer}</p>}
            </SurfaceCard>
          ))}
        </div>

        <SurfaceCard className="p-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Add article</div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">Quick create panel</h2>
          </div>

          {error && <p className="mt-3 text-sm font-medium text-[var(--coral)]">{error}</p>}

          <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-none border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">Question</label>
              <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Is parking available?" className="input-field w-full" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-strong)]">Answer the agent will give</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                placeholder="Yes, free parking is available at our clinic."
                className="input-field w-full"
                required
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
              <Plus className="h-4 w-4" />
              {saving ? 'Saving…' : 'Add article'}
            </button>
          </form>
        </SurfaceCard>
      </div>
    </div>
  )
}

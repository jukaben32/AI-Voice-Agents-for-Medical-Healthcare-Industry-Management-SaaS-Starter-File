import type { AiAgent } from '@/types'
import { DEFAULT_WELCOME_MESSAGE } from '@/constants'
import type { DbClient } from './_shared'

function toAgent(row: any): AiAgent {
  return {
    id: row.id,
    businessId: row.business_id,
    name: row.name,
    title: row.title ?? null,
    specialty: row.specialty ?? null,
    voice: row.voice,
    personality: row.personality,
    sensitivity: Number(row.sensitivity ?? 0.5),
    greetingMessage: row.greeting_message ?? DEFAULT_WELCOME_MESSAGE,
    systemPrompt: row.system_prompt ?? '',
    status: row.status,
    language: row.language ?? 'en',
    callsHandled: row.calls_handled ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listAgentsForBusiness(supabase: DbClient, businessId: string) {
  const { data, error } = await supabase.from('ai_agents').select('*').eq('business_id', businessId).order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(toAgent)
}

export async function getAgentById(supabase: DbClient, businessId: string, agentId: string) {
  const { data, error } = await supabase.from('ai_agents').select('*').eq('business_id', businessId).eq('id', agentId).maybeSingle()
  if (error) throw error
  return data ? toAgent(data) : null
}

export async function getLiveAgentForBusiness(supabase: DbClient, businessId: string) {
  const { data, error } = await supabase
    .from('ai_agents')
    .select('*')
    .eq('business_id', businessId)
    .eq('status', 'live')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data ? toAgent(data) : null
}

export async function createAgent(
  supabase: DbClient,
  businessId: string,
  input: Partial<AiAgent> & { name: string }
) {
  const { data, error } = await supabase
    .from('ai_agents')
    .insert({
      business_id: businessId,
      name: input.name,
      title: input.title ?? null,
      specialty: input.specialty ?? null,
      voice: input.voice ?? 'alloy',
      personality: input.personality ?? 'friendly',
      sensitivity: input.sensitivity ?? 0.5,
      greeting_message: input.greetingMessage ?? DEFAULT_WELCOME_MESSAGE,
      system_prompt: input.systemPrompt ?? '',
      status: input.status ?? 'draft',
      language: input.language ?? 'en',
      calls_handled: input.callsHandled ?? 0,
    })
    .select('*')
    .single()
  if (error) throw error
  return toAgent(data)
}

export async function updateAgent(supabase: DbClient, businessId: string, agentId: string, patch: Partial<AiAgent>) {
  const { data, error } = await supabase
    .from('ai_agents')
    .update({
      name: patch.name,
      title: patch.title,
      specialty: patch.specialty,
      voice: patch.voice,
      personality: patch.personality,
      sensitivity: patch.sensitivity,
      greeting_message: patch.greetingMessage,
      system_prompt: patch.systemPrompt,
      status: patch.status,
      language: patch.language,
      calls_handled: patch.callsHandled,
    })
    .eq('business_id', businessId)
    .eq('id', agentId)
    .select('*')
    .single()
  if (error) throw error
  return toAgent(data)
}

export async function setAgentStatus(supabase: DbClient, businessId: string, agentId: string, status: AiAgent['status']) {
  return updateAgent(supabase, businessId, agentId, { status })
}

export async function incrementAgentCallsHandled(supabase: DbClient, businessId: string, agentId: string, by = 1) {
  const { data: current, error: currentError } = await supabase
    .from('ai_agents')
    .select('calls_handled')
    .eq('business_id', businessId)
    .eq('id', agentId)
    .maybeSingle()
  if (currentError) throw currentError

  const next = Number((current as any)?.calls_handled ?? 0) + by
  return updateAgent(supabase, businessId, agentId, { callsHandled: next })
}

export async function deleteAgent(supabase: DbClient, businessId: string, agentId: string) {
  const { error } = await supabase.from('ai_agents').delete().eq('business_id', businessId).eq('id', agentId)
  if (error) throw error
}

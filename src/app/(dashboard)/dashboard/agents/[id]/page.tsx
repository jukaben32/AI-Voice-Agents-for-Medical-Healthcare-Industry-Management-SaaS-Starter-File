import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { getAgentById } from '@/services/agents'
import { AgentDetailManager } from '@/components/clinic/AgentDetailManager'

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const agent = await getAgentById(supabase, business.id, params.id)
  if (!agent) notFound()

  return <AgentDetailManager agent={agent} businessId={business.id} />
}

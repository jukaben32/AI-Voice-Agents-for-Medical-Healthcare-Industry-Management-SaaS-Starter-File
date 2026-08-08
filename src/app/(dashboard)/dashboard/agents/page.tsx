import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { listAgentsForBusiness } from '@/services/agents'
import { AgentsManager } from '@/components/clinic/AgentsManager'

export default async function AgentsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const agents = await listAgentsForBusiness(supabase, business.id)

  return <AgentsManager initialAgents={agents} businessId={business.id} />
}

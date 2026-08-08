import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { listConversationsForBusiness } from '@/services/conversations'
import { listPatientsForBusiness } from '@/services/patients'
import { listAgentsForBusiness } from '@/services/agents'
import { ConversationsManager } from '@/components/clinic/ConversationsManager'

export default async function ConversationsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const [conversations, patients, agents] = await Promise.all([
    listConversationsForBusiness(supabase, business.id, 50),
    listPatientsForBusiness(supabase, business.id),
    listAgentsForBusiness(supabase, business.id),
  ])

  const patientNames = Object.fromEntries(patients.map((p) => [p.id, p.name]))
  const agentNames = Object.fromEntries(agents.map((a) => [a.id, a.name]))

  return (
    <ConversationsManager
      initialConversations={conversations}
      patientNames={patientNames}
      agentNames={agentNames}
      businessId={business.id}
    />
  )
}

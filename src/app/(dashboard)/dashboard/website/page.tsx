import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { getWebsiteByBusinessId } from '@/services/websites'
import { listClinicServices } from '@/services/services'
import { listAgentsForBusiness } from '@/services/agents'
import { WebsiteEditor } from '@/components/clinic/WebsiteEditor'

export default async function WebsitePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  const [website, services, agents] = await Promise.all([
    getWebsiteByBusinessId(supabase, business.id),
    listClinicServices(supabase, business.id),
    listAgentsForBusiness(supabase, business.id),
  ])

  // Every business gets a websites row seeded at signup (see
  // services/business.ts's createBusiness), so this should never happen in
  // practice — but a page that assumes non-null would 500 instead of
  // degrading if it somehow did.
  if (!website) {
    return <p className="p-6 text-sm text-[var(--text-muted)]">No website found for this clinic yet — contact support.</p>
  }

  return <WebsiteEditor initialWebsite={website} services={services} agents={agents} businessSlug={business.slug} />
}

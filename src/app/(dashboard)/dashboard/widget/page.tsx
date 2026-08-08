import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { getWidgetForBusiness, createWidget } from '@/services/widgets'
import { WidgetManager } from '@/components/clinic/WidgetManager'

export default async function WidgetPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  if (!business) redirect('/signup')

  let widget = await getWidgetForBusiness(supabase, business.id)
  if (!widget) {
    widget = await createWidget(supabase, business.id, { slug: business.slug })
  }

  const siteOrigin = process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'

  return <WidgetManager widget={widget} businessSlug={business.slug} siteOrigin={siteOrigin} />
}

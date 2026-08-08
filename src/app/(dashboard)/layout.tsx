import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser } from '@/services/business'
import { DashboardChrome } from '@/components/clinic/DashboardChrome'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const business = await getBusinessForUser(supabase, user.id)
  // No onboarding wizard exists yet — signup creates the clinic (with its
  // default agent/services/widget/website) synchronously right after
  // sign-up, so a logged-in user with no business here means the signup
  // flow was interrupted (e.g. closed the tab while email confirmation was
  // pending). Safer to bounce them back to sign up again than to 500 on a
  // page that assumes `business` is never null.
  if (!business) redirect('/signup')

  return (
    <DashboardChrome businessName={business.name} ownerEmail={user.email ?? ''}>
      {children}
    </DashboardChrome>
  )
}

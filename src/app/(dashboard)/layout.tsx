import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBusinessForUser, createBusiness } from '@/services/business'
import { DashboardChrome } from '@/components/clinic/DashboardChrome'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  let business = await getBusinessForUser(supabase, user.id)
  // Signup can't create the clinic itself when Supabase requires email
  // confirmation (no session exists yet at signup time — RLS needs
  // auth.uid()) — it stashes clinic_name/full_name in the auth user's
  // metadata instead and defers creation to here, the first authenticated
  // request after the user actually confirms and logs in. This used to just
  // bounce back to /signup, which re-showed the signup form and looped:
  // signUp() on an already-registered email returns the "already exists"
  // error instead of creating anything, so the user could never get in.
  if (!business) {
    const clinicName = (user.user_metadata?.clinic_name as string | undefined)?.trim()
    if (!clinicName) redirect('/signup')
    business = await createBusiness(supabase, {
      ownerId: user.id,
      name: clinicName,
      contactEmail: user.email ?? null,
    })
  }

  return (
    <DashboardChrome businessName={business.name} ownerEmail={user.email ?? ''}>
      {children}
    </DashboardChrome>
  )
}

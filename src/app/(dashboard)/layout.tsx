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
    try {
      business = await createBusiness(supabase, {
        ownerId: user.id,
        name: clinicName,
        contactEmail: user.email ?? null,
      })
    } catch (err) {
      // This used to throw unhandled here, which crashes the whole layout
      // with Next.js's generic "server-side exception" digest page and no
      // way to recover — every login attempt for an account without a
      // business hit this same wall. Surface something the user can act on
      // instead.
      console.error('Failed to auto-create business on first login:', err)
      return (
        <div className="grid min-h-screen place-items-center bg-[var(--page-bg)] px-4 text-center">
          <div className="max-w-md space-y-3">
            <h1 className="font-display text-2xl font-bold text-[var(--text-strong)]">We couldn&apos;t set up your clinic</h1>
            <p className="text-sm text-[var(--text-muted)]">
              Something went wrong creating your clinic account. Please try signing in again, or contact support if this keeps happening.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {err instanceof Error ? err.message : 'Unknown error'}
            </p>
            <a href="/login" className="btn-primary inline-flex">
              Back to sign in
            </a>
          </div>
        </div>
      )
    }
  }

  return (
    <DashboardChrome businessName={business.name} ownerEmail={user.email ?? ''}>
      {children}
    </DashboardChrome>
  )
}

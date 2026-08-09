import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') || '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', url.origin))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin))
  }

  // Create the response FIRST so cookies from supabase.auth.exchangeCodeForSession
  // are attached to it, then set the redirect. This ensures session cookies
  // survive the redirect (otherwise auth gets lost on the next request).
  const response = NextResponse.redirect(new URL(next, url.origin))
  return response
}

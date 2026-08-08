'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessageCircle,
  PanelLeftClose,
  Search,
  Settings2,
  Sparkles,
  Stethoscope,
  Users,
  Wallet,
  Bot,
  LineChart,
  Globe2,
  User,
} from 'lucide-react'

import { BrandMark } from '@/components/clinic/shared'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

type NavGroup = {
  label: string
  items: readonly NavItem[]
}

// Grouped to mirror the "Industry" dashboard reference (Principal /
// Herramientas / Cuenta / Plataforma). Only routes that already exist with
// real pages are linked here — Calendar, Knowledge base, WhatsApp, Profile,
// and Platform admin from the reference have no page/table yet, so they're
// deliberately left out rather than added as dead links or empty mockups.
const navGroups: readonly NavGroup[] = [
  {
    label: 'Principal',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/appointments', label: 'Appointments', icon: CalendarDays },
      { href: '/dashboard/patients', label: 'Patients', icon: Users },
      { href: '/dashboard/services', label: 'Services', icon: Stethoscope },
    ],
  },
  {
    label: 'Herramientas',
    items: [
      { href: '/dashboard/agents', label: 'AI Agents', icon: Bot },
      { href: '/dashboard/widget', label: 'Widget', icon: Sparkles },
      { href: '/dashboard/website', label: 'Website', icon: Globe2 },
      { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
      { href: '/dashboard/conversations', label: 'Conversations', icon: MessageCircle },
      { href: '/dashboard/faqs', label: 'Knowledge', icon: FileText },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { href: '/dashboard/billing', label: 'Billing', icon: Wallet },
      { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
      { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings2 },
      { href: '/dashboard/profile', label: 'My Profile', icon: User },
    ],
  },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DashboardChrome({
  businessName,
  ownerEmail,
  children,
}: {
  businessName: string
  ownerEmail: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const activeItem = navGroups.flatMap((group) => group.items).find((item) => isActive(pathname, item.href)) ?? navGroups[0].items[0]

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--text-strong)]">
      <div className="mx-auto flex min-h-screen max-w-[1720px]">
        <aside className="hidden lg:flex lg:w-[250px] lg:flex-col">
          <div className="sticky top-0 flex min-h-screen flex-col text-white" style={{ background: 'var(--surface-dark)' }}>
            <div className="border-b border-white/14 p-5">
              <BrandMark />
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-3.5">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <div className="px-2 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{group.label}</div>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(pathname, item.href)

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-none px-3 py-3 text-sm font-semibold transition',
                            active ? 'text-white' : 'text-white/68 hover:bg-white/6 hover:text-white',
                          )}
                          style={active ? { background: 'var(--brand)' } : undefined}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 border-t border-white/14 p-3.5">
              <div className="plate-corners relative border p-3.5" style={{ borderColor: 'rgba(89,128,166,0.4)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse-slow" style={{ background: 'var(--brand-soft)' }} />
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--brand-soft)' }}>AI activa</span>
                </div>
                <p className="mt-2 text-xs leading-6 text-white/72">
                  24/7 smart booking assistant active across widget, portal, and phone workflows.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-none px-2 py-2 text-left text-[13px] font-semibold text-white/70 transition hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-5 border-b border-[var(--border-soft)] bg-[var(--page-bg)]/92 px-6 py-4 backdrop-blur">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-[var(--border-soft)] bg-[var(--panel)] text-[var(--text-strong)] lg:hidden"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
            <div className="mr-auto">
              <div className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Clinic workspace
              </div>
              <h1 className="mt-0.5 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">{activeItem.label}</h1>
            </div>

            <div className="hidden min-w-[260px] flex-1 items-center gap-2 border border-[var(--border-soft)] bg-[var(--panel-soft)] px-3.5 py-2.5 lg:flex lg:max-w-sm">
              <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
              <span className="truncate text-sm text-[var(--text-muted)]">Search patients, appointments, or services...</span>
            </div>
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center border border-[var(--border-soft)] bg-[var(--panel)] text-[var(--text-strong)]"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
            </button>
            <div className="hidden items-center gap-2.5 border border-[var(--border-soft)] py-1.5 pl-1.5 pr-3 sm:flex">
              <div className="grid h-8 w-8 place-items-center text-sm font-bold text-white" style={{ background: 'var(--brand)' }}>
                {businessName.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="leading-tight">
                <div className="max-w-[160px] truncate text-xs font-bold text-[var(--text-strong)]">{businessName}</div>
                <div className="max-w-[160px] truncate text-[11px] text-[var(--text-muted)]">{ownerEmail}</div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-6 py-7 pb-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

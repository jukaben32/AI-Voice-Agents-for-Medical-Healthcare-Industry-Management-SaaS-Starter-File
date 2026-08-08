"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  NotebookText,
} from 'lucide-react'

import { BrandMark, StatusBadge } from '@/components/clinic/shared'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

type NavGroup = {
  label: string
  items: readonly NavItem[]
}

const navGroups: readonly NavGroup[] = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/appointments', label: 'Appointments', icon: CalendarDays },
      { href: '/dashboard/patients', label: 'Patients', icon: Users },
      { href: '/dashboard/services', label: 'Services', icon: Stethoscope },
      { href: '/dashboard/agents', label: 'AI Settings', icon: Bot },
    ],
  },
  {
    label: 'Insights',
    items: [
      { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
      { href: '/dashboard/conversations', label: 'Conversations', icon: MessageCircle },
      { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
      { href: '/dashboard/faqs', label: 'FAQs', icon: FileText },
    ],
  },
  {
    label: 'Config',
    items: [
      { href: '/dashboard/widget', label: 'Widget', icon: Sparkles },
      { href: '/dashboard/website', label: 'Website', icon: Globe2 },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings2 },
      { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
      { href: '/dashboard/billing', label: 'Billing', icon: Wallet },
    ],
  },
] 

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const activeItem = navGroups
    .flatMap((group) => group.items)
    .find((item) => isActive(pathname, item.href)) ?? navGroups[0].items[0]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_26%),linear-gradient(180deg,rgba(243,249,249,1),rgba(245,250,250,1))] text-[var(--text-strong)]">
      <div className="mx-auto flex min-h-screen max-w-[1720px] gap-4 px-4 py-4 lg:px-6">
        <aside className="hidden lg:flex lg:w-72 lg:flex-col">
          <div className="sticky top-4 flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[34px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
            <div className="border-b border-white/10 p-6">
              <BrandMark />
            </div>

            <div className="flex-1 space-y-6 p-4">
              {navGroups.map((group) => (
                <div key={group.label} className="space-y-2">
                  <div className="px-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">
                    {group.label}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(pathname, item.href)

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition',
                            active
                              ? 'bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]'
                              : 'text-white/68 hover:bg-white/6 hover:text-white',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 p-4">
              <div className="rounded-[24px] border border-teal-400/20 bg-teal-400/10 p-4">
                <StatusBadge tone="emerald" className="border-emerald-300/20 bg-emerald-400/10 text-emerald-100">
                  AI powered
                </StatusBadge>
                <p className="mt-3 text-sm leading-7 text-white/74">
                  24/7 smart booking assistant active across widget, portal, and phone workflows.
                </p>
              </div>
              <Link
                href="/login"
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/6 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="rounded-[32px] border border-white/70 bg-white/88 px-5 py-4 shadow-[0_16px_48px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white text-[var(--text-strong)] lg:hidden"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                    {activeItem.href === '/dashboard' ? 'Live dashboard' : 'Clinic workspace'}
                  </div>
                  <h1 className="mt-1 text-2xl font-black tracking-tight text-[var(--text-strong)]">
                    {activeItem.label}
                  </h1>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-3 lg:max-w-2xl lg:justify-end">
                <div className="hidden flex-1 items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3 lg:flex">
                  <Search className="h-4 w-4 text-[var(--text-muted)]" />
                  <span className="text-sm text-[var(--text-muted)]">Search patients, appointments, or services...</span>
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white text-[var(--text-strong)]"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <div className="hidden items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white px-3 py-2 sm:flex">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white">
                    D
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-[var(--text-strong)]">@theblockchaincoders</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Clinic owner</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 pb-4">
            <div className="rounded-[34px] border border-white/70 bg-[rgba(247,252,252,0.82)] p-4 shadow-[0_18px_60px_rgba(15,23,42,0.04)] backdrop-blur">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

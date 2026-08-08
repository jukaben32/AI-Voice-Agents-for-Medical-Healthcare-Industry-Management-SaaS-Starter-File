import Link from 'next/link'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Sparkles,
} from 'lucide-react'

import { cn, formatCurrency } from '@/lib/utils'

type Tone = 'teal' | 'emerald' | 'blue' | 'amber' | 'rose' | 'slate'

type ToneClasses = {
  badge: string
  dot: string
  glow: string
}

const toneMap: Record<Tone, ToneClasses> = {
  teal: {
    badge: 'border-teal-200 bg-teal-50 text-teal-700',
    dot: 'bg-teal-500',
    glow: 'shadow-[0_0_0_1px_rgba(13,148,136,0.12),0_18px_45px_rgba(13,148,136,0.12)]',
  },
  emerald: {
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    glow: 'shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_18px_45px_rgba(16,185,129,0.10)]',
  },
  blue: {
    badge: 'border-sky-200 bg-sky-50 text-sky-700',
    dot: 'bg-sky-500',
    glow: 'shadow-[0_0_0_1px_rgba(14,165,233,0.12),0_18px_45px_rgba(14,165,233,0.10)]',
  },
  amber: {
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    glow: 'shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_18px_45px_rgba(245,158,11,0.10)]',
  },
  rose: {
    badge: 'border-rose-200 bg-rose-50 text-rose-700',
    dot: 'bg-rose-500',
    glow: 'shadow-[0_0_0_1px_rgba(244,63,94,0.12),0_18px_45px_rgba(244,63,94,0.10)]',
  },
  slate: {
    badge: 'border-slate-200 bg-slate-50 text-slate-700',
    dot: 'bg-slate-500',
    glow: 'shadow-[0_0_0_1px_rgba(100,116,139,0.10),0_18px_45px_rgba(100,116,139,0.08)]',
  },
}

export function BrandMark({
  compact = false,
  tone = 'teal',
}: {
  compact?: boolean
  tone?: Tone
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'grid place-items-center rounded-2xl text-white',
          compact ? 'h-9 w-9' : 'h-11 w-11',
          tone === 'rose'
            ? 'bg-gradient-to-br from-rose-500 to-rose-600'
            : tone === 'blue'
              ? 'bg-gradient-to-br from-sky-500 to-cyan-600'
              : 'bg-gradient-to-br from-teal-500 to-cyan-600',
        )}
      >
        <Sparkles className={compact ? 'h-4 w-4' : 'h-5 w-5'} />
      </div>
      {!compact ? (
        <div className="leading-tight">
          <div className="text-sm font-extrabold tracking-tight text-[var(--text-strong)]">
            Clara AI
          </div>
          <div className="text-[11px] font-medium text-[var(--text-muted)]">
            clinical reception stack
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--text-muted)] shadow-[0_10px_24px_rgba(15,118,110,0.06)] backdrop-blur">
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  actions,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  actions?: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center')}>
      {eyebrow ? <div>{eyebrow}</div> : null}
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-strong)] md:text-4xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className={cn('max-w-2xl text-base leading-7 text-[var(--text-muted)]', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
      {actions ? <div className={cn('flex flex-wrap gap-3', align === 'center' && 'justify-center')}>{actions}</div> : null}
    </div>
  )
}

export function SurfaceCard({
  children,
  className,
  glow = false,
}: {
  children: ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[28px] border border-[var(--border-soft)] bg-[var(--panel)] shadow-[0_20px_60px_rgba(15,23,42,0.06)]',
        glow && 'shadow-[0_0_0_1px_rgba(13,148,136,0.14),0_20px_60px_rgba(13,148,136,0.12)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = 'teal',
}: {
  label: string
  value: string
  delta?: string
  icon: LucideIcon
  tone?: Tone
}) {
  const toneClasses = toneMap[tone]
  return (
    <SurfaceCard className={cn('p-5', toneClasses.glow)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            {label}
          </div>
          <div className="mt-3 text-3xl font-black tracking-tight text-[var(--text-strong)]">
            {value}
          </div>
          {delta ? <div className="mt-2 text-sm font-medium text-emerald-600">{delta}</div> : null}
        </div>
        <div className={cn('rounded-2xl border p-3', toneClasses.badge)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </SurfaceCard>
  )
}

export function StatusBadge({
  children,
  tone = 'teal',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none',
        toneMap[tone].badge,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', toneMap[tone].dot)} />
      {children}
    </span>
  )
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon = 'arrow',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: 'arrow' | 'calendar' | 'check' | 'none'
}) {
  const styles =
    variant === 'primary'
      ? 'bg-[var(--brand)] text-white shadow-[0_14px_28px_rgba(13,148,136,0.26)] hover:-translate-y-0.5 hover:bg-[var(--brand-strong)]'
      : variant === 'secondary'
        ? 'border border-[var(--border-soft)] bg-white text-[var(--text-strong)] hover:border-teal-200 hover:bg-teal-50'
        : 'bg-transparent text-[var(--text-strong)] hover:bg-white/70'

  const Icon = icon === 'calendar' ? CalendarDays : icon === 'check' ? CheckCircle2 : ArrowUpRight

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-200',
        styles,
      )}
    >
      {children}
      {icon !== 'none' ? <Icon className="h-4 w-4" /> : null}
    </Link>
  )
}

export function Pill({
  children,
  tone = 'slate',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em]',
        toneMap[tone].badge,
        className,
      )}
    >
      {children}
    </span>
  )
}

export function BrowserFrame({
  title,
  subtitle,
  accent = 'teal',
  children,
}: {
  title: string
  subtitle?: string
  accent?: Tone
  children: ReactNode
}) {
  const accentClasses =
    accent === 'rose'
      ? 'from-rose-500 to-rose-600'
      : accent === 'blue'
        ? 'from-sky-500 to-cyan-600'
        : 'from-teal-500 to-cyan-600'

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-950 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium text-white/80">
          {title}
        </div>
        <div className="w-16" />
      </div>
      <div className="bg-[var(--panel-soft)] p-4">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-[22px] border border-[var(--border-soft)] bg-white px-4 py-3">
          <div>
            <div className="text-sm font-bold text-[var(--text-strong)]">{title}</div>
            {subtitle ? <div className="text-xs text-[var(--text-muted)]">{subtitle}</div> : null}
          </div>
          <div className={cn('h-2.5 w-16 rounded-full bg-gradient-to-r', accentClasses)} />
        </div>
        {children}
      </div>
    </div>
  )
}

export function PhoneFrame({
  title,
  subtitle,
  accent = 'rose',
  children,
}: {
  title: string
  subtitle?: string
  accent?: Tone
  children: ReactNode
}) {
  const accentClasses =
    accent === 'blue'
      ? 'from-sky-500 to-cyan-500'
      : accent === 'amber'
        ? 'from-amber-400 to-orange-500'
        : accent === 'emerald'
          ? 'from-emerald-500 to-teal-500'
          : 'from-rose-500 to-rose-600'

  return (
    <div className="w-full max-w-[340px] rounded-[34px] border border-white/70 bg-[var(--panel)] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
      <div className={cn('overflow-hidden rounded-[28px] bg-white')}>
        <div className={cn('h-11 bg-gradient-to-r px-4 py-3 text-white', accentClasses)}>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] opacity-85">{title}</div>
          {subtitle ? <div className="text-[11px] opacity-90">{subtitle}</div> : null}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export function AvatarStack({
  names,
  label,
}: {
  names: string[]
  label?: string
}) {
  const swatches = ['bg-teal-500', 'bg-sky-500', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500']

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {names.slice(0, 5).map((name, index) => (
          <div
            key={name}
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full border-2 border-white text-[11px] font-bold text-white',
              swatches[index % swatches.length],
            )}
            title={name}
          >
            {name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')}
          </div>
        ))}
      </div>
      {label ? <div className="text-sm font-medium text-[var(--text-muted)]">{label}</div> : null}
    </div>
  )
}

export function ProgressRail({
  value,
  label,
  tone = 'teal',
}: {
  value: number
  label: string
  tone?: Tone
}) {
  const fill =
    tone === 'rose'
      ? 'from-rose-500 to-rose-600'
      : tone === 'blue'
        ? 'from-sky-500 to-cyan-500'
        : tone === 'amber'
          ? 'from-amber-400 to-orange-500'
          : 'from-teal-500 to-cyan-500'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--text-strong)]">{label}</span>
        <span className="font-bold text-[var(--text-muted)]">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={cn('h-full rounded-full bg-gradient-to-r', fill)} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function TimelineList({
  items,
}: {
  items: Array<{
    time: string
    title: string
    description?: string
    tone?: Tone
  }>
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={`${item.time}-${item.title}`} className="flex gap-4">
          <div className="mt-1 w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {item.time}
          </div>
          <div className={cn('relative flex-1 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3', item.tone && toneMap[item.tone].glow)}>
            <div className="flex items-center justify-between gap-4">
              <div className="font-bold text-[var(--text-strong)]">{item.title}</div>
              <Clock3 className="h-4 w-4 text-[var(--text-muted)]" />
            </div>
            {item.description ? <div className="mt-1 text-sm text-[var(--text-muted)]">{item.description}</div> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SimpleTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div
        className="grid gap-3 border-b border-slate-200/80 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((column, index) => (
          <div key={column}>
            {column}
          </div>
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-3 px-5 py-4 text-sm text-[var(--text-strong)]"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {row.map((cell, cellIndex) => (
              <div key={cellIndex}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function FeatureCard({
  icon: Icon,
  title,
  body,
  tone = 'teal',
}: {
  icon: LucideIcon
  title: string
  body: string
  tone?: Tone
}) {
  const classes = toneMap[tone]

  return (
    <SurfaceCard className="p-6">
      <div className={cn('mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border', classes.badge)}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-extrabold tracking-tight text-[var(--text-strong)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{body}</p>
    </SurfaceCard>
  )
}

export function QuoteCard({
  quote,
  author,
  role,
}: {
  quote: string
  author: string
  role: string
}) {
  return (
    <SurfaceCard className="p-6">
      <div className="mb-4 flex text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Sparkles key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm leading-7 text-[var(--text-strong)]">{quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white">
          {author
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')}
        </div>
        <div>
          <div className="text-sm font-bold text-[var(--text-strong)]">{author}</div>
          <div className="text-xs text-[var(--text-muted)]">{role}</div>
        </div>
      </div>
    </SurfaceCard>
  )
}

export function ValueCard({
  label,
  value,
  subtitle,
  icon: Icon,
  tone = 'teal',
}: {
  label: string
  value: string
  subtitle?: string
  icon: LucideIcon
  tone?: Tone
}) {
  const classes = toneMap[tone]

  return (
    <SurfaceCard className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{label}</div>
          <div className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">{value}</div>
          {subtitle ? <div className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</div> : null}
        </div>
        <div className={cn('grid h-12 w-12 place-items-center rounded-2xl border', classes.badge)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </SurfaceCard>
  )
}

export function PriceBlock({
  label,
  amount,
  currency = 'USD',
  helper,
}: {
  label: string
  amount: number
  currency?: string
  helper?: string
}) {
  return (
    <div className="rounded-[24px] border border-[var(--border-soft)] bg-white p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</div>
      <div className="mt-2 text-3xl font-black tracking-tight text-[var(--text-strong)]">
        {formatCurrency(amount, currency)}
      </div>
      {helper ? <div className="mt-2 text-sm text-[var(--text-muted)]">{helper}</div> : null}
    </div>
  )
}

export function ArrowLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] transition hover:text-[var(--brand-strong)]">
      {children}
      <ChevronRight className="h-4 w-4" />
    </Link>
  )
}

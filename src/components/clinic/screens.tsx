import type { ReactNode } from 'react'
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Database,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  ListChecks,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  Mic,
  NotebookText,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Wallet,
  Wrench,
  PanelLeftClose,
  PanelRightClose,
  Bot,
  FileSearch,
  Globe2,
  Plus,
  Send,
  Settings2,
  SlidersHorizontal,
  Bell,
  Search,
  PanelTop,
  FileSpreadsheet,
  ChartNoAxesCombined,
  ChevronRight,
  Upload,
  Pencil,
  Eye,
  MapPinned,
  Hospital,
  MonitorSmartphone,
  Check,
  X,
  ShieldAlert,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  ArrowLink,
  BrandMark,
  BrowserFrame,
  ButtonLink,
  FeatureCard,
  MetricCard,
  PhoneFrame,
  Pill,
  ProgressRail,
  QuoteCard,
  SectionEyebrow,
  SectionHeading,
  SimpleTable,
  SurfaceCard,
  StatusBadge,
  TimelineList,
  ValueCard,
} from './shared'

type ClinicTone = 'teal' | 'emerald' | 'blue' | 'amber' | 'rose' | 'slate'

const dashboardStats = [
  { label: 'Today', value: '2', delta: '+1 vs yesterday', icon: CalendarDays, tone: 'teal' as const },
  { label: 'Upcoming', value: '7', delta: '+3 booked overnight', icon: Clock3, tone: 'blue' as const },
  { label: 'Patients', value: '14', delta: '+2 new patients', icon: Users, tone: 'emerald' as const },
  { label: 'Cancelled', value: '1', delta: 'Needs review', icon: X, tone: 'rose' as const },
  { label: 'Completion', value: '67%', delta: '12 completed this month', icon: CheckCircle2, tone: 'teal' as const },
  { label: 'No-shows', value: '33%', delta: 'Target: below 10%', icon: Activity, tone: 'amber' as const },
] as const

const dashboardSchedule = [
  { patient: 'Dault Hussain', service: 'General Consultation', time: '2:30 PM - 3:00 PM', source: 'AI Widget', status: 'Booked' },
  { patient: 'Md Shair', service: 'Follow Up Visit', time: '3:30 PM - 4:00 PM', source: 'Portal', status: 'Confirmed' },
  { patient: 'Amit', service: 'General Consultation', time: '4:30 PM - 5:00 PM', source: 'Phone', status: 'Completed' },
  { patient: 'Mohi', service: 'Cardiology Review', time: '5:00 PM - 5:30 PM', source: 'AI Widget', status: 'Booked' },
]

const upcomingAppointments = [
  { name: 'Md Tajuddin', note: 'General Consultation', tone: 'teal' as const },
  { name: 'Shakib', note: 'Follow Up Visit', tone: 'blue' as const },
  { name: 'Just Funny', note: 'General Consultation', tone: 'amber' as const },
  { name: 'Dault Hussain', note: 'General Consultation', tone: 'rose' as const },
  { name: 'Amit', note: 'Follow Up Visit', tone: 'emerald' as const },
]

const features = [
  {
    icon: Bot,
    title: 'AI Booking Assistant',
    body: 'Clara answers patients naturally, books visits, collects details, and hands off to staff when needed.',
    tone: 'teal' as const,
  },
  {
    icon: CalendarDays,
    title: 'Smart Calendar',
    body: 'Drag, confirm, reschedule, and protect the clinic hours without leaving the dashboard.',
    tone: 'blue' as const,
  },
  {
    icon: NotebookText,
    title: 'Patient CRM',
    body: 'Keep patient history, notes, booking context, reminders, and portal access in one place.',
    tone: 'emerald' as const,
  },
  {
    icon: Lock,
    title: 'Multi-Tenant Security',
    body: 'Every clinic is isolated with row-level policies, scoped access, and audit friendly records.',
    tone: 'rose' as const,
  },
  {
    icon: LineChart,
    title: 'Operations Analytics',
    body: 'Track utilization, conversions, no-shows, and widget performance at a glance.',
    tone: 'amber' as const,
  },
  {
    icon: Wallet,
    title: 'USDC Billing',
    body: 'Record deposits, track tx hashes, and attach payments directly to appointments.',
    tone: 'teal' as const,
  },
] as const

const workflow = [
  {
    step: '01',
    title: 'Set up the clinic',
    body: 'Create the business profile, define services, staff, and availability in a few minutes.',
    icon: Hospital,
  },
  {
    step: '02',
    title: 'Embed the widget',
    body: 'Drop one script or iframe into the clinic website and let Clara start booking.',
    icon: Globe2,
  },
  {
    step: '03',
    title: 'Review the bookings',
    body: 'Confirm appointments, manage callbacks, send reminders, and capture payments.',
    icon: CheckCircle2,
  },
] as const

const testimonials = [
  {
    quote: 'Our front desk feels like it gained another full-time receptionist overnight. The booking flow looks polished and the reminders are on point.',
    author: 'Dr. Sarah Mitchell',
    role: 'Family Practice',
  },
  {
    quote: 'The widget feels natural for patients and the dashboard gives us exactly the operational clarity we wanted for a modern clinic.',
    author: 'Dr. James Park',
    role: 'Cardiology',
  },
  {
    quote: 'Setup was fast, the calendar is easy to manage, and the portal gives patients the self-service experience we were missing.',
    author: 'Dr. Maria Santos',
    role: 'Dermatology',
  },
] as const

const services = [
  { name: 'General Consultation', duration: '30 min', price: '$90', tone: 'teal' as const },
  { name: 'Follow Up Visit', duration: '15 min', price: '$45', tone: 'blue' as const },
  { name: 'Cardiology Review', duration: '50 min', price: '$140', tone: 'rose' as const },
  { name: 'Men\'s Premium', duration: '50 min', price: '$0', tone: 'emerald' as const },
]

const widgetSteps = [
  {
    title: 'Choose a service',
    detail: 'The assistant lists the clinic services with duration and pricing.',
  },
  {
    title: 'Pick a date and time',
    detail: 'Clara only shows slots that are open in the clinic schedule.',
  },
  {
    title: 'Add your details',
    detail: 'Patients enter their name, phone, and optional email in the conversation.',
  },
  {
    title: 'Confirm booking',
    detail: 'The appointment is saved, confirmed, and the notification pipeline fires.',
  },
]

const settingsDays = [
  { day: 'Sunday', open: '09:00 AM', close: '05:00 PM', breakStart: '12:00 PM', breakEnd: '01:00 PM' },
  { day: 'Monday', open: '09:00 AM', close: '05:00 PM', breakStart: '12:00 PM', breakEnd: '01:00 PM' },
  { day: 'Tuesday', open: '09:00 AM', close: '05:00 PM', breakStart: '12:00 PM', breakEnd: '01:00 PM' },
  { day: 'Wednesday', open: '09:00 AM', close: '05:00 PM', breakStart: '12:00 PM', breakEnd: '01:00 PM' },
  { day: 'Thursday', open: '09:00 AM', close: '05:00 PM', breakStart: '12:00 PM', breakEnd: '01:00 PM' },
  { day: 'Friday', open: '09:00 AM', close: '05:00 PM', breakStart: '12:00 PM', breakEnd: '01:00 PM' },
]

const portalTimeline = [
  { time: 'Today', title: 'General Consultation', description: '4:30 PM with Dr. Harrington', tone: 'teal' as const },
  { time: 'Tomorrow', title: 'Follow Up Visit', description: 'Payment already processed', tone: 'blue' as const },
  { time: 'Wed', title: 'Lab Results Review', description: 'Portal message ready', tone: 'emerald' as const },
]

const staffAgents = [
  {
    name: 'Clara',
    role: 'Front desk voice agent',
    status: 'Live',
    prompt: 'Warm, professional, concise, and always able to schedule appointments.',
    calls: '1,284',
  },
  {
    name: 'Orion',
    role: 'Billing and reminders',
    status: 'Live',
    prompt: 'Tracks deposits, reminders, and payment confirmations.',
    calls: '812',
  },
  {
    name: 'Nova',
    role: 'Intake and triage',
    status: 'Paused',
    prompt: 'Collects symptoms, routes urgent requests, and escalates when needed.',
    calls: '241',
  },
]

const marketingFaqs = [
  {
    q: 'How long does setup take?',
    a: 'Most clinics are live with services, availability, and the AI voice agent configured in under a week.',
  },
  {
    q: 'Does the AI agent replace my front desk?',
    a: 'No — it complements it. Clara handles after-hours calls, demand spikes, and repetitive questions, then hands off to your team when needed.',
  },
  {
    q: 'Can I run more than one clinic from one account?',
    a: 'Yes. Every location gets its own calendar, services, and dashboard, with row-level isolation between clinics.',
  },
  {
    q: 'How is patient data protected?',
    a: 'Encryption in transit and at rest, scoped role-based access, and audit-friendly records aligned with HIPAA-ready practices.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No — Clara AI runs entirely in the browser and embeds into your site with a single script tag.',
  },
]

function heroPreview() {
  return (
    <div className="relative">
      <div className="plate-corners relative border border-[var(--border-soft)] bg-[var(--panel)] shadow-[3px_3px_0_0_var(--border-soft)]">
        <BrowserFrame title="Clinic dashboard" subtitle="Live bookings, schedules, and patient operations">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <SurfaceCard className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Live dashboard</div>
                  <div className="mt-1 text-lg font-bold text-[var(--text-strong)]">Good evening, Dr. Harrington</div>
                </div>
                <StatusBadge tone="teal">Online</StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetricCard label="Today" value="2" delta="Scheduled today" icon={CalendarDays} tone="teal" />
                <MetricCard label="Upcoming" value="7" delta="Booked & confirmed" icon={Clock3} tone="blue" />
              </div>
            </SurfaceCard>
            <SurfaceCard className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-bold text-[var(--text-strong)]">Upcoming appointments</div>
                <ArrowLink href="/dashboard/appointments">See all</ArrowLink>
              </div>
              <div className="mt-4 space-y-3">
                {upcomingAppointments.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                    <div>
                      <div className="text-sm font-bold text-[var(--text-strong)]">{item.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{item.note}</div>
                    </div>
                    <StatusBadge tone={item.tone}>Booked</StatusBadge>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </BrowserFrame>
      </div>
      <div className="absolute -bottom-6 -left-6 hidden w-[210px] border border-[var(--border-soft)] bg-[var(--panel)] p-4 shadow-[3px_3px_0_0_var(--border-soft)] sm:block">
        <div className="font-display text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--brand)' }}>Live</div>
        <div className="mt-1 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">12,400+</div>
        <div className="text-xs text-[var(--text-muted)]">patients managed this month</div>
      </div>
    </div>
  )
}

export function MarketingHomeScreen() {
  return (
    <div className="bg-[var(--page-bg)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[var(--page-bg)]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-8 px-6 py-4 lg:px-8">
          <div className="mr-auto">
            <BrandMark compact />
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--text-strong)] lg:flex">
            <a href="#features" className="transition hover:text-[var(--brand-strong)]">Platform</a>
            <a href="#workflow" className="transition hover:text-[var(--brand-strong)]">How it works</a>
            <a href="#portal" className="transition hover:text-[var(--brand-strong)]">Portal</a>
            <a href="#pricing" className="transition hover:text-[var(--brand-strong)]">Pricing</a>
            <a href="#faq" className="transition hover:text-[var(--brand-strong)]">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <ButtonLink href="/login" variant="secondary" icon="none">
              Sign in
            </ButtonLink>
            <ButtonLink href="/signup" icon="calendar">
              Start free trial
            </ButtonLink>
          </div>
        </div>
      </header>

      <main>
        <section id="producto" className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-xl">
            <SectionEyebrow>AI medical receptionist</SectionEyebrow>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text-strong)] sm:text-6xl">
              Every clinic, an AI agent that never drops the call.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--text-muted)]">
              Clara AI centralizes appointments, patients, billing, and a voice agent in one dashboard —
              so your front desk does less and your patients wait less.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/signup" icon="calendar">
                Start 14-Day Free Trial
              </ButtonLink>
              <ButtonLink href="/widget-demo" variant="secondary" icon="arrow">
                See Live Widget
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[var(--border-soft)] pt-7">
              <div>
                <div className="font-display text-2xl font-bold text-[var(--text-strong)]">120+</div>
                <div className="text-xs text-[var(--text-muted)]">active clinics</div>
              </div>
              <div className="h-8 w-px bg-[var(--border-soft)]" />
              <div>
                <div className="font-display text-2xl font-bold text-[var(--text-strong)]">98.6%</div>
                <div className="text-xs text-[var(--text-muted)]">satisfaction</div>
              </div>
              <div className="h-8 w-px bg-[var(--border-soft)]" />
              <div>
                <div className="font-display text-2xl font-bold text-[var(--text-strong)]">24/7</div>
                <div className="text-xs text-[var(--text-muted)]">voice agent</div>
              </div>
            </div>
          </div>

          {heroPreview()}
        </section>

        <section style={{ background: 'var(--surface-dark)' }}>
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-8 px-6 py-14 lg:grid-cols-4 lg:px-8">
            {[
              { value: '67%', label: 'appointment completion rate' },
              { value: '-33%', label: 'no-shows after AI reminders' },
              { value: '13', label: 'average active patients per clinic' },
              { value: '6 min', label: 'average time to activate a service' },
            ].map((stat, index) => (
              <div key={stat.label} className={cn('px-6', index > 0 && 'border-l border-white/18')}>
                <div className="font-display text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-1.5 text-[13px] text-white/62">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-xl">
            <SectionEyebrow>Platform</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--text-strong)]">
              Everything a modern clinic needs, on one dashboard
            </h2>
            <p className="mt-3 text-[var(--text-muted)]">
              Six connected modules: what the voice agent books shows up instantly in the calendar, patient records, and billing.
            </p>
          </div>
          <div className="mt-10 grid gap-px border border-[var(--border-soft)] bg-[var(--border-soft)] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--page-bg)] p-7">
                <feature.icon className="h-6 w-6" style={{ color: 'var(--brand)' }} />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[var(--text-strong)]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="plate-corners relative aspect-[4/5] border border-[var(--border-soft)] bg-[var(--brand-soft)]">
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <ShieldCheck className="h-9 w-9" style={{ color: 'var(--brand-strong)' }} />
                <div className="font-display text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--brand-strong)' }}>
                  HIPAA-ready workflows
                </div>
              </div>
            </div>
            <div>
              <SectionEyebrow>Why Clara AI</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--text-strong)] sm:text-4xl">
                Built for clinics that can&rsquo;t afford to miss a call
              </h2>
              <div className="mt-7 flex flex-col gap-5">
                {workflow.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'var(--brand)' }} />
                    <div>
                      <div className="text-[15px] font-semibold text-[var(--text-strong)]">{item.step}. {item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-px border border-[var(--border-soft)] bg-[var(--border-soft)]">
                {[
                  { icon: ShieldCheck, label: 'HIPAA-ready encryption' },
                  { icon: Clock3, label: '99.9% uptime' },
                  { icon: Users, label: 'Dedicated support' },
                ].map((item) => (
                  <div key={item.label} className="bg-[var(--page-bg)] p-4 text-center">
                    <item.icon className="mx-auto h-5 w-5" style={{ color: 'var(--brand)' }} />
                    <div className="mt-2 font-display text-[13px] font-semibold text-[var(--text-strong)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="portal" className="border-y border-[var(--border-soft)]" style={{ background: 'var(--panel-soft)' }}>
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-xl">
              <SectionEyebrow>Patient portal &amp; widget</SectionEyebrow>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--text-strong)]">
                Self-service booking, payments, and support
              </h2>
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <SurfaceCard className="p-6">
                <SectionEyebrow>Patient portal</SectionEyebrow>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                  Reschedule, cancel, and pay without calling the front desk
                </h3>
                <div className="mt-6 space-y-4">
                  <TimelineList items={portalTimeline} />
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6 lg:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <SectionEyebrow>Widget preview</SectionEyebrow>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                      A booking experience patients will actually use
                    </h3>
                  </div>
                  <StatusBadge tone="teal">Live</StatusBadge>
                </div>

                <div className="mt-6 flex justify-center">
                  <PhoneFrame title="Clara AI" subtitle="AI Assistant Online">
                    <div className="space-y-3">
                      <div className="border border-[var(--border-soft)] bg-[var(--brand-soft)] px-4 py-3 text-sm text-[var(--brand-strong)]">
                        Welcome back. How can I help you book or manage an appointment today?
                      </div>
                      <div className="space-y-2">
                        {services.map((service) => (
                          <div key={service.name} className="border border-[var(--border-soft)] px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="text-sm font-bold text-[var(--text-strong)]">{service.name}</div>
                                <div className="text-xs text-[var(--text-muted)]">{service.duration}</div>
                              </div>
                              <span className="text-xs font-semibold text-[var(--brand)]">{service.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PhoneFrame>
                </div>
              </SurfaceCard>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow={<SectionEyebrow>Clients</SectionEyebrow>}
            title="What clinics already using it say"
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <QuoteCard key={item.author} quote={item.quote} author={item.author} role={item.role} />
            ))}
          </div>
        </section>

        <section id="pricing" className="border-t border-[var(--border-soft)]" style={{ background: 'var(--panel-soft)' }}>
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            <SectionHeading
              eyebrow={<SectionEyebrow>Pricing</SectionEyebrow>}
              title="Clear plans for clinics at every stage"
              description="The first phase focuses on the widget, clinic dashboard, patient portal, and USDC billing. Stripe can be added later if you want it."
              align="center"
            />
            <div className="mt-10 grid gap-px border border-[var(--border-soft)] bg-[var(--border-soft)] lg:grid-cols-4">
              {[
                { name: 'Free', price: '$0', body: 'Sandbox, demo data, and widget preview.' },
                { name: 'Starter', price: '$49', body: 'Single clinic with calendar, widget, and portal.' },
                { name: 'Professional', price: '$99', body: 'Automation, analytics, billing, and AI tools.', featured: true },
                { name: 'Enterprise', price: '$299', body: 'Multi-clinic, custom integrations, and dedicated support.' },
              ].map((plan) => (
                <div key={plan.name} className="relative bg-[var(--page-bg)] p-6" style={plan.featured ? { boxShadow: 'inset 0 0 0 1px var(--brand)' } : undefined}>
                  {plan.featured ? <Pill tone="teal" className="mb-3">Most popular</Pill> : null}
                  <div className="text-sm font-bold text-[var(--text-strong)]">{plan.name}</div>
                  <div className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--text-strong)]">{plan.price}</div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{plan.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-24 lg:px-8">
          <div className="max-w-xl">
            <SectionEyebrow>Frequently asked</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--text-strong)]">Before you book a demo</h2>
          </div>
          <div className="mt-10 border-t border-[var(--border-soft)]">
            {marketingFaqs.map((item) => (
              <details key={item.q} className="group border-b border-[var(--border-soft)] py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-semibold text-[var(--text-strong)]">
                  {item.q}
                  <Plus className="h-4 w-4 shrink-0 transition group-open:rotate-45" style={{ color: 'var(--brand)' }} />
                </summary>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: 'var(--surface-dark)' }}>
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 text-white lg:grid-cols-2 lg:px-8">
            <div>
              <SectionEyebrow>Launch ready</SectionEyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Ready to transform your practice?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                Bring the widget, portal, dashboard, and AI receptionist online in one system, configured with your real services.
              </p>
              <div className="mt-7 flex flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4" style={{ color: 'var(--brand-soft)' }} />No card required for the trial</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4" style={{ color: 'var(--brand-soft)' }} />Calendar migration included</div>
                <div className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4" style={{ color: 'var(--brand-soft)' }} />Support in English &amp; Spanish, 24/7</div>
              </div>
            </div>
            <div className="plate-corners relative flex flex-col items-start justify-center gap-4 border border-white/24 p-9">
              <ButtonLink href="/signup" icon="calendar">
                Start Free Trial
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary" icon="arrow">
                Open Dashboard
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-soft)]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <BrandMark compact />
            <p className="mt-3.5 max-w-[240px] text-[13px] leading-6 text-[var(--text-muted)]">
              Calendar, patients, billing, and an AI voice agent — one dashboard for your clinic network.
            </p>
          </div>
          <div>
            <div className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">Product</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-sm">
              <a href="#features" className="hover:text-[var(--brand-strong)]">Platform</a>
              <a href="#pricing" className="hover:text-[var(--brand-strong)]">Pricing</a>
              <a href="/widget-demo" className="hover:text-[var(--brand-strong)]">Widget demo</a>
            </div>
          </div>
          <div>
            <div className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">Company</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-sm">
              <a href="#portal" className="hover:text-[var(--brand-strong)]">Patient portal</a>
              <a href="#faq" className="hover:text-[var(--brand-strong)]">FAQ</a>
              <a href="/login" className="hover:text-[var(--brand-strong)]">Sign in</a>
            </div>
          </div>
          <div>
            <div className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">Legal</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-sm">
              <a href="#" className="hover:text-[var(--brand-strong)]">Privacy</a>
              <a href="#" className="hover:text-[var(--brand-strong)]">Terms</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--border-soft)] px-6 py-5 text-xs text-[var(--text-muted)] lg:px-8">
          <div className="mx-auto w-full max-w-7xl">© {new Date().getFullYear()} Clara AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export function DashboardOverviewScreen() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[30px] border border-white/70 bg-white/90 px-6 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Live dashboard</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--text-strong)]">
            Good evening, Dr. Harrington
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Sunday, April 26, 2026, the clinic is running with 2 appointments today and 7 upcoming bookings.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/dashboard/appointments" icon="none">
            View all appointments
          </ButtonLink>
          <ButtonLink href="/dashboard/widget" variant="secondary" icon="none">
            Widget settings
          </ButtonLink>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {dashboardStats.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            delta={item.delta}
            icon={item.icon}
            tone={item.tone}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.34fr_0.86fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Today&apos;s schedule</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Bookings confirmed by Clara</h2>
            </div>
            <StatusBadge tone="teal">2 appointments</StatusBadge>
          </div>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-[var(--border-soft)]">
            <div className="grid grid-cols-12 gap-3 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              <div className="col-span-4">Patient</div>
              <div className="col-span-3">Service</div>
              <div className="col-span-3">Date & time</div>
              <div className="col-span-2">Status</div>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
              {dashboardSchedule.map((item) => (
                <div key={`${item.patient}-${item.time}`} className="grid grid-cols-12 gap-3 px-5 py-4 text-sm">
                  <div className="col-span-4 font-semibold text-[var(--text-strong)]">{item.patient}</div>
                  <div className="col-span-3 text-[var(--text-muted)]">{item.service}</div>
                  <div className="col-span-3 text-[var(--text-muted)]">{item.time}</div>
                  <div className="col-span-2">
                    <StatusBadge tone={item.status === 'Completed' ? 'emerald' : item.status === 'Confirmed' ? 'blue' : 'teal'}>
                      {item.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Upcoming</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Next patients</h2>
            </div>
            <ArrowLink href="/dashboard/appointments">See all</ArrowLink>
          </div>
          <div className="mt-5 space-y-3">
            {upcomingAppointments.map((item) => (
              <div key={item.name} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{item.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{item.note}</div>
                  </div>
                  <StatusBadge tone={item.tone}>Booked</StatusBadge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Assistant activity</div>
            <div className="mt-4 space-y-3">
              <ProgressRail value={82} label="Calls handled" tone="teal" />
              <ProgressRail value={64} label="Widget conversion" tone="blue" />
              <ProgressRail value={29} label="No-show risk" tone="amber" />
            </div>
          </div>
        </SurfaceCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">AI assistant</div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Clara is online and ready</h3>
            </div>
            <StatusBadge tone="emerald">Realtime</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-slate-950 px-5 py-4 text-white">
              <div className="text-sm font-bold">Welcome message</div>
              <p className="mt-2 text-sm leading-7 text-white/74">
                Hello, I&apos;m Clara, your AI medical receptionist. I can help you book, reschedule, cancel, or ask clinic questions.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ValueCard label="Knowledge docs" value="24" icon={FileText} tone="teal" />
              <ValueCard label="FAQs active" value="8" icon={MessageCircle} tone="blue" />
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Operational snapshot</div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">What changed since yesterday</h3>
            </div>
            <ButtonLink href="/dashboard/analytics" variant="secondary" icon="arrow">
              Open analytics
            </ButtonLink>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <ValueCard label="New patients" value="5" icon={Users} tone="emerald" />
            <ValueCard label="Reminder emails" value="18" icon={Mail} tone="blue" />
            <ValueCard label="Payments captured" value="$540" icon={CircleDollarSign} tone="rose" />
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

// DashboardAppointmentsScreen was removed from here — same story: hardcoded
// rows (Md Tajuddin, Shakib, Amit, Dault Hussain), status filter pills with
// no onClick, action buttons that were links back to this same page. A real
// version now lives in src/components/clinic/AppointmentsManager.tsx, wired
// to services/appointments.ts (listAppointmentsForBusiness) and the already-
// working POST /api/appointments/status route (which also sends the patient
// email + creates the in-app notification — reusing it instead of calling
// updateAppointmentStatus directly keeps that behavior).

export function DashboardWidgetScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Widget</SectionEyebrow>}
        title="Match the booking widget to the clinic brand"
        description="Configure colors, tone, slot duration, welcome copy, and the booking CTA. The embed code updates instantly."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.86fr]">
        <SurfaceCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Appearance</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Widget color and tone</h2>
            </div>
            <StatusBadge tone="rose">Live widget</StatusBadge>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-white p-5">
              <div className="text-sm font-bold text-[var(--text-strong)]">Primary color</div>
              <div className="mt-4 flex items-center gap-3">
                {['#0f766e', '#0ea5e9', '#ef4444', '#f59e0b', '#8b5cf6'].map((color) => (
                  <span key={color} className="h-8 w-8 rounded-full border border-white shadow" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <ValueCard label="Slot duration" value="15 min" icon={Clock3} tone="teal" />
                <ValueCard label="Tone" value="Professional" icon={Sparkles} tone="blue" />
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-slate-950 p-5 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Embed code</div>
              <pre className="mt-4 overflow-auto rounded-[22px] bg-slate-900/80 p-4 text-[11px] leading-6 text-teal-200">
{`<script>
  (function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/widget/clinic-demo';
    iframe.style.cssText = 'position:fixed;bottom:0;right:0;width:420px;height:680px;border:none;z-index:9999;background:transparent;';
    iframe.allow = 'clipboard-write';
    document.body.appendChild(iframe);
  })();
</script>`}
              </pre>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/widget-demo" icon="arrow">
                  Open demo
                </ButtonLink>
                <ButtonLink href="/dashboard/widget" variant="secondary" icon="none">
                  Copy snippet
                </ButtonLink>
              </div>
            </div>
          </div>
        </SurfaceCard>

        <PhoneFrame title="Clara AI" subtitle="AI Assistant Online" accent="rose">
          <div className="space-y-3">
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Welcome to the clinic assistant. How can I help you today?
            </div>
            {widgetSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-[var(--border-soft)] px-4 py-3">
                <div className="text-sm font-bold text-[var(--text-strong)]">{step.title}</div>
                <div className="text-xs leading-6 text-[var(--text-muted)]">{step.detail}</div>
              </div>
            ))}
          </div>
        </PhoneFrame>
      </div>
    </div>
  )
}

// DashboardWebsiteScreen was removed from here — it was a static preview
// mockup with fake copy ("Heart Care You Can Trust") and no connection to
// the real websites table. A real, functional editor now lives in
// src/components/clinic/WebsiteEditor.tsx, wired to the already-working
// /api/website/save, /publish, and /upload-image routes.

// DashboardServicesScreen was removed from here — same story as the other
// screens already replaced: `services` was a hardcoded local array (see the
// `const services = [...]` above), the "Quick create panel" fields were
// plain <div>s (not <input>s), and "Create service" was a link to this same
// page, not a submit handler. A real version now lives in
// src/components/clinic/ServicesManager.tsx, wired directly to
// services/services.ts's createClinicService/deleteClinicService/
// setClinicServiceActive via the browser Supabase client (RLS-protected,
// no dedicated API route needed for this one).

// DashboardPatientsScreen was removed from here — same story: hardcoded
// visitor list (Md Tajuddin, Shakib, Amit, "Just Funny"), "Add patient"
// linked back to this same page, patient profile stats (13 appointments,
// "Dault Hussain") baked in as literal strings. A real version now lives in
// src/components/clinic/PatientsManager.tsx, backed by services/patients.ts
// (listPatientsForBusiness/createPatient) and the appointments already
// loaded for this business to compute each patient's real visit stats.

export function DashboardSettingsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Settings</SectionEyebrow>}
        title="Set clinic hours and blocked dates"
        description="The assistant checks these rules before showing slots so the widget always reflects the real availability."
      />

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Weekly schedule</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Open hours and breaks</h2>
            </div>
            <StatusBadge tone="teal">Saved</StatusBadge>
          </div>
          <div className="mt-6 space-y-3">
            {settingsDays.map((day) => (
              <div key={day.day} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-500 text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-strong)]">{day.day}</div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Open {day.open} - {day.close} with lunch break {day.breakStart} - {day.breakEnd}
                      </div>
                    </div>
                  </div>
                  <ButtonLink href="/dashboard/settings" variant="secondary" icon="none">
                    Save
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Blocked dates</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Holiday and closure management</h2>
            </div>
            <StatusBadge tone="rose">0 blocked</StatusBadge>
          </div>
          <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr_auto]">
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">dd/mm/yyyy</div>
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">Reason (optional)</div>
              <ButtonLink href="/dashboard/settings" icon="none">
                Block date
              </ButtonLink>
            </div>
            <div className="mt-6 rounded-[20px] border border-dashed border-[var(--border-soft)] bg-white px-4 py-10 text-center text-sm text-[var(--text-muted)]">
              No dates blocked. Add a holiday or clinic closure above.
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardSupportScreen() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <SurfaceCard className="p-6">
        <SectionHeading
          eyebrow={<SectionEyebrow>Support</SectionEyebrow>}
          title="Tickets and patient requests"
          description="Collect issues from the portal, widget, or front desk and keep the support thread tied to the appointment."
        />
        <div className="mt-6 space-y-3">
          {[
            ['Open', 'Appointment reschedule', 'Patient asks to move tomorrow 9 AM visit'],
            ['Pending', 'Billing receipt', 'USDC payment confirmation requested'],
            ['Resolved', 'Portal access', 'OTP email delivered successfully'],
          ].map(([status, subject, body]) => (
            <div key={subject} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[var(--text-strong)]">{subject}</div>
                  <div className="text-xs text-[var(--text-muted)]">{body}</div>
                </div>
                <StatusBadge tone={status === 'Open' ? 'rose' : status === 'Pending' ? 'amber' : 'emerald'}>{status}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Thread</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Appointment reschedule</h2>
          </div>
          <StatusBadge tone="blue">Live chat</StatusBadge>
        </div>
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">We need to move the appointment to next week.</div>
          <div className="ml-auto max-w-[85%] rounded-2xl bg-teal-500 px-4 py-3 text-sm text-white">Absolutely. I can help you reschedule and send the updated confirmation.</div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Please share your preferred time and I will check availability.</div>
        </div>
        <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-4 text-sm text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4 text-[var(--brand)]" />
            Compose a reply or escalate to a staff member.
          </div>
        </div>
      </SurfaceCard>
    </div>
  )
}

export function DashboardNotificationsScreen() {
  const notifications: Array<{
    title: string
    message: string
    tone: ClinicTone
  }> = [
    {
      title: 'Appointment confirmed',
      message: 'Md Tajuddin booked General Consultation for Apr 30, 4:30 PM.',
      tone: 'teal',
    },
    {
      title: 'Payment received',
      message: 'USDC deposit captured and linked to the appointment.',
      tone: 'emerald',
    },
    {
      title: 'Widget updated',
      message: 'Primary color changed from teal to coral for the clinic widget.',
      tone: 'blue',
    },
    {
      title: 'Ticket escalated',
      message: 'One billing question requires staff review.',
      tone: 'rose',
    },
  ]

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow={<SectionEyebrow>Notifications</SectionEyebrow>}
        title="Everything the team should know, in one feed"
        description="Booking updates, payment confirmations, support alerts, and system notices arrive in one place."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <SurfaceCard className="p-6">
          <div className="space-y-3">
            {notifications.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{item.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{item.message}</div>
                  </div>
                  <StatusBadge tone={item.tone}>{item.tone}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Delivery</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Read and action statuses</h2>
            </div>
            <StatusBadge tone="teal">24 unread</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <ProgressRail value={86} label="Email delivery" tone="teal" />
            <ProgressRail value={72} label="Widget pings" tone="blue" />
            <ProgressRail value={41} label="Escalations" tone="amber" />
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardAgentsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>AI settings</SectionEyebrow>}
        title="Agents, prompts, and voice tools"
        description="Use one or more agents for booking, follow-up, billing, and triage. Clara can stay on-brand for the whole clinic."
      />
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="grid gap-4 md:grid-cols-3">
          {staffAgents.map((agent) => (
            <SurfaceCard key={agent.name} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <StatusBadge tone={agent.status === 'Live' ? 'emerald' : 'amber'}>{agent.status}</StatusBadge>
                <Bot className="h-5 w-5 text-[var(--brand)]" />
              </div>
              <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--text-strong)]">{agent.name}</h3>
              <div className="mt-1 text-sm text-[var(--text-muted)]">{agent.role}</div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{agent.prompt}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Calls handled</span>
                <strong className="text-[var(--text-strong)]">{agent.calls}</strong>
              </div>
            </SurfaceCard>
          ))}
        </div>
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Realtime tools</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">What Clara can do mid-call</h2>
            </div>
            <StatusBadge tone="teal">Tool ready</StatusBadge>
          </div>
          <div className="mt-6 space-y-3">
            {[
              'List clinic services and durations',
              'Check live availability in clinic timezone',
              'Create or update patient records',
              'Book, reschedule, or cancel appointments',
              'Trigger confirmation and reminder emails',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-strong)]">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardAnalyticsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Analytics</SectionEyebrow>}
        title="Booking trends and operational health"
        description="Use the analytics view to monitor conversions, no-shows, patient growth, and appointment completion."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Conversion rate" value="67%" delta="Widget to booking" icon={ChartNoAxesCombined} tone="teal" />
        <MetricCard label="No-show rate" value="33%" delta="Trending down" icon={ShieldAlert} tone="rose" />
        <MetricCard label="Completion" value="50%" delta="More follow-ups needed" icon={ListChecks} tone="emerald" />
        <MetricCard label="Revenue tracked" value="$8.2k" delta="USDC + deposits" icon={CircleDollarSign} tone="blue" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Trend</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Weekly booking volume</h2>
            </div>
            <StatusBadge tone="blue">Last 7 days</StatusBadge>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-3">
            {[42, 56, 51, 68, 76, 49, 62].map((value, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="flex h-48 w-full items-end rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-3">
                  <div className="w-full rounded-[18px] bg-gradient-to-t from-teal-600 to-cyan-400" style={{ height: `${value}%` }} />
                </div>
                <div className="text-[11px] font-semibold text-[var(--text-muted)]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Insights</div>
          <div className="mt-4 space-y-4">
            <ProgressRail value={87} label="Appointment volume" tone="teal" />
            <ProgressRail value={72} label="Patient satisfaction" tone="emerald" />
            <ProgressRail value={38} label="Manual follow-up load" tone="amber" />
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardConversationsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Conversations</SectionEyebrow>}
        title="Call transcripts and chatbot history"
        description="Review what Clara said, how the call ended, and whether the conversation produced a booking."
      />
      <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <SurfaceCard className="p-6">
          <div className="space-y-3">
            {[
              ['Booked appointment', 'widget_voice', 'positive'],
              ['Qualified lead', 'widget_chat', 'neutral'],
              ['Escalated', 'phone', 'negative'],
            ].map(([outcome, channel, sentiment]) => (
              <div key={outcome} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{outcome}</div>
                    <div className="text-xs text-[var(--text-muted)]">{channel}</div>
                  </div>
                  <StatusBadge tone={sentiment === 'positive' ? 'emerald' : sentiment === 'neutral' ? 'blue' : 'rose'}>
                    {sentiment}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Transcript</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">“I want to book an appointment”</h2>
            </div>
            <StatusBadge tone="teal">5m 12s</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Patient: I want to book an appointment.</div>
            <div className="ml-auto max-w-[85%] rounded-2xl bg-teal-500 px-4 py-3 text-sm text-white">
              Clara: Of course, I can help. Which service are you interested in?
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Patient: General consultation.</div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardBillingScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Billing</SectionEyebrow>}
        title="USDC billing, deposits, and subscription plans"
        description="Track tx hashes, payment types, and appointment-linked transactions directly from the clinic dashboard."
      />

      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Plans</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Current plan and pricing</h2>
            </div>
            <StatusBadge tone="emerald">Active</StatusBadge>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { name: 'Starter', price: 49, body: '50 appointments/month, widget, and basic calendar.', tone: 'teal' as const },
              { name: 'Professional', price: 99, body: 'Unlimited appointments, analytics, and custom AI.', tone: 'blue' as const },
              { name: 'Enterprise', price: 299, body: 'Multi-clinic, custom integrations, dedicated support.', tone: 'rose' as const },
              { name: 'Free', price: 0, body: 'Demo access and sandbox widgets for testing.', tone: 'emerald' as const },
            ].map((plan) => (
              <SurfaceCard key={plan.name} className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{plan.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{plan.body}</div>
                  </div>
                  <div className="text-2xl font-black tracking-tight text-[var(--text-strong)]">
                    {plan.price === 0 ? '$0' : `$${plan.price}`}
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Transactions</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Recent billing activity</h2>
            </div>
            <StatusBadge tone="teal">Polygon</StatusBadge>
          </div>
          <div className="mt-6 space-y-3">
            {[
              ['Booking deposit', '$49', '0x12f...9ac', 'Confirmed'],
              ['Full payment', '$90', '0x8aa...4f2', 'Confirmed'],
              ['Portal top up', '$25', '0xbc4...a81', 'Pending'],
            ].map(([type, amount, hash, status]) => (
              <div key={`${type}-${hash}`} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{type}</div>
                    <div className="text-xs text-[var(--text-muted)]">{hash}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[var(--text-strong)]">{amount}</div>
                    <StatusBadge tone={status === 'Confirmed' ? 'emerald' : 'amber'}>{status}</StatusBadge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardAgentDetailScreen({ id }: { id: string }) {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Agent detail</SectionEyebrow>}
        title={`Agent ${id}`}
        description="A deeper view for the selected agent profile, prompt, and operational status."
      />
      <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Profile</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Clara</h2>
            </div>
            <StatusBadge tone="emerald">Live</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <ValueCard label="Calls handled" value="1,284" icon={Phone} tone="teal" />
            <ValueCard label="Bookings" value="418" icon={CalendarDays} tone="blue" />
            <ValueCard label="Escalations" value="12" icon={LifeBuoy} tone="rose" />
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Prompt</div>
          <pre className="mt-4 overflow-auto rounded-[24px] bg-slate-950 p-5 text-sm leading-7 text-teal-100">
{`You are Clara, the clinic's AI medical receptionist.
Keep responses short, kind, and confident.
Collect name, phone, service, date, and time.
Offer reschedule or cancellation when appropriate.
Escalate urgent cases to human staff immediately.`}
          </pre>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function PortalHomeScreen() {
  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionEyebrow>Patient portal</SectionEyebrow>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--text-strong)]">Welcome back, Dault Hussain</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Manage appointments, receipts, support tickets, and reminders.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/portal/appointments" icon="calendar">
              View appointments
            </ButtonLink>
            <ButtonLink href="/portal/support" variant="secondary" icon="none">
              Open support
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ValueCard label="Upcoming" value="1" icon={CalendarDays} tone="teal" />
        <ValueCard label="Paid" value="$90" icon={Wallet} tone="emerald" />
        <ValueCard label="Messages" value="3" icon={MessageSquare} tone="blue" />
        <ValueCard label="Portal status" value="Active" icon={ShieldCheck} tone="rose" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Upcoming appointment</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">General Consultation</h2>
            </div>
            <StatusBadge tone="blue">Booked</StatusBadge>
          </div>
          <div className="mt-5 space-y-3 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--text-muted)]">Date</span>
              <strong className="text-sm text-[var(--text-strong)]">Apr 28, 2026</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--text-muted)]">Time</span>
              <strong className="text-sm text-[var(--text-strong)]">9:00 AM - 9:30 AM</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--text-muted)]">Clinic</span>
              <strong className="text-sm text-[var(--text-strong)]">Dr. Jonathan M. Harrington</strong>
            </div>
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Portal activity</div>
          <div className="mt-5 space-y-3">
            {portalTimeline.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="text-sm font-bold text-[var(--text-strong)]">{item.title}</div>
                <div className="text-xs text-[var(--text-muted)]">{item.description}</div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function PortalLoginScreen() {
  return (
    <div className="grid min-h-[calc(100vh-0px)] gap-8 px-4 py-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
      <SurfaceCard className="relative overflow-hidden bg-slate-950 p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.18),transparent_34%)]" />
        <div className="relative">
          <BrandMark />
          <h1 className="mt-10 max-w-xl text-5xl font-black tracking-tight sm:text-6xl">
            The patient portal that feels like concierge care
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/76">
            Access appointments, book a visit, and manage support requests with a secure magic-link or OTP flow.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4">
              <div className="text-sm font-bold">Magic link login</div>
              <div className="text-xs text-white/70">Send a one-time login link to the patient email.</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4">
              <div className="text-sm font-bold">OTP fallback</div>
              <div className="text-xs text-white/70">Use a six-digit code when email access is limited.</div>
            </div>
          </div>
        </div>
      </SurfaceCard>
      <SurfaceCard className="p-8">
        <div className="max-w-md">
          <SectionEyebrow>Portal login</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-[var(--text-strong)]">Welcome back</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Sign in with your email or receive a magic link to continue.</p>
          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--text-strong)]">Email address</div>
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">patient@email.com</div>
            </div>
            <ButtonLink href="/portal" icon="arrow">
              Send magic link
            </ButtonLink>
            <div className="text-center text-sm text-[var(--text-muted)]">Or use your appointment code and OTP from SMS.</div>
          </div>
        </div>
      </SurfaceCard>
    </div>
  )
}

export function PortalRegisterScreen() {
  return (
    <div className="grid min-h-[calc(100vh-0px)] gap-8 px-4 py-6 lg:grid-cols-[1fr_0.94fr] lg:px-8">
      <SurfaceCard className="p-8">
        <SectionEyebrow>Patient onboarding</SectionEyebrow>
        <h2 className="mt-5 text-3xl font-black tracking-tight text-[var(--text-strong)]">Create your portal profile</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            'Full name',
            'Email address',
            'Phone number',
            'Date of birth',
          ].map((label) => (
            <div key={label} className="space-y-2">
              <div className="text-sm font-semibold text-[var(--text-strong)]">{label}</div>
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">
                {label === 'Date of birth' ? 'MM / DD / YYYY' : `Enter ${label.toLowerCase()}`}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <ButtonLink href="/portal" icon="calendar">
            Continue to portal
          </ButtonLink>
          <div className="text-sm text-[var(--text-muted)]">
            We use this info to sync your appointments, reminders, and receipts.
          </div>
        </div>
      </SurfaceCard>
      <SurfaceCard className="relative overflow-hidden bg-slate-950 p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.24),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.22),transparent_34%)]" />
        <div className="relative">
          <BrandMark />
          <h1 className="mt-10 text-4xl font-black tracking-tight sm:text-5xl">Everything the clinic needs, from a patient account</h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/76">
            View your appointments, receive reminders, and open support tickets without calling the front desk.
          </p>
        </div>
      </SurfaceCard>
    </div>
  )
}

export function PortalAppointmentsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Appointments</SectionEyebrow>}
        title="Reschedule, cancel, and review your upcoming visits"
        description="Patients can self-serve within policy, while the clinic stays informed and in control."
      />
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SurfaceCard className="p-6">
          <div className="space-y-3">
            {portalTimeline.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-strong)]">{item.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{item.description}</div>
                  </div>
                  <StatusBadge tone={item.tone}>Upcoming</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Details</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">General Consultation</h2>
            </div>
            <StatusBadge tone="blue">Booked</StatusBadge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ButtonLink href="/portal/appointments" icon="none">
              Reschedule
            </ButtonLink>
            <ButtonLink href="/portal/appointments" variant="secondary" icon="none">
              Cancel appointment
            </ButtonLink>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function PortalSupportScreen() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
      <SurfaceCard className="p-6">
        <SectionHeading
          eyebrow={<SectionEyebrow>Support</SectionEyebrow>}
          title="Open a ticket in seconds"
          description="Ask for a receipt, a schedule change, or help with the portal. The clinic gets the ticket right away."
        />
        <div className="mt-6 space-y-3">
          {['Billing', 'Reschedule', 'Prescription question', 'Appointment note'].map((subject) => (
            <div key={subject} className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3 text-sm font-semibold text-[var(--text-strong)]">
              {subject}
            </div>
          ))}
        </div>
      </SurfaceCard>
      <SurfaceCard className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Conversation</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Need help with an appointment</h2>
          </div>
          <StatusBadge tone="teal">Open</StatusBadge>
        </div>
        <div className="mt-5 space-y-3">
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">I need to move my appointment to later this week.</div>
          <div className="ml-auto max-w-[85%] rounded-2xl bg-teal-500 px-4 py-3 text-sm text-white">Of course. I can help with that right now.</div>
        </div>
      </SurfaceCard>
    </div>
  )
}

export function WidgetDemoScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Widget demo</SectionEyebrow>}
        title="A live booking assistant that can sit on any website"
        description="The embed can be an iframe or a script snippet, and the widget keeps the clinic design language intact."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.96fr]">
        <BrowserFrame title="Public clinic website" subtitle="Widget anchored at the corner of the page" accent="rose">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SurfaceCard className="bg-slate-950 p-7 text-white">
              <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
                Heart Care
                <span className="block text-rose-300">You Can Trust</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/74">
                Patients can book directly from the website while Clara captures the booking, reminders, and payment status.
              </p>
            </SurfaceCard>
            <PhoneFrame title="Clara AI" subtitle="AI Assistant Online" accent="rose">
              <div className="space-y-3">
                {widgetSteps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-[var(--border-soft)] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-bold text-[var(--text-strong)]">{step.title}</div>
                      <span className="text-xs text-[var(--text-muted)]">{index + 1}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{step.detail}</div>
                  </div>
                ))}
              </div>
            </PhoneFrame>
          </div>
        </BrowserFrame>

        <SurfaceCard className="p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Script snippet</div>
          <pre className="mt-4 overflow-auto rounded-[24px] bg-slate-950 p-5 text-[11px] leading-6 text-teal-100">
{`<script src="http://localhost:3000/widget-script.js"></script>
<script>
  window.ClaraWidget.init({
    businessSlug: "clinic-demo",
    color: "#dc2626",
    tone: "professional-and-friendly"
  });
</script>`}
          </pre>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ValueCard label="Widget size" value="420 x 680" icon={MonitorSmartphone} tone="teal" />
            <ValueCard label="Slot minutes" value="15" icon={Clock3} tone="blue" />
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function SiteSlugScreen({ slug }: { slug: string }) {
  return (
    <div className="space-y-16 bg-[var(--page-bg)]">
      <div className="rounded-b-[36px] bg-slate-950 text-white shadow-[0_24px_90px_rgba(15,23,42,0.14)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight">Dr. Jonathan M. Harrington</div>
              <div className="text-[11px] text-white/66">Interventional Cardiologist</div>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm font-semibold text-white/74 lg:flex">
            {['Home', 'About', 'Services', 'Patient Info', 'Testimonials', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <ButtonLink href="/widget-demo" icon="calendar">
            Book appointment
          </ButtonLink>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-2xl">
            <Pill tone="rose">Board-certified interventional cardiologist</Pill>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Advanced
              <span className="block text-rose-300">Heart Care</span>
              You Can Trust
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/74">
              The {slug} clinic website blends premium branding, strong patient trust signals, and the Clara booking assistant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/widget-demo" icon="calendar">
                Schedule consultation
              </ButtonLink>
              <ButtonLink href="/portal" variant="secondary" icon="arrow">
                Patient portal
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4">
            <SurfaceCard className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Doctor profile</div>
                  <div className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">20+ years of cardiovascular excellence</div>
                </div>
                <StatusBadge tone="rose">Top Doctor 2022-2024</StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <ValueCard label="Years" value="20+" icon={HeartPulse} tone="rose" />
                <ValueCard label="Patients" value="12,000+" icon={Users} tone="blue" />
                <ValueCard label="Success" value="98.6%" icon={CheckCircle2} tone="emerald" />
              </div>
            </SurfaceCard>
            <SurfaceCard className="p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {['Board certified', '3x Castle Connolly', 'FACC & FSCAI'].map((item) => (
                  <div key={item} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3 text-sm font-semibold text-[var(--text-strong)]">
                    {item}
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-8">
        <section id="about" className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Board Certified', 'Dual certification in cardiovascular disease and interventional cardiology'],
              ['3x Best Doctor', 'Castle Connolly best doctor distinction'],
              ['40+ publications', 'Peer-reviewed work in cardiovascular journals'],
              ['FACC & FSCAI', 'Leadership in interventional cardiology'],
            ].map(([title, body], index) => (
              <SurfaceCard key={title} className={cn('p-5', index === 1 ? 'bg-rose-50/70' : 'bg-white')}>
                <div className="text-lg font-black tracking-tight text-[var(--text-strong)]">{title}</div>
                <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{body}</div>
              </SurfaceCard>
            ))}
          </div>
          <SurfaceCard className="p-6">
            <SectionEyebrow>About the doctor</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[var(--text-strong)]">Two decades of cardiovascular excellence</h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-muted)]">
              The public site tells the clinical story, shows the specialties, and makes booking the obvious next step. It is intentionally calm, premium, and easy to scan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/widget-demo" icon="calendar">
                Full biography
              </ButtonLink>
              <ButtonLink href="/portal" variant="secondary" icon="arrow">
                Contact clinic
              </ButtonLink>
            </div>
          </SurfaceCard>
        </section>

        <section id="services" className="space-y-6">
          <SectionHeading
            eyebrow={<SectionEyebrow>Cardiac services</SectionEyebrow>}
            title="Comprehensive heart care expertise"
            description="Services are presented as simple cards with enough detail to inspire confidence and enough brevity to convert."
            align="center"
          />
          {(() => {
            const services: Array<{
              title: string
              body: string
              tone: ClinicTone
            }> = [
              {
                title: 'Coronary Angiography',
                body: 'Precise imaging of coronary arteries to detect blockages and guide treatment decisions.',
                tone: 'teal',
              },
              {
                title: 'Angioplasty & Stenting',
                body: 'Minimally invasive procedure to open narrowed arteries and restore blood flow.',
                tone: 'rose',
              },
              {
                title: 'Echocardiography',
                body: 'Advanced ultrasound imaging to evaluate heart structure, function, and valve performance.',
                tone: 'blue',
              },
            ]

            return (
              <div className="grid gap-4 lg:grid-cols-3">
                {services.map((item) => (
                  <FeatureCard key={item.title} icon={HeartPulse} title={item.title} body={item.body} tone={item.tone} />
                ))}
              </div>
            )
          })()}
        </section>

        <section id="testimonials" className="space-y-6">
          <SectionHeading
            eyebrow={<SectionEyebrow>Testimonials</SectionEyebrow>}
            title="Loved by healthcare providers"
            align="center"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <QuoteCard key={item.author} quote={item.quote} author={item.author} role={item.role} />
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-[34px] bg-gradient-to-r from-teal-600 to-cyan-500 px-6 py-12 text-white shadow-[0_20px_70px_rgba(13,148,136,0.18)] lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em]">14-day free trial - no credit card</div>
              <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Ready to transform your practice?</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/80">
                Embed the widget, launch the portal, and give patients a clean digital front door without rebuilding the whole site.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/signup" icon="calendar">
                Start your free trial
              </ButtonLink>
              <ButtonLink href="/widget-demo" variant="secondary" icon="arrow">
                See live demo
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// AuthLoginScreen / AuthSignupScreen were removed from here — they were
// static mockups (the "email"/"password" fields were plain <div>s, not
// inputs; "Sign in" was a link to /dashboard with no auth check at all).
// Real, functional versions now live directly in
// src/app/(auth)/login/page.tsx and src/app/(auth)/signup/page.tsx, wired
// to supabase.auth and services/business.ts's createBusiness().

import type { ReactNode } from 'react'
import {
  Activity,
  ArrowRight,
  CalendarClock,
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
  AvatarStack,
  BrandMark,
  BrowserFrame,
  ButtonLink,
  FeatureCard,
  MetricCard,
  PhoneFrame,
  Pill,
  PriceBlock,
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

function heroPreview() {
  return (
    <BrowserFrame title="Clinic dashboard" subtitle="Live bookings, schedules, and patient operations" accent="teal">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Live dashboard</div>
              <div className="mt-1 text-lg font-black text-[var(--text-strong)]">Good evening, Dr. Harrington</div>
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
              <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
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
  )
}

export function MarketingHomeScreen() {
  return (
    <div className="relative overflow-hidden bg-[var(--page-bg)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_36%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(243,249,249,1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[linear-gradient(135deg,rgba(13,148,136,0.10),rgba(255,255,255,0))]" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--text-muted)] lg:flex">
          <a href="#features" className="transition hover:text-[var(--text-strong)]">Platform</a>
          <a href="#workflow" className="transition hover:text-[var(--text-strong)]">How it works</a>
          <a href="#widgets" className="transition hover:text-[var(--text-strong)]">Widget</a>
          <a href="#portal" className="transition hover:text-[var(--text-strong)]">Portal</a>
          <a href="#pricing" className="transition hover:text-[var(--text-strong)]">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/login" variant="secondary" icon="none">
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" icon="calendar">
            Start free trial
          </ButtonLink>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 pb-24 pt-8 lg:px-8">
        <section className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">
            <SectionEyebrow>AI medical receptionist</SectionEyebrow>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-[var(--text-strong)] sm:text-6xl lg:text-7xl">
              Let AI Handle Your Appointment Bookings Automatically
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
              Clara answers patients by voice or chat, books appointments, confirms visits,
              sends reminders, and keeps the clinic dashboard in sync in real time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/signup" icon="calendar">
                Start 14-Day Free Trial
              </ButtonLink>
              <ButtonLink href="/widget-demo" variant="secondary" icon="arrow">
                See Live Widget
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <AvatarStack names={['Dr. Sarah Mitchell', 'Dr. James Park', 'Dr. Maria Santos']} label="Loved by healthcare teams" />
              <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-500 text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--text-strong)]">HIPAA-ready workflows</div>
                  <div className="text-xs text-[var(--text-muted)]">Secure by design for every clinic</div>
                </div>
              </div>
            </div>
          </div>

          {heroPreview()}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ValueCard label="Clinics onboarded" value="120+" subtitle="Private practices and specialty clinics" icon={Hospital} tone="teal" />
          <ValueCard label="Bookings managed" value="48k" subtitle="Appointments confirmed without manual calls" icon={CalendarClock} tone="blue" />
          <ValueCard label="Average no-show drop" value="33%" subtitle="After reminders and self-service tools" icon={LineChart} tone="emerald" />
          <ValueCard label="USDC transactions" value="$2.4M" subtitle="Tracked on Polygon with transaction links" icon={CircleDollarSign} tone="rose" />
        </section>

        <section id="workflow" className="space-y-8">
          <SectionHeading
            eyebrow={<SectionEyebrow>How it works</SectionEyebrow>}
            title="From website visit to confirmed appointment in under 10 minutes"
            description="The clinic sets up its services and schedule once. Clara handles the rest across the widget, portal, and dashboard."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {workflow.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={`${item.step}. ${item.title}`}
                body={item.body}
                tone="teal"
              />
            ))}
          </div>
        </section>

        <section id="features" className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow={<SectionEyebrow>Platform</SectionEyebrow>}
              title="Everything a modern clinic needs in one place"
              description="Reception, booking, follow-ups, billing, analytics, and patient support live in the same operating system."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  body={feature.body}
                  tone={feature.tone}
                />
              ))}
            </div>
          </div>

          <SurfaceCard className="p-6 lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <SectionEyebrow>Widget preview</SectionEyebrow>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--text-strong)]">
                  A polished booking experience patients will actually use
                </h3>
              </div>
              <StatusBadge tone="rose">Live</StatusBadge>
            </div>

            <div className="mt-6 flex justify-center">
              <PhoneFrame title="Clara AI" subtitle="AI Assistant Online" accent="rose">
                <div className="space-y-3">
                  <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    Welcome back. How can I help you book or manage an appointment today?
                  </div>
                  <div className="space-y-2">
                    {services.map((service) => (
                      <div key={service.name} className="rounded-2xl border border-[var(--border-soft)] px-4 py-3">
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

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <PriceBlock label="Booking deposit" amount={49} currency="USD" helper="Simple patient-facing payments" />
              <PriceBlock label="Clinic tier" amount={99} currency="USD" helper="Website + widget + AI receptionist" />
              <PriceBlock label="Enterprise" amount={299} currency="USD" helper="Multi-clinic and advanced analytics" />
            </div>
          </SurfaceCard>
        </section>

        <section id="portal" className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <SurfaceCard className="p-6">
            <SectionEyebrow>Patient portal</SectionEyebrow>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--text-strong)]">
              Self-service for booking, rescheduling, payments, and support
            </h3>
            <div className="mt-6 space-y-4">
              <TimelineList items={portalTimeline} />
            </div>
          </SurfaceCard>

          <BrowserFrame title="Clinic website" subtitle="Public site, booking CTA, and AI widget" accent="blue">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <SurfaceCard className="bg-slate-950 p-6 text-white">
                <Pill tone="rose">Top doctor 2022-2024</Pill>
                <h3 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                  Advanced
                  <span className="block text-rose-300">Heart Care</span>
                  You Can Trust
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/74">
                  A modern clinic website with services, social proof, booking CTA, and embedded Clara widget.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/sites/clinic-demo" icon="calendar">
                    Schedule Consultation
                  </ButtonLink>
                  <ButtonLink href="/widget-demo" variant="secondary" icon="arrow">
                    View Services
                  </ButtonLink>
                </div>
              </SurfaceCard>
              <SurfaceCard className="p-5">
                <div className="space-y-3">
                  {testimonials.map((item) => (
                    <QuoteCard key={item.author} quote={item.quote} author={item.author} role={item.role} />
                  ))}
                </div>
              </SurfaceCard>
            </div>
          </BrowserFrame>
        </section>

        <section id="pricing" className="space-y-8">
          <SectionHeading
            eyebrow={<SectionEyebrow>Pricing</SectionEyebrow>}
            title="Clear plans for clinics at every stage"
            description="The first phase focuses on the widget, clinic dashboard, patient portal, and USDC billing. Stripe can be added later if you want it."
            align="center"
          />
          <div className="grid gap-5 lg:grid-cols-4">
            <SurfaceCard className="p-6">
              <div className="text-sm font-bold text-[var(--text-strong)]">Free</div>
              <div className="mt-3 text-4xl font-black tracking-tight text-[var(--text-strong)]">$0</div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Sandbox, demo data, and widget preview.</p>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <div className="text-sm font-bold text-[var(--text-strong)]">Starter</div>
              <div className="mt-3 text-4xl font-black tracking-tight text-[var(--text-strong)]">$49</div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Single clinic with calendar, widget, and portal.</p>
            </SurfaceCard>
            <SurfaceCard className="p-6 ring-1 ring-teal-200">
              <Pill tone="teal">Most popular</Pill>
              <div className="mt-3 text-sm font-bold text-[var(--text-strong)]">Professional</div>
              <div className="mt-3 text-4xl font-black tracking-tight text-[var(--text-strong)]">$99</div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Automation, analytics, billing, and AI tools.</p>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <div className="text-sm font-bold text-[var(--text-strong)]">Enterprise</div>
              <div className="mt-3 text-4xl font-black tracking-tight text-[var(--text-strong)]">$299</div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Multi-clinic, custom integrations, and dedicated support.</p>
            </SurfaceCard>
          </div>
        </section>

        <section className="rounded-[36px] border border-[var(--border-soft)] bg-slate-950 px-6 py-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <SectionEyebrow>Launch ready</SectionEyebrow>
              <h3 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Ready to transform your practice?
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">
                Bring the widget, portal, dashboard, and AI receptionist online in one system. We already wired the backend, so this frontend now matches the product story.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
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

export function DashboardAppointmentsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/90 px-6 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Appointments</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--text-strong)]">Track every booking and status change</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Booked', 'Confirmed', 'Completed', 'Cancelled', 'No show'].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                index === 0
                  ? 'bg-[var(--brand)] text-white shadow-[0_10px_24px_rgba(13,148,136,0.22)]'
                  : 'bg-white text-[var(--text-muted)] hover:bg-teal-50 hover:text-[var(--text-strong)]',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SimpleTable
          columns={['Patient', 'Service', 'Date & time', 'Source', 'Status']}
          rows={[
            [
              <strong key="p1">Md Tajuddin</strong>,
              'General Consultation',
              'Apr 30, 2026 4:30 PM',
              <StatusBadge key="s1" tone="teal">AI Widget</StatusBadge>,
              <StatusBadge key="st1" tone="blue">Booked</StatusBadge>,
            ],
            [
              <strong key="p2">Shakib</strong>,
              'Follow Up Visit',
              'Apr 29, 2026 3:30 PM',
              <StatusBadge key="s2" tone="teal">Portal</StatusBadge>,
              <StatusBadge key="st2" tone="emerald">Confirmed</StatusBadge>,
            ],
            [
              <strong key="p3">Amit</strong>,
              'General Consultation',
              'Apr 28, 2026 2:30 PM',
              <StatusBadge key="s3" tone="teal">AI Widget</StatusBadge>,
              <StatusBadge key="st3" tone="rose">Cancelled</StatusBadge>,
            ],
            [
              <strong key="p4">Dault Hussain</strong>,
              'General Consultation',
              'Apr 28, 2026 7:30 PM',
              <StatusBadge key="s4" tone="blue">Phone</StatusBadge>,
              <StatusBadge key="st4" tone="amber">No show</StatusBadge>,
            ],
          ]}
        />

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Selected appointment</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">General Consultation</h2>
            </div>
            <StatusBadge tone="blue">Booked</StatusBadge>
          </div>
          <div className="mt-5 space-y-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-[var(--text-muted)]">Patient</span>
              <strong className="text-sm text-[var(--text-strong)]">Md Tajuddin</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-[var(--text-muted)]">Time</span>
              <strong className="text-sm text-[var(--text-strong)]">Apr 30, 2026, 4:30 PM</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-[var(--text-muted)]">Source</span>
              <strong className="text-sm text-[var(--text-strong)]">AI Widget</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-[var(--text-muted)]">Payment</span>
              <strong className="text-sm text-[var(--text-strong)]">Pending</strong>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ButtonLink href="/dashboard/appointments" icon="check">
              Confirm
            </ButtonLink>
            <ButtonLink href="/dashboard/appointments" variant="secondary" icon="arrow">
              Mark completed
            </ButtonLink>
            <ButtonLink href="/dashboard/appointments" variant="secondary" icon="arrow">
              No show
            </ButtonLink>
            <ButtonLink href="/dashboard/appointments" variant="secondary" icon="arrow">
              Cancel
            </ButtonLink>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

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

export function DashboardWebsiteScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Website builder</SectionEyebrow>}
        title="A public site that feels premium and converts"
        description="Show the doctor profile, services, testimonials, and a strong booking CTA. The widget and website stay on brand."
      />

      <BrowserFrame title="Website preview" subtitle="Public landing page for the clinic" accent="blue">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <SurfaceCard className="bg-slate-950 p-7 text-white">
            <Pill tone="rose">Board-certified interventional cardiologist</Pill>
            <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
              Advanced
              <span className="block text-rose-300">Heart Care</span>
              You Can Trust
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/74">
              Compasionate care, advanced expertise, and an AI assistant that can book appointments directly from the website.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/dashboard/widget" icon="calendar">
                Schedule consultation
              </ButtonLink>
              <ButtonLink href="/dashboard/website" variant="secondary" icon="arrow">
                View services
              </ButtonLink>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <ValueCard label="Years experience" value="20+" icon={HeartPulse} tone="rose" />
              <ValueCard label="Patients served" value="12,000+" icon={Users} tone="blue" />
              <ValueCard label="Success rate" value="98.6%" icon={CheckCircle2} tone="emerald" />
            </div>
          </SurfaceCard>
          <SurfaceCard className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Templates</div>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Serenity, Pulse, and Clarity</h3>
              </div>
              <StatusBadge tone="blue">Published</StatusBadge>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                { name: 'Serenity', body: 'Soft gradients, calm hero, and strong appointment CTA', tone: 'teal' as const },
                { name: 'Pulse', body: 'More contrast for specialty practices and premium positioning', tone: 'rose' as const },
                { name: 'Clarity', body: 'Minimal layout with more clinical trust and less decoration', tone: 'blue' as const },
              ].map((item) => (
                <div key={item.name} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-[var(--text-strong)]">{item.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{item.body}</div>
                    </div>
                    <StatusBadge tone={item.tone}>Ready</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <PriceBlock label="Widget enabled" amount={1} helper="Embedded on the site and portal" />
              <PriceBlock label="Featured services" amount={3} helper="Pulled from clinic services" />
            </div>
          </SurfaceCard>
        </div>
      </BrowserFrame>
    </div>
  )
}

export function DashboardServicesScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Services</SectionEyebrow>}
        title="Clinic services map directly to the booking flow"
        description="Services define the slot length, price, color, and assistant instructions Clara uses during the conversation."
      />

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <SurfaceCard key={service.name} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <StatusBadge tone={service.tone}>Active</StatusBadge>
                <Pill tone={service.tone}>{service.duration}</Pill>
              </div>
              <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--text-strong)]">{service.name}</h3>
              <div className="mt-2 text-sm text-[var(--text-muted)]">Price: {service.price}</div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Included in widget and portal booking flow
              </div>
            </SurfaceCard>
          ))}
        </div>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Add service</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Quick create panel</h2>
            </div>
            <ButtonLink href="/dashboard/services" icon="none">
              Create service
            </ButtonLink>
          </div>
          <div className="mt-6 space-y-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--text-strong)]">Service name</div>
              <div className="h-11 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">General Consultation</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--text-strong)]">Duration</div>
                <div className="h-11 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">30 minutes</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--text-strong)]">Price</div>
                <div className="h-11 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">$90</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--text-strong)]">Instructions</div>
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">
                Ask patients to arrive 15 minutes early and bring previous medical records.
              </div>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

export function DashboardPatientsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Patients</SectionEyebrow>}
        title="Patient records and appointment history in one place"
        description="Keep notes, insurance details, and booking context together so the front desk and assistants work from the same data."
      />

      <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Patient list</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Recent visitors</h2>
            </div>
            <ButtonLink href="/dashboard/patients" icon="none">
              Add patient
            </ButtonLink>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['Md Tajuddin', 'Follow Up Visit', 'Apr 30', 'Cardiology'],
              ['Shakib', 'General Consultation', 'Apr 29', 'General'],
              ['Amit', 'General Consultation', 'Apr 28', 'General'],
              ['Just Funny', 'Follow Up Visit', 'Apr 27', 'Lab review'],
            ].map(([name, service, date, notes]) => (
              <div key={name} className="flex items-center justify-between gap-4 rounded-[22px] border border-[var(--border-soft)] bg-[var(--panel-soft)] px-4 py-3">
                <div>
                  <div className="text-sm font-bold text-[var(--text-strong)]">{name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{notes}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-[var(--text-strong)]">{service}</div>
                  <div className="text-xs text-[var(--text-muted)]">{date}</div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Patient profile</div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Dault Hussain</h2>
            </div>
            <StatusBadge tone="emerald">Active</StatusBadge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ValueCard label="Total appointments" value="13" icon={CalendarDays} tone="teal" />
            <ValueCard label="Completed" value="1" icon={CheckCircle2} tone="emerald" />
            <ValueCard label="This month" value="13" icon={LineChart} tone="blue" />
          </div>
          <div className="mt-6 space-y-3 rounded-[24px] border border-[var(--border-soft)] bg-[var(--panel-soft)] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--text-muted)]">Allergies</span>
              <strong className="text-sm text-[var(--text-strong)]">None recorded</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--text-muted)]">Insurance</span>
              <strong className="text-sm text-[var(--text-strong)]">Self pay</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--text-muted)]">Last visit</span>
              <strong className="text-sm text-[var(--text-strong)]">Apr 27, 2026</strong>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

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

export function DashboardFaqsScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>FAQs</SectionEyebrow>}
        title="Teach Clara the answers patients ask most"
        description="Add structured answers for parking, cancellations, preparation instructions, and clinic policies."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {[
          ['How do I cancel or reschedule?', 'You can cancel or reschedule through this chat at least 24 hours in advance.'],
          ['Is parking available?', 'Yes, free parking is available at our clinic.'],
          ['How long does a consultation take?', 'A general consultation typically takes 30 minutes.'],
          ['Can I use insurance?', 'We accept self pay and selected private insurance plans.'],
        ].map(([question, answer]) => (
          <SurfaceCard key={question} className="p-5">
            <div className="text-sm font-black tracking-tight text-[var(--text-strong)]">{question}</div>
            <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{answer}</div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}

export function DashboardScheduleScreen() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={<SectionEyebrow>Calendar</SectionEyebrow>}
        title="A clean weekly schedule view for the clinic team"
        description="Visualize appointments by day and keep drag-and-drop rescheduling aligned with clinic hours."
      />
      <SurfaceCard className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Week view</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--text-strong)]">Apr 26 - May 2, 2026</h2>
          </div>
          <div className="flex items-center gap-2">
            {['month', 'week', 'day'].map((item, index) => (
              <button
                key={item}
                type="button"
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition',
                  index === 1
                    ? 'bg-[var(--brand)] text-white shadow-[0_10px_24px_rgba(15,118,110,0.2)]'
                    : 'bg-white text-[var(--text-muted)] hover:bg-teal-50 hover:text-[var(--text-strong)]',
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-white">
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-slate-100">
            {Array.from({ length: 35 }).map((_, index) => (
              <div key={index} className={cn('min-h-28 bg-white p-3', index < 7 && 'bg-amber-50/60')}>
                {index === 16 || index === 17 || index === 18 ? (
                  <div className="rounded-2xl bg-teal-500 px-3 py-2 text-[11px] font-bold text-white shadow-[0_10px_20px_rgba(15,118,110,0.18)]">
                    {index === 16 ? '2:30 - 3:00 - Dault Hussain' : index === 17 ? '3:30 - 4:00 - Md Shair' : '4:30 - 5:00 - Follow Up'}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </SurfaceCard>
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

export function AuthLoginScreen() {
  return (
    <div className="grid min-h-screen gap-8 px-4 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <SurfaceCard className="relative overflow-hidden bg-slate-950 p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.25),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_30%)]" />
        <div className="relative">
          <BrandMark />
          <h1 className="mt-10 max-w-xl text-5xl font-black tracking-tight sm:text-6xl">
            The future of clinic booking is here.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/76">
            The AI receptionist handles bookings 24/7 so your staff can focus on what matters most.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4">
              <div className="text-sm font-bold">Clara-powered AI booking assistant</div>
              <div className="text-xs text-white/70">Patients can call, chat, or use the website widget.</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4">
              <div className="text-sm font-bold">Secure, multi-tenant data model</div>
              <div className="text-xs text-white/70">Each clinic keeps its own appointments and settings.</div>
            </div>
          </div>
        </div>
      </SurfaceCard>
      <SurfaceCard className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SectionEyebrow>Staff login</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-[var(--text-strong)]">Welcome back</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Sign in to your clinic dashboard.</p>
          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--text-strong)]">Email address</div>
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">you@clinic.com</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--text-strong)]">Password</div>
              <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">••••••••</div>
            </div>
            <ButtonLink href="/dashboard" icon="arrow">
              Sign in
            </ButtonLink>
          </div>
        </div>
      </SurfaceCard>
    </div>
  )
}

export function AuthSignupScreen() {
  return (
    <div className="grid min-h-screen gap-8 px-4 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <SurfaceCard className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SectionEyebrow>Start free trial</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-[var(--text-strong)]">Create your clinic account</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Full name', 'Clinic name', 'Email address', 'Phone number'].map((label) => (
              <div key={label} className="space-y-2">
                <div className="text-sm font-semibold text-[var(--text-strong)]">{label}</div>
                <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">
                  Enter {label.toLowerCase()}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <ButtonLink href="/dashboard" icon="calendar">
              Start 14-day trial
            </ButtonLink>
            <div className="text-sm text-[var(--text-muted)]">No credit card required.</div>
          </div>
        </div>
      </SurfaceCard>
      <SurfaceCard className="relative overflow-hidden bg-slate-950 p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.18),transparent_30%)]" />
        <div className="relative">
          <BrandMark />
          <h1 className="mt-10 max-w-xl text-5xl font-black tracking-tight sm:text-6xl">
            Launch a clinic concierge experience in days, not months.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/76">
            Add the widget, configure AI settings, and keep every booking tied to the same source of truth.
          </p>
        </div>
      </SurfaceCard>
    </div>
  )
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Ambulance,
  ArrowRight,
  BellRing,
  Building2,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  HeartPulse,
  Layers3,
  LockKeyhole,
  MapPinned,
  MessageCircle,
  RadioTower,
  ShieldCheck,
  Smartphone,
  UploadCloud,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge, Card, GlassCard } from "@/components/ui";
import { documentationPages } from "@/lib/documentation/docs";

export const metadata: Metadata = {
  title: "DocDoor Documentation | Investor Overview",
  description:
    "Investor-ready documentation for DocDoor, a premium healthcare coordination platform for elderly care.",
};

const demoLinks = [
  { href: "/family", label: "Family App Flow", helper: "Remote family visibility and care coordination" },
  { href: "/patient", label: "Patient App Flow", helper: "Senior-friendly daily care and emergency support" },
  { href: "/admin", label: "Admin Dashboard", helper: "Operations command center for visits, reports, and emergencies" },
  { href: "/hospital", label: "Hospital Dashboard", helper: "Partner workflow for schedules, reports, and handoffs" },
  { href: "/design-system", label: "Design System", helper: "Luxury healthcare UI components and tokens" },
];

const marketSignals = [
  { label: "Primary audience", value: "Families caring for elderly parents", helper: "Especially remote and NRI families" },
  { label: "Core wedge", value: "Care coordination", helper: "The missing layer between patients, family, and providers" },
  { label: "MVP scope", value: "6 connected apps", helper: "Family, patient, care assistant, admin, hospital, backend" },
  { label: "Trust layer", value: "Verified care network", helper: "Audit trails, live updates, consent, and accountability" },
];

const modules: Array<{
  description: string;
  icon: LucideIcon;
  outcome: string;
  title: string;
}> = [
  {
    description: "Remote family members can monitor parent health, reports, appointments, live visits, and emergencies from one secure workspace.",
    icon: Users,
    outcome: "Peace of mind for families",
    title: "Family App",
  },
  {
    description: "Elderly patients get a simple care plan, large actions, medicine reminders, report upload, messaging, and one-tap SOS.",
    icon: HeartPulse,
    outcome: "Support without complexity",
    title: "Patient App",
  },
  {
    description: "Care assistants receive visit tasks, check-in flow, live tracking, notes, report capture, and family communication.",
    icon: MapPinned,
    outcome: "Verified on-ground care",
    title: "Care Assistant Flow",
  },
  {
    description: "Operations teams coordinate patients, visits, emergency response, reports, notifications, partners, and audit logs.",
    icon: Layers3,
    outcome: "Operational control",
    title: "Admin Dashboard",
  },
  {
    description: "Partner hospitals manage schedules, patient handoffs, report uploads, doctor updates, and escalations.",
    icon: Building2,
    outcome: "Provider collaboration",
    title: "Hospital Dashboard",
  },
  {
    description: "NestJS APIs with Prisma and PostgreSQL model users, patients, appointments, visits, reports, medications, payments, notifications, and audit trails.",
    icon: Database,
    outcome: "Scalable data foundation",
    title: "Backend Platform",
  },
];

const workflowSteps = [
  {
    description: "Family or patient signs in with phone OTP. Role determines whether they see family, patient, assistant, admin, or hospital workspace.",
    icon: LockKeyhole,
    title: "Secure access",
  },
  {
    description: "Family adds parent profiles and care needs. Health score, emergency contacts, medications, reports, and provider relationships become centralized.",
    icon: Users,
    title: "Care profile setup",
  },
  {
    description: "Appointments and assistant visits are booked, confirmed, and tracked through real-time status updates.",
    icon: CalendarDays,
    title: "Care scheduling",
  },
  {
    description: "Care assistant movement, GPS check-ins, visit tasks, doctor consultation status, and family notifications are visible live.",
    icon: RadioTower,
    title: "Live visit tracking",
  },
  {
    description: "Reports can be uploaded by patient, hospital, diagnostic center, or care assistant and kept in a secure record timeline.",
    icon: UploadCloud,
    title: "Report management",
  },
  {
    description: "SOS triggers family alerts, care assistant dispatch, ambulance request, hospital handoff, and audit logging.",
    icon: Ambulance,
    title: "Emergency workflow",
  },
];

const architecture = [
  {
    description: "Next.js web dashboard for admin, hospital, documentation, and investor demos. React Native Expo app for family, patient, and care assistant mobile experiences.",
    label: "Experience layer",
    stack: "Next.js, TypeScript, Tailwind, Expo",
  },
  {
    description: "NestJS API modules expose authentication, users, patients, visits, appointments, reports, emergencies, subscriptions, payments, notifications, and audit logs.",
    label: "Application layer",
    stack: "Node.js, NestJS, Prisma ORM",
  },
  {
    description: "PostgreSQL stores relational care data. S3-compatible storage handles reports and uploads. Socket.io and FCM power live tracking and alerts.",
    label: "Data and realtime layer",
    stack: "PostgreSQL, S3 storage, Socket.io, Firebase Cloud Messaging",
  },
  {
    description: "JWT and OTP authentication, role-based access, consent-aware sharing, audit logs, and environment-driven provider integrations.",
    label: "Trust and compliance layer",
    stack: "JWT, OTP, RBAC, audit logs, maps, notifications",
  },
];

const investorHighlights = [
  "DocDoor is not a hospital, clinic, or diagnostics provider. It is the coordination layer that connects them for families.",
  "The product creates trust through verified people, live visibility, report access, emergency workflows, and auditability.",
  "The MVP is intentionally modular: each stakeholder app can launch independently while sharing the same backend data model.",
  "The brand direction is premium healthcare: midnight navy, prestige gold, warm ivory, soft glass surfaces, and calm accessible flows.",
];

function SectionHeader({ eyebrow, title, description }: { description: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-strong">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-normal text-midnight-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-grey">{description}</p>
    </div>
  );
}

function IconPanel({ description, icon: Icon, outcome, title }: { description: string; icon: LucideIcon; outcome: string; title: string }) {
  return (
    <Card as="article" className="p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-liquid bg-prestige-gold/16 text-gold-strong">
          <Icon size={24} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-midnight-950">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-grey">{description}</p>
          <Badge className="mt-4" tone="gold">
            {outcome}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

export default function DocumentationPage() {
  return (
    <div className="grid gap-6">
      <GlassCard dark className="overflow-hidden p-6 lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_420px] xl:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-prestige-gold">Investor Documentation</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-white">
              DocDoor is building the care infrastructure layer for modern families.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/74">
              A premium healthcare coordination platform that helps families manage elderly care across doctors,
              hospitals, care assistants, diagnostics, reports, emergency support, and real-time updates.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-liquid bg-prestige-gold px-5 text-base font-semibold text-midnight-950 shadow-liquid-sm transition hover:bg-[#c89f43]"
                href="#demo-links"
              >
                View live MVP
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-liquid border border-white/18 bg-white/10 px-5 text-base font-semibold text-white transition hover:bg-white/16"
                href="/documentation/architecture"
              >
                See architecture
              </Link>
            </div>
          </div>

          <div className="rounded-liquid border border-white/12 bg-white/8 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-prestige-gold">What we are building</p>
            <div className="mt-5 grid gap-3">
              {[
                { icon: Smartphone, label: "Mobile apps", value: "Family, patient, care assistant" },
                { icon: Building2, label: "Web dashboards", value: "Admin and hospital operations" },
                { icon: RadioTower, label: "Realtime care", value: "Live visits, notifications, emergency status" },
                { icon: ShieldCheck, label: "Trust layer", value: "Consent, audit trail, secure records" },
              ].map(({ icon: Icon, label, value }) => (
                <div className="flex items-center gap-3 rounded-liquid border border-white/10 bg-white/8 p-3" key={label}>
                  <div className="grid h-10 w-10 place-items-center rounded-liquid bg-prestige-gold text-midnight-950">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="text-sm text-white/62">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketSignals.map((signal) => (
          <Card className="p-5" key={signal.label}>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-grey">{signal.label}</p>
            <strong className="mt-3 block text-2xl font-semibold text-midnight-950">{signal.value}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-grey">{signal.helper}</p>
          </Card>
        ))}
      </section>

      <section>
        <SectionHeader
          description="Use the sticky sidebar to open detailed documentation for each interface. These pages explain purpose, screens, workflows, data touchpoints, design guidance, and implementation notes."
          eyebrow="Documentation map"
          title="Detailed interface pages"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {documentationPages.map((page) => (
            <Link
              className="focus-ring group rounded-liquid border border-midnight-900/10 bg-white/74 p-5 shadow-liquid-sm transition hover:border-prestige-gold/45 hover:bg-white"
              href={`/documentation/${page.slug}`}
              key={page.slug}
            >
              <Badge tone="gold">{page.interfaceType}</Badge>
              <h3 className="mt-4 text-xl font-semibold text-midnight-950">{page.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-grey">{page.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-strong">
                Read documentation
                <ArrowRight className="transition group-hover:translate-x-1" size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6">
          <SectionHeader
            description="Families today can communicate instantly, but healthcare coordination for elderly parents is still fragmented across calls, WhatsApp messages, reports, appointments, emergencies, and unreliable updates."
            eyebrow="The problem"
            title="Distance has changed. Care coordination has not."
          />
          <div className="grid gap-3">
            {[
              "Families do not know whether a doctor arrived, a report was uploaded, or a medicine was taken.",
              "Hospitals, diagnostics, pharmacies, assistants, and family members operate in disconnected systems.",
              "Emergency situations require fast coordination, but alerts, ambulance requests, family communication, and hospital handoff are not unified.",
            ].map((item) => (
              <div className="flex gap-3 rounded-liquid border border-midnight-900/8 bg-white/70 p-4" key={item}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-gold-strong" size={18} aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-grey">{item}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" dark>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-prestige-gold">The solution</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">One connected care command layer.</h2>
          <p className="mt-4 text-base leading-7 text-white/72">
            DocDoor brings together family members, elderly patients, care assistants, hospitals, doctors,
            diagnostics, emergency services, and reports into one coordinated platform with real-time visibility.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { icon: HeartPulse, label: "Health at a glance" },
              { icon: MapPinned, label: "Verified live visits" },
              { icon: FileText, label: "Reports in one place" },
              { icon: BellRing, label: "Real-time alerts" },
              { icon: Ambulance, label: "Emergency workflow" },
              { icon: MessageCircle, label: "Family communication" },
            ].map(({ icon: Icon, label }) => (
              <div className="flex items-center gap-3 rounded-liquid border border-white/12 bg-white/8 p-3" key={label}>
                <Icon className="text-prestige-gold" size={20} aria-hidden="true" />
                <span className="text-sm font-semibold text-white">{label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section>
        <SectionHeader
          description="The MVP is built as a connected ecosystem. Each module solves a clear stakeholder problem while sharing one backend and data model."
          eyebrow="Product ecosystem"
          title="What the software includes"
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <IconPanel key={module.title} {...module} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          description="DocDoor organizes care into a transparent journey from login to live updates, reports, and emergencies."
          eyebrow="How it works"
          title="The care journey"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <GlassCard className="p-5" key={step.title}>
              <div className="flex items-center justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-liquid bg-midnight-950 text-prestige-gold">
                  <step.icon size={23} aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-gold-strong">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-grey">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="architecture">
        <SectionHeader
          description="The technical foundation is designed to move from mock data to production APIs without rewriting the product surfaces."
          eyebrow="Technology architecture"
          title="Production-ready modular foundation"
        />
        <GlassCard className="p-5">
          <div className="grid gap-4">
            {architecture.map((layer) => (
              <div className="grid gap-3 rounded-liquid border border-midnight-900/8 bg-white/70 p-4 lg:grid-cols-[180px_1fr_220px] lg:items-center" key={layer.label}>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold-strong">{layer.label}</p>
                </div>
                <p className="text-sm leading-6 text-slate-grey">{layer.description}</p>
                <Badge tone="info">{layer.stack}</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <GlassCard className="p-6">
          <SectionHeader
            description="DocDoor earns confidence by showing families what is happening, who is responsible, and what changed."
            eyebrow="Why this matters"
            title="Investor thesis"
          />
          <div className="grid gap-3">
            {investorHighlights.map((highlight) => (
              <div className="flex gap-3 rounded-liquid border border-midnight-900/8 bg-white/70 p-4" key={highlight}>
                <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-grey">{highlight}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" id="demo-links">
          <SectionHeader
            description="These routes show the working MVP foundation using mock API data first, with backend-ready API boundaries already in place."
            eyebrow="Live MVP links"
            title="Open the product surfaces directly"
          />
          <div className="grid gap-3">
            {demoLinks.map((link) => (
              <Link
                className="focus-ring flex items-center justify-between gap-4 rounded-liquid border border-midnight-900/8 bg-white/70 p-4 transition hover:border-prestige-gold/45 hover:bg-white"
                href={link.href}
                key={link.href}
              >
                <span>
                  <span className="block font-semibold text-midnight-950">{link.label}</span>
                  <span className="mt-1 block text-sm text-slate-grey">{link.helper}</span>
                </span>
                <ArrowRight className="shrink-0 text-gold-strong" size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="rounded-liquid border border-prestige-gold/30 bg-prestige-gold/16 p-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-strong">Positioning</p>
        <h2 className="mt-2 text-3xl font-semibold text-midnight-950">Healthcare services are available. Healthcare coordination is not.</h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-grey">
          DocDoor is building the software and operational layer that makes elderly care visible, coordinated,
          trusted, and easier for families to manage from anywhere.
        </p>
      </section>
    </div>
  );
}

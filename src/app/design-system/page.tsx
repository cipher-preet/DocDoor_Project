import {
  Activity,
  Ambulance,
  CalendarDays,
  FileText,
  HeartPulse,
  Search,
  ShieldCheck,
  UploadCloud,
  Users,
} from "lucide-react";
import {
  AppointmentCard,
  Badge,
  BrandMark,
  Button,
  Card,
  DashboardMetricCard,
  EmergencyButton,
  GlassCard,
  HealthScoreCard,
  Input,
  ReportCard,
  StatusTimeline,
  UserAvatar,
} from "@/components/ui";

const colorTokens = [
  { hex: "#102542", label: "Midnight Navy", swatch: "bg-midnight-900" },
  { hex: "#D8B56A", label: "Prestige Gold", swatch: "bg-prestige-gold" },
  { hex: "#F8F4EC", label: "Warm Ivory", swatch: "bg-warm-ivory" },
  { hex: "#F6F7F9", label: "Surface Grey", swatch: "bg-surface-grey" },
  { hex: "#5F6B7A", label: "Slate Grey", swatch: "bg-slate-grey" },
  { hex: "#1C1C1C", label: "Deep Black", swatch: "bg-deep-black" },
];

const timeline = [
  {
    description: "Care assistant checked in through GPS verification.",
    label: "Care assistant arrived",
    meta: "09:15 AM",
    status: "completed" as const,
  },
  {
    description: "Doctor consultation is live and family has been notified.",
    label: "Consultation in progress",
    meta: "Live",
    status: "current" as const,
  },
  {
    description: "Visit report and prescription summary will be uploaded after completion.",
    label: "Report pending",
    meta: "Next",
    status: "pending" as const,
  },
];

export default function DesignSystemPage() {
  return (
    <main className="liquid-page min-h-screen px-4 py-6 text-midnight-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6">
        <GlassCard dark className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <BrandMark />
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-prestige-gold">Tailwind Design System</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight text-white">
              Luxury healthcare components with Apple-like liquid glass.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              Built for DocDoor dashboards and care workflows: premium spacing, soft shadows, blurred surfaces, midnight navy depth, and prestige gold accents.
            </p>
          </div>
          <HealthScoreCard className="w-full lg:w-80" score={82} trend="Stable over 7 days" />
        </GlassCard>

        <section className="grid gap-3 md:grid-cols-3 xl:grid-cols-6" aria-label="DocDoor color palette">
          {colorTokens.map((token) => (
            <Card key={token.label} className="p-4">
              <div className={`h-16 rounded-liquid border border-midnight-900/10 ${token.swatch}`} />
              <p className="mt-3 text-sm font-semibold text-midnight-950">{token.label}</p>
              <p className="mt-1 text-xs font-semibold text-slate-grey">{token.hex}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="p-5">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Core Controls</h2>
              <p className="mt-1 text-sm text-slate-grey">Buttons, inputs, badges, avatars, and cards.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button iconLeft={<ShieldCheck size={16} aria-hidden="true" />}>Primary</Button>
              <Button variant="gold">Premium CTA</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger" iconLeft={<Ambulance size={16} aria-hidden="true" />}>
                Emergency
              </Button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input iconLeft={<Search size={16} aria-hidden="true" />} label="Search" placeholder="Search patients, reports, appointments..." />
              <Input hint="Use role-based phone login." label="Phone number" placeholder="+91 98765 43210" />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge tone="gold">Premium</Badge>
              <Badge tone="success">Verified</Badge>
              <Badge tone="warning">Attention</Badge>
              <Badge tone="danger">Critical</Badge>
              <Badge tone="info">Live</Badge>
              <UserAvatar name="Anita Sharma" status="online" />
              <UserAvatar name="Rajesh Nair" size="lg" status="away" />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Dashboard Metrics</h2>
              <p className="mt-1 text-sm text-slate-grey">Reusable metric cards for admin and hospital dashboards.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <DashboardMetricCard delta="+42 this week" icon={Users} label="Families onboarded" tone="gold" value="1,248" />
              <DashboardMetricCard delta="12 GPS verified" icon={Activity} label="Live care visits" tone="success" value="36" />
              <DashboardMetricCard delta="8 urgent reviews" icon={FileText} label="Pending reports" tone="warning" value="18" />
              <DashboardMetricCard delta="1 ambulance en route" icon={Ambulance} label="Open emergencies" tone="danger" value="2" />
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <AppointmentCard
            doctor="Dr. Anita Sharma"
            location="Apollo Hospital"
            patient="Mrs. Sunita Sharma"
            specialty="Cardiologist"
            status="confirmed"
            time="24 May, 10:30 AM"
          />
          <ReportCard date="24 May 2026" source="Apollo Diagnostics" status="normal" title="Blood Test" type="Lab Report" />
          <GlassCard className="grid place-items-center p-8">
            <EmergencyButton />
          </GlassCard>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard className="p-5">
            <h2 className="mb-5 text-2xl font-semibold">StatusTimeline</h2>
            <StatusTimeline items={timeline} />
          </GlassCard>

          <GlassCard dark className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">GlassCard + Card Surfaces</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                  Liquid glass uses blur, saturation, fine borders, and restrained radius for a premium healthcare interface that still stays operational.
                </p>
              </div>
              <Button iconLeft={<UploadCloud size={16} aria-hidden="true" />} variant="gold">
                Upload Report
              </Button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { icon: CalendarDays, label: "Appointments" },
                { icon: HeartPulse, label: "Health score" },
                { icon: ShieldCheck, label: "Verified care" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-liquid border border-white/12 bg-white/8 p-4">
                  <Icon className="text-prestige-gold" size={22} aria-hidden="true" />
                  <p className="mt-4 font-semibold text-white">{label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

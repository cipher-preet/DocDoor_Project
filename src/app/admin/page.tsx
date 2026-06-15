import { Ambulance, FileText, MapPinned, RadioTower } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { WorkflowCard } from "@/components/dashboard/workflow-card";
import {
  adminMetrics,
  adminNavigation,
  adminWorkflows,
  careTimeline,
  emergencies,
  reports,
} from "@/lib/data/mvp";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      description="Operate families, patients, care assistants, emergency response, reports, and partner workflows from one secure view."
      eyebrow="Luxury healthcare operations"
      navigation={adminNavigation}
      role="Admin"
      title="DocDoor Admin Dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-5" dark>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Realtime visit tracking</h2>
              <p className="mt-1 text-sm text-white/68">Care assistant, doctor, ambulance, and family notifications.</p>
            </div>
            <RadioTower className="text-[#d8b56a]" size={22} aria-hidden="true" />
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/12 bg-white/8 p-4">
              <p className="text-sm font-semibold text-[#d8b56a]">Live visit</p>
              <h3 className="mt-3 text-2xl font-semibold">Mrs. Sunita Sharma</h3>
              <p className="mt-2 text-sm text-white/70">Care assistant Aman Kaur is on site. Doctor consultation in progress.</p>
              <div className="mt-4 grid gap-2">
                {careTimeline.map((item) => (
                  <div key={item.title} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm">
                    <span>{item.title}</span>
                    <span className="text-[#d8b56a]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div id="visits" className="relative min-h-80 overflow-hidden rounded-lg border border-[#d8b56a]/25 bg-[#07172c]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(216,181,106,.12)_1px,transparent_1px),linear-gradient(rgba(216,181,106,.12)_1px,transparent_1px)] bg-[size:48px_48px]" />
              <div className="absolute left-[20%] top-[54%] h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
              <div className="absolute left-[48%] top-[36%] h-3 w-3 rounded-full bg-[#d8b56a] ring-4 ring-[#d8b56a]/20" />
              <div className="absolute left-[72%] top-[62%] h-3 w-3 rounded-full bg-blue-400 ring-4 ring-blue-400/20" />
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/12 bg-white/10 px-3 py-2 text-sm text-white/82 backdrop-blur">
                <MapPinned className="mr-2 inline text-[#d8b56a]" size={16} aria-hidden="true" />
                GPS verified routes
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5" id="emergency">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Emergency workflow</h2>
            <Ambulance className="text-red-600" size={22} aria-hidden="true" />
          </div>
          <div className="grid gap-3">
            {emergencies.map((incident) => (
              <article key={incident.id} className="rounded-lg border border-red-100 bg-red-50/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{incident.id}</h3>
                  <StatusBadge label={incident.severity} tone={incident.severity === "Critical" ? "danger" : "warning"} />
                </div>
                <p className="mt-2 text-sm text-[#5f6b7a]">{incident.patient}</p>
                <p className="mt-3 text-sm font-semibold text-red-700">{incident.eta}</p>
              </article>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-5" id="reports">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="text-[#b88a2c]" size={20} aria-hidden="true" />
            <h2 className="text-xl font-semibold">Reports management</h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white/70">
            {reports.map((report) => (
              <div key={`${report.name}-${report.owner}`} className="grid gap-2 border-b border-slate-100 px-4 py-3 last:border-b-0 md:grid-cols-[1fr_1fr_auto] md:items-center">
                <div>
                  <p className="font-semibold">{report.name}</p>
                  <p className="text-sm text-[#5f6b7a]">{report.owner}</p>
                </div>
                <p className="text-sm text-[#5f6b7a]">{report.source}</p>
                <StatusBadge label={report.status} tone={report.status === "Review" ? "warning" : "success"} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="mb-4 text-xl font-semibold">MVP modules</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {adminWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.title} {...workflow} />
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardShell>
  );
}

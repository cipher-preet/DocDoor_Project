import { CalendarDays, FileText, HeartPulse } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { WorkflowCard } from "@/components/dashboard/workflow-card";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  hospitalMetrics,
  hospitalNavigation,
  hospitalSchedule,
  hospitalWorkflows,
  reports,
} from "@/lib/data/mvp";

export default function HospitalDashboardPage() {
  return (
    <DashboardShell
      description="Partner hospital dashboard for appointments, report uploads, patient handoff, and escalation visibility."
      eyebrow="Verified hospital partner"
      navigation={hospitalNavigation}
      role="Hospital"
      title="Hospital Dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {hospitalMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <GlassCard className="p-5" id="schedule">
          <div className="mb-5 flex items-center gap-2">
            <CalendarDays className="text-[#b88a2c]" size={21} aria-hidden="true" />
            <h2 className="text-xl font-semibold">Today care schedule</h2>
          </div>
          <div className="grid gap-3">
            {hospitalSchedule.map((item) => (
              <article key={`${item.patient}-${item.time}`} className="grid gap-3 rounded-lg border border-white/80 bg-white/70 p-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
                <div>
                  <p className="font-semibold">{item.patient}</p>
                  <p className="text-sm text-[#5f6b7a]">{item.doctor}</p>
                </div>
                <p className="text-sm font-semibold text-[#06162d]">{item.time}</p>
                <StatusBadge label={item.status} tone={item.status === "Pending" ? "warning" : item.status === "In transit" ? "info" : "success"} />
              </article>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5" dark>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Patient handoff</h2>
              <p className="mt-1 text-sm text-white/68">Hospital updates are mirrored to family, patient, and care assistant apps.</p>
            </div>
            <HeartPulse className="text-[#d8b56a]" size={24} aria-hidden="true" />
          </div>
          <div className="grid gap-3">
            {["Doctor arrived", "Consultation completed", "Prescription shared", "Follow-up booked"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d8b56a] text-sm font-semibold text-[#06162d]">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold">{step}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassCard className="p-5" id="reports">
          <div className="mb-5 flex items-center gap-2">
            <FileText className="text-[#b88a2c]" size={21} aria-hidden="true" />
            <h2 className="text-xl font-semibold">Report upload queue</h2>
          </div>
          <div className="grid gap-3">
            {reports.map((report) => (
              <article key={`${report.name}-${report.source}`} className="rounded-lg border border-white/80 bg-white/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{report.name}</p>
                    <p className="mt-1 text-sm text-[#5f6b7a]">{report.owner}</p>
                  </div>
                  <StatusBadge label={report.status} tone={report.status === "Review" ? "warning" : "success"} />
                </div>
              </article>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="mb-4 text-xl font-semibold">Hospital MVP modules</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {hospitalWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.title} {...workflow} />
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardShell>
  );
}

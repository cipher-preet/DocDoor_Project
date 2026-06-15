import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { GlassCard } from "./glass-card";
import { Badge } from "./badge";

type DashboardMetricCardProps = {
  className?: string;
  delta?: string;
  icon: LucideIcon;
  label: string;
  tone?: "danger" | "gold" | "info" | "success" | "warning";
  value: string;
};

const iconToneClasses = {
  danger: "bg-red-50 text-red-600",
  gold: "bg-prestige-gold/16 text-gold-strong",
  info: "bg-blue-50 text-blue-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
};

export function DashboardMetricCard({ className, delta, icon: Icon, label, tone = "gold", value }: DashboardMetricCardProps) {
  return (
    <GlassCard as="article" className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-grey">{label}</p>
          <strong className="mt-3 block text-3xl font-semibold text-midnight-950">{value}</strong>
        </div>
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-liquid", iconToneClasses[tone])}>
          <Icon size={21} aria-hidden="true" />
        </div>
      </div>
      {delta ? (
        <Badge className="mt-4" icon={<ArrowUpRight size={13} aria-hidden="true" />} tone={tone}>
          {delta}
        </Badge>
      ) : null}
    </GlassCard>
  );
}

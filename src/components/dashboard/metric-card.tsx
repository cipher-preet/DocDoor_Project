import { StatusBadge } from "@/components/ui/status-badge";

type MetricCardProps = {
  helper: string;
  label: string;
  tone: "danger" | "info" | "success" | "warning";
  value: string;
};

export function MetricCard({ helper, label, tone, value }: MetricCardProps) {
  return (
    <article className="glass-panel rounded-lg p-4">
      <p className="text-sm font-semibold text-[#5f6b7a]">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <strong className="text-3xl font-semibold text-[#06162d]">{value}</strong>
        <StatusBadge label={helper} tone={tone} />
      </div>
    </article>
  );
}

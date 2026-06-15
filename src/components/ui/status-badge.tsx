import { Badge } from "./badge";

type StatusBadgeProps = {
  label: string;
  tone?: "danger" | "gold" | "info" | "neutral" | "success" | "warning";
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return <Badge tone={tone}>{label}</Badge>;
}

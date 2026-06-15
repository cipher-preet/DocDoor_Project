import { HeartPulse, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { GlassCard } from "./glass-card";
import { Badge } from "./badge";

type HealthScoreCardProps = {
  className?: string;
  label?: string;
  score: number;
  status?: string;
  trend?: string;
};

export function HealthScoreCard({ className, label = "Health Score", score, status = "Good", trend = "+5 this month" }: HealthScoreCardProps) {
  const normalizedScore = Math.max(0, Math.min(score, 100));

  return (
    <GlassCard className={cn("min-w-0", className)} dark>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white/70">{label}</p>
          <div className="mt-3 flex items-end gap-1">
            <strong className="text-4xl font-semibold text-white">{normalizedScore}</strong>
            <span className="pb-1 text-sm font-semibold text-white/64">/100</span>
          </div>
          <Badge className="mt-3" tone="success">
            {status}
          </Badge>
        </div>
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-white/8">
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: `conic-gradient(#22C55E ${normalizedScore * 3.6}deg, rgba(255,255,255,.14) 0deg)`,
            }}
          />
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-midnight-950 text-prestige-gold">
            <HeartPulse size={24} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-prestige-gold">
        <TrendingUp size={16} aria-hidden="true" />
        {trend}
      </div>
    </GlassCard>
  );
}

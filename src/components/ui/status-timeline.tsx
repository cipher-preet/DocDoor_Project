import { Check, Circle, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type TimelineItem = {
  description?: string;
  label: string;
  meta?: string;
  status?: "completed" | "current" | "pending";
};

type StatusTimelineProps = {
  className?: string;
  items: TimelineItem[];
};

const markerClasses = {
  completed: "bg-emerald-500 text-white",
  current: "bg-prestige-gold text-midnight-950",
  pending: "bg-slate-100 text-slate-grey",
};

export function StatusTimeline({ className, items }: StatusTimelineProps) {
  return (
    <ol className={cn("grid gap-4", className)}>
      {items.map((item, index) => {
        const status = item.status ?? "pending";
        const Icon = status === "completed" ? Check : status === "current" ? Clock3 : Circle;

        return (
          <li key={`${item.label}-${index}`} className="grid grid-cols-[36px_1fr] gap-3">
            <div className="relative grid justify-items-center">
              <span className={cn("z-10 grid h-9 w-9 place-items-center rounded-full shadow-liquid-sm", markerClasses[status])}>
                <Icon size={16} aria-hidden="true" />
              </span>
              {index < items.length - 1 ? <span className="absolute top-9 h-full w-px bg-midnight-900/12" /> : null}
            </div>
            <div className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-midnight-950">{item.label}</p>
                {item.meta ? <span className="text-xs font-semibold text-gold-strong">{item.meta}</span> : null}
              </div>
              {item.description ? <p className="mt-1 text-sm leading-6 text-slate-grey">{item.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

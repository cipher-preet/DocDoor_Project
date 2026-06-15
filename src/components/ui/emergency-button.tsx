import type { ButtonHTMLAttributes } from "react";
import { Siren } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EmergencyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  sublabel?: string;
};

export function EmergencyButton({ className, label = "SOS", sublabel = "Emergency Help", type = "button", ...props }: EmergencyButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring group relative grid h-44 w-44 place-items-center rounded-full border-8 border-red-200 bg-red-600 text-white shadow-[0_0_0_18px_rgba(220,38,38,.08),0_24px_70px_rgba(220,38,38,.35)] transition hover:scale-[1.02] hover:bg-red-700",
        className,
      )}
      type={type}
      {...props}
    >
      <span className="absolute inset-5 rounded-full border border-white/22" />
      <span className="grid place-items-center gap-1">
        <Siren size={28} aria-hidden="true" />
        <strong className="text-3xl font-semibold">{label}</strong>
        <span className="text-sm font-semibold text-white/86">{sublabel}</span>
      </span>
    </button>
  );
}

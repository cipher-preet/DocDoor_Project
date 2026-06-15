import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  dark?: boolean;
  padded?: boolean;
};

export function GlassCard({ as: Component = "section", children, className, dark = false, padded = true, ...props }: GlassCardProps) {
  return (
    <Component
      className={cn(
        dark
          ? "liquid-glass-dark bg-[#102542] text-white shadow-liquid-lg"
          : "liquid-glass bg-white/70 text-midnight-950",
        "rounded-liquid",
        padded && "p-5",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

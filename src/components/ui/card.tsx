import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  padded?: boolean;
};

export function Card({ as: Component = "section", children, className, padded = true, ...props }: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-liquid border border-midnight-900/10 bg-white text-midnight-950 shadow-liquid-sm",
        padded && "p-5",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

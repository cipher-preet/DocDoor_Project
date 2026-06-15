import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "danger" | "ghost" | "gold" | "midnight" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  danger: "bg-red-600 text-white shadow-liquid-sm hover:bg-red-700",
  ghost: "border border-white/70 bg-white/40 text-midnight-950 hover:bg-white/70",
  gold: "bg-prestige-gold text-midnight-950 shadow-liquid-sm hover:bg-gold-strong hover:text-white",
  midnight: "bg-midnight-950 text-white shadow-liquid-sm hover:bg-midnight-900",
  secondary: "border border-midnight-900/12 bg-white/78 text-midnight-950 shadow-liquid-sm hover:bg-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "h-12 px-5 text-base",
  md: "h-10 px-4 text-sm",
  sm: "h-9 px-3 text-xs",
};

export function Button({
  children,
  className,
  disabled,
  iconLeft,
  iconRight,
  isLoading = false,
  size = "md",
  type = "button",
  variant = "midnight",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-liquid font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-55",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}

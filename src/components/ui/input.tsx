import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  iconLeft?: ReactNode;
  label?: string;
};

export function Input({ className, error, hint, iconLeft, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-midnight-950" htmlFor={inputId}>
      {label}
      <span className="relative block">
        {iconLeft ? <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-grey">{iconLeft}</span> : null}
        <input
          className={cn(
            "focus-ring h-12 w-full rounded-liquid border border-midnight-900/10 bg-white/78 px-3 text-base text-midnight-950 shadow-liquid-sm placeholder:text-slate-grey/65",
            iconLeft && "pl-10",
            error && "border-red-300 bg-red-50/60",
            className,
          )}
          id={inputId}
          {...props}
        />
      </span>
      {error ? <span className="text-xs font-semibold text-red-600">{error}</span> : null}
      {!error && hint ? <span className="text-xs font-medium text-slate-grey">{hint}</span> : null}
    </label>
  );
}

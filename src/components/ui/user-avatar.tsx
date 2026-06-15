import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type UserAvatarProps = {
  alt?: string;
  className?: string;
  imageUrl?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  status?: "away" | "offline" | "online";
};

const sizeClasses = {
  lg: "h-14 w-14 text-base",
  md: "h-11 w-11 text-sm",
  sm: "h-8 w-8 text-xs",
};

const statusClasses = {
  away: "bg-amber-400",
  offline: "bg-slate-300",
  online: "bg-emerald-400",
};

export function UserAvatar({ alt, className, imageUrl, name = "", size = "md", status }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center overflow-hidden rounded-full border border-white/80 bg-midnight-950 font-semibold text-white shadow-liquid-sm",
          sizeClasses[size],
        )}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={alt ?? name} className="h-full w-full object-cover" src={imageUrl} />
        ) : initials ? (
          initials
        ) : (
          <UserRound size={size === "lg" ? 24 : 18} aria-hidden="true" />
        )}
      </span>
      {status ? (
        <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white", statusClasses[status])} />
      ) : null}
    </span>
  );
}

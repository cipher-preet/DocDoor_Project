import { cn } from "@/lib/utils/cn";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
};

const sizeStyles = {
  sm: {
    icon: "h-11 w-11",
    lockup: "gap-3",
    rule: "w-5",
    tagline: "text-[9px]",
    wordmark: "text-2xl",
  },
  md: {
    icon: "h-16 w-16",
    lockup: "gap-4",
    rule: "w-6",
    tagline: "text-[10px]",
    wordmark: "text-[34px]",
  },
  lg: {
    icon: "h-20 w-20",
    lockup: "gap-5",
    rule: "w-8",
    tagline: "text-xs",
    wordmark: "text-[44px]",
  },
} as const;

export function BrandMark({ className, compact = false, size = "md", tone = "dark" }: BrandMarkProps) {
  const styles = sizeStyles[size];
  const wordmarkTone = tone === "dark" ? "text-white" : "text-midnight-950";
  const taglineTone = tone === "dark" ? "text-white" : "text-midnight-950";

  return (
    <div aria-label="DocDoor, Care Beyond Distance" className={cn("flex items-center", styles.lockup, className)} role="img">
      <DocDoorIcon className={styles.icon} />
      {compact ? (
        <span className="sr-only">DocDoor, Care Beyond Distance</span>
      ) : (
        <div className="min-w-0">
          <p
            className={cn("font-bold leading-none tracking-normal", styles.wordmark, wordmarkTone)}
            style={{ fontFamily: "Montserrat, Inter, Arial, sans-serif" }}
          >
            Doc<span className="text-prestige-gold">Door</span>
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className={cn("h-px shrink-0 bg-prestige-gold", styles.rule)} />
            <p
              className={cn("whitespace-nowrap font-bold uppercase leading-none tracking-normal", styles.tagline, taglineTone)}
              style={{ fontFamily: "Montserrat, Inter, Arial, sans-serif" }}
            >
              Care Beyond Distance
            </p>
            <span className={cn("h-px shrink-0 bg-prestige-gold", styles.rule)} />
          </div>
        </div>
      )}
    </div>
  );
}

function DocDoorIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0 overflow-visible drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]", className)}
      fill="none"
      viewBox="0 0 112 112"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="docdoor-cross-gold" x1="18" x2="80" y1="16" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4D683" />
          <stop offset="0.42" stopColor="#D8B56A" />
          <stop offset="1" stopColor="#B8872D" />
        </linearGradient>
        <linearGradient id="docdoor-door-navy" x1="58" x2="102" y1="31" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#173459" />
          <stop offset="1" stopColor="#102542" />
        </linearGradient>
        <linearGradient id="docdoor-door-edge" x1="54" x2="100" y1="24" y2="84" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#AEB8C5" />
        </linearGradient>
      </defs>

      <path
        d="M39 15.5H58C62.9706 15.5 67 19.5294 67 24.5V40.5H83C87.9706 40.5 92 44.5294 92 49.5V62.5C92 67.4706 87.9706 71.5 83 71.5H67V87.5C67 92.4706 62.9706 96.5 58 96.5H39C34.0294 96.5 30 92.4706 30 87.5V71.5H14C9.02944 71.5 5 67.4706 5 62.5V49.5C5 44.5294 9.02944 40.5 14 40.5H30V24.5C30 19.5294 34.0294 15.5 39 15.5Z"
        fill="url(#docdoor-cross-gold)"
      />
      <path
        d="M40 16.5H57.5C61.9183 16.5 65.5 20.0817 65.5 24.5V41.5H82.5C86.9183 41.5 90.5 45.0817 90.5 49.5V62.5C90.5 66.9183 86.9183 70.5 82.5 70.5H65.5V87.5C65.5 91.9183 61.9183 95.5 57.5 95.5H40C35.5817 95.5 32 91.9183 32 87.5V70.5H15C10.5817 70.5 7 66.9183 7 62.5V49.5C7 45.0817 10.5817 41.5 15 41.5H32V24.5C32 20.0817 35.5817 16.5 40 16.5Z"
        stroke="#F8F4EC"
        strokeOpacity="0.16"
      />

      <path d="M55 35.5L98 19.5V94L55 78.5V35.5Z" fill="url(#docdoor-door-navy)" />
      <path d="M55 35.5L98 19.5V94L55 78.5V35.5Z" stroke="url(#docdoor-door-edge)" strokeLinejoin="round" strokeWidth="2.75" />
      <path d="M55 35.5V78.5" stroke="#F8F4EC" strokeLinecap="round" strokeWidth="3" />
      <path d="M98 19.5L105 24V89L98 94V19.5Z" fill="#102542" opacity="0.72" />
      <path d="M98 19.5L105 24V89L98 94" stroke="#5F6B7A" strokeLinejoin="round" strokeWidth="1.4" />
      <circle cx="82" cy="58" fill="#F8F4EC" r="4.2" />
      <circle cx="82" cy="58" fill="#102542" opacity="0.14" r="2" />
    </svg>
  );
}

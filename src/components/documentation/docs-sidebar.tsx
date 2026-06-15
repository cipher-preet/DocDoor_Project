"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BrandMark } from "@/components/ui";
import { documentationNavGroups } from "@/lib/documentation/docs";
import { cn } from "@/lib/utils/cn";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="midnight-panel rounded-liquid p-5 text-white shadow-liquid-lg lg:min-h-[calc(100vh-40px)]">
        <BrandMark />

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prestige-gold">Documentation</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight">DocDoor Software Guide</h1>
          <p className="mt-3 text-sm leading-6 text-white/68">
            Investor-ready product and technical documentation for each interface in the DocDoor ecosystem.
          </p>
        </div>

        <nav className="mt-8 grid gap-6" aria-label="Documentation navigation">
          {documentationNavGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/42">{group.label}</p>
              <div className="grid gap-1">
                {group.items.map(({ href, icon: Icon, label }) => {
                  const active = pathname === href;

                  return (
                    <Link
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring flex items-center justify-between gap-3 rounded-liquid border px-3 py-3 text-sm font-semibold transition",
                        active
                          ? "border-prestige-gold/60 bg-prestige-gold/18 text-white"
                          : "border-white/8 bg-white/5 text-white/76 hover:border-prestige-gold/35 hover:bg-white/10 hover:text-white",
                      )}
                      href={href}
                      key={href}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon className={active ? "text-prestige-gold" : "text-white/54"} size={17} aria-hidden="true" />
                        <span className="truncate">{label}</span>
                      </span>
                      {active ? <ArrowRight className="shrink-0 text-prestige-gold" size={15} aria-hidden="true" /> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-8 rounded-liquid border border-prestige-gold/30 bg-white/8 p-4">
          <p className="font-semibold text-prestige-gold">Live product routes</p>
          <div className="mt-3 grid gap-2 text-sm">
            {[
              { href: "/family", label: "Family App" },
              { href: "/patient", label: "Patient App" },
              { href: "/doctor-prescription", label: "Doctor Voice Rx" },
              { href: "/admin", label: "Admin Dashboard" },
              { href: "/hospital", label: "Hospital Dashboard" },
            ].map((item) => (
              <Link className="flex items-center justify-between text-white/74 transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
                <ExternalLink size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

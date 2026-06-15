import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type SidebarNavProps = {
  description: string;
  items: NavigationItem[];
  title: string;
};

export function SidebarNav({ description, items, title }: SidebarNavProps) {
  return (
    <aside className="midnight-panel flex min-h-screen flex-col justify-between px-5 py-6 text-white lg:sticky lg:top-0">
      <div>
        <BrandMark />
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b56a]">DocDoor MVP</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">{title}</h2>
          <p className="mt-4 text-sm leading-6 text-white/72">{description}</p>
        </div>
        <nav className="mt-10 grid gap-2" aria-label="Dashboard navigation">
          {items.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              className="focus-ring flex items-center gap-3 rounded-lg border border-white/10 px-3 py-3 text-sm font-semibold text-white/82 transition hover:border-[#d8b56a]/45 hover:bg-white/10"
            >
              <Icon className="text-[#d8b56a]" size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="rounded-lg border border-[#d8b56a]/35 bg-white/8 p-4 text-sm leading-6 text-white/78">
        <p className="font-semibold text-[#d8b56a]">Care Beyond Distance</p>
        <p className="mt-2">Premium coordination, live accountability, and secure healthcare workflows for families.</p>
      </div>
    </aside>
  );
}

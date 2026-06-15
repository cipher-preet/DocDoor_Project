import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bell, LogOut, Search } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type DashboardShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  navigation: NavigationItem[];
  role: "Admin" | "Hospital";
  title: string;
};

export function DashboardShell({ children, description, eyebrow, navigation, role, title }: DashboardShellProps) {
  return (
    <main className="liquid-page min-h-screen text-[#06162d]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <SidebarNav description={description} items={navigation} title={role === "Admin" ? "Admin command center" : "Hospital partner hub"} />
        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 rounded-lg border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b88a2c]">{eyebrow}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[#06162d]">{title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative h-10 min-w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6b7a]" size={16} aria-hidden="true" />
                <input
                  className="focus-ring h-full w-full rounded-lg border border-white/75 bg-white/80 pl-9 pr-3 text-sm text-[#06162d] shadow-sm"
                  placeholder="Search patients, visits, reports..."
                />
              </label>
              <button className="focus-ring inline-flex h-10 items-center justify-center rounded-lg border border-white/75 bg-white/80 px-3 text-[#06162d] shadow-sm">
                <Bell size={17} aria-hidden="true" />
              </button>
              <Link
                href="/login"
                className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-[#06162d] px-3 text-sm font-semibold text-white shadow-sm"
              >
                <LogOut size={16} aria-hidden="true" />
                {role}
              </Link>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}

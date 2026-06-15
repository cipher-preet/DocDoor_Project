import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/documentation/docs-sidebar";

export default function DocumentationLayout({ children }: { children: ReactNode }) {
  return (
    <main className="liquid-page min-h-screen text-midnight-950">
      <div className="mx-auto grid w-full max-w-[1540px] gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <DocsSidebar />
        <section className="min-w-0 pb-10">{children}</section>
      </div>
    </main>
  );
}

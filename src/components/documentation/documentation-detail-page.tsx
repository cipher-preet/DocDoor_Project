import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, Layers3, Palette, Route, ShieldCheck } from "lucide-react";
import { Badge, Card, GlassCard } from "@/components/ui";
import type { DocumentationDetailPage } from "@/lib/documentation/docs";

type DocumentationDetailPageProps = {
  page: DocumentationDetailPage;
};

function SectionHeader({ eyebrow, title, description }: { description: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-strong">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-normal text-midnight-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-grey">{description}</p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li className="flex gap-3 text-sm leading-6 text-slate-grey" key={item}>
          <CheckCircle2 className="mt-0.5 shrink-0 text-gold-strong" size={16} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DocumentationDetailPage({ page }: DocumentationDetailPageProps) {
  return (
    <div className="grid gap-6">
      <GlassCard dark className="p-6 lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_360px] xl:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-prestige-gold">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-white">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/74">{page.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge tone="gold">{page.interfaceType}</Badge>
              {page.demoHref ? (
                <Link
                  className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-liquid border border-white/18 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                  href={page.demoHref}
                >
                  {page.demoLabel ?? "Open demo"}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3">
            {page.heroStats.map((stat) => (
              <div className="rounded-liquid border border-white/12 bg-white/8 p-4" key={stat.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/52">{stat.label}</p>
                <p className="mt-2 text-xl font-semibold text-prestige-gold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-4 md:grid-cols-3">
        {page.outcomes.map((outcome) => (
          <Card className="p-5" key={outcome}>
            <ShieldCheck className="text-emerald-600" size={22} aria-hidden="true" />
            <p className="mt-4 text-sm leading-6 text-slate-grey">{outcome}</p>
          </Card>
        ))}
      </section>

      <section>
        <SectionHeader
          description="This breaks down the interface into product purpose, expected user behavior, screens, and business value."
          eyebrow="Product details"
          title="Interface specification"
        />
        <div className="grid gap-4">
          {page.sections.map((section) => (
            <GlassCard className="p-5" key={section.title}>
              <h3 className="text-2xl font-semibold">{section.title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-grey">{section.description}</p>
              <div className="mt-5">
                <BulletList items={section.points} />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          description="A step-by-step view of how users move through this part of the DocDoor product."
          eyebrow="Workflow"
          title="How the flow works"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {page.workflow.map((step, index) => (
            <GlassCard className="p-5" key={step.title}>
              <div className="flex items-center justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-liquid bg-midnight-950 text-prestige-gold">
                  <Route size={20} aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-gold-strong">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-grey">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Database className="text-gold-strong" size={21} aria-hidden="true" />
            <h2 className="text-2xl font-semibold">Data touchpoints</h2>
          </div>
          <p className="mb-4 text-sm leading-6 text-slate-grey">
            These entities are involved in this flow and should be reflected in API contracts, permissions, and audit trails.
          </p>
          <div className="flex flex-wrap gap-2">
            {page.dataTouchpoints.map((entity) => (
              <Badge key={entity} tone="neutral">
                {entity}
              </Badge>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Palette className="text-gold-strong" size={21} aria-hidden="true" />
            <h2 className="text-2xl font-semibold">Design notes</h2>
          </div>
          <BulletList items={page.designNotes} />
        </GlassCard>
      </section>

      <section>
        <GlassCard className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Layers3 className="text-gold-strong" size={21} aria-hidden="true" />
            <h2 className="text-2xl font-semibold">Implementation notes</h2>
          </div>
          <BulletList items={page.implementationNotes} />
        </GlassCard>
      </section>
    </div>
  );
}

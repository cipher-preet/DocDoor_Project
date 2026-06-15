import type { LucideIcon } from "lucide-react";

type WorkflowCardProps = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export function WorkflowCard({ description, icon: Icon, title }: WorkflowCardProps) {
  return (
    <article className="rounded-lg border border-white/75 bg-white/68 p-4 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff5df] text-[#b88a2c]">
        <Icon size={21} aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-[#06162d]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5f6b7a]">{description}</p>
    </article>
  );
}

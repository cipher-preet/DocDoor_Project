import { Download, FileText, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";

type ReportCardProps = {
  className?: string;
  date: string;
  source: string;
  status?: "attention" | "normal" | "uploaded";
  title: string;
  type: string;
};

const statusTone = {
  attention: "warning",
  normal: "success",
  uploaded: "info",
} as const;

export function ReportCard({ className, date, source, status = "uploaded", title, type }: ReportCardProps) {
  return (
    <Card as="article" className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-liquid bg-prestige-gold/16 text-gold-strong">
            <FileText size={21} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-midnight-950">{title}</h3>
            <p className="text-sm text-slate-grey">{type}</p>
          </div>
        </div>
        <Badge tone={statusTone[status]}>{status}</Badge>
      </div>
      <div className="mt-4 grid gap-1 text-sm text-slate-grey">
        <span>{date}</span>
        <span>{source}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button iconLeft={<UploadCloud size={15} aria-hidden="true" />} size="sm" variant="ghost">
          Replace
        </Button>
        <Button iconLeft={<Download size={15} aria-hidden="true" />} size="sm" variant="midnight">
          Download
        </Button>
      </div>
    </Card>
  );
}

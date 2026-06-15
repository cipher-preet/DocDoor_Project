import { CalendarDays, ChevronRight, Clock3, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { UserAvatar } from "./user-avatar";

type AppointmentCardProps = {
  className?: string;
  doctor: string;
  location: string;
  patient: string;
  specialty?: string;
  status?: "completed" | "confirmed" | "pending";
  time: string;
};

const statusTone = {
  completed: "success",
  confirmed: "info",
  pending: "warning",
} as const;

export function AppointmentCard({
  className,
  doctor,
  location,
  patient,
  specialty = "Consultation",
  status = "confirmed",
  time,
}: AppointmentCardProps) {
  return (
    <Card as="article" className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={doctor} status="online" />
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-midnight-950">{doctor}</h3>
            <p className="text-sm text-slate-grey">{specialty}</p>
          </div>
        </div>
        <Badge tone={statusTone[status]}>{status}</Badge>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-grey">
        <span className="inline-flex items-center gap-2">
          <CalendarDays size={15} aria-hidden="true" />
          {patient}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock3 size={15} aria-hidden="true" />
          {time}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin size={15} aria-hidden="true" />
          {location}
        </span>
      </div>
      <Button className="mt-4 w-full" iconRight={<ChevronRight size={16} aria-hidden="true" />} size="sm" variant="secondary">
        View details
      </Button>
    </Card>
  );
}

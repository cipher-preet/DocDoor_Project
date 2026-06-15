import type { LucideIcon } from "lucide-react";

export type MetricTone = "amber" | "blue" | "emerald" | "rose";

export type DeliveryStatus = "queued" | "otp_pending" | "en_route";

export type MetricCard = {
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
};

export type DeliveryTask = {
  id: string;
  patient: string;
  address: string;
  status: DeliveryStatus;
  eta: string;
  runner: string;
};

export type IntegrationStatus = {
  label: string;
  status: string;
  icon: LucideIcon;
};

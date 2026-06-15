import {
  Activity,
  Ambulance,
  Building2,
  CalendarDays,
  FileText,
  HeartPulse,
  Home,
  MapPinned,
  ShieldCheck,
  Stethoscope,
  UploadCloud,
  UserRound,
  Users,
} from "lucide-react";

type MetricTone = "danger" | "info" | "success" | "warning";

type DashboardMetric = {
  helper: string;
  label: string;
  tone: MetricTone;
  value: string;
};

export const adminMetrics: DashboardMetric[] = [
  { label: "Families onboarded", value: "1,248", helper: "+42 this week", tone: "success" },
  { label: "Live care visits", value: "36", helper: "12 GPS verified", tone: "info" },
  { label: "Open emergencies", value: "2", helper: "1 ambulance en route", tone: "danger" },
  { label: "Pending reports", value: "18", helper: "6 hospital uploads", tone: "warning" },
];

export const hospitalMetrics: DashboardMetric[] = [
  { label: "Assigned patients", value: "328", helper: "44 high priority", tone: "info" },
  { label: "Today appointments", value: "72", helper: "19 teleconsults", tone: "success" },
  { label: "Reports awaiting review", value: "29", helper: "8 critical flags", tone: "warning" },
  { label: "Escalations", value: "4", helper: "2 in progress", tone: "danger" },
];

export const careTimeline = [
  { title: "Care assistant arrived", time: "09:15", status: "verified" },
  { title: "Vitals recorded", time: "09:24", status: "complete" },
  { title: "Doctor consultation started", time: "09:40", status: "live" },
  { title: "Report upload pending", time: "10:10", status: "pending" },
];

export const adminWorkflows = [
  {
    title: "Family coordination",
    description: "Family app access, consent, care timeline, and live notifications.",
    icon: Users,
  },
  {
    title: "Patient care plan",
    description: "Medication, appointments, vitals, emergency contacts, and reports.",
    icon: HeartPulse,
  },
  {
    title: "Care assistant dispatch",
    description: "Route assignment, check-in verification, task notes, and report capture.",
    icon: Home,
  },
  {
    title: "Emergency command",
    description: "SOS intake, ambulance routing, hospital handoff, and family alerts.",
    icon: Ambulance,
  },
];

export const hospitalWorkflows = [
  {
    title: "Doctor visit monitoring",
    description: "Appointment status, live consult notes, and completion confirmation.",
    icon: Stethoscope,
  },
  {
    title: "Reports exchange",
    description: "Secure upload, review queue, tags, and family-visible summaries.",
    icon: UploadCloud,
  },
  {
    title: "Patient admissions",
    description: "Hospital episode tracking, discharge status, and coordinator assignment.",
    icon: Building2,
  },
  {
    title: "Compliance visibility",
    description: "Consent, audit trail, protected report access, and partner accountability.",
    icon: ShieldCheck,
  },
];

export const reports = [
  { name: "Blood Test", owner: "Mrs. Sunita Sharma", source: "Apollo Diagnostics", status: "Normal" },
  { name: "ECG Report", owner: "Mr. Rajinder Singh", source: "Fortis Hospital", status: "Review" },
  { name: "X-Ray Chest", owner: "Mrs. Sunita Sharma", source: "Gomed Lab", status: "Uploaded" },
];

export const emergencies = [
  { id: "SOS-2031", patient: "Mr. Rajinder Singh", severity: "Critical", eta: "Ambulance ETA 12 min" },
  { id: "SOS-2032", patient: "Mrs. Kavita Rao", severity: "Moderate", eta: "Care assistant ETA 18 min" },
];

export const hospitalSchedule = [
  { patient: "Mrs. Sunita Sharma", doctor: "Dr. Anil Sharma", time: "10:30 AM", status: "Confirmed" },
  { patient: "Mr. Rajinder Singh", doctor: "Dr. Neha Malhotra", time: "12:00 PM", status: "In transit" },
  { patient: "Mrs. Kavita Rao", doctor: "Dr. Gagandeep S Sachdeva", time: "04:30 PM", status: "Pending" },
];

export const adminNavigation = [
  { label: "Command", href: "/admin", icon: Activity },
  { label: "Family app", href: "/family", icon: HeartPulse },
  { label: "Patient app", href: "/patient", icon: UserRound },
  { label: "Investor docs", href: "/documentation", icon: FileText },
  { label: "Visits", href: "/admin#visits", icon: MapPinned },
  { label: "Reports", href: "/admin#reports", icon: FileText },
  { label: "Emergencies", href: "/admin#emergency", icon: Ambulance },
];

export const hospitalNavigation = [
  { label: "Overview", href: "/hospital", icon: Building2 },
  { label: "Schedule", href: "/hospital#schedule", icon: CalendarDays },
  { label: "Reports", href: "/hospital#reports", icon: FileText },
  { label: "Escalations", href: "/hospital#emergency", icon: Ambulance },
];

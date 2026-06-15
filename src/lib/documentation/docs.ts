import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  Building2,
  Database,
  FileText,
  Layers3,
  MapPinned,
  Network,
  RadioTower,
  ShieldCheck,
  UploadCloud,
  UserRound,
  Users,
} from "lucide-react";

export type DocumentationNavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export type DocumentationNavGroup = {
  items: DocumentationNavItem[];
  label: string;
};

export type DocumentationSection = {
  description: string;
  points: string[];
  title: string;
};

export type DocumentationDetailPage = {
  dataTouchpoints: string[];
  demoHref?: string;
  demoLabel?: string;
  designNotes: string[];
  eyebrow: string;
  heroStats: Array<{
    label: string;
    value: string;
  }>;
  implementationNotes: string[];
  interfaceType: string;
  outcomes: string[];
  sections: DocumentationSection[];
  slug: string;
  summary: string;
  title: string;
  workflow: Array<{
    description: string;
    title: string;
  }>;
};

export const documentationNavGroups: DocumentationNavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/documentation", icon: FileText, label: "Investor Overview" },
      { href: "/documentation/product-vision", icon: Network, label: "Product Vision" },
      { href: "/documentation/architecture", icon: Layers3, label: "Architecture" },
    ],
  },
  {
    label: "Interfaces",
    items: [
      { href: "/documentation/family-app", icon: Users, label: "Family App" },
      { href: "/documentation/patient-app", icon: UserRound, label: "Patient App" },
      { href: "/documentation/care-assistant-app", icon: MapPinned, label: "Care Assistant App" },
      { href: "/documentation/admin-dashboard", icon: Layers3, label: "Admin Dashboard" },
      { href: "/documentation/hospital-dashboard", icon: Building2, label: "Hospital Dashboard" },
    ],
  },
  {
    label: "Core Systems",
    items: [
      { href: "/documentation/backend-api", icon: Database, label: "Backend APIs" },
      { href: "/documentation/realtime-tracking", icon: RadioTower, label: "Realtime Tracking" },
      { href: "/documentation/emergency-workflow", icon: Ambulance, label: "Emergency Workflow" },
      { href: "/documentation/reports-management", icon: UploadCloud, label: "Reports Management" },
      { href: "/documentation/security-compliance", icon: ShieldCheck, label: "Security & Trust" },
    ],
  },
];

export const documentationPages: DocumentationDetailPage[] = [
  {
    dataTouchpoints: ["User", "FamilyMember", "Patient", "Appointment", "Visit", "Report", "EmergencyRequest", "Notification", "AuditLog"],
    demoHref: "/family",
    demoLabel: "Open Family App Flow",
    designNotes: [
      "Use calm but information-rich cards so family members can scan health and care status quickly.",
      "Prioritize parent switching, live status, and emergency visibility above secondary administrative details.",
      "Use gold for premium actions and trust markers, red only for emergencies, and green for verified completion.",
    ],
    eyebrow: "Interface documentation",
    heroStats: [
      { label: "Primary user", value: "Adult child or family caregiver" },
      { label: "Core need", value: "Remote visibility" },
      { label: "Key action", value: "Track care and respond" },
    ],
    implementationNotes: [
      "Current route: /family uses mock API data from src/lib/api/family.ts.",
      "Backend endpoint target: GET /family-app/overview for dashboard payload.",
      "Mutation targets: POST /family-app/parents, POST /family-app/emergency-requests, GET /family-app/live-updates/next.",
      "Realtime update channel should subscribe to patient-scoped visit, report, medication, and emergency events.",
    ],
    interfaceType: "Mobile-first family coordination workspace",
    outcomes: [
      "Families know what is happening without making repeated phone calls.",
      "Parent health, reports, visits, and emergency status become visible in one trusted place.",
      "Care accountability improves because every visit and update is timestamped.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "The Family App is the control surface for family members who manage care remotely.",
        points: [
          "Add and manage parent profiles with care context, emergency contacts, and health status.",
          "View health scores, upcoming appointments, latest reports, and live care assistant visits.",
          "Trigger emergency requests and receive live updates from the care network.",
        ],
      },
      {
        title: "Primary Screens",
        description: "The interface is organized around the daily questions families ask most often.",
        points: [
          "Parent selector sidebar for quick switching between mother, father, or additional loved ones.",
          "Health overview section with score, trend, conditions, and latest check-in.",
          "Live tracking panel for active care assistant visits and GPS verified progress.",
          "Activity timeline for report upload, vitals, consultation, medication, and emergency events.",
        ],
      },
      {
        title: "Investor Value",
        description: "This interface demonstrates the strongest emotional pain point DocDoor solves.",
        points: [
          "It converts uncertainty into a live coordination layer.",
          "It creates daily retention because families return for health, visits, reports, and alerts.",
          "It opens monetization through premium care plans, verified assistants, partner services, and family subscriptions.",
        ],
      },
    ],
    slug: "family-app",
    summary:
      "The Family App gives remote family members a complete view of elderly parent care: profiles, health scores, appointments, reports, live visits, emergency workflow, and updates.",
    title: "Family App",
    workflow: [
      { title: "Add parent profile", description: "Family enters name, relation, age, city, condition, and emergency context." },
      { title: "Monitor daily care", description: "The app surfaces health score, live visit status, reports, and upcoming appointments." },
      { title: "Respond to events", description: "Family receives live updates and can trigger emergency support when needed." },
      { title: "Review history", description: "The activity timeline keeps care actions traceable and understandable." },
    ],
  },
  {
    dataTouchpoints: ["User", "Patient", "Medication", "Appointment", "Visit", "Report", "Notification", "EmergencyRequest"],
    demoHref: "/patient",
    demoLabel: "Open Patient App Flow",
    designNotes: [
      "Large buttons, clear language, high contrast, and simple section hierarchy are mandatory.",
      "Avoid dense dashboards; the patient should see what to do next, who to call, and how to get help.",
      "Use quick-message buttons to reduce typing burden for elderly users.",
    ],
    eyebrow: "Interface documentation",
    heroStats: [
      { label: "Primary user", value: "Elderly patient" },
      { label: "Core need", value: "Simple daily support" },
      { label: "Key action", value: "Get help quickly" },
    ],
    implementationNotes: [
      "Current route: /patient uses mock API data from src/lib/api/patient.ts.",
      "Backend endpoint target: GET /patient-app/overview.",
      "Mutation targets: POST /patient-app/calls/care-assistant, POST /patient-app/messages, POST /patient-app/reports, POST /patient-app/emergency-requests.",
      "Accessibility should be tested with keyboard navigation, screen reader labels, touch target sizing, and contrast checks.",
    ],
    interfaceType: "Senior-friendly patient care app",
    outcomes: [
      "Patients understand today's care plan without confusion.",
      "Medication adherence improves through clear reminders.",
      "Emergency and support actions are reachable without navigating deep menus.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "The Patient App gives elderly users the simplest possible way to follow their care day.",
        points: [
          "Show today's care plan, medications, upcoming visits, reports, and support contacts.",
          "Offer large direct actions for calling care assistant, messaging doctor or family, and requesting emergency help.",
          "Provide reassurance through action confirmations and visible activity history.",
        ],
      },
      {
        title: "Primary Screens",
        description: "Patient flow prioritizes clarity and confidence over operational density.",
        points: [
          "Hero section with patient identity, emergency contact, and two primary actions.",
          "Care plan timeline showing what is due now and what comes next.",
          "Medication cards with time, dose, and plain-language instructions.",
          "Message panel with selectable recipients and quick messages.",
        ],
      },
      {
        title: "Accessibility Requirements",
        description: "The interface is designed for seniors and must be forgiving.",
        points: [
          "Use readable type, large action controls, simple labels, and generous spacing.",
          "Avoid ambiguous icons without text labels.",
          "Confirm every action in an aria-live announcement area.",
        ],
      },
    ],
    slug: "patient-app",
    summary:
      "The Patient App is a simplified daily care interface for elderly users, covering care plan, medications, visits, reports, messaging, and emergency help.",
    title: "Patient App",
    workflow: [
      { title: "Start the day", description: "Patient sees care plan, health score, medicines due, and upcoming visits." },
      { title: "Ask for support", description: "Patient calls care assistant or sends a quick message to doctor or family." },
      { title: "Upload reports", description: "Patient can add reports directly when a new document is available." },
      { title: "Request emergency help", description: "SOS alerts care assistant, family, ambulance, and operations workflow." },
    ],
  },
  {
    dataTouchpoints: ["CareAssistant", "Visit", "Patient", "Report", "LiveTrackingSession", "Notification", "AuditLog"],
    demoHref: "/admin#visits",
    demoLabel: "View Live Visit Preview",
    designNotes: [
      "The assistant app should behave like a task checklist, not a generic dashboard.",
      "Every screen should answer: where do I go, what do I do, what must I capture, and who gets notified?",
      "Offline-aware task capture should be considered for poor connectivity during home visits.",
    ],
    eyebrow: "Interface documentation",
    heroStats: [
      { label: "Primary user", value: "Care assistant" },
      { label: "Core need", value: "Verified tasks" },
      { label: "Key action", value: "Check in and update" },
    ],
    implementationNotes: [
      "Care assistant route is currently represented in MVP via mobile flow and admin live visit preview.",
      "Backend target: GET /care-assistant-app/today, PATCH /visits/:id/status, POST /visits/:id/tasks, POST /reports.",
      "Location updates should stream through Socket.io into LiveTrackingSession records.",
      "Photo/report upload should use signed URLs for S3-compatible storage.",
    ],
    interfaceType: "Task-driven field operations app",
    outcomes: [
      "Care visits become auditable and time-stamped.",
      "Families and admins receive verified live status instead of manual updates.",
      "Assistants follow consistent care protocols across home, hospital, and diagnostic tasks.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "The Care Assistant App is the human execution layer behind DocDoor's promise.",
        points: [
          "Display assigned visits, patient context, location, task checklist, and required documentation.",
          "Enable GPS check-in, task completion, report capture, notes, and escalation.",
          "Share verified updates with family, patient, admin, and hospital stakeholders.",
        ],
      },
      {
        title: "Primary Screens",
        description: "The app should be optimized for field movement and fast completion.",
        points: [
          "Today's visits list with status and ETA.",
          "Visit detail with patient, address, tasks, care instructions, and call buttons.",
          "Live tracking and check-in verification.",
          "Report upload and visit summary capture.",
        ],
      },
      {
        title: "Quality Controls",
        description: "The care assistant workflow is where trust becomes operational.",
        points: [
          "Location verification records arrival and departure.",
          "Task completion requires explicit confirmation.",
          "Every note, upload, and escalation writes to the audit trail.",
        ],
      },
    ],
    slug: "care-assistant-app",
    summary:
      "The Care Assistant App coordinates on-ground care: visit assignment, GPS check-in, task completion, notes, uploads, and live family updates.",
    title: "Care Assistant App",
    workflow: [
      { title: "Receive visit", description: "Assistant sees patient, time, location, service type, and required tasks." },
      { title: "Navigate and check in", description: "Assistant shares route status and verifies arrival with GPS." },
      { title: "Complete tasks", description: "Vitals, medication support, report pickup, or accompaniment tasks are marked complete." },
      { title: "Upload summary", description: "Visit report, notes, photos, and recommendations are shared with the care network." },
    ],
  },
  {
    dataTouchpoints: ["User", "Patient", "FamilyMember", "CareAssistant", "Appointment", "Visit", "EmergencyRequest", "Report", "Notification", "AuditLog"],
    demoHref: "/admin",
    demoLabel: "Open Admin Dashboard",
    designNotes: [
      "Admin UI should be dense but calm, with clear triage priority and operational ownership.",
      "Critical states must be visible without visual noise.",
      "Cards and tables should support scanning by patient, severity, time, and owner.",
    ],
    eyebrow: "Interface documentation",
    heroStats: [
      { label: "Primary user", value: "Operations team" },
      { label: "Core need", value: "Command center" },
      { label: "Key action", value: "Coordinate care" },
    ],
    implementationNotes: [
      "Current route: /admin.",
      "Backend target modules: users, patients, visits, reports, emergencies, notifications, partners, audit logs.",
      "Realtime dashboard should subscribe to emergency, visit, and report channels.",
      "Admin actions should be permission-scoped and audit logged.",
    ],
    interfaceType: "Internal operations dashboard",
    outcomes: [
      "Ops team can see live care status and intervene quickly.",
      "Reports, emergencies, visits, and partner workflows are managed from one command center.",
      "The platform can scale operations across cities and partner networks.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "The Admin Dashboard is the command center for DocDoor operations.",
        points: [
          "Monitor families, patients, care visits, reports, and emergencies.",
          "Coordinate care assistants, partner hospitals, diagnostic uploads, and family notifications.",
          "Maintain accountability through audit logs and status transitions.",
        ],
      },
      {
        title: "Primary Views",
        description: "The MVP admin dashboard focuses on the highest operational risk areas.",
        points: [
          "Realtime visit tracking panel.",
          "Emergency workflow queue.",
          "Reports management section.",
          "MVP modules overview for family, patient, assistant, and emergency workflows.",
        ],
      },
      {
        title: "Operational Controls",
        description: "Admin users need tools for triage, ownership, and follow-through.",
        points: [
          "Assign or reassign care assistants.",
          "Escalate emergency requests to ambulance or hospital partners.",
          "Review pending reports and notify families.",
        ],
      },
    ],
    slug: "admin-dashboard",
    summary:
      "The Admin Dashboard is DocDoor's operations command center for live visits, reports, emergencies, family coordination, and partner workflows.",
    title: "Admin Dashboard",
    workflow: [
      { title: "Monitor metrics", description: "Ops scans onboarded families, live visits, open emergencies, and pending reports." },
      { title: "Track live visits", description: "Ops views GPS verified care assistant and patient status." },
      { title: "Manage incidents", description: "Emergency cases are triaged and escalated." },
      { title: "Close the loop", description: "Reports, summaries, notifications, and audit logs complete the workflow." },
    ],
  },
  {
    dataTouchpoints: ["Hospital", "Doctor", "Patient", "Appointment", "Report", "Visit", "EmergencyRequest", "AuditLog"],
    demoHref: "/hospital",
    demoLabel: "Open Hospital Dashboard",
    designNotes: [
      "Hospital UI must feel like a partner operations workspace, not a marketing page.",
      "Focus on schedule, reports, patient handoff, and escalation status.",
      "Use restrained status badges for confirmed, pending, in transit, reviewed, and escalated states.",
    ],
    eyebrow: "Interface documentation",
    heroStats: [
      { label: "Primary user", value: "Hospital partner" },
      { label: "Core need", value: "Patient handoff" },
      { label: "Key action", value: "Review and update" },
    ],
    implementationNotes: [
      "Current route: /hospital.",
      "Backend target: GET /hospital/dashboard, GET /hospital/schedule, POST /hospital/reports, PATCH /appointments/:id/status.",
      "Hospital updates should publish notifications to family, patient, and admin channels.",
      "Partner-level permissions should limit access to only assigned patients and records.",
    ],
    interfaceType: "Partner provider dashboard",
    outcomes: [
      "Hospitals can collaborate without replacing their internal systems.",
      "Families receive timely updates about appointments, reports, and handoffs.",
      "DocDoor becomes the patient coordination layer around provider workflows.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "The Hospital Dashboard gives provider partners a focused way to coordinate with DocDoor.",
        points: [
          "View assigned patients, today appointments, report review queue, and escalations.",
          "Upload reports and update consultation or handoff status.",
          "Share verified hospital events with families and operations.",
        ],
      },
      {
        title: "Primary Views",
        description: "The MVP focuses on schedule and report exchange.",
        points: [
          "Today care schedule for patient appointments.",
          "Patient handoff checklist.",
          "Report upload queue.",
          "Hospital MVP modules for reports, admissions, compliance, and doctor visits.",
        ],
      },
      {
        title: "Partner Value",
        description: "DocDoor can become a coordination source for hospital-linked elder care.",
        points: [
          "Reduces family follow-up load on hospital staff.",
          "Creates a structured report and update channel.",
          "Makes partner performance and patient experience easier to measure.",
        ],
      },
    ],
    slug: "hospital-dashboard",
    summary:
      "The Hospital Dashboard supports partner hospitals with appointment schedule, patient handoff, report upload, and escalation visibility.",
    title: "Hospital Dashboard",
    workflow: [
      { title: "View schedule", description: "Hospital team sees assigned appointments and status." },
      { title: "Update handoff", description: "Doctor arrival, consultation completion, prescription, and follow-up are marked." },
      { title: "Upload reports", description: "Reports are added to the shared patient record." },
      { title: "Notify network", description: "Updates flow to family, patient, care assistant, and admin dashboards." },
    ],
  },
  {
    dataTouchpoints: ["User", "Patient", "FamilyMember", "Doctor", "Hospital", "CareAssistant", "Appointment", "Visit", "Report", "Medication", "EmergencyRequest", "AmbulanceRequest", "LiveTrackingSession", "SubscriptionPlan", "Payment", "Notification", "AuditLog"],
    demoHref: "/admin",
    demoLabel: "View API-Backed Surfaces",
    designNotes: [
      "API contracts should align with product modules rather than leaking database complexity into the UI.",
      "Every mutation that affects care status should create an audit log entry.",
      "Mock API functions already mirror future backend endpoint boundaries.",
    ],
    eyebrow: "System documentation",
    heroStats: [
      { label: "Backend stack", value: "NestJS + Prisma" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Auth", value: "JWT + OTP" },
    ],
    implementationNotes: [
      "Backend repository: docdoor-backend-api.",
      "Prisma schema should remain the source of truth for relational models and migrations.",
      "Use DTO validation, service-layer authorization, and Prisma transactions for multi-entity workflows.",
      "Expose REST APIs first, then add event streams for visit, notification, emergency, and report events.",
    ],
    interfaceType: "API and data foundation",
    outcomes: [
      "One backend supports every DocDoor interface.",
      "Care actions become structured, queryable, and auditable.",
      "The platform can connect storage, realtime tracking, payments, maps, and notifications cleanly.",
    ],
    sections: [
      {
        title: "API Modules",
        description: "The backend should be organized by care domain.",
        points: [
          "Auth: OTP request, OTP verify, JWT refresh, role-aware session.",
          "Patients and families: profiles, relationships, consent, care plan summary.",
          "Visits and appointments: booking, status transitions, assignment, live tracking.",
          "Reports and medications: uploads, metadata, prescriptions, reminders.",
          "Emergencies: SOS intake, ambulance request, escalation, notifications.",
        ],
      },
      {
        title: "Database Model",
        description: "PostgreSQL should model the care network and its history.",
        points: [
          "Users represent authenticated identities with roles.",
          "Patients link to family members, doctors, hospitals, visits, medications, reports, and emergencies.",
          "AuditLog records sensitive actions and care status changes.",
        ],
      },
      {
        title: "Production Concerns",
        description: "Healthcare coordination needs reliability and traceability.",
        points: [
          "Use signed upload URLs for report files.",
          "Use transactions for emergency workflows and payment state changes.",
          "Use idempotency keys for payment, notification, and emergency operations.",
        ],
      },
    ],
    slug: "backend-api",
    summary:
      "The backend API and database model power the DocDoor ecosystem: authentication, patients, family, visits, reports, emergencies, subscriptions, payments, notifications, and audits.",
    title: "Backend APIs and Database",
    workflow: [
      { title: "Authenticate", description: "OTP verifies phone ownership and JWT carries role context." },
      { title: "Fetch care workspace", description: "Each app loads a role-specific overview payload." },
      { title: "Mutate care state", description: "Bookings, visits, reports, messages, and emergencies update relational records." },
      { title: "Emit events", description: "Realtime and notification services publish state changes to the right users." },
    ],
  },
  {
    dataTouchpoints: ["LiveTrackingSession", "Visit", "CareAssistant", "EmergencyRequest", "Notification", "AuditLog"],
    demoHref: "/admin#visits",
    demoLabel: "View Tracking Preview",
    designNotes: [
      "Realtime state should be visible but not overwhelming.",
      "Use maps and timelines together: location shows where, timeline explains what happened.",
      "Sensitive location sharing should be consent and role aware.",
    ],
    eyebrow: "System documentation",
    heroStats: [
      { label: "Realtime", value: "Socket.io" },
      { label: "Notifications", value: "FCM" },
      { label: "Maps", value: "Mapbox/Google" },
    ],
    implementationNotes: [
      "Use Socket.io channels scoped by visit id and authorized user id.",
      "Persist important state changes in LiveTrackingSession and AuditLog rather than relying only on socket events.",
      "Mobile apps should throttle GPS updates to balance accuracy and battery.",
      "Fallback to notification events when socket clients are disconnected.",
    ],
    interfaceType: "Realtime care visibility layer",
    outcomes: [
      "Families know whether care has started, where the assistant is, and what status changed.",
      "Operations can monitor active visits and emergency movement.",
      "The platform turns care work into visible, verifiable events.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "Realtime tracking gives DocDoor the transparency layer families are missing.",
        points: [
          "Track care assistant route and GPS check-in.",
          "Show visit timeline across assigned, en route, arrived, in progress, completed.",
          "Send updates to family, patient, admin, and hospital surfaces.",
        ],
      },
      {
        title: "Event Types",
        description: "Events should be consistent across all apps.",
        points: [
          "visit.assigned, visit.en_route, visit.arrived, visit.task_completed, visit.completed.",
          "report.uploaded, medication.confirmed, emergency.created, ambulance.en_route.",
          "notification.sent, notification.read, audit.created.",
        ],
      },
      {
        title: "Reliability",
        description: "Realtime experiences must survive poor connectivity.",
        points: [
          "Persist important events before broadcasting.",
          "Replay recent events when clients reconnect.",
          "Use push notifications for high-priority events and offline users.",
        ],
      },
    ],
    slug: "realtime-tracking",
    summary:
      "Realtime tracking connects visits, maps, notifications, and live care status so families and operations can monitor critical moments.",
    title: "Realtime Tracking",
    workflow: [
      { title: "Create session", description: "A LiveTrackingSession starts when a visit or emergency needs visibility." },
      { title: "Stream updates", description: "Care assistant app emits location and status updates through Socket.io." },
      { title: "Notify users", description: "Relevant family, patient, admin, and hospital clients receive live events." },
      { title: "Persist history", description: "Events are stored for audit, timeline, and later review." },
    ],
  },
  {
    dataTouchpoints: ["EmergencyRequest", "AmbulanceRequest", "Patient", "FamilyMember", "CareAssistant", "Hospital", "Notification", "AuditLog"],
    demoHref: "/patient",
    demoLabel: "Open Patient SOS Flow",
    designNotes: [
      "SOS actions must be unmistakable, reachable, and confirmed immediately.",
      "Keep emergency UI sparse and direct: one primary action, clear current location, and visible escalation state.",
      "Do not hide critical action behind tabs or menus.",
    ],
    eyebrow: "System documentation",
    heroStats: [
      { label: "Trigger", value: "SOS" },
      { label: "Response", value: "Family + care team" },
      { label: "Escalation", value: "Ambulance + hospital" },
    ],
    implementationNotes: [
      "Emergency creation should be idempotent within a short safety window to avoid duplicate dispatches.",
      "Emergency workflow should create EmergencyRequest, optional AmbulanceRequest, Notification records, and AuditLog entries in one transaction.",
      "Emergency events should publish to realtime channels and FCM.",
      "Admin dashboard should expose severity, ETA, assigned responder, and escalation status.",
    ],
    interfaceType: "Emergency coordination workflow",
    outcomes: [
      "Patients and families can request urgent support quickly.",
      "Operations gets a structured incident instead of scattered calls.",
      "Emergency handling becomes visible, timestamped, and auditable.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "The emergency workflow connects patient, family, care assistant, ambulance, hospital, and admin team.",
        points: [
          "Patient or family triggers SOS from app.",
          "System creates emergency request and alerts family, operations, and assigned care assistant.",
          "Ambulance request and hospital handoff can be attached to the same incident.",
        ],
      },
      {
        title: "States",
        description: "Emergency state should be explicit and shared.",
        points: [
          "Created, acknowledged, responder assigned, ambulance requested, ambulance en route, hospital notified, resolved.",
          "Each state change is time-stamped.",
          "Family receives short, calm updates instead of raw operational noise.",
        ],
      },
      {
        title: "Risk Controls",
        description: "Emergency features need safeguards.",
        points: [
          "Confirmation and visible status prevent accidental repeat taps.",
          "Role-based access limits who can resolve or cancel incidents.",
          "Audit logs preserve accountability.",
        ],
      },
    ],
    slug: "emergency-workflow",
    summary:
      "The emergency workflow turns SOS into a coordinated response across family, care assistant, ambulance, hospital, notifications, and audit logs.",
    title: "Emergency Workflow",
    workflow: [
      { title: "SOS triggered", description: "Patient or family taps emergency help." },
      { title: "Incident created", description: "Backend writes EmergencyRequest and audit record." },
      { title: "Network alerted", description: "Family, care assistant, admin, and ambulance/hospital partners are notified." },
      { title: "Resolution tracked", description: "Status changes remain visible until the case is resolved." },
    ],
  },
  {
    dataTouchpoints: ["Report", "Patient", "Doctor", "Hospital", "FamilyMember", "CareAssistant", "AuditLog"],
    demoHref: "/family",
    demoLabel: "View Reports in Family Flow",
    designNotes: [
      "Reports must be easy to find and difficult to accidentally lose.",
      "Status should indicate normal, uploaded, attention, or review without medical overreach.",
      "Preview, replace, download, and share controls should be permission-aware.",
    ],
    eyebrow: "System documentation",
    heroStats: [
      { label: "Storage", value: "S3-compatible" },
      { label: "Metadata", value: "PostgreSQL" },
      { label: "Access", value: "Role + consent" },
    ],
    implementationNotes: [
      "Use signed upload URLs for secure report storage.",
      "Store metadata in Report: patientId, source, type, status, uploadedBy, storageKey, timestamps.",
      "Generate report notifications for family and doctors when relevant.",
      "Audit all downloads, replacements, and visibility changes.",
    ],
    interfaceType: "Medical report storage and workflow",
    outcomes: [
      "Families and doctors can access the latest reports from one place.",
      "Care assistants and hospitals can upload documents into the same patient record.",
      "Report history becomes searchable and traceable.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "Reports management brings scattered diagnostics, prescriptions, scans, and summaries into a secure timeline.",
        points: [
          "Upload reports from patient app, family app, hospital dashboard, or assistant visit flow.",
          "Tag reports by type, source, date, status, and patient.",
          "Notify family and care team when a new report is available.",
        ],
      },
      {
        title: "User Experience",
        description: "Different users need different report actions.",
        points: [
          "Family views and downloads reports.",
          "Patient uploads a simple file without complex categorization.",
          "Hospital uploads and reviews assigned reports.",
          "Admin sees pending reports and review queues.",
        ],
      },
      {
        title: "Security",
        description: "Reports are sensitive medical data and need careful handling.",
        points: [
          "Access requires role and relationship checks.",
          "Files are stored outside the database with secure keys.",
          "Audit logs capture upload, replace, download, and share events.",
        ],
      },
    ],
    slug: "reports-management",
    summary:
      "Reports management centralizes lab reports, prescriptions, scans, and summaries with secure upload, metadata, notifications, and audit trails.",
    title: "Reports Management",
    workflow: [
      { title: "Upload", description: "Patient, hospital, assistant, or family uploads a document." },
      { title: "Classify", description: "System stores type, source, status, date, and patient relationship." },
      { title: "Notify", description: "Relevant family and care team members receive an update." },
      { title: "Review", description: "Reports remain accessible in patient history and dashboards." },
    ],
  },
  {
    dataTouchpoints: ["User", "FamilyMember", "Patient", "Report", "Visit", "Notification", "AuditLog"],
    demoHref: "/login",
    demoLabel: "Open Login Flow",
    designNotes: [
      "Security messaging should feel reassuring, not frightening.",
      "Consent state should be visible where family data sharing happens.",
      "Auditability is part of the product promise and should appear in investor documentation.",
    ],
    eyebrow: "System documentation",
    heroStats: [
      { label: "Auth", value: "OTP + JWT" },
      { label: "Access", value: "Role based" },
      { label: "Traceability", value: "Audit logs" },
    ],
    implementationNotes: [
      "Use phone OTP for onboarding and JWT for authenticated API access.",
      "Implement role-based guards in NestJS and UI route protection in frontend/mobile clients.",
      "Consent and patient-family relationship checks should gate report and health data access.",
      "AuditLog should record sensitive reads, writes, uploads, downloads, emergency actions, and permission changes.",
    ],
    interfaceType: "Security, consent, and trust layer",
    outcomes: [
      "Families trust that sensitive medical data is protected.",
      "Patients retain consent-aware control over shared care information.",
      "Operations has traceability for incidents, reports, and care activity.",
    ],
    sections: [
      {
        title: "Purpose",
        description: "DocDoor handles sensitive care data, so security is part of the product, not just infrastructure.",
        points: [
          "Authenticate users with OTP and JWT sessions.",
          "Restrict actions by role: family, patient, care assistant, admin, hospital.",
          "Control access through relationships, consent, and partner assignment.",
        ],
      },
      {
        title: "Trust Features",
        description: "Trust must be visible to users and enforceable in code.",
        points: [
          "Verified care assistant check-ins.",
          "Audit log for care actions and report access.",
          "Clear notifications when reports, visits, emergencies, or messages are updated.",
        ],
      },
      {
        title: "Compliance Direction",
        description: "The MVP should establish patterns that can support stricter healthcare compliance later.",
        points: [
          "Store only necessary public metadata in client payloads.",
          "Use secure file storage and signed URLs.",
          "Limit internal access by role and operational need.",
        ],
      },
    ],
    slug: "security-compliance",
    summary:
      "Security and trust cover OTP login, JWT sessions, role-based permissions, consent-aware sharing, secure report access, and auditability.",
    title: "Security and Trust",
    workflow: [
      { title: "Authenticate", description: "User verifies phone number through OTP and receives role-aware session." },
      { title: "Authorize", description: "Every API request checks role and relationship context." },
      { title: "Protect data", description: "Reports and sensitive care records are stored and shared securely." },
      { title: "Audit actions", description: "Sensitive reads, writes, uploads, and emergencies create trace records." },
    ],
  },
  {
    dataTouchpoints: ["All platform entities"],
    demoHref: "/documentation",
    demoLabel: "Back to Overview",
    designNotes: [
      "The product should feel premium and calm while still being operational.",
      "The core brand promise is clarity during healthcare uncertainty.",
      "Every interface should answer what is happening, who is responsible, and what happens next.",
    ],
    eyebrow: "Product documentation",
    heroStats: [
      { label: "Category", value: "Care infrastructure" },
      { label: "Brand promise", value: "Care Beyond Distance" },
      { label: "Strategy", value: "Coordination layer" },
    ],
    implementationNotes: [
      "DocDoor should remain modular: each interface can ship independently while sharing backend services.",
      "Mock API boundaries already define the first backend contracts.",
      "Future AI features should summarize and prioritize care events, not replace clinical judgment.",
    ],
    interfaceType: "Product strategy and investor narrative",
    outcomes: [
      "Investors understand the problem, the product wedge, and the modular roadmap.",
      "The team has a shared product language for design and engineering decisions.",
      "The documentation becomes a source of truth for interface scope.",
    ],
    sections: [
      {
        title: "Vision",
        description: "DocDoor is building the coordination layer for family healthcare.",
        points: [
          "Families need a trusted way to manage care across distance.",
          "Providers need structured handoff and communication workflows.",
          "Patients need simple access to help, medicines, visits, and reports.",
        ],
      },
      {
        title: "Positioning",
        description: "DocDoor is not trying to replace healthcare providers.",
        points: [
          "It connects hospitals, doctors, diagnostics, care assistants, emergency services, and family members.",
          "It turns fragmented care activities into visible workflows.",
          "It builds trust through verification, updates, reports, and audit trails.",
        ],
      },
      {
        title: "Business Expansion",
        description: "The platform can expand through subscriptions, verified care services, and partner networks.",
        points: [
          "Family plans for ongoing elder care monitoring.",
          "Care assistant visits and premium support services.",
          "Hospital, diagnostics, pharmacy, and insurance partner workflows.",
        ],
      },
    ],
    slug: "product-vision",
    summary:
      "The product vision explains why DocDoor exists, how it positions itself, and how the platform can expand from MVP to care infrastructure.",
    title: "Product Vision",
    workflow: [
      { title: "Start with families", description: "Solve the high-emotion problem of caring for elderly parents from a distance." },
      { title: "Add care execution", description: "Use verified assistants, visits, and reports to create accountable operations." },
      { title: "Connect providers", description: "Bring hospitals, doctors, diagnostics, and emergency partners into the workflow." },
      { title: "Scale intelligence", description: "Use structured care data for summaries, recommendations, and risk visibility." },
    ],
  },
  {
    dataTouchpoints: ["All platform entities"],
    demoHref: "/documentation/backend-api",
    demoLabel: "View Backend Details",
    designNotes: [
      "Architecture should be understandable to both technical and non-technical stakeholders.",
      "Use layers: experience, application, data/realtime, trust/compliance.",
      "Make clear that mock data is temporary and API boundaries are already designed.",
    ],
    eyebrow: "Technical documentation",
    heroStats: [
      { label: "Frontend web", value: "Next.js" },
      { label: "Mobile", value: "Expo" },
      { label: "Backend", value: "NestJS" },
    ],
    implementationNotes: [
      "Frontend uses Next.js App Router and Tailwind design system.",
      "Mobile uses React Native Expo and shared product patterns.",
      "Backend uses NestJS modules, Prisma, PostgreSQL, Socket.io, FCM, S3-compatible storage, and maps provider configuration.",
      "Use environment flags like NEXT_PUBLIC_DATA_SOURCE=backend to swap mock API boundaries to backend calls.",
    ],
    interfaceType: "System architecture",
    outcomes: [
      "Team can explain the software stack clearly to investors.",
      "Engineers can extend modules without changing product surfaces.",
      "The MVP has a path from mock demo to integrated production backend.",
    ],
    sections: [
      {
        title: "Experience Layer",
        description: "The product is split into web and mobile surfaces.",
        points: [
          "Next.js powers documentation, admin, hospital, and investor demo routes.",
          "Expo powers family, patient, and care assistant mobile app flows.",
          "Tailwind design tokens keep brand language consistent.",
        ],
      },
      {
        title: "Application Layer",
        description: "NestJS coordinates the business logic and API contracts.",
        points: [
          "Domain modules map to auth, users, patients, visits, reports, emergencies, payments, notifications, and audit logs.",
          "DTOs and validation keep API input predictable.",
          "Services enforce role and relationship checks.",
        ],
      },
      {
        title: "Data and Realtime Layer",
        description: "Persistent data and live care events work together.",
        points: [
          "PostgreSQL stores relational care data.",
          "S3-compatible storage stores documents and report files.",
          "Socket.io and FCM power live updates, visit status, and urgent alerts.",
        ],
      },
    ],
    slug: "architecture",
    summary:
      "The architecture page explains the full DocDoor stack: web, mobile, backend APIs, PostgreSQL, realtime tracking, storage, notifications, maps, and security.",
    title: "Architecture",
    workflow: [
      { title: "Client loads workspace", description: "Role-specific app requests overview data from API." },
      { title: "API resolves care graph", description: "Backend joins user, patient, family, visit, report, and notification context." },
      { title: "Realtime channel opens", description: "Client subscribes to visit, emergency, and notification events." },
      { title: "Actions persist and broadcast", description: "Mutations update database, create audit logs, and notify stakeholders." },
    ],
  },
];

export function getDocumentationPage(slug: string) {
  return documentationPages.find((page) => page.slug === slug);
}

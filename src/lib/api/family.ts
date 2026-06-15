import { dashboardConfig } from "@/lib/config";

export type ParentProfile = {
  age: number;
  carePlan: string;
  city: string;
  condition: string;
  emergencyContact: string;
  healthScore: number;
  id: string;
  lastCheckIn: string;
  name: string;
  relation: string;
  status: "active" | "attention" | "stable";
  trend: string;
};

export type FamilyAppointment = {
  doctor: string;
  id: string;
  location: string;
  patientId: string;
  specialty: string;
  status: "completed" | "confirmed" | "pending";
  time: string;
};

export type FamilyReport = {
  date: string;
  id: string;
  patientId: string;
  source: string;
  status: "attention" | "normal" | "uploaded";
  title: string;
  type: string;
};

export type FamilyLiveVisit = {
  assistantName: string;
  checkInStatus: string;
  distance: string;
  eta: string;
  id: string;
  location: string;
  patientId: string;
  progress: number;
  status: "assigned" | "en_route" | "in_progress" | "completed";
  tasks: Array<{
    label: string;
    status: "completed" | "current" | "pending";
    time: string;
  }>;
};

export type FamilyLiveUpdate = {
  id: string;
  message: string;
  tone: "danger" | "gold" | "info" | "success" | "warning";
  title: string;
  time: string;
};

export type FamilyActivityItem = {
  description: string;
  label: string;
  meta: string;
  status: "completed" | "current" | "pending";
};

export type FamilyMetric = {
  delta: string;
  label: string;
  tone: "danger" | "gold" | "info" | "success" | "warning";
  value: string;
};

export type FamilyAppSnapshot = {
  activity: FamilyActivityItem[];
  appointments: FamilyAppointment[];
  familyMember: {
    city: string;
    name: string;
    plan: string;
  };
  liveUpdates: FamilyLiveUpdate[];
  liveVisit: FamilyLiveVisit;
  metrics: FamilyMetric[];
  parents: ParentProfile[];
  reports: FamilyReport[];
};

export type NewParentProfileInput = {
  age: number;
  city: string;
  condition: string;
  name: string;
  relation: string;
};

export type EmergencyRequestInput = {
  location: string;
  patientId: string;
};

export type EmergencyRequestResult = {
  createdAt: string;
  id: string;
  message: string;
  status: "dispatched" | "queued";
};

const mockFamilyAppSnapshot: FamilyAppSnapshot = {
  activity: [
    {
      description: "Care assistant Aman Kaur accepted the home visit and shared live location.",
      label: "Care assistant assigned",
      meta: "09:05 AM",
      status: "completed",
    },
    {
      description: "GPS check-in was verified near Sector 17, Chandigarh.",
      label: "Location verified",
      meta: "09:15 AM",
      status: "completed",
    },
    {
      description: "Vitals were recorded and are visible to family and doctor.",
      label: "Vitals recorded",
      meta: "09:24 AM",
      status: "completed",
    },
    {
      description: "Doctor consultation is currently live for Mrs. Sunita Sharma.",
      label: "Consultation in progress",
      meta: "Live",
      status: "current",
    },
    {
      description: "Visit summary and updated prescription will be uploaded after completion.",
      label: "Visit report pending",
      meta: "Next",
      status: "pending",
    },
  ],
  appointments: [
    {
      doctor: "Dr. Anita Sharma",
      id: "apt-1001",
      location: "Apollo Hospital",
      patientId: "pat-sunita",
      specialty: "Cardiologist",
      status: "confirmed",
      time: "10 Jun 2026, 10:30 AM",
    },
    {
      doctor: "Dr. Neha Malhotra",
      id: "apt-1002",
      location: "Fortis Hospital",
      patientId: "pat-rajinder",
      specialty: "Geriatric Physician",
      status: "pending",
      time: "13 Jun 2026, 4:00 PM",
    },
  ],
  familyMember: {
    city: "Bengaluru",
    name: "Rahul Sharma",
    plan: "DocDoor Premium Care",
  },
  liveUpdates: [
    {
      id: "upd-1",
      message: "Aman Kaur is on site and the visit is GPS verified.",
      time: "09:15 AM",
      title: "Care assistant arrived",
      tone: "success",
    },
    {
      id: "upd-2",
      message: "Blood pressure 120/78, oxygen 98%, heart rate 78 bpm.",
      time: "09:24 AM",
      title: "Vitals added",
      tone: "info",
    },
    {
      id: "upd-3",
      message: "Doctor consultation has started. Family can track the visit live.",
      time: "09:40 AM",
      title: "Consultation live",
      tone: "gold",
    },
  ],
  liveVisit: {
    assistantName: "Aman Kaur",
    checkInStatus: "GPS verified",
    distance: "2.4 km away",
    eta: "12 min",
    id: "visit-7862",
    location: "Sector 17, Chandigarh",
    patientId: "pat-sunita",
    progress: 62,
    status: "in_progress",
    tasks: [
      { label: "Assistant assigned", status: "completed", time: "09:05" },
      { label: "Arrived at home", status: "completed", time: "09:15" },
      { label: "Vitals recorded", status: "completed", time: "09:24" },
      { label: "Doctor consultation", status: "current", time: "Live" },
      { label: "Visit summary", status: "pending", time: "Next" },
    ],
  },
  metrics: [
    { delta: "2 parents connected", label: "Family members", tone: "gold", value: "2" },
    { delta: "1 live today", label: "Upcoming visits", tone: "info", value: "3" },
    { delta: "All latest", label: "Reports", tone: "success", value: "12" },
    { delta: "24/7 active", label: "Emergency access", tone: "danger", value: "On" },
  ],
  parents: [
    {
      age: 68,
      carePlan: "Cardiac follow-up, BP monitoring, weekly assistant visit",
      city: "Chandigarh",
      condition: "Hypertension managed",
      emergencyContact: "+91 98765 43210",
      healthScore: 82,
      id: "pat-sunita",
      lastCheckIn: "Today, 09:24 AM",
      name: "Mrs. Sunita Sharma",
      relation: "Mother",
      status: "stable",
      trend: "+5 this month",
    },
    {
      age: 74,
      carePlan: "Diabetes management, physiotherapy, monthly geriatric review",
      city: "Chandigarh",
      condition: "Diabetes watch",
      emergencyContact: "+91 98765 43210",
      healthScore: 74,
      id: "pat-rajinder",
      lastCheckIn: "Yesterday, 07:30 PM",
      name: "Mr. Rajinder Singh",
      relation: "Father",
      status: "attention",
      trend: "Review sugar trend",
    },
  ],
  reports: [
    {
      date: "24 May 2026",
      id: "rep-1",
      patientId: "pat-sunita",
      source: "Apollo Diagnostics",
      status: "normal",
      title: "Blood Test",
      type: "Lab Report",
    },
    {
      date: "20 May 2026",
      id: "rep-2",
      patientId: "pat-sunita",
      source: "Gomed Labs",
      status: "attention",
      title: "Thyroid Panel",
      type: "Lab Report",
    },
    {
      date: "18 May 2026",
      id: "rep-3",
      patientId: "pat-rajinder",
      source: "Fortis Hospital",
      status: "uploaded",
      title: "ECG Report",
      type: "Cardiology",
    },
  ],
};

const liveUpdateSequence: FamilyLiveUpdate[] = [
  {
    id: "upd-live-1",
    message: "Medication reminder confirmed by patient.",
    time: "Just now",
    title: "Medication confirmed",
    tone: "success",
  },
  {
    id: "upd-live-2",
    message: "Care assistant uploaded consultation notes for family review.",
    time: "Just now",
    title: "Visit notes uploaded",
    tone: "info",
  },
  {
    id: "upd-live-3",
    message: "Doctor recommended a follow-up blood test next week.",
    time: "Just now",
    title: "Follow-up recommended",
    tone: "warning",
  },
];

const useBackendApi = process.env.NEXT_PUBLIC_DATA_SOURCE === "backend";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${dashboardConfig.apiBaseUrl}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`DocDoor API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getFamilyAppSnapshot(): Promise<FamilyAppSnapshot> {
  if (useBackendApi) {
    return requestJson<FamilyAppSnapshot>("/family-app/overview");
  }

  return clone(mockFamilyAppSnapshot);
}

export async function createParentProfile(input: NewParentProfileInput): Promise<ParentProfile> {
  if (useBackendApi) {
    return requestJson<ParentProfile>("/family-app/parents", {
      body: JSON.stringify(input),
      method: "POST",
    });
  }

  return {
    age: input.age,
    carePlan: "New care plan setup pending",
    city: input.city,
    condition: input.condition,
    emergencyContact: "+91 98765 43210",
    healthScore: 78,
    id: `pat-mock-${Date.now()}`,
    lastCheckIn: "Profile created just now",
    name: input.name,
    relation: input.relation,
    status: "active",
    trend: "Baseline setup pending",
  };
}

export async function createEmergencyRequest(input: EmergencyRequestInput): Promise<EmergencyRequestResult> {
  if (useBackendApi) {
    return requestJson<EmergencyRequestResult>("/family-app/emergency-requests", {
      body: JSON.stringify(input),
      method: "POST",
    });
  }

  return {
    createdAt: "Just now",
    id: `SOS-${Math.floor(2000 + Math.random() * 9000)}`,
    message: `Emergency team alerted for ${input.location}. Ambulance and family contacts notified.`,
    status: "dispatched",
  };
}

export async function getNextFamilyLiveUpdate(cursor: number): Promise<FamilyLiveUpdate> {
  if (useBackendApi) {
    return requestJson<FamilyLiveUpdate>(`/family-app/live-updates/next?cursor=${cursor}`);
  }

  const update = liveUpdateSequence[cursor % liveUpdateSequence.length];

  return {
    ...update,
    id: `${update.id}-${Date.now()}`,
  };
}

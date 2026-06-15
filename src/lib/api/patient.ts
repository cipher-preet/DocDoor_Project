import { dashboardConfig } from "@/lib/config";

export type PatientCarePlanItem = {
  description: string;
  id: string;
  status: "completed" | "current" | "pending";
  time: string;
  title: string;
};

export type PatientMedication = {
  dosage: string;
  id: string;
  instruction: string;
  name: string;
  status: "due" | "taken" | "upcoming";
  time: string;
};

export type PatientVisit = {
  careTeam: string;
  id: string;
  location: string;
  status: "confirmed" | "pending";
  time: string;
  title: string;
};

export type PatientContact = {
  id: string;
  name: string;
  relation: string;
  responseTime: string;
  type: "assistant" | "doctor" | "family";
};

export type PatientMessage = {
  body: string;
  id: string;
  sender: "care_team" | "patient";
  time: string;
};

export type PatientActivityItem = {
  description: string;
  label: string;
  meta: string;
  status: "completed" | "current" | "pending";
};

export type PatientQuickMetric = {
  delta: string;
  label: string;
  tone: "danger" | "gold" | "info" | "success" | "warning";
  value: string;
};

export type PatientAppSnapshot = {
  activity: PatientActivityItem[];
  carePlan: PatientCarePlanItem[];
  contacts: PatientContact[];
  health: {
    heartRate: string;
    lastUpdated: string;
    oxygen: string;
    score: number;
    status: string;
    trend: string;
  };
  medications: PatientMedication[];
  messages: PatientMessage[];
  metrics: PatientQuickMetric[];
  patient: {
    age: number;
    city: string;
    emergencyContact: string;
    id: string;
    name: string;
    preferredLanguage: string;
  };
  reports: Array<{
    date: string;
    id: string;
    source: string;
    status: "attention" | "normal" | "uploaded";
    title: string;
    type: string;
  }>;
  visits: PatientVisit[];
};

export type PatientActionResult = {
  createdAt: string;
  id: string;
  message: string;
  status: "connected" | "dispatched" | "queued" | "sent" | "uploaded";
};

export type PatientMessageInput = {
  body: string;
  recipientType: PatientContact["type"];
};

const mockPatientAppSnapshot: PatientAppSnapshot = {
  activity: [
    {
      description: "Aman Kaur confirmed today's home care visit and shared arrival time.",
      label: "Care assistant confirmed",
      meta: "08:30 AM",
      status: "completed",
    },
    {
      description: "Morning blood pressure reading was added to your health record.",
      label: "Vitals updated",
      meta: "09:00 AM",
      status: "completed",
    },
    {
      description: "Metformin reminder is due after breakfast.",
      label: "Medicine reminder",
      meta: "Now",
      status: "current",
    },
    {
      description: "Doctor consultation is scheduled after the home visit.",
      label: "Doctor check-in",
      meta: "11:30 AM",
      status: "pending",
    },
  ],
  carePlan: [
    {
      description: "Aman Kaur will check blood pressure, oxygen, and heart rate.",
      id: "plan-vitals",
      status: "current",
      time: "09:30 AM",
      title: "Vitals check",
    },
    {
      description: "Take Metformin after breakfast with water.",
      id: "plan-medication",
      status: "pending",
      time: "10:00 AM",
      title: "Morning medication",
    },
    {
      description: "Speak with Dr. Anita Sharma about BP trend and fatigue.",
      id: "plan-doctor",
      status: "pending",
      time: "11:30 AM",
      title: "Doctor call",
    },
    {
      description: "Upload the latest thyroid report when available.",
      id: "plan-report",
      status: "pending",
      time: "Anytime",
      title: "Report upload",
    },
  ],
  contacts: [
    {
      id: "contact-assistant",
      name: "Aman Kaur",
      relation: "Care Assistant",
      responseTime: "Usually answers in 2 min",
      type: "assistant",
    },
    {
      id: "contact-doctor",
      name: "Dr. Anita Sharma",
      relation: "Cardiologist",
      responseTime: "Clinic replies within 30 min",
      type: "doctor",
    },
    {
      id: "contact-family",
      name: "Rahul Sharma",
      relation: "Son",
      responseTime: "Family notified instantly",
      type: "family",
    },
  ],
  health: {
    heartRate: "78 bpm",
    lastUpdated: "Today, 09:00 AM",
    oxygen: "98%",
    score: 82,
    status: "Good",
    trend: "+5 this month",
  },
  medications: [
    {
      dosage: "500mg",
      id: "med-metformin",
      instruction: "After breakfast",
      name: "Metformin",
      status: "due",
      time: "10:00 AM",
    },
    {
      dosage: "40mg",
      id: "med-telmisartan",
      instruction: "After dinner",
      name: "Telmisartan",
      status: "upcoming",
      time: "08:00 PM",
    },
    {
      dosage: "Once weekly",
      id: "med-vitamin",
      instruction: "Sunday morning",
      name: "Vitamin D3",
      status: "taken",
      time: "08:30 AM",
    },
  ],
  messages: [
    {
      body: "Good morning. Your care assistant visit is confirmed for today.",
      id: "msg-1",
      sender: "care_team",
      time: "08:30 AM",
    },
    {
      body: "Thank you. Please ask Aman to call before arriving.",
      id: "msg-2",
      sender: "patient",
      time: "08:34 AM",
    },
  ],
  metrics: [
    { delta: "Updated today", label: "Health score", tone: "success", value: "82" },
    { delta: "1 due now", label: "Medicines", tone: "warning", value: "3" },
    { delta: "Next at 09:30", label: "Care plan", tone: "gold", value: "4" },
    { delta: "Confirmed", label: "Visits", tone: "info", value: "2" },
  ],
  patient: {
    age: 68,
    city: "Chandigarh",
    emergencyContact: "+91 98765 43210",
    id: "pat-sunita",
    name: "Mrs. Sunita Sharma",
    preferredLanguage: "English",
  },
  reports: [
    {
      date: "24 May 2026",
      id: "report-blood",
      source: "Apollo Diagnostics",
      status: "normal",
      title: "Blood Test",
      type: "Lab Report",
    },
    {
      date: "20 May 2026",
      id: "report-thyroid",
      source: "Gomed Labs",
      status: "attention",
      title: "Thyroid Panel",
      type: "Lab Report",
    },
  ],
  visits: [
    {
      careTeam: "Aman Kaur",
      id: "visit-home",
      location: "Home visit",
      status: "confirmed",
      time: "Today, 09:30 AM",
      title: "Care assistant visit",
    },
    {
      careTeam: "Dr. Anita Sharma",
      id: "visit-doctor",
      location: "Video consultation",
      status: "confirmed",
      time: "Today, 11:30 AM",
      title: "Doctor check-in",
    },
  ],
};

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

export async function getPatientAppSnapshot(): Promise<PatientAppSnapshot> {
  if (useBackendApi) {
    return requestJson<PatientAppSnapshot>("/patient-app/overview");
  }

  return clone(mockPatientAppSnapshot);
}

export async function callCareAssistant(patientId: string): Promise<PatientActionResult> {
  if (useBackendApi) {
    return requestJson<PatientActionResult>("/patient-app/calls/care-assistant", {
      body: JSON.stringify({ patientId }),
      method: "POST",
    });
  }

  return {
    createdAt: "Just now",
    id: `CALL-${Date.now()}`,
    message: "Aman Kaur has been alerted and will call you shortly.",
    status: "queued",
  };
}

export async function requestPatientEmergency(patientId: string): Promise<PatientActionResult> {
  if (useBackendApi) {
    return requestJson<PatientActionResult>("/patient-app/emergency-requests", {
      body: JSON.stringify({ patientId }),
      method: "POST",
    });
  }

  return {
    createdAt: "Just now",
    id: `SOS-${Math.floor(2000 + Math.random() * 9000)}`,
    message: "Emergency help requested. Ambulance, care assistant, and family have been notified.",
    status: "dispatched",
  };
}

export async function uploadPatientReport(patientId: string, fileName: string): Promise<PatientActionResult> {
  if (useBackendApi) {
    return requestJson<PatientActionResult>("/patient-app/reports", {
      body: JSON.stringify({ fileName, patientId }),
      method: "POST",
    });
  }

  return {
    createdAt: "Just now",
    id: `REPORT-${Date.now()}`,
    message: `${fileName || "Report"} uploaded for review.`,
    status: "uploaded",
  };
}

export async function sendPatientMessage(patientId: string, input: PatientMessageInput): Promise<PatientActionResult> {
  if (useBackendApi) {
    return requestJson<PatientActionResult>("/patient-app/messages", {
      body: JSON.stringify({ patientId, ...input }),
      method: "POST",
    });
  }

  return {
    createdAt: "Just now",
    id: `MSG-${Date.now()}`,
    message: `Message sent to ${input.recipientType}.`,
    status: "sent",
  };
}

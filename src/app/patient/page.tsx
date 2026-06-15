import type { Metadata } from "next";
import { PatientAppFlow } from "@/components/patient/patient-app-flow";
import { getPatientAppSnapshot } from "@/lib/api/patient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Patient App Flow | DocDoor",
  description: "Senior-friendly patient app flow for daily care plan, medications, visits, reports, messages, and emergency help.",
};

export default async function PatientAppPage() {
  const snapshot = await getPatientAppSnapshot();

  return <PatientAppFlow initialData={snapshot} />;
}

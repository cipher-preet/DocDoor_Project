import type { Metadata } from "next";
import { PrescriptionHistoryPage } from "@/components/doctor/prescription-history-page";

export const metadata: Metadata = {
  title: "Prescription History | DocDoor",
  description: "Search, review, and edit basic patient details for past DocDoor voice prescription reports.",
};

export default function DoctorPrescriptionHistoryRoute() {
  return <PrescriptionHistoryPage />;
}

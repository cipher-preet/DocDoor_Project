import type { Metadata } from "next";
import { VoicePrescriptionTool } from "@/components/doctor/voice-prescription-tool";

export const metadata: Metadata = {
  title: "Doctor Voice Prescription | DocDoor",
  description: "Voice-operated doctor tool for creating a one-page prescription during a patient consultation.",
};

export default function DoctorPrescriptionPage() {
  return <VoicePrescriptionTool />;
}

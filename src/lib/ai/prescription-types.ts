export type MedicationDraft = {
  dosage: string;
  duration: string;
  name: string;
};

export type PrescriptionDraft = {
  advice: string[];
  assessment: string;
  patientAge: string;
  patientName: string;
  precautions: string[];
  symptoms: string[];
  medicines: MedicationDraft[];
};

export type PrescriptionProcessResult = {
  prescription: PrescriptionDraft;
  transcript: string;
};

export const emptyPrescriptionDraft = (): PrescriptionDraft => ({
  advice: [],
  assessment: "",
  patientAge: "",
  patientName: "",
  precautions: [],
  symptoms: [],
  medicines: [],
});

export type ProcessingStage = "idle" | "recording" | "transcribing" | "analyzing" | "error";

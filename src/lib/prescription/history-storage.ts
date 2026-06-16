import type { PrescriptionDraft } from "@/lib/ai/prescription-types";

export type PrescriptionHistoryStatus = "Draft" | "Finalized" | "Shared";

export type PrescriptionHistoryRecord = {
  createdAt: string;
  doctor: string;
  id: string;
  phone: string;
  prescription: PrescriptionDraft;
  status: PrescriptionHistoryStatus;
  transcript: string;
  updatedAt: string;
};

const STORAGE_KEY = "docdoor:prescription-history";
const DOCTOR_NAME = "Dr. Gagandeep S Sachdeva";

function isBrowser() {
  return typeof window !== "undefined";
}

export function formatHistoryTimestamp(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatMedicineList(prescription: PrescriptionDraft) {
  return prescription.medicines
    .map((medicine) => {
      const parts = [medicine.name, medicine.dosage, medicine.duration].filter(Boolean);
      return parts.join(" — ");
    })
    .filter(Boolean);
}

export function hasPrescriptionContent(prescription: PrescriptionDraft, transcript: string) {
  return Boolean(
    transcript.trim() ||
      prescription.patientName ||
      prescription.patientAge ||
      prescription.assessment ||
      prescription.symptoms.length ||
      prescription.medicines.length ||
      prescription.precautions.length ||
      prescription.advice.length,
  );
}

function createHistoryId() {
  const stamp = Date.now().toString().slice(-6);
  return `RX-DD-${stamp}`;
}

function readStorage(): PrescriptionHistoryRecord[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as PrescriptionHistoryRecord[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

function writeStorage(records: PrescriptionHistoryRecord[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function loadPrescriptionHistory() {
  return readStorage().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function savePrescriptionToHistory(input: {
  prescription: PrescriptionDraft;
  status?: PrescriptionHistoryStatus;
  transcript: string;
}) {
  if (!hasPrescriptionContent(input.prescription, input.transcript)) {
    return null;
  }

  const now = new Date().toISOString();
  const record: PrescriptionHistoryRecord = {
    createdAt: now,
    doctor: DOCTOR_NAME,
    id: createHistoryId(),
    phone: "",
    prescription: input.prescription,
    status: input.status ?? "Draft",
    transcript: input.transcript.trim(),
    updatedAt: now,
  };

  const nextRecords = [record, ...readStorage()];
  writeStorage(nextRecords);

  return record;
}

export function updatePrescriptionHistory(
  id: string,
  patch: Partial<Pick<PrescriptionHistoryRecord, "phone" | "prescription" | "status" | "transcript">>,
) {
  const records = readStorage();
  let updated: PrescriptionHistoryRecord | null = null;

  const nextRecords = records.map((record) => {
    if (record.id !== id) {
      return record;
    }

    updated = {
      ...record,
      ...patch,
      prescription: patch.prescription ? { ...record.prescription, ...patch.prescription } : record.prescription,
      updatedAt: new Date().toISOString(),
    };

    return updated;
  });

  writeStorage(nextRecords);

  return updated;
}

export function deletePrescriptionHistory(id: string) {
  const nextRecords = readStorage().filter((record) => record.id !== id);
  writeStorage(nextRecords);
}

export function getPrescriptionHistoryRecord(id: string) {
  return readStorage().find((record) => record.id === id) ?? null;
}

export { DOCTOR_NAME as prescriptionDoctorName };

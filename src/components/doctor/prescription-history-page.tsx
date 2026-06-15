"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Edit3,
  FileText,
  Phone,
  Save,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { BrandMark, GlassCard, Input, UserAvatar } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

type PrescriptionHistoryRecord = {
  age: string;
  allergies: string;
  diagnosis: string;
  doctor: string;
  id: string;
  medicines: string[];
  patientName: string;
  phone: string;
  status: "Draft" | "Finalized" | "Shared";
  symptoms: string[];
  tests: string[];
  updatedAt: string;
};

const initialHistory: PrescriptionHistoryRecord[] = [
  {
    age: "68 years",
    allergies: "No known allergy stated",
    diagnosis: "Acute respiratory symptoms",
    doctor: "Dr. Gagandeep S Sachdeva",
    id: "RX-DD-1028",
    medicines: ["Paracetamol 500 mg", "Cetirizine 10 mg"],
    patientName: "Mrs. Sunita Sharma",
    phone: "+91 98765 43120",
    status: "Shared",
    symptoms: ["Fever", "Cough", "Sore throat"],
    tests: ["CBC", "CRP"],
    updatedAt: "15 Jun 2026, 10:45 AM",
  },
  {
    age: "74 years",
    allergies: "Allergy not discussed",
    diagnosis: "Diabetes follow-up",
    doctor: "Dr. Gagandeep S Sachdeva",
    id: "RX-DD-1027",
    medicines: ["Metformin", "Supplement mentioned"],
    patientName: "Mr. Rajinder Singh",
    phone: "+91 98765 43124",
    status: "Finalized",
    symptoms: ["High blood sugar", "Weakness or fatigue"],
    tests: ["HbA1c", "Blood sugar fasting and PP", "KFT"],
    updatedAt: "14 Jun 2026, 05:15 PM",
  },
  {
    age: "62 years",
    allergies: "Penicillin",
    diagnosis: "Chest discomfort under evaluation",
    doctor: "Dr. Gagandeep S Sachdeva",
    id: "RX-DD-1026",
    medicines: ["Blood pressure medicine"],
    patientName: "Mr. Aman Verma",
    phone: "+91 98111 22670",
    status: "Draft",
    symptoms: ["Chest discomfort", "Raised blood pressure"],
    tests: ["ECG", "Lipid profile"],
    updatedAt: "13 Jun 2026, 12:20 PM",
  },
  {
    age: "71 years",
    allergies: "No known allergy stated",
    diagnosis: "Acute gastrointestinal symptoms",
    doctor: "Dr. Gagandeep S Sachdeva",
    id: "RX-DD-1025",
    medicines: ["ORS solution", "Pantoprazole 40 mg"],
    patientName: "Mrs. Kavita Nair",
    phone: "+91 98980 11223",
    status: "Shared",
    symptoms: ["Loose motions", "Nausea", "Abdominal pain"],
    tests: ["CBC", "KFT", "Urine routine"],
    updatedAt: "12 Jun 2026, 09:05 AM",
  },
];

const statusStyles = {
  Draft: "border-amber-200 bg-amber-50 text-amber-700",
  Finalized: "border-blue-200 bg-blue-50 text-blue-700",
  Shared: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

function compactText(items: string[]) {
  return items.length ? items.join(", ") : "Not captured";
}

export function PrescriptionHistoryPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [records, setRecords] = useState(initialHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(initialHistory[0]?.id ?? "");
  const [editDraft, setEditDraft] = useState({ patientName: "", phone: "" });

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter((record) =>
      [
        record.id,
        record.patientName,
        record.phone,
        record.diagnosis,
        record.status,
        record.symptoms.join(" "),
        record.medicines.join(" "),
        record.tests.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [records, searchTerm]);

  const selectedRecord = filteredRecords.find((record) => record.id === selectedId) ?? filteredRecords[0] ?? records[0];

  function beginEdit(record: PrescriptionHistoryRecord) {
    setEditingId(record.id);
    setEditDraft({ patientName: record.patientName, phone: record.phone });
    setSelectedId(record.id);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft({ patientName: "", phone: "" });
  }

  function saveEdit(recordId: string) {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId
          ? {
              ...record,
              patientName: editDraft.patientName.trim() || record.patientName,
              phone: editDraft.phone.trim() || record.phone,
            }
          : record,
      ),
    );
    setEditingId(null);
  }

  return (
    <main className="liquid-page min-h-screen text-midnight-950">
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <BrandMark size="sm" tone="light" />
          <Link
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-midnight-900/10 bg-white/75 px-4 py-2 text-sm font-semibold text-midnight-950 shadow-liquid-sm transition hover:bg-white"
            href="/doctor-prescription"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Voice prescription
          </Link>
        </header>

        <GlassCard dark className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-prestige-gold">Doctor prescription history</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Search past reports, review drafts, and update patient basics.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              A focused doctor workspace for voice-generated prescription reports. Search by patient, phone, diagnosis, medicine, test, or report ID.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Reports", value: records.length },
              { label: "Shared", value: records.filter((record) => record.status === "Shared").length },
              { label: "Drafts", value: records.filter((record) => record.status === "Draft").length },
            ].map((metric) => (
              <div className="rounded-liquid border border-white/10 bg-white/8 p-4" key={metric.label}>
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase text-white/54">{metric.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <section className="grid gap-5 xl:grid-cols-[0.94fr_1.06fr] xl:items-start">
          <GlassCard className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Past prescription reports</h2>
                <p className="mt-1 text-sm text-slate-grey">Active search updates results as you type.</p>
              </div>
              <span className="rounded-full border border-midnight-900/10 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-grey">
                {filteredRecords.length} shown
              </span>
            </div>

            <Input
              className="mt-5"
              iconLeft={<Search size={18} aria-hidden="true" />}
              label="Search history"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search patient, phone, diagnosis, medicine, test..."
              value={searchTerm}
            />

            <div className="mt-5 grid gap-3">
              {filteredRecords.length ? (
                filteredRecords.map((record) => {
                  const selected = selectedRecord?.id === record.id;

                  return (
                    <button
                      className={cn(
                        "focus-ring rounded-liquid border p-4 text-left transition",
                        selected
                          ? "border-prestige-gold bg-prestige-gold/12 shadow-liquid-sm"
                          : "border-midnight-900/10 bg-white/72 hover:border-prestige-gold/45 hover:bg-white",
                      )}
                      key={record.id}
                      onClick={() => setSelectedId(record.id)}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <UserAvatar name={record.patientName} status={record.status === "Draft" ? "away" : "online"} />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-midnight-950">{record.patientName}</p>
                            <p className="mt-1 text-xs font-semibold text-slate-grey">{record.id}</p>
                          </div>
                        </div>
                        <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", statusStyles[record.status])}>
                          {record.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-midnight-950">{record.diagnosis}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-grey">{record.updatedAt}</p>
                    </button>
                  );
                })
              ) : (
                <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-5 text-sm text-slate-grey">
                  No prescription reports match this search.
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            {selectedRecord ? (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar name={selectedRecord.patientName} size="lg" status={selectedRecord.status === "Draft" ? "away" : "online"} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase text-prestige-gold">Selected report</p>
                      <h2 className="mt-1 truncate text-2xl font-semibold">{selectedRecord.patientName}</h2>
                      <p className="mt-1 text-sm text-slate-grey">{selectedRecord.id}</p>
                    </div>
                  </div>
                  <button
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-prestige-gold/35 bg-prestige-gold/15 px-3 py-2 text-sm font-semibold text-midnight-950 transition hover:bg-prestige-gold"
                    onClick={() => beginEdit(selectedRecord)}
                    type="button"
                  >
                    <Edit3 size={16} aria-hidden="true" />
                    Edit basics
                  </button>
                </div>

                <div className="mt-5 grid gap-3 rounded-liquid border border-midnight-900/10 bg-surface-grey p-4 sm:grid-cols-2">
                  {editingId === selectedRecord.id ? (
                    <>
                      <label className="grid gap-2 text-sm font-semibold text-midnight-950">
                        Patient name
                        <input
                          className="focus-ring h-12 rounded-liquid border border-midnight-900/10 bg-white px-3 text-base font-semibold outline-none"
                          onChange={(event) => setEditDraft((current) => ({ ...current, patientName: event.target.value }))}
                          value={editDraft.patientName}
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-semibold text-midnight-950">
                        Phone number
                        <input
                          className="focus-ring h-12 rounded-liquid border border-midnight-900/10 bg-white px-3 text-base font-semibold outline-none"
                          onChange={(event) => setEditDraft((current) => ({ ...current, phone: event.target.value }))}
                          value={editDraft.phone}
                        />
                      </label>
                      <div className="flex flex-wrap gap-2 sm:col-span-2">
                        <button
                          className="focus-ring inline-flex h-11 items-center gap-2 rounded-liquid bg-midnight-950 px-4 text-sm font-semibold text-white"
                          onClick={() => saveEdit(selectedRecord.id)}
                          type="button"
                        >
                          <Save size={16} aria-hidden="true" />
                          Save details
                        </button>
                        <button
                          className="focus-ring inline-flex h-11 items-center gap-2 rounded-liquid border border-midnight-900/10 bg-white px-4 text-sm font-semibold text-midnight-950"
                          onClick={cancelEdit}
                          type="button"
                        >
                          <X size={16} aria-hidden="true" />
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <UserRound className="mt-1 text-prestige-gold" size={18} aria-hidden="true" />
                        <div>
                          <p className="text-xs font-semibold uppercase text-slate-grey">Patient</p>
                          <p className="mt-1 font-semibold">{selectedRecord.patientName}</p>
                          <p className="mt-1 text-sm text-slate-grey">{selectedRecord.age}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-prestige-gold" size={18} aria-hidden="true" />
                        <div>
                          <p className="text-xs font-semibold uppercase text-slate-grey">Phone</p>
                          <p className="mt-1 font-semibold">{selectedRecord.phone}</p>
                          <p className="mt-1 text-sm text-slate-grey">Editable family contact</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: FileText, label: "Diagnosis", value: selectedRecord.diagnosis },
                    { icon: CalendarDays, label: "Updated", value: selectedRecord.updatedAt },
                    { icon: ShieldCheck, label: "Allergies", value: selectedRecord.allergies },
                    { icon: CheckCircle2, label: "Status", value: selectedRecord.status },
                  ].map(({ icon: Icon, label, value }) => (
                    <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4" key={label}>
                      <Icon className="text-prestige-gold" size={19} aria-hidden="true" />
                      <p className="mt-3 text-xs font-semibold uppercase text-slate-grey">{label}</p>
                      <p className="mt-1 font-semibold text-midnight-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                    <p className="font-semibold">Symptoms</p>
                    <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(selectedRecord.symptoms)}</p>
                  </div>
                  <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                    <p className="font-semibold">Medicines</p>
                    <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(selectedRecord.medicines)}</p>
                  </div>
                  <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                    <p className="font-semibold">Tests</p>
                    <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(selectedRecord.tests)}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

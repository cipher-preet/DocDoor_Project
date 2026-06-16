"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Edit3,
  FileText,
  Phone,
  Save,
  Search,
  Share2,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { BrandMark, GlassCard, Input, UserAvatar } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import {
  deletePrescriptionHistory,
  formatHistoryTimestamp,
  formatMedicineList,
  loadPrescriptionHistory,
  type PrescriptionHistoryRecord,
  type PrescriptionHistoryStatus,
  updatePrescriptionHistory,
} from "@/lib/prescription/history-storage";

const statusStyles = {
  Draft: "border-amber-200 bg-amber-50 text-amber-700",
  Finalized: "border-blue-200 bg-blue-50 text-blue-700",
  Shared: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

function compactText(items: string[]) {
  return items.length ? items.join(", ") : "Not captured";
}

function displayPatientName(record: PrescriptionHistoryRecord) {
  return record.prescription.patientName.trim() || "Unnamed patient";
}

export function PrescriptionHistoryPage() {
  const [records, setRecords] = useState<PrescriptionHistoryRecord[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [editDraft, setEditDraft] = useState({ patientName: "", phone: "" });

  useEffect(() => {
    const stored = loadPrescriptionHistory();
    setRecords(stored);
    setSelectedId(stored[0]?.id ?? "");
    setHasLoaded(true);
  }, []);

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter((record) => {
      const medicines = formatMedicineList(record.prescription);

      return [
        record.id,
        displayPatientName(record),
        record.phone,
        record.prescription.assessment,
        record.status,
        record.prescription.symptoms.join(" "),
        medicines.join(" "),
        record.prescription.precautions.join(" "),
        record.prescription.advice.join(" "),
        record.transcript,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [records, searchTerm]);

  const selectedRecord =
    filteredRecords.find((record) => record.id === selectedId) ?? filteredRecords[0] ?? records.find((record) => record.id === selectedId);

  function refreshRecords(preferredId?: string) {
    const stored = loadPrescriptionHistory();
    setRecords(stored);

    if (preferredId && stored.some((record) => record.id === preferredId)) {
      setSelectedId(preferredId);
      return;
    }

    if (stored.some((record) => record.id === selectedId)) {
      return;
    }

    setSelectedId(stored[0]?.id ?? "");
  }

  function beginEdit(record: PrescriptionHistoryRecord) {
    setEditingId(record.id);
    setEditDraft({
      patientName: record.prescription.patientName,
      phone: record.phone,
    });
    setSelectedId(record.id);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft({ patientName: "", phone: "" });
  }

  function saveEdit(recordId: string) {
    const current = records.find((record) => record.id === recordId);

    if (!current) {
      return;
    }

    updatePrescriptionHistory(recordId, {
      phone: editDraft.phone.trim(),
      prescription: {
        ...current.prescription,
        patientName: editDraft.patientName.trim(),
      },
    });

    setEditingId(null);
    refreshRecords(recordId);
  }

  function updateStatus(recordId: string, status: PrescriptionHistoryStatus) {
    updatePrescriptionHistory(recordId, { status });
    refreshRecords(recordId);
  }

  function removeRecord(recordId: string) {
    deletePrescriptionHistory(recordId);
    setEditingId(null);
    refreshRecords();
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
              Saved locally in this browser. Each voice consultation is stored automatically after AI processing.
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

        {!hasLoaded ? (
          <GlassCard className="p-6 text-sm text-slate-grey">Loading saved prescription history…</GlassCard>
        ) : records.length === 0 ? (
          <GlassCard className="grid gap-4 p-6 text-center">
            <p className="text-lg font-semibold text-midnight-950">No prescription history yet</p>
            <p className="text-sm leading-6 text-slate-grey">
              Record a consultation on the voice prescription page. After AI processing, it will appear here automatically.
            </p>
            <Link
              className="focus-ring mx-auto inline-flex h-11 items-center justify-center rounded-full bg-midnight-950 px-5 text-sm font-semibold text-white"
              href="/doctor-prescription"
            >
              Go to voice prescription
            </Link>
          </GlassCard>
        ) : (
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
                placeholder="Search patient, phone, assessment, medicine..."
                value={searchTerm}
              />

              <div className="mt-5 grid gap-3">
                {filteredRecords.length ? (
                  filteredRecords.map((record) => {
                    const selected = selectedRecord?.id === record.id;
                    const patientName = displayPatientName(record);

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
                            <UserAvatar name={patientName} status={record.status === "Draft" ? "away" : "online"} />
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-midnight-950">{patientName}</p>
                              <p className="mt-1 text-xs font-semibold text-slate-grey">{record.id}</p>
                            </div>
                          </div>
                          <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", statusStyles[record.status])}>
                            {record.status}
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-midnight-950">
                          {record.prescription.assessment || "Assessment not captured"}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-grey">{formatHistoryTimestamp(record.updatedAt)}</p>
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
                      <UserAvatar
                        name={displayPatientName(selectedRecord)}
                        size="lg"
                        status={selectedRecord.status === "Draft" ? "away" : "online"}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold uppercase text-prestige-gold">Selected report</p>
                        <h2 className="mt-1 truncate text-2xl font-semibold">{displayPatientName(selectedRecord)}</h2>
                        <p className="mt-1 text-sm text-slate-grey">{selectedRecord.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="focus-ring inline-flex items-center gap-2 rounded-full border border-prestige-gold/35 bg-prestige-gold/15 px-3 py-2 text-sm font-semibold text-midnight-950 transition hover:bg-prestige-gold"
                        onClick={() => beginEdit(selectedRecord)}
                        type="button"
                      >
                        <Edit3 size={16} aria-hidden="true" />
                        Edit basics
                      </button>
                      <button
                        className="focus-ring inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                        onClick={() => removeRecord(selectedRecord.id)}
                        type="button"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(["Draft", "Finalized", "Shared"] as const).map((status) => (
                      <button
                        className={cn(
                          "focus-ring rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                          selectedRecord.status === status ? statusStyles[status] : "border-midnight-900/10 bg-white text-slate-grey",
                        )}
                        key={status}
                        onClick={() => updateStatus(selectedRecord.id, status)}
                        type="button"
                      >
                        {status}
                      </button>
                    ))}
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
                            <p className="mt-1 font-semibold">{displayPatientName(selectedRecord)}</p>
                            <p className="mt-1 text-sm text-slate-grey">{selectedRecord.prescription.patientAge || "Age not captured"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="mt-1 text-prestige-gold" size={18} aria-hidden="true" />
                          <div>
                            <p className="text-xs font-semibold uppercase text-slate-grey">Phone</p>
                            <p className="mt-1 font-semibold">{selectedRecord.phone || "—"}</p>
                            <p className="mt-1 text-sm text-slate-grey">Editable family contact</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      { icon: ClipboardList, label: "Assessment", value: selectedRecord.prescription.assessment || "Not captured" },
                      { icon: CalendarDays, label: "Updated", value: formatHistoryTimestamp(selectedRecord.updatedAt) },
                      { icon: Share2, label: "Doctor", value: selectedRecord.doctor },
                      { icon: CheckCircle2, label: "Status", value: selectedRecord.status },
                    ].map(({ icon: Icon, label, value }) => (
                      <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4" key={label}>
                        <Icon className="text-prestige-gold" size={19} aria-hidden="true" />
                        <p className="mt-3 text-xs font-semibold uppercase text-slate-grey">{label}</p>
                        <p className="mt-1 font-semibold text-midnight-950">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                      <p className="font-semibold">Symptoms</p>
                      <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(selectedRecord.prescription.symptoms)}</p>
                    </div>
                    <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                      <p className="font-semibold">Medicines</p>
                      <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(formatMedicineList(selectedRecord.prescription))}</p>
                    </div>
                    <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                      <p className="font-semibold">Precautions</p>
                      <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(selectedRecord.prescription.precautions)}</p>
                    </div>
                    <div className="rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                      <p className="font-semibold">Advice</p>
                      <p className="mt-2 text-sm leading-6 text-slate-grey">{compactText(selectedRecord.prescription.advice)}</p>
                    </div>
                  </div>

                  {selectedRecord.transcript ? (
                    <div className="mt-5 rounded-liquid border border-midnight-900/10 bg-white/70 p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="text-prestige-gold" size={18} aria-hidden="true" />
                        <p className="font-semibold">Consultation transcript</p>
                      </div>
                      <p className="mt-3 max-h-48 overflow-y-auto text-sm leading-6 text-slate-grey">{selectedRecord.transcript}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </GlassCard>
          </section>
        )}
      </div>
    </main>
  );
}

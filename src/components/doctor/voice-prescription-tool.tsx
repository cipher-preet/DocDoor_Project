"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ChevronDown,
  ClipboardList,
  Download,
  History,
  Loader2,
  Mic,
  MicOff,
  Pill,
  Printer,
  Share2,
  ShieldCheck,
  Stethoscope,
  Volume2,
} from "lucide-react";
import { BrandMark, GlassCard } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import {
  emptyPrescriptionDraft,
  type PrescriptionDraft,
  type ProcessingStage,
} from "@/lib/ai/prescription-types";
import { MAX_CONSULTATION_AUDIO_BYTES, MAX_CONSULTATION_AUDIO_LABEL } from "@/lib/ai/upload-limits";

function PreviewList({ empty, items }: { empty: string; items: string[] }) {
  if (items.length === 0) {
    return <p className="text-[11px] leading-5 text-slate-grey">{empty}</p>;
  }

  return (
    <ul className="grid gap-1.5 text-[11px] leading-5 text-midnight-950">
      {items.map((item) => (
        <li className="flex gap-2" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FieldValue({ value }: { value: string }) {
  return <p className="mt-1 text-sm font-semibold text-midnight-950">{value || "—"}</p>;
}

function LoadingOverlay({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-liquid bg-white/88 px-6 text-center backdrop-blur-sm">
      <Loader2 className="animate-spin text-prestige-gold" size={28} aria-hidden="true" />
      <p className="mt-4 text-sm font-semibold text-midnight-950">{label}</p>
      {sublabel ? <p className="mt-1 text-xs leading-5 text-slate-grey">{sublabel}</p> : null}
    </div>
  );
}

function buildPrescriptionShareText(prescription: PrescriptionDraft, transcript: string, issuedAt: string) {
  const medicines = prescription.medicines.map((medicine) => {
    const parts = [medicine.name, medicine.dosage, medicine.duration].filter(Boolean);
    return parts.join(" — ");
  });

  return [
    "DocDoor Prescription Draft",
    `Date: ${issuedAt}`,
    prescription.patientName ? `Patient: ${prescription.patientName}` : null,
    prescription.patientAge ? `Age: ${prescription.patientAge}` : null,
    prescription.symptoms.length ? `Symptoms: ${prescription.symptoms.join(", ")}` : null,
    prescription.assessment ? `Assessment: ${prescription.assessment}` : null,
    medicines.length ? `Medicines: ${medicines.join("; ")}` : null,
    prescription.precautions.length ? `Precautions: ${prescription.precautions.join("; ")}` : null,
    prescription.advice.length ? `Advice: ${prescription.advice.join("; ")}` : null,
    transcript ? `Transcript:\n${transcript}` : null,
    "Doctor verification required before clinical use.",
  ]
    .filter(Boolean)
    .join("\n");
}

function resolveRecorderMimeType() {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];

  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
}

function statusLabel(stage: ProcessingStage) {
  switch (stage) {
    case "recording":
      return "Recording consultation. Tap the mic when the visit is complete.";
    case "transcribing":
      return "Transcribing audio with OpenAI…";
    case "analyzing":
      return "Analyzing consultation and filling prescription fields…";
    case "error":
      return "Processing failed. Review the message below and try again.";
    default:
      return "Ready to record the doctor-patient consultation.";
  }
}

export function VoicePrescriptionTool() {
  const [transcript, setTranscript] = useState("");
  const [prescription, setPrescription] = useState<PrescriptionDraft>(emptyPrescriptionDraft);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const recorderMimeTypeRef = useRef("");
  const recordingTimerRef = useRef<number | null>(null);

  const isRecording = processingStage === "recording";
  const isProcessing = processingStage === "transcribing" || processingStage === "analyzing";
  const micDisabled = isProcessing;

  const issuedAt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
    [],
  );

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
      }

      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function resetSession() {
    setTranscript("");
    setPrescription(emptyPrescriptionDraft());
    setErrorMessage("");
    setProcessingStage("idle");
    setRecordingSeconds(0);
  }

  function stopMediaTracks() {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  }

  async function processRecording(audioBlob: Blob) {
    if (audioBlob.size === 0) {
      setProcessingStage("error");
      setErrorMessage("No audio was captured. Please record the consultation again.");
      return;
    }

    if (audioBlob.size > MAX_CONSULTATION_AUDIO_BYTES) {
      setProcessingStage("error");
      setErrorMessage(`Recording exceeds the ${MAX_CONSULTATION_AUDIO_LABEL} upload limit. Keep the consultation shorter and try again.`);
      return;
    }

    try {
      setProcessingStage("transcribing");
      setErrorMessage("");

      const transcribeForm = new FormData();
      transcribeForm.append("audio", audioBlob, "consultation.webm");

      const transcribeResponse = await fetch("/api/doctor-prescription/transcribe", {
        body: transcribeForm,
        method: "POST",
      });

      const transcribePayload = (await transcribeResponse.json()) as { error?: string; transcript?: string };

      if (!transcribeResponse.ok) {
        throw new Error(transcribePayload.error ?? "Transcription failed.");
      }

      const nextTranscript = transcribePayload.transcript?.trim() ?? "";
      setTranscript(nextTranscript);

      setProcessingStage("analyzing");

      const extractResponse = await fetch("/api/doctor-prescription/extract", {
        body: JSON.stringify({ transcript: nextTranscript }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const extractPayload = (await extractResponse.json()) as { error?: string; prescription?: PrescriptionDraft };

      if (!extractResponse.ok) {
        throw new Error(extractPayload.error ?? "Prescription extraction failed.");
      }

      setPrescription(extractPayload.prescription ?? emptyPrescriptionDraft());
      setProcessingStage("idle");
    } catch (error) {
      setProcessingStage("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to process the consultation.");
    }
  }

  async function startRecording() {
    if (micDisabled) {
      return;
    }

    try {
      resetSession();

      const mimeType = resolveRecorderMimeType();
      if (!mimeType) {
        setProcessingStage("error");
        setErrorMessage("Audio recording is not supported in this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];
      recorderMimeTypeRef.current = mimeType;

      const recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (recordingTimerRef.current) {
          window.clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }

        stopMediaTracks();

        const audioBlob = new Blob(audioChunksRef.current, { type: recorderMimeTypeRef.current });
        void processRecording(audioBlob);
      };

      recorder.onerror = () => {
        setProcessingStage("error");
        setErrorMessage("Recording was interrupted. Please try again.");
        stopMediaTracks();
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000);
      setProcessingStage("recording");
      setRecordingSeconds(0);

      recordingTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((current) => current + 1);
      }, 1000);
    } catch {
      setProcessingStage("error");
      setErrorMessage("Microphone access was denied or unavailable.");
      stopMediaTracks();
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      return;
    }

    stopMediaTracks();
    setProcessingStage("idle");
  }

  function toggleRecording() {
    if (isRecording) {
      stopRecording();
      return;
    }

    void startRecording();
  }

  function handleExportPdf() {
    setIsExportMenuOpen(false);
    window.setTimeout(() => window.print(), 180);
  }

  async function handleSharePrescription() {
    const shareText = buildPrescriptionShareText(prescription, transcript, issuedAt);
    const shareData = {
      text: shareText,
      title: "DocDoor prescription draft",
      url: window.location.href,
    };

    setIsExportMenuOpen(false);

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareText);
    } catch {
      setErrorMessage("Share was cancelled or blocked by the browser.");
      setProcessingStage("error");
    }
  }

  const formattedDuration = `${String(Math.floor(recordingSeconds / 60)).padStart(2, "0")}:${String(recordingSeconds % 60).padStart(2, "0")}`;

  return (
    <main className="liquid-page min-h-screen overflow-hidden text-midnight-950">
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="no-print flex flex-wrap items-center justify-between gap-4">
          <BrandMark size="sm" tone="light" />
          <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-semibold">
            <span className="rounded-full border border-midnight-900/10 bg-white/75 px-3 py-2 text-slate-grey shadow-liquid-sm">
              Dr. Gagandeep S Sachdeva
            </span>
            <Link
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-midnight-900/10 bg-white/75 px-3 py-2 text-midnight-950 shadow-liquid-sm transition hover:bg-white"
              href="/doctor-prescription/history"
            >
              <History size={15} aria-hidden="true" />
              History
            </Link>
            <div className="relative">
              <button
                aria-expanded={isExportMenuOpen}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-prestige-gold/40 bg-prestige-gold px-4 py-2 text-midnight-950 shadow-liquid-sm transition hover:bg-gold-strong hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                data-testid="export-pdf-menu-button"
                disabled={isProcessing || isRecording}
                onClick={() => setIsExportMenuOpen((current) => !current)}
                type="button"
              >
                <Download size={15} aria-hidden="true" />
                Export PDF
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              {isExportMenuOpen ? (
                <div
                  className="absolute right-0 z-20 mt-3 w-60 overflow-hidden rounded-liquid border border-white/70 bg-white/92 p-2 text-sm shadow-liquid-lg backdrop-blur-xl"
                  data-testid="export-pdf-menu"
                >
                  <button
                    className="focus-ring flex w-full items-center gap-3 rounded-liquid px-3 py-3 text-left font-semibold text-midnight-950 transition hover:bg-surface-grey"
                    onClick={handleExportPdf}
                    type="button"
                  >
                    <Printer className="text-prestige-gold" size={17} aria-hidden="true" />
                    Export one-page PDF
                  </button>
                  <button
                    className="focus-ring flex w-full items-center gap-3 rounded-liquid px-3 py-3 text-left font-semibold text-midnight-950 transition hover:bg-surface-grey"
                    onClick={() => void handleSharePrescription()}
                    type="button"
                  >
                    <Share2 className="text-prestige-gold" size={17} aria-hidden="true" />
                    Share prescription draft
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <div className="no-print grid gap-5">
            <GlassCard dark className="overflow-hidden p-5 sm:p-6">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-prestige-gold">Voice prescription</p>
                  <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Record the consultation. AI fills the prescription draft.
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                    DocDoor records the full doctor-patient conversation, transcribes it with OpenAI, and extracts symptoms, assessment, medicines, precautions, and advice only when clearly mentioned.
                  </p>
                </div>

                <div className="grid justify-items-center gap-4">
                  <button
                    aria-label={isRecording ? "Stop consultation recording" : "Start consultation recording"}
                    className={cn(
                      "focus-ring relative grid h-36 w-36 place-items-center rounded-full border text-white shadow-[0_24px_64px_rgba(6,22,45,0.38)] backdrop-blur-2xl transition sm:h-44 sm:w-44",
                      isRecording
                        ? "border-prestige-gold/80 bg-prestige-gold/20 ring-8 ring-prestige-gold/15"
                        : "border-white/25 bg-white/12 hover:border-prestige-gold/70 hover:bg-white/18",
                      micDisabled && "cursor-not-allowed opacity-70",
                    )}
                    data-testid="voice-prescription-mic"
                    disabled={micDisabled}
                    onClick={toggleRecording}
                    type="button"
                  >
                    <span className="absolute inset-4 rounded-full border border-white/16 bg-white/8" />
                    <span className="absolute inset-8 rounded-full border border-prestige-gold/25 bg-midnight-950/45" />
                    {isProcessing ? (
                      <Loader2 className="relative animate-spin text-prestige-gold" size={48} aria-hidden="true" />
                    ) : isRecording ? (
                      <MicOff className="relative text-prestige-gold" size={48} aria-hidden="true" />
                    ) : (
                      <Mic className="relative text-prestige-gold" size={52} aria-hidden="true" />
                    )}
                  </button>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/80">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          isRecording ? "animate-pulse bg-emerald-400" : isProcessing ? "animate-pulse bg-prestige-gold" : "bg-prestige-gold",
                        )}
                      />
                      {isRecording ? "Recording consultation" : isProcessing ? "Processing with AI" : "Tap to start recording"}
                    </div>
                    {isRecording ? <p className="text-xs font-medium text-white/60">{formattedDuration}</p> : null}
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="relative p-5" data-testid="live-discussion-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Consultation transcript</h2>
                  <p className="mt-1 text-sm text-slate-grey">{statusLabel(processingStage)}</p>
                </div>
                <Volume2 className="text-prestige-gold" size={22} aria-hidden="true" />
              </div>

              {processingStage === "transcribing" ? (
                <LoadingOverlay
                  label="Transcribing consultation"
                  sublabel="Sending the full recording to OpenAI Whisper."
                />
              ) : null}

              {processingStage === "analyzing" ? (
                <LoadingOverlay
                  label="Analyzing consultation"
                  sublabel="Extracting symptoms, assessment, medicines, precautions, and advice from the transcript."
                />
              ) : null}

              <div
                className="relative mt-4 max-h-[560px] min-h-[360px] overflow-y-auto rounded-liquid border border-midnight-900/10 bg-white/76 p-5 text-[15px] leading-7 text-midnight-950 shadow-inner sm:min-h-[420px]"
                data-testid="live-discussion-window"
              >
                {transcript ? (
                  <p>{transcript}</p>
                ) : (
                  <p className="text-slate-grey">
                    The full doctor-patient conversation will appear here after you stop recording. Fields stay empty until the AI finds clear information in the transcript.
                  </p>
                )}
              </div>

              {errorMessage ? (
                <div className="mt-4 rounded-liquid border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}
            </GlassCard>
          </div>

          <section className="prescription-print relative overflow-hidden rounded-[10px] border border-midnight-900/12 bg-white p-5 text-midnight-950 shadow-liquid-lg sm:p-6">
            {processingStage === "analyzing" ? (
              <LoadingOverlay
                label="Building prescription draft"
                sublabel="Only explicitly mentioned symptoms, assessment, medicines, precautions, and advice will be filled."
              />
            ) : null}

            <div className="flex items-start justify-between gap-4 border-b border-midnight-900/10 pb-4">
              <div>
                <BrandMark size="sm" tone="light" />
                <p className="mt-2 text-xs text-slate-grey">DocDoor Voice Prescription</p>
              </div>
              <div className="text-right text-xs text-slate-grey">
                <p className="font-semibold text-midnight-950">Prescription draft</p>
                <p>{issuedAt}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 rounded-[8px] border border-midnight-900/10 bg-surface-grey p-3 text-xs sm:grid-cols-3">
              <div>
                <p className="font-medium text-slate-grey">Patient</p>
                <FieldValue value={prescription.patientName} />
              </div>
              <div>
                <p className="font-medium text-slate-grey">Age</p>
                <FieldValue value={prescription.patientAge} />
              </div>
              <div>
                <p className="font-medium text-slate-grey">Doctor</p>
                <p className="mt-1 text-sm font-semibold text-midnight-950">Dr. Gagandeep S Sachdeva</p>
              </div>
            </div>

            <div className="mt-5 rounded-[8px] border border-midnight-900/10 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Stethoscope className="text-prestige-gold" size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Symptoms</h2>
              </div>
              <PreviewList empty="No symptoms identified." items={prescription.symptoms} />
            </div>

            <div className="mt-4 rounded-[8px] border border-midnight-900/10 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ClipboardList className="text-prestige-gold" size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Assessment</h2>
              </div>
              {prescription.assessment ? (
                <p className="text-[11px] leading-5 text-midnight-950">{prescription.assessment}</p>
              ) : (
                <p className="text-[11px] leading-5 text-slate-grey">No assessment identified.</p>
              )}
            </div>

            <div className="mt-4 rounded-[8px] border border-midnight-900/10">
              <div className="flex items-center gap-2 border-b border-midnight-900/10 px-4 py-3">
                <Pill className="text-prestige-gold" size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Medicines</h2>
              </div>
              <div className="grid grid-cols-[1fr_1.2fr_0.7fr] border-b border-midnight-900/10 bg-midnight-950 px-4 py-2 text-[11px] font-semibold text-white">
                <span>Medicine</span>
                <span>Dosage</span>
                <span>Duration</span>
              </div>
              {prescription.medicines.length ? (
                prescription.medicines.map((medicine, index) => (
                  <div
                    className="grid grid-cols-[1fr_1.2fr_0.7fr] gap-2 border-b border-midnight-900/8 px-4 py-2.5 text-[11px] leading-5 last:border-b-0"
                    key={`${medicine.name}-${index}`}
                  >
                    <span className="font-semibold">{medicine.name || "—"}</span>
                    <span>{medicine.dosage || "—"}</span>
                    <span>{medicine.duration || "—"}</span>
                  </div>
                ))
              ) : (
                <p className="px-4 py-4 text-[11px] text-slate-grey">No medicines identified.</p>
              )}
            </div>

            <div className="mt-4 rounded-[8px] border border-midnight-900/10 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="text-prestige-gold" size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Precautions</h2>
              </div>
              <PreviewList empty="No precautions identified." items={prescription.precautions} />
            </div>

            <div className="mt-4 rounded-[8px] border border-midnight-900/10 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Activity className="text-prestige-gold" size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold">Advice</h2>
              </div>
              <PreviewList empty="No advice identified." items={prescription.advice} />
            </div>

            <div className="mt-5 grid gap-4 border-t border-midnight-900/10 pt-4 sm:grid-cols-[1fr_180px] sm:items-end">
              <div className="flex items-start gap-2 text-[10px] leading-4 text-slate-grey">
                <ShieldCheck className="mt-0.5 shrink-0 text-prestige-gold" size={14} aria-hidden="true" />
                <p>
                  AI-generated draft from the consultation recording. Doctor must verify all details before clinical use.
                </p>
              </div>
              <div className="text-right text-xs">
                <div className="mb-2 border-t border-midnight-950/50 pt-2" />
                <p className="font-semibold text-midnight-950">Doctor signature</p>
                <p className="mt-1 text-slate-grey">Reg. ID: DD-MED-2045</p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

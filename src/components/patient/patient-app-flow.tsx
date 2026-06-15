"use client";

import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Ambulance,
  BellRing,
  CalendarDays,
  FileUp,
  HeartPulse,
  MessageCircle,
  PhoneCall,
  Pill,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  Badge,
  BrandMark,
  Button,
  Card,
  DashboardMetricCard,
  EmergencyButton,
  GlassCard,
  HealthScoreCard,
  ReportCard,
  StatusTimeline,
  UserAvatar,
} from "@/components/ui";
import {
  callCareAssistant,
  requestPatientEmergency,
  sendPatientMessage,
  uploadPatientReport,
  type PatientActionResult,
  type PatientAppSnapshot,
  type PatientContact,
  type PatientMedication,
  type PatientMessage,
} from "@/lib/api/patient";
import { cn } from "@/lib/utils/cn";

type PatientAppFlowProps = {
  initialData: PatientAppSnapshot;
};

const metricIcons = [HeartPulse, Pill, CalendarDays, UserRound] as const;

const medicationTone = {
  due: "warning",
  taken: "success",
  upcoming: "info",
} as const;

const contactTone = {
  assistant: "gold",
  doctor: "info",
  family: "success",
} as const;

const quickMessages = [
  "Please call me.",
  "I need help with my medicine.",
  "Please update my family.",
];

function getAnnouncement(result: PatientActionResult | null) {
  if (!result) {
    return "No recent action yet.";
  }

  return `${result.message} ${result.createdAt}.`;
}

function getMedicationHelp(medication: PatientMedication) {
  if (medication.status === "due") {
    return "Due now";
  }

  if (medication.status === "taken") {
    return "Already taken";
  }

  return "Upcoming";
}

export function PatientAppFlow({ initialData }: PatientAppFlowProps) {
  const [actionResult, setActionResult] = useState<PatientActionResult | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isEmergencyLoading, setIsEmergencyLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<PatientContact["type"]>("doctor");
  const [messages, setMessages] = useState(initialData.messages);
  const [uploadedReports, setUploadedReports] = useState(initialData.reports);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const metrics = useMemo(() => {
    return initialData.metrics.map((metric, index) => ({
      ...metric,
      icon: metricIcons[index] ?? HeartPulse,
      value: metric.label === "Medicines" ? String(initialData.medications.length) : metric.value,
    }));
  }, [initialData.medications.length, initialData.metrics]);

  const selectedContact = initialData.contacts.find((contact) => contact.type === selectedRecipient) ?? initialData.contacts[0];

  async function handleCallCareAssistant() {
    setIsCalling(true);

    try {
      const result = await callCareAssistant(initialData.patient.id);
      setActionResult(result);
    } finally {
      setIsCalling(false);
    }
  }

  async function handleEmergencyRequest() {
    setIsEmergencyLoading(true);

    try {
      const result = await requestPatientEmergency(initialData.patient.id);
      setActionResult(result);
    } finally {
      setIsEmergencyLoading(false);
    }
  }

  function handleReportButtonClick() {
    fileInputRef.current?.click();
  }

  async function handleReportUpload(event: ChangeEvent<HTMLInputElement>) {
    const fileName = event.target.files?.[0]?.name ?? "New report";

    setIsUploading(true);

    try {
      const result = await uploadPatientReport(initialData.patient.id, fileName);
      setActionResult(result);
      setUploadedReports((current) => [
        {
          date: "Just now",
          id: result.id,
          source: "Patient upload",
          status: "uploaded",
          title: fileName,
          type: "Uploaded Report",
        },
        ...current,
      ]);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!messageText.trim()) {
      return;
    }

    setIsSending(true);

    try {
      const result = await sendPatientMessage(initialData.patient.id, {
        body: messageText,
        recipientType: selectedRecipient,
      });
      const newMessage: PatientMessage = {
        body: messageText,
        id: result.id,
        sender: "patient",
        time: "Just now",
      };

      setMessages((current) => [...current, newMessage]);
      setActionResult(result);
      setMessageText("");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="liquid-page min-h-screen text-midnight-950">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <GlassCard dark className="p-5 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-center">
            <div>
              <div>
                <BrandMark size="sm" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-normal text-prestige-gold">Patient App | Simple daily care</p>
              </div>

              <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Good morning, {initialData.patient.name}.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/74">
                Today&apos;s care plan, medicines, visits, reports, and support are all in one calm place.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  className="min-h-14 text-lg"
                  iconLeft={<PhoneCall size={22} aria-hidden="true" />}
                  isLoading={isCalling}
                  onClick={handleCallCareAssistant}
                  size="lg"
                  variant="gold"
                >
                  Call Care Assistant
                </Button>
                <Button
                  className="min-h-14 text-lg"
                  iconLeft={<MessageCircle size={22} aria-hidden="true" />}
                  size="lg"
                  variant="secondary"
                  onClick={() => document.getElementById("patient-messages")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  Message Doctor or Family
                </Button>
              </div>
            </div>

            <div className="rounded-liquid border border-white/12 bg-white/8 p-5">
              <div className="flex items-center gap-4">
                <UserAvatar name={initialData.patient.name} size="lg" status="online" />
                <div>
                  <p className="text-xl font-semibold text-white">{initialData.patient.name}</p>
                  <p className="mt-1 text-sm text-white/66">
                    Age {initialData.patient.age} - {initialData.patient.city}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-white/76">
                <div className="flex items-center justify-between gap-3 rounded-liquid border border-white/10 bg-white/8 px-3 py-3">
                  <span>Preferred language</span>
                  <strong className="text-prestige-gold">{initialData.patient.preferredLanguage}</strong>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-liquid border border-white/10 bg-white/8 px-3 py-3">
                  <span>Emergency contact</span>
                  <strong className="text-prestige-gold">{initialData.patient.emergencyContact}</strong>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <DashboardMetricCard
              delta={metric.delta}
              icon={metric.icon}
              key={metric.label}
              label={metric.label}
              tone={metric.tone}
              value={metric.value}
            />
          ))}
        </div>

        <div aria-live="polite" className="rounded-liquid border border-prestige-gold/30 bg-prestige-gold/16 px-4 py-3 text-base font-semibold text-midnight-950">
          <BellRing className="mr-2 inline text-gold-strong" size={20} aria-hidden="true" />
          {getAnnouncement(actionResult)}
        </div>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <HealthScoreCard
            label="Your Health Score"
            score={initialData.health.score}
            status={initialData.health.status}
            trend={initialData.health.trend}
          />

          <GlassCard className="p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Today&apos;s care plan</h2>
                <p className="mt-1 text-base leading-7 text-slate-grey">One step at a time. Your care team can see the same plan.</p>
              </div>
              <Badge icon={<ShieldCheck size={14} aria-hidden="true" />} tone="success">
                Updated {initialData.health.lastUpdated}
              </Badge>
            </div>
            <StatusTimeline
              items={initialData.carePlan.map((item) => ({
                description: item.description,
                label: `${item.time} - ${item.title}`,
                meta: item.status === "current" ? "Now" : undefined,
                status: item.status,
              }))}
            />
          </GlassCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Medications</h2>
                <p className="mt-1 text-base leading-7 text-slate-grey">Large, clear reminders for today.</p>
              </div>
              <Pill className="text-gold-strong" size={24} aria-hidden="true" />
            </div>
            <div className="grid gap-3">
              {initialData.medications.map((medication) => (
                <Card className={cn("p-4", medication.status === "due" && "border-prestige-gold/45 bg-prestige-gold/10")} key={medication.id}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold">{medication.name}</h3>
                        <Badge tone={medicationTone[medication.status]}>{getMedicationHelp(medication)}</Badge>
                      </div>
                      <p className="mt-2 text-base text-slate-grey">
                        {medication.dosage} - {medication.instruction}
                      </p>
                    </div>
                    <div className="rounded-liquid border border-midnight-900/10 bg-white px-4 py-3 text-center">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-grey">Time</p>
                      <p className="mt-1 text-xl font-semibold text-midnight-950">{medication.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Upcoming visits</h2>
                <p className="mt-1 text-base leading-7 text-slate-grey">Home visits and doctor check-ins for today.</p>
              </div>
              <CalendarDays className="text-gold-strong" size={24} aria-hidden="true" />
            </div>
            <div className="grid gap-3">
              {initialData.visits.map((visit) => (
                <Card as="article" className="p-4" key={visit.id}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-liquid bg-midnight-950 text-prestige-gold">
                        <CalendarDays size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{visit.title}</h3>
                        <p className="mt-1 text-base text-slate-grey">{visit.careTeam}</p>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <Badge tone={visit.status === "confirmed" ? "success" : "warning"}>{visit.status}</Badge>
                      <p className="mt-2 text-base font-semibold text-midnight-950">{visit.time}</p>
                      <p className="mt-1 text-sm text-slate-grey">{visit.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Reports</h2>
                <p className="mt-1 text-base leading-7 text-slate-grey">Upload or review recent health reports.</p>
              </div>
              <input
                accept=".pdf,.png,.jpg,.jpeg"
                className="sr-only"
                onChange={handleReportUpload}
                ref={fileInputRef}
                type="file"
              />
              <Button
                className="min-h-14 text-lg"
                iconLeft={<FileUp size={21} aria-hidden="true" />}
                isLoading={isUploading}
                onClick={handleReportButtonClick}
                size="lg"
                variant="gold"
              >
                Upload Report
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {uploadedReports.map((report) => (
                <ReportCard
                  date={report.date}
                  key={report.id}
                  source={report.source}
                  status={report.status}
                  title={report.title}
                  type={report.type}
                />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5" id="patient-messages">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Message doctor or family</h2>
                <p className="mt-1 text-base leading-7 text-slate-grey">Choose who should receive your message.</p>
              </div>
              <MessageCircle className="text-gold-strong" size={24} aria-hidden="true" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {initialData.contacts.map((contact) => {
                const selected = contact.type === selectedRecipient;

                return (
                  <button
                    className={cn(
                      "focus-ring min-h-24 rounded-liquid border p-4 text-left transition",
                      selected
                        ? "border-prestige-gold bg-prestige-gold/16"
                        : "border-midnight-900/10 bg-white/72 hover:border-prestige-gold/40",
                    )}
                    key={contact.id}
                    onClick={() => setSelectedRecipient(contact.type)}
                    type="button"
                  >
                    <Badge tone={contactTone[contact.type]}>{contact.relation}</Badge>
                    <p className="mt-3 text-lg font-semibold">{contact.name}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-grey">{contact.responseTime}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <p className="text-base font-semibold text-midnight-950">Quick messages</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {quickMessages.map((message) => (
                  <button
                    className="focus-ring min-h-14 rounded-liquid border border-midnight-900/10 bg-white/76 px-4 py-3 text-left text-base font-semibold text-midnight-950 shadow-liquid-sm transition hover:border-prestige-gold/45 hover:bg-prestige-gold/12"
                    key={message}
                    onClick={() => setMessageText(message)}
                    type="button"
                  >
                    {message}
                  </button>
                ))}
              </div>
            </div>

            <form className="mt-5 grid gap-3" onSubmit={handleSendMessage}>
              <label className="grid gap-2 text-base font-semibold text-midnight-950">
                Message to {selectedContact.name}
                <textarea
                  className="focus-ring min-h-32 rounded-liquid border border-midnight-900/10 bg-white/78 px-4 py-3 text-lg leading-8 text-midnight-950 shadow-liquid-sm placeholder:text-slate-grey/65"
                  onChange={(event) => setMessageText(event.target.value)}
                  placeholder="Type your message here..."
                  value={messageText}
                />
              </label>
              <Button
                className="min-h-14 text-lg"
                iconLeft={<Send size={20} aria-hidden="true" />}
                isLoading={isSending}
                size="lg"
                type="submit"
                variant="midnight"
              >
                Send Message
              </Button>
            </form>

            <div className="mt-5 grid gap-3" aria-label="Recent messages">
              {messages.map((message) => (
                <div
                  className={cn(
                    "max-w-[88%] rounded-liquid border px-4 py-3 text-base leading-7",
                    message.sender === "patient"
                      ? "ml-auto border-midnight-900/10 bg-midnight-950 text-white"
                      : "border-midnight-900/10 bg-white/76 text-midnight-950",
                  )}
                  key={message.id}
                >
                  <p>{message.body}</p>
                  <p className={cn("mt-2 text-xs font-semibold", message.sender === "patient" ? "text-white/62" : "text-slate-grey")}>
                    {message.time}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <GlassCard className="grid place-items-center p-6">
            <div className="grid justify-items-center gap-5 text-center">
              <EmergencyButton
                aria-label="Request emergency help"
                disabled={isEmergencyLoading}
                label="SOS"
                onClick={handleEmergencyRequest}
                sublabel={isEmergencyLoading ? "Requesting..." : "Emergency Help"}
              />
              <div>
                <h2 className="text-2xl font-semibold">Emergency help</h2>
                <p className="mt-2 max-w-sm text-base leading-7 text-slate-grey">
                  This alerts the care assistant, family, hospital, and ambulance support team.
                </p>
              </div>
              <Button
                className="min-h-14 w-full text-lg"
                iconLeft={<Ambulance size={22} aria-hidden="true" />}
                isLoading={isEmergencyLoading}
                onClick={handleEmergencyRequest}
                size="lg"
                variant="danger"
              >
                Request Emergency Help
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Activity timeline</h2>
              <p className="mt-1 text-base leading-7 text-slate-grey">Recent care actions and what is coming next.</p>
            </div>
            <StatusTimeline items={initialData.activity} />
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

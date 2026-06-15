"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Activity,
  Ambulance,
  BellRing,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPinned,
  Plus,
  RadioTower,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  AppointmentCard,
  Badge,
  BrandMark,
  Button,
  Card,
  DashboardMetricCard,
  EmergencyButton,
  GlassCard,
  HealthScoreCard,
  Input,
  ReportCard,
  StatusTimeline,
  UserAvatar,
} from "@/components/ui";
import {
  createEmergencyRequest,
  createParentProfile,
  getNextFamilyLiveUpdate,
  type EmergencyRequestResult,
  type FamilyActivityItem,
  type FamilyAppSnapshot,
  type FamilyLiveUpdate,
  type NewParentProfileInput,
  type ParentProfile,
} from "@/lib/api/family";
import { cn } from "@/lib/utils/cn";

type FamilyAppFlowProps = {
  initialData: FamilyAppSnapshot;
};

const emptyParentForm: NewParentProfileInput = {
  age: 70,
  city: "",
  condition: "",
  name: "",
  relation: "Mother",
};

const parentStatusTone = {
  active: "info",
  attention: "warning",
  stable: "success",
} as const;

const liveStatusLabel = {
  assigned: "Assigned",
  completed: "Completed",
  en_route: "En route",
  in_progress: "In progress",
} as const;

const metricIcons = [Users, CalendarDays, FileText, Ambulance] as const;

function getRelatedItems<T extends { patientId: string }>(items: T[], parentId: string) {
  return items.filter((item) => item.patientId === parentId);
}

function buildTimelineItem(parent: ParentProfile): FamilyActivityItem {
  return {
    description: `${parent.name} was added to the family care workspace. Baseline health setup is pending.`,
    label: "Parent profile added",
    meta: "Just now",
    status: "current",
  };
}

export function FamilyAppFlow({ initialData }: FamilyAppFlowProps) {
  const [parents, setParents] = useState(initialData.parents);
  const [selectedParentId, setSelectedParentId] = useState(initialData.parents[0]?.id ?? "");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSavingParent, setIsSavingParent] = useState(false);
  const [isEmergencyLoading, setIsEmergencyLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [parentForm, setParentForm] = useState<NewParentProfileInput>(emptyParentForm);
  const [liveUpdates, setLiveUpdates] = useState(initialData.liveUpdates);
  const [activityItems, setActivityItems] = useState(initialData.activity);
  const [emergencyResult, setEmergencyResult] = useState<EmergencyRequestResult | null>(null);
  const [updateCursor, setUpdateCursor] = useState(0);

  const selectedParent = useMemo(() => {
    return parents.find((parent) => parent.id === selectedParentId) ?? parents[0];
  }, [parents, selectedParentId]);

  const selectedAppointments = useMemo(() => {
    if (!selectedParent) {
      return [];
    }

    return getRelatedItems(initialData.appointments, selectedParent.id);
  }, [initialData.appointments, selectedParent]);

  const selectedReports = useMemo(() => {
    if (!selectedParent) {
      return [];
    }

    return getRelatedItems(initialData.reports, selectedParent.id);
  }, [initialData.reports, selectedParent]);

  const metrics = useMemo(() => {
    const baseMetrics = initialData.metrics.map((metric, index) => ({
      ...metric,
      icon: metricIcons[index] ?? Activity,
    }));

    return baseMetrics.map((metric) => {
      if (metric.label === "Family members") {
        return { ...metric, delta: `${parents.length} profiles active`, value: String(parents.length) };
      }

      if (metric.label === "Upcoming visits") {
        return { ...metric, value: String(initialData.appointments.length) };
      }

      if (metric.label === "Emergency access" && emergencyResult) {
        return { ...metric, delta: emergencyResult.status, value: "SOS" };
      }

      return metric;
    });
  }, [emergencyResult, initialData.appointments.length, initialData.metrics, parents.length]);

  async function handleAddParent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!parentForm.name.trim() || !parentForm.city.trim() || !parentForm.condition.trim()) {
      return;
    }

    setIsSavingParent(true);

    try {
      const newParent = await createParentProfile(parentForm);
      setParents((current) => [newParent, ...current]);
      setSelectedParentId(newParent.id);
      setActivityItems((current) => [buildTimelineItem(newParent), ...current]);
      setParentForm(emptyParentForm);
      setIsAddOpen(false);
    } finally {
      setIsSavingParent(false);
    }
  }

  async function handleEmergencyRequest() {
    if (!selectedParent) {
      return;
    }

    setIsEmergencyLoading(true);

    try {
      const result = await createEmergencyRequest({
        location: selectedParent.city,
        patientId: selectedParent.id,
      });
      const emergencyUpdate: FamilyLiveUpdate = {
        id: result.id,
        message: result.message,
        time: result.createdAt,
        title: "Emergency request triggered",
        tone: "danger",
      };

      setEmergencyResult(result);
      setLiveUpdates((current) => [emergencyUpdate, ...current]);
      setActivityItems((current) => [
        {
          description: result.message,
          label: "Emergency workflow started",
          meta: result.createdAt,
          status: "current",
        },
        ...current,
      ]);
    } finally {
      setIsEmergencyLoading(false);
    }
  }

  async function handleLiveUpdate() {
    setIsUpdateLoading(true);

    try {
      const nextUpdate = await getNextFamilyLiveUpdate(updateCursor);
      setLiveUpdates((current) => [nextUpdate, ...current]);
      setUpdateCursor((current) => current + 1);
    } finally {
      setIsUpdateLoading(false);
    }
  }

  if (!selectedParent) {
    return null;
  }

  const liveVisitParent = parents.find((parent) => parent.id === initialData.liveVisit.patientId) ?? selectedParent;

  return (
    <main className="liquid-page min-h-screen text-midnight-950">
      <div className="grid min-h-screen xl:grid-cols-[320px_1fr]">
        <aside className="midnight-panel flex min-h-screen flex-col justify-between px-5 py-6 text-white xl:sticky xl:top-0">
          <div>
            <div>
              <BrandMark size="sm" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-normal text-prestige-gold">Family App</p>
            </div>

            <div className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prestige-gold">Care workspace</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">Your parents&apos; health, clearly in hand.</h1>
              <p className="mt-4 text-sm leading-6 text-white/72">
                {initialData.familyMember.name} manages {parents.length} parent profiles from {initialData.familyMember.city}.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {parents.map((parent) => {
                const isSelected = parent.id === selectedParent.id;

                return (
                  <button
                    className={cn(
                      "focus-ring rounded-liquid border p-4 text-left transition",
                      isSelected
                        ? "border-prestige-gold bg-white/14"
                        : "border-white/10 bg-white/7 hover:border-prestige-gold/45 hover:bg-white/10",
                    )}
                    key={parent.id}
                    onClick={() => setSelectedParentId(parent.id)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar name={parent.name} status={parent.status === "attention" ? "away" : "online"} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{parent.name}</p>
                        <p className="mt-1 text-xs font-semibold text-white/62">
                          {parent.relation} - Age {parent.age}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className="text-white/68">Health score</span>
                      <strong className="text-prestige-gold">{parent.healthScore}/100</strong>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-liquid border border-prestige-gold/35 bg-white/8 p-4 text-sm leading-6 text-white/78">
            <p className="font-semibold text-prestige-gold">{initialData.familyMember.plan}</p>
            <p className="mt-2">Live updates, care visits, reports, and emergency support are active.</p>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 rounded-liquid border border-white/70 bg-white/62 p-4 shadow-liquid-sm backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-strong">Family app flow</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-midnight-950">Family Care Dashboard</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-grey">
                Parent profiles, health score, visits, reports, emergency requests, live updates, and activity timeline.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button iconLeft={<Plus size={17} aria-hidden="true" />} onClick={() => setIsAddOpen((current) => !current)} size="lg" variant="gold">
                Add Parent
              </Button>
              <Button iconLeft={<ShieldCheck size={17} aria-hidden="true" />} size="lg" variant="secondary">
                Consent Active
              </Button>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
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

          {isAddOpen ? (
            <GlassCard className="mt-6 p-5">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">Add parent profile</h3>
                  <p className="mt-1 text-sm text-slate-grey">Create a family-visible care profile with baseline health context.</p>
                </div>
                <Badge tone="gold">Mock API</Badge>
              </div>
              <form className="grid gap-4 lg:grid-cols-[1fr_0.7fr_0.7fr_1fr_auto]" onSubmit={handleAddParent}>
                <Input
                  label="Full name"
                  onChange={(event) => setParentForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Mrs. Kavita Rao"
                  required
                  value={parentForm.name}
                />
                <label className="grid gap-2 text-sm font-semibold text-midnight-950">
                  Relation
                  <select
                    className="focus-ring h-12 rounded-liquid border border-midnight-900/10 bg-white/78 px-3 text-base text-midnight-950 shadow-liquid-sm"
                    onChange={(event) => setParentForm((current) => ({ ...current, relation: event.target.value }))}
                    value={parentForm.relation}
                  >
                    <option>Mother</option>
                    <option>Father</option>
                    <option>Grandmother</option>
                    <option>Grandfather</option>
                  </select>
                </label>
                <Input
                  label="Age"
                  min={50}
                  onChange={(event) => setParentForm((current) => ({ ...current, age: Number(event.target.value) }))}
                  required
                  type="number"
                  value={parentForm.age}
                />
                <Input
                  label="City"
                  onChange={(event) => setParentForm((current) => ({ ...current, city: event.target.value }))}
                  placeholder="Chandigarh"
                  required
                  value={parentForm.city}
                />
                <div className="lg:pt-7">
                  <Button className="w-full" isLoading={isSavingParent} size="lg" type="submit" variant="midnight">
                    Save
                  </Button>
                </div>
                <div className="lg:col-span-5">
                  <Input
                    label="Health context"
                    onChange={(event) => setParentForm((current) => ({ ...current, condition: event.target.value }))}
                    placeholder="Hypertension, diabetes, mobility support..."
                    required
                    value={parentForm.condition}
                  />
                </div>
              </form>
            </GlassCard>
          ) : null}

          <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_390px]">
            <div className="grid gap-6">
              <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <HealthScoreCard
                  label={`${selectedParent.relation}'s Health Score`}
                  score={selectedParent.healthScore}
                  status={selectedParent.status === "attention" ? "Needs attention" : "Good"}
                  trend={selectedParent.trend}
                />

                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={selectedParent.name} size="lg" status={selectedParent.status === "attention" ? "away" : "online"} />
                        <div>
                          <h3 className="text-2xl font-semibold">{selectedParent.name}</h3>
                          <p className="mt-1 text-sm text-slate-grey">
                            {selectedParent.relation} - {selectedParent.age} - {selectedParent.city}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-grey">{selectedParent.carePlan}</p>
                    </div>
                    <Badge tone={parentStatusTone[selectedParent.status]}>{selectedParent.status}</Badge>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {[
                      { label: "Condition", value: selectedParent.condition },
                      { label: "Last check-in", value: selectedParent.lastCheckIn },
                      { label: "Emergency contact", value: selectedParent.emergencyContact },
                    ].map((item) => (
                      <div className="rounded-liquid border border-midnight-900/8 bg-white/68 p-4" key={item.label}>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-grey">{item.label}</p>
                        <p className="mt-2 text-sm font-semibold text-midnight-950">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <GlassCard className="p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">Upcoming appointments</h3>
                      <p className="mt-1 text-sm text-slate-grey">Confirmed visits and requested consultations.</p>
                    </div>
                    <CalendarDays className="text-gold-strong" size={22} aria-hidden="true" />
                  </div>
                  <div className="grid gap-3">
                    {selectedAppointments.length ? (
                      selectedAppointments.map((appointment) => (
                        <AppointmentCard
                          doctor={appointment.doctor}
                          key={appointment.id}
                          location={appointment.location}
                          patient={selectedParent.name}
                          specialty={appointment.specialty}
                          status={appointment.status}
                          time={appointment.time}
                        />
                      ))
                    ) : (
                      <Card className="p-4">
                        <p className="font-semibold">No upcoming appointments</p>
                        <p className="mt-1 text-sm text-slate-grey">Book a consultation or care assistant visit when needed.</p>
                      </Card>
                    )}
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">Latest reports</h3>
                      <p className="mt-1 text-sm text-slate-grey">Recent lab, scan, and prescription uploads.</p>
                    </div>
                    <FileText className="text-gold-strong" size={22} aria-hidden="true" />
                  </div>
                  <div className="grid gap-3">
                    {selectedReports.length ? (
                      selectedReports.map((report) => (
                        <ReportCard
                          date={report.date}
                          key={report.id}
                          source={report.source}
                          status={report.status}
                          title={report.title}
                          type={report.type}
                        />
                      ))
                    ) : (
                      <Card className="p-4">
                        <p className="font-semibold">No reports uploaded yet</p>
                        <p className="mt-1 text-sm text-slate-grey">Hospital and diagnostic uploads will appear here.</p>
                      </Card>
                    )}
                  </div>
                </GlassCard>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <GlassCard className="p-5" dark>
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-prestige-gold">Live tracking</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{liveVisitParent.name}</h3>
                      <p className="mt-1 text-sm text-white/68">
                        {initialData.liveVisit.assistantName} - {liveStatusLabel[initialData.liveVisit.status]}
                      </p>
                    </div>
                    <Badge tone="success">{initialData.liveVisit.checkInStatus}</Badge>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-80 overflow-hidden rounded-liquid border border-prestige-gold/24 bg-[#07172c]">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(216,181,106,.12)_1px,transparent_1px),linear-gradient(rgba(216,181,106,.12)_1px,transparent_1px)] bg-[size:42px_42px]" />
                      <div className="absolute left-[18%] top-[58%] h-4 w-4 rounded-full bg-emerald-400 ring-8 ring-emerald-400/18" />
                      <div className="absolute left-[44%] top-[43%] h-4 w-4 rounded-full bg-prestige-gold ring-8 ring-prestige-gold/18" />
                      <div className="absolute left-[72%] top-[32%] h-4 w-4 rounded-full bg-blue-400 ring-8 ring-blue-400/18" />
                      <div className="absolute left-[24%] top-[56%] h-px w-[52%] -rotate-[22deg] bg-prestige-gold/72" />
                      <div className="absolute bottom-4 left-4 right-4 rounded-liquid border border-white/12 bg-white/10 p-3 text-sm text-white/82 backdrop-blur">
                        <MapPinned className="mr-2 inline text-prestige-gold" size={16} aria-hidden="true" />
                        {initialData.liveVisit.location} - ETA {initialData.liveVisit.eta}
                      </div>
                    </div>

                    <div className="rounded-liquid border border-white/12 bg-white/8 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white/68">Care assistant</p>
                          <p className="mt-1 text-lg font-semibold text-white">{initialData.liveVisit.assistantName}</p>
                        </div>
                        <UserAvatar name={initialData.liveVisit.assistantName} status="online" />
                      </div>
                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-sm font-semibold text-white/72">
                          <span>Visit progress</span>
                          <span>{initialData.liveVisit.progress}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/14">
                          <div
                            className="h-full rounded-full bg-prestige-gold"
                            style={{ width: `${initialData.liveVisit.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-5 grid gap-2">
                        {initialData.liveVisit.tasks.map((task) => (
                          <div className="flex items-center justify-between rounded-liquid border border-white/10 bg-white/8 px-3 py-2 text-sm" key={task.label}>
                            <span className="text-white/82">{task.label}</span>
                            <span className="font-semibold text-prestige-gold">{task.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">Emergency request</h3>
                      <p className="mt-1 text-sm text-slate-grey">Alerts family, care team, hospital, and ambulance dispatch.</p>
                    </div>
                    <Ambulance className="text-red-600" size={22} aria-hidden="true" />
                  </div>
                  <div className="grid place-items-center">
                    <EmergencyButton
                      disabled={isEmergencyLoading}
                      label="SOS"
                      onClick={handleEmergencyRequest}
                      sublabel={isEmergencyLoading ? "Sending..." : "Emergency Help"}
                    />
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <Button iconLeft={<Ambulance size={16} aria-hidden="true" />} onClick={handleEmergencyRequest} variant="danger">
                      Call Ambulance
                    </Button>
                    <Button iconLeft={<BellRing size={16} aria-hidden="true" />} onClick={handleEmergencyRequest} variant="secondary">
                      Notify Family
                    </Button>
                  </div>
                  {emergencyResult ? (
                    <div className="mt-5 rounded-liquid border border-red-200 bg-red-50 p-4">
                      <p className="font-semibold text-red-700">{emergencyResult.id} dispatched</p>
                      <p className="mt-1 text-sm leading-6 text-red-700/82">{emergencyResult.message}</p>
                    </div>
                  ) : null}
                </GlassCard>
              </section>
            </div>

            <aside className="grid gap-6 2xl:sticky 2xl:top-5 2xl:self-start">
              <GlassCard className="p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">Live updates</h3>
                    <p className="mt-1 text-sm text-slate-grey">Family-visible notifications.</p>
                  </div>
                  <RadioTower className="text-gold-strong" size={22} aria-hidden="true" />
                </div>
                <div aria-live="polite" className="grid max-h-[460px] gap-3 overflow-auto pr-1">
                  {liveUpdates.map((update) => (
                    <article className="rounded-liquid border border-midnight-900/8 bg-white/68 p-4" key={update.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{update.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-grey">{update.message}</p>
                        </div>
                        <Badge tone={update.tone}>{update.time}</Badge>
                      </div>
                    </article>
                  ))}
                </div>
                <Button
                  className="mt-4 w-full"
                  iconLeft={<BellRing size={16} aria-hidden="true" />}
                  isLoading={isUpdateLoading}
                  onClick={handleLiveUpdate}
                  size="lg"
                  variant="gold"
                >
                  Simulate Live Update
                </Button>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">Activity timeline</h3>
                    <p className="mt-1 text-sm text-slate-grey">A secure history of family care events.</p>
                  </div>
                  <CheckCircle2 className="text-emerald-600" size={22} aria-hidden="true" />
                </div>
                <StatusTimeline items={activityItems} />
              </GlassCard>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

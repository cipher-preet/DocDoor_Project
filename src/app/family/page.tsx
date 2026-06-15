import type { Metadata } from "next";
import { FamilyAppFlow } from "@/components/family/family-app-flow";
import { getFamilyAppSnapshot } from "@/lib/api/family";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Family App Flow | DocDoor",
  description: "Family app flow for parent profiles, health score, reports, visits, emergency requests, and live updates.",
};

export default async function FamilyAppPage() {
  const snapshot = await getFamilyAppSnapshot();

  return <FamilyAppFlow initialData={snapshot} />;
}

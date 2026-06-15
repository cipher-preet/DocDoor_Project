import { NextResponse } from "next/server";
import { extractPrescriptionFromTranscript } from "@/lib/ai/prescription-orchestrator";

export const runtime = "nodejs";
export const maxDuration = 60;

function errorResponse(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  const status = message.includes("OPENAI_API_KEY") ? 503 : 500;

  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { transcript?: string };
    const transcript = body.transcript?.trim();

    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required for extraction." }, { status: 400 });
    }

    const prescription = await extractPrescriptionFromTranscript(transcript);

    return NextResponse.json({ prescription });
  } catch (error) {
    return errorResponse(error, "Failed to analyze consultation transcript.");
  }
}

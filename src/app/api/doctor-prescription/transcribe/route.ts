import { NextResponse } from "next/server";
import { transcribeConsultationAudio } from "@/lib/ai/prescription-orchestrator";
import { MAX_CONSULTATION_AUDIO_BYTES, MAX_CONSULTATION_AUDIO_LABEL } from "@/lib/ai/upload-limits";

export const runtime = "nodejs";
export const maxDuration = 60;

function errorResponse(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  const status = message.includes("OPENAI_API_KEY") ? 503 : 500;

  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!(audio instanceof File) || audio.size === 0) {
      return NextResponse.json({ error: "A valid audio recording is required." }, { status: 400 });
    }

    if (audio.size > MAX_CONSULTATION_AUDIO_BYTES) {
      return NextResponse.json(
        {
          error: `Recording exceeds the ${MAX_CONSULTATION_AUDIO_LABEL} upload limit. Record a shorter consultation and try again.`,
        },
        { status: 413 },
      );
    }

    const transcript = await transcribeConsultationAudio(audio);

    return NextResponse.json({ transcript });
  } catch (error) {
    return errorResponse(error, "Failed to transcribe consultation audio.");
  }
}

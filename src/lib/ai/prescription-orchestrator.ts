import OpenAI from "openai";
import { getOpenAiConfig } from "@/lib/ai/server-config";
import type { PrescriptionDraft } from "@/lib/ai/prescription-types";

const extractionSchema = {
  name: "prescription_extraction",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      patientName: { type: "string" },
      patientAge: { type: "string" },
      symptoms: {
        type: "array",
        items: { type: "string" },
      },
      assessment: { type: "string" },
      medicines: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            dosage: { type: "string" },
            duration: { type: "string" },
          },
          required: ["name", "dosage", "duration"],
        },
      },
      precautions: {
        type: "array",
        items: { type: "string" },
      },
      advice: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["patientName", "patientAge", "symptoms", "assessment", "medicines", "precautions", "advice"],
  },
} as const;

function sanitizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizePrescription(raw: PrescriptionDraft): PrescriptionDraft {
  return {
    patientName: sanitizeString(raw.patientName),
    patientAge: sanitizeString(raw.patientAge),
    assessment: sanitizeString(raw.assessment),
    symptoms: raw.symptoms.map((item) => item.trim()).filter(Boolean),
    precautions: raw.precautions.map((item) => item.trim()).filter(Boolean),
    advice: raw.advice.map((item) => item.trim()).filter(Boolean),
    medicines: raw.medicines
      .map((medicine) => ({
        name: sanitizeString(medicine.name),
        dosage: sanitizeString(medicine.dosage),
        duration: sanitizeString(medicine.duration),
      }))
      .filter((medicine) => medicine.name || medicine.dosage || medicine.duration)
      .map((medicine) => ({
        name: medicine.name,
        dosage: medicine.dosage,
        duration: medicine.duration,
      })),
  };
}

export async function transcribeConsultationAudio(audio: File) {
  const { apiKey, transcriptionModel } = getOpenAiConfig();
  const openai = new OpenAI({ apiKey });

  const transcription = await openai.audio.transcriptions.create({
    file: audio,
    model: transcriptionModel,
    language: "en",
    response_format: "text",
  });

  const transcript = String(transcription ?? "").trim();

  if (!transcript) {
    throw new Error("No speech was detected in the recording.");
  }

  return transcript;
}

export async function extractPrescriptionFromTranscript(transcript: string) {
  const { apiKey, extractionModel } = getOpenAiConfig();
  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: extractionModel,
    temperature: 0,
    messages: [
      {
        role: "system",
        content: [
          "You extract structured prescription data from doctor-patient consultation transcripts.",
          "Rules:",
          "- Only include information explicitly stated in the transcript.",
          "- Do not infer, guess, invent, or add medical context on your own.",
          "- If patient name or age is not clearly mentioned, return an empty string.",
          "- If no symptoms are mentioned, return an empty symptoms array.",
          "- assessment: the doctor's stated clinical assessment, diagnosis, or impression only. Return empty string if not stated.",
          "- If no medicines are prescribed or discussed, return an empty medicines array.",
          "- precautions: warnings, things to avoid, safety instructions, or red flags explicitly mentioned. Return empty array if none.",
          "- advice: care or lifestyle instructions explicitly given (rest, diet, hydration, follow-up timing, activity limits). Return empty array if none.",
          "- Do not duplicate the same point across assessment, precautions, and advice unless each was stated separately.",
          "- For each medicine, include name, dosage, and duration only when stated or directly quoted.",
          "- Leave any unknown medicine field as an empty string.",
        ].join("\n"),
      },
      {
        role: "user",
        content: `Extract prescription fields from this consultation transcript:\n\n${transcript}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: extractionSchema,
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI did not return a structured prescription response.");
  }

  const parsed = JSON.parse(content) as PrescriptionDraft;
  return sanitizePrescription(parsed);
}

export async function processConsultationAudio(audio: File) {
  const transcript = await transcribeConsultationAudio(audio);
  const prescription = await extractPrescriptionFromTranscript(transcript);

  return {
    prescription,
    transcript,
  };
}

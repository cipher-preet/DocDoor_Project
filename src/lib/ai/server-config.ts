export function getOpenAiConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured. Add it to .env.local.");
  }

  return {
    apiKey,
    extractionModel: process.env.OPENAI_EXTRACTION_MODEL?.trim() || "gpt-4o-mini",
    transcriptionModel: process.env.OPENAI_TRANSCRIPTION_MODEL?.trim() || "whisper-1",
  };
}

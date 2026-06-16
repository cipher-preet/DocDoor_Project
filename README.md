# DocDoor Web Dashboard

Standalone Next.js app for DocDoor admin, hospital, family, patient, and doctor voice prescription flows.

No separate backend is required for the current MVP.

## Stack

- Next.js 16 App Router + TypeScript + Tailwind CSS 4
- Mock data for admin, hospital, family, and patient dashboards
- OpenAI-powered doctor voice prescription (`/doctor-prescription`)
- Built-in API routes at `/api/doctor-prescription/*`

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Add your OpenAI key to `.env.local`:

```env
OPENAI_API_KEY=sk-your-key-here
```

## Deploy to Vercel

This repository **is** the app. The project root contains `package.json`, `src/`, and `next.config.ts`.

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel settings:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** leave empty / `.`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Node.js Version:** 20.x
4. Add environment variables in Vercel → Settings → Environment Variables:

| Variable | Required |
|----------|----------|
| `OPENAI_API_KEY` | Yes (for doctor prescription) |
| `OPENAI_TRANSCRIPTION_MODEL` | No (default: `whisper-1`) |
| `OPENAI_EXTRACTION_MODEL` | No (default: `gpt-4o-mini`) |

5. Deploy.

### Important

- Do **not** set Root Directory to a subfolder. This repo is already the dashboard only.
- Do **not** prefix `OPENAI_API_KEY` with `NEXT_PUBLIC_`.
- Commit `package-lock.json` for faster installs.
- No `docdoor-backend-api` is needed unless you later set `NEXT_PUBLIC_DATA_SOURCE=backend`.

## Production check locally

```bash
npm run build
npm run start
```

## Key routes

- `/admin` — Admin dashboard
- `/hospital` — Hospital dashboard
- `/family` — Family app flow
- `/patient` — Patient app flow
- `/doctor-prescription` — AI voice prescription
- `/documentation` — Product documentation

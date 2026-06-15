# DocDoor Web Dashboard

Next.js, TypeScript, and Tailwind foundation for DocDoor admin and hospital dashboards.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS 4
- Admin dashboard for care operations, emergencies, reports, and realtime visits
- Family app flow for parent profiles, health score, reports, live visits, emergency requests, and activity timelines
- Patient app flow for daily care plan, medications, visits, report upload, messages, and emergency help
- Investor documentation section with sticky sidebar navigation, interface-specific detail pages, architecture, roadmap, and live MVP links
- Hospital dashboard for appointments, report review, and care handoffs
- Socket.io client for realtime visit tracking
- Firebase web messaging for browser notifications
- Mapbox or Google Maps environment wiring

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dashboard expects the API at `NEXT_PUBLIC_API_BASE_URL` and the websocket server at `NEXT_PUBLIC_SOCKET_URL`.
Family App data uses mock API responses by default. Set `NEXT_PUBLIC_DATA_SOURCE=backend` to make `src/lib/api/family.ts` call the backend endpoints instead.

## Deploy to Vercel

This dashboard can be deployed without `docdoor-backend-api` for the current MVP. Mock data powers admin, hospital, family, and patient flows. The doctor voice prescription feature uses Next.js API routes on Vercel plus OpenAI.

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Set **Root Directory** to `docdoor/docdoor-web-dashboard` if the repo contains multiple apps.
4. Framework preset: **Next.js** (auto-detected).
5. Add these **Environment Variables** in Vercel Project Settings:

| Variable | Required | Notes |
|----------|----------|-------|
| `OPENAI_API_KEY` | Yes | Server-side only. Required for `/doctor-prescription`. |
| `OPENAI_TRANSCRIPTION_MODEL` | No | Defaults to `whisper-1`. |
| `OPENAI_EXTRACTION_MODEL` | No | Defaults to `gpt-4o-mini`. |
| `NEXT_PUBLIC_*` vars | No | Optional for maps, Firebase, and future backend wiring. |

6. Deploy.

### Vercel notes

- `vercel.json` sets Mumbai (`bom1`) as the default region and extends API route timeouts for transcription.
- Audio uploads are limited to about **4 MB** on Vercel serverless functions. Keep consultations short or split very long visits.
- Longer transcription jobs may require a **Vercel Pro** plan for function durations above the Hobby limit.
- Do not prefix `OPENAI_API_KEY` with `NEXT_PUBLIC_`.

Local production check:

```bash
npm run build
npm run start
```

## Foundation Files

- `src/app/admin/page.tsx` contains the admin command center.
- `src/app/family/page.tsx` contains the Family App flow.
- `src/app/patient/page.tsx` contains the Patient App flow.
- `src/app/documentation/page.tsx` contains the investor-ready software documentation overview.
- `src/app/documentation/[slug]/page.tsx` contains detailed documentation pages for each DocDoor interface and core system.
- `src/components/documentation` contains the sticky documentation sidebar and reusable documentation page template.
- `src/lib/documentation/docs.ts` contains the documentation navigation and detailed page content.
- `src/app/investor/page.tsx` redirects to the documentation page as a friendly showcase URL.
- `src/app/hospital/page.tsx` contains the hospital partner dashboard.
- `src/app/login/page.tsx` contains the OTP auth entry flow.
- `src/components` contains reusable liquid-glass UI and dashboard components.
- `src/lib/design/tokens.ts` contains the DocDoor design tokens.
- `src/app/design-system/page.tsx` showcases the Tailwind design system.
- `src/lib/config.ts` centralizes public environment variables.
- `src/lib/api/family.ts` provides mock Family App data and backend-ready API functions.
- `src/lib/api/patient.ts` provides mock Patient App data and backend-ready API functions.
- `src/lib/realtime.ts` creates the Socket.io client.
- `src/lib/firebase.ts` prepares browser FCM token registration.

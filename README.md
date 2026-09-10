# Fountain of Light Prayer Ministry — Website

A Next.js 14 (App Router) site for Fountain of Light Prayer Ministry International.

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in real values (PayPal client ID, bank transfer
details, etc.) before deploying.

## Structure

- `src/app` — routes (Home, About, Watch, Ministries, Events, Connect, Give)
- `src/components` — shared UI and per-page sections
- `src/data` — site content (locations, leadership, ministries, events, sermons, testimonials).
  There's no CMS in this build — edit these files directly to update content.
- `src/assets` — real ministry photography
- `Backend/` — separate NestJS payment API (unrelated to the Next.js frontend build/deploy)

## Before launch

- Replace the sample event dates in `src/data/events.ts` with your real calendar.
- Replace the placeholder testimonials in `src/data/testimonials.ts` with real member stories.
- Confirm ministry leader names in `src/data/ministries.ts`.
- Fill in real PayPal/bank details in `.env.local`.

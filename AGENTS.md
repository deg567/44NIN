# Repository Guidelines

## Project Structure & Module Organization
- `app/` – Next.js App Router pages, layouts, metadata.
- `components/` – Reusable UI blocks (PascalCase files).
- `content/` – JSON data sources: `schedule.json`, `courses.json`, `gallery.json`.
- `public/` – Static assets (images, GPX, icons). Served at `/<file>`.
- `lib/` – Utilities (fetchers, parsers, formatters).
- `styles/` – Global CSS or Tailwind config.
- `tests/` – Unit tests; `e2e/` for end‑to‑end tests.
- `scripts/` – One‑off maintenance or data tasks.

## Build, Test, and Development Commands
- `npm install` – Install dependencies.
- `npm run dev` – Run local dev server with hot reload.
- `npm run build` – Production build (SSG/ISR ready for Vercel).
- `npm start` – Serve the production build locally.
- `npm run lint` / `npm run format` – Lint and auto‑format.
- `npm test` / `npm run e2e` – Unit and e2e tests (when present).

## Coding Style & Naming Conventions
- Language: TypeScript, 2‑space indent, Prettier + ESLint defaults.
- Components/hooks: `PascalCase` components, `useCamelCase` hooks.
- Files: `kebab-case.tsx/ts`, route segments follow Next.js (`app/(site)/section`).
- Data: JSON keys in `snake_case` only when mirroring external sources; otherwise `camelCase`.

## Testing Guidelines
- Unit: Vitest or Jest + Testing Library for components/utilities.
- E2E: Playwright for core user journeys (Schedule, Courses, Gallery).
- Name tests `*.test.ts(x)` and colocate near source or under `tests/`.
- Aim for coverage on core rendering, accessibility roles, and data fallbacks.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- Branches: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.
- PRs include: scope/intent, before/after screenshots for UI, linked issues, and notes on a11y/perf impact. Keep PRs small and focused.
- Target `main`. CI must pass (lint, build, tests) before merge.

## Security & Configuration Tips
- Use `.env.local` (not committed). Common vars: `NEXT_PUBLIC_MAPBOX_TOKEN`, `ICAL_URL`, `WEATHER_API_URL`, `WEATHER_API_KEY`.
- Avoid PII in content and images; prefer wide shots and provide `alt` text.
- External APIs should be cached (ISR/SWR) and gracefully degrade on failure.

## Notes
- Content‑first: prefer updating `content/*.json` and `/public` assets via PRs.
- Deployment: Vercel preview per PR; `main` maps to production.

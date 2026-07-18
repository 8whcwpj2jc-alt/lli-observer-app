# LLI Observer — Tech Stack

A reference for what this app is built on and where each piece lives.

## Application

| Layer | Choice | Notes |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) | Single codebase for both the UI and the API — pages are React Server Components by default, with a handful of client components (`"use client"`) where interactivity is needed (forms, the tier wizard). |
| Language | TypeScript | Used throughout, including API routes and data-access code. |
| UI library | React 19 | |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 | Configured via `@theme` in `src/app/globals.css` (Tailwind v4's CSS-based config, no `tailwind.config.js`). Brand color and the decorative background blobs are defined there. |

## Data

| Layer | Choice | Notes |
|---|---|---|
| Database | [Turso](https://turso.tech) (hosted libSQL — SQLite-compatible) | Accessed via `@libsql/client`. Chosen because it's SQLite semantics (simple, no ORM needed) but works over the network, so it's compatible with serverless hosting (unlike a local SQLite file). |
| Schema | Plain SQL, no ORM | Lives in `db/schema.sql`. Applied and kept in sync via `scripts/migrate-and-seed.mjs` (run with `npm run db:migrate`), which is idempotent — safe to re-run, and adds new columns to existing tables when the schema changes. |
| Data access | Hand-written query functions | All in `src/lib/data.ts` — no ORM layer between the app and SQL. |

## Auth

Custom-built, not a third-party auth framework (Auth.js/NextAuth) — the scope (password login, invite-to-set-password, forgot-password, one admin role) was small enough that a framework would add more indirection than it saves.

- **Password hashing:** `bcryptjs`
- **Sessions:** a signed JWT (via `jose`) stored in an httpOnly cookie, containing user id, role, name, and whether they've acknowledged the Participant Guidelines — this lets middleware make routing decisions (locked tiers, the guidelines gate) without a database round-trip on every request.
- **Observers** (the people participants invite for feedback) don't have accounts at all — each gets a private, unguessable token in their URL instead of a login.

## Email

[Resend](https://resend.com) for transactional email (participant invites, password resets). Sending domain is `lli-observer.com`, registered and DNS-managed through Cloudflare, verified in Resend (SPF/DKIM/DMARC records).

## Hosting & Deployment

- **App hosting:** [Vercel](https://vercel.com) — deployed via the Vercel CLI (`vercel --prod`). GitHub auto-deploy-on-push isn't currently connected (would need a GitHub login connection added in the Vercel account settings); deploys are manual for now.
- **Domain & DNS:** [Cloudflare](https://cloudflare.com) — registrar and DNS host for `lli-observer.com`.
- **Source control:** GitHub, at `github.com/8whcwpj2jc-alt/lli-observer-app`. Local working copy lives at `C:\Users\mick\projects\lli-observer-app`, deliberately outside any OneDrive/Google Drive synced folder to avoid sync conflicts with `node_modules`/build output.

## Environment variables

Set in `.env.local` for local development and in the Vercel project's environment variables for production:

- `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` — database connection
- `SESSION_SECRET` — signs the session JWT
- `RESEND_API_KEY`, `EMAIL_FROM` — outbound email
- `APP_BASE_URL` — used to build absolute links inside emails (invite/reset links)

## Project structure (high level)

```
src/
  app/            Next.js App Router — one folder per route, plus api/ for backend routes
  components/     Client components (forms, the tier wizard, nav)
  lib/            Shared server-side code: db client, data-access functions, auth, session,
                  email sending, and content.ts (all the program's written content in one place)
db/
  schema.sql      Source of truth for the database schema
scripts/
  migrate-and-seed.mjs   Applies schema.sql and seeds the fixed 52-skill list
  create-admin.mjs       One-off script to create/update an admin account
```

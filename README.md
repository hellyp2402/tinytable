# TinyTable

**Activity planner for teachers of kids ages 2 to 10.** Pick a theme, the kids' age and the supplies you have, and TinyTable gives you a ready-to-run activity card with setup steps, kid-friendly instructions, cleanup tips and safety notes.

**Live app:** [tinytable.app.space](https://tinytable.app.space) · **Planner:** [tinytable.app.space/home](https://tinytable.app.space/home)

Built with the [DeepSpace](https://www.npmjs.com/package/deepspace) SDK and deployed to Cloudflare Workers.

---

## Features

- **Three quick questions:** theme, the kids' age and group size, and the supplies on hand.
- **A separate activity page.** The card opens only after you tap "Make my activity," and "Change my answers" takes you back with everything still filled in.
- **Activity cards** with supplies, setup steps, short read-aloud steps for kids, one tip fitted to the age group, questions to ask, cleanup tips and safety notes.
- **18 built-in activity types** (collage, sensory bin, sink or float, engineering challenge, bingo, comic strip and more), matched to your supplies and the kids' age.
- **13 themes,** or type your own.
- **Ages 2 to 10,** plus mixed groups (2–5 and 6–10).
- **30 common supplies,** plus anything you type in.
- **Custom AI ideas** for signed-in teachers, built around any theme and supply list.
- **Saved activities** you can reopen and print again.
- **Printable card** as a letter-size PDF.
- **Optional sign-in.** Signed-in teachers' supplies, choices and saved cards sync across devices. Guests can use everything except syncing; their work stays in the browser.

## DeepSpace integrations

| Feature | What it does in TinyTable |
| --- | --- |
| **Sign-in** | Optional sign-in from the top bar or inside the planner |
| **Real-time records** | One private `tinytable_workspace` record per teacher holds preferences, supplies and saved cards |
| **OpenAI integration** | Writes custom activities for signed-in users, billed to the app owner (configured in `src/integrations.ts`) |
| **Hosting and deploy** | `npx deepspace deploy` builds the app and puts it live at `<app>.app.space` |

## How it works

The planner is a single self-contained page (`public/tinytable.html`). The DeepSpace page at `/home` shows it in a same-site iframe and handles everything that needs an account:

```
┌──────────────────────────── /home (React, DeepSpace) ────────────────────────────┐
│                                                                                   │
│   ┌──────── tinytable.html (iframe) ────────┐        sign-in, sync, AI calls      │
│   │  questions → activity card → print/save │ ◀────── postMessage bridge ──────▶  │
│   └─────────────────────────────────────────┘                                     │
│                                                                                   │
└──────────────┬──────────────────────────────────────────────┬────────────────────┘
               ▼                                              ▼
     tinytable_workspace record                     OpenAI integration
     (one per teacher, private)                     (custom ideas)
```

- **Planner → page:** `ready`, `sign-in`, `sign-out`, `snapshot` (workspace to save) and `custom-idea` (structured fields only: theme, age, group, supplies, recent titles).
- **Page → planner:** `sync` (sign-in state and saved workspace), `custom-result` and `custom-error`.
- Both sides only accept messages from the same site.
- DeepSpace builds the AI prompt from the checked fields, so the browser never sends free-form prompt text.
- Saves run one at a time, and a change made before the data connection is ready waits instead of being dropped.

## Tech stack

- [DeepSpace](https://www.npmjs.com/package/deepspace) SDK (auth, records, integrations, deploy)
- React 19, React Router 7, file-based routes via generouted
- Vite 8, Tailwind CSS 4
- Cloudflare Workers and Durable Objects (through DeepSpace)
- jsPDF for the printable card
- Playwright and Vitest for tests

## Getting started

### Requirements

- Node.js 22.15+ (22.x), 24.x or 26.x
- npm 11.6+
- A DeepSpace account

### Run locally

```sh
git clone https://github.com/hellyp2402/tinytable.git
cd tinytable
npm install
npx deepspace auth login
npx deepspace app init     # first time only: links the folder to your DeepSpace app
npx deepspace dev start
```

Open the address it prints and go to `/home`.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server (Vite + Miniflare) |
| `npm run build` | Production build |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run test:unit` | Unit tests (Vitest) |
| `npm run test:smoke` | Smoke tests (Playwright) |
| `npx deepspace deploy` | Deploy to `<app>.app.space` |

### Deploy

DeepSpace refuses to deploy uncommitted changes, so commit first:

```sh
git add -A
git commit -m "Describe your change"
npx deepspace deploy
```

> **Note:** this app's source of truth is its DeepSpace cloud repo (the `space` git remote), which was set by the first deploy. A GitHub repo works as a copy for sharing and backup. Keep deploying with `npx deepspace deploy`.

## Project structure

```
├── public/
│   ├── tinytable.html        # The planner (questions, cards, PDF, saved list)
│   └── _headers              # Security headers (planner may be framed by this site only)
├── src/
│   ├── pages/
│   │   ├── index.tsx         # Landing page (/)
│   │   └── (app)/home.tsx    # /home: hosts the planner, sign-in, sync and AI calls
│   ├── schemas/
│   │   └── tinytable-workspace-schema.ts   # Per-teacher saved data
│   ├── integrations.ts       # Who pays for each integration
│   ├── seo.ts                # Title and description for search engines
│   └── styles.css            # App styles (Tailwind)
├── index.html                # App shell (loads the Grandstander font)
├── worker.ts                 # Cloudflare Worker entry
├── wrangler.toml             # App config
└── tests/                    # Playwright tests
```

## Configuration

- **Custom idea limit:** 3 per browser session, set in `src/pages/(app)/home.tsx`.
- **AI billing:** `openai: { billing: 'developer' }` in `src/integrations.ts` means the app owner pays. Custom ideas require sign-in.
- **Fonts:** load web fonts with `<link>` tags in `index.html`, not `@import url(...)` in `src/styles.css`. A remote CSS import breaks the Tailwind build step.

## Privacy and safety

- TinyTable doesn't collect information about children.
- Each teacher's saved data is readable only by that teacher (`own` permissions).
- Activity cards include safety notes (for example, choking checks for kids under 3), but teachers should always check activities against their program's safety and allergy rules.

## Known limitations

- The 3-ideas limit is counted in the browser, so a new tab resets it.
- All of a teacher's data is one record. If two devices save at once, the last save wins.
- The iframe adds a second header, and phones get a scroll area inside the page.
- Unused template pages (Settings, API Status) and AI agent tools are still included.
- There are no automated tests for the planner itself yet.

## Roadmap

- [ ] Move the custom idea limit to a server route (per teacher, per day)
- [ ] Store each saved card as its own record
- [ ] Rebuild the planner as a React page and remove the iframe
- [ ] Remove unused template pages and tools
- [ ] Add a Playwright test that makes, saves and reopens a card on `/home`
- [ ] A4 paper option for the printable card

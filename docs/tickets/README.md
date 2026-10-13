# Job Assistant — Backlog

Jira-style tickets for the **Job Assistant**: a Chrome extension plus a FastAPI backend that
compares a job ad against a CV using an LLM (DeepSeek) and returns a fit analysis.

## What exists today

| Part | Tech | State |
|------|------|-------|
| `extension/` | Chrome MV3, vanilla JS, pdf.js | Working: side panel, page scrape, PDF parse, API call, results UI |
| `backend/` | FastAPI, Pydantic, OpenAI SDK | Working: one endpoint `POST /jobs`, DeepSeek call, injection guard |

**Current flow**

1. User uploads a CV PDF → parsed **in the browser** by pdf.js → kept in memory as `cvText`.
2. User clicks Analyze → extension scrapes `document.body.innerText` from the active tab.
3. `normalizeText()` trims the scrape using per-site start/end markers.
4. `POST /jobs` with `{ text, cvText }`.
5. Backend runs a prompt-injection check (TypeSafe), then asks DeepSeek for JSON.
6. Extension renders score, strengths, gaps, suggestions, flags.

## Status legend

| Status | Meaning |
|--------|---------|
| `DONE` | Implemented and verifiable in the current code |
| `PARTIAL` | Some acceptance criteria met, the rest not |
| `PLANNED` | No code exists yet — scope and acceptance criteria only |

## Ticket index

Work top to bottom. **P0 blocks the demo** — if a reviewer runs the project and one of these
fires, everything else stops mattering.

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [BE-001](BE/BE-001.md) | Fix import paths so the app actually boots | P0 | `PLANNED` |
| [BE-002](BE/BE-002.md) | Never crash on bad model output; return a clean error contract | P0 | `PLANNED` |
| [BE-003](BE/BE-003.md) | Remove debug `print()` calls; add structured logging | P0 | `PLANNED` |
| [BE-004](BE/BE-004.md) | Request validation and size limits | P1 | `PLANNED` |
| [BE-005](BE/BE-005.md) | Rate limiting and a daily spend cap | P1 | `PLANNED` |
| [BE-006](BE/BE-006.md) | Lock down CORS | P1 | `PLANNED` |
| [BE-007](BE/BE-007.md) | Config and secrets hygiene | P1 | `PLANNED` |
| [BE-008](BE/BE-008.md) | Make the injection guard correct and resilient | P1 | `PLANNED` |
| [BE-009](BE/BE-009.md) | Single source of truth for response models | P2 | `PLANNED` |
| [BE-010](BE/BE-010.md) | Request correlation and token/cost tracking | P2 | `PLANNED` |
| [BE-011](BE/BE-011.md) | API documentation and a health endpoint | P2 | `PLANNED` |
| [EXT-001](EXT/EXT-001.md) | Handle unsupported, empty, and oversized CV files | P1 | `PLANNED` |
| [EXT-002](EXT/EXT-002.md) | Stop injecting model text with `innerHTML` | P1 | `PLANNED` |
| [EXT-003](EXT/EXT-003.md) | Detect API failures instead of rendering `undefined` | P1 | `PLANNED` |
| [EXT-004](EXT/EXT-004.md) | Warn when the page is not a supported job site | P1 | `PLANNED` |
| [EXT-005](EXT/EXT-005.md) | Make the backend URL configurable | P2 | `PLANNED` |
| [EXT-006](EXT/EXT-006.md) | Re-analyze without re-uploading the CV | P2 | `PLANNED` |
| [EXT-007](EXT/EXT-007.md) | Remove dead dependencies and add a build step | P2 | `PLANNED` |
| [EXT-008](EXT/EXT-008.md) | Site adapter registry with a generic fallback | P3 | `PLANNED` |
| [QA-001](QA/QA-001.md) | Backend test suite | P1 | `PLANNED` |
| [QA-002](QA/QA-002.md) | CI pipeline on every push | P1 | `PLANNED` |
| [QA-003](QA/QA-003.md) | Prompt-injection regression suite | P2 | `PLANNED` |
| [QA-004](QA/QA-004.md) | Extension tests | P3 | `PLANNED` |
| [DOC-001](DOC/DOC-001.md) | Rewrite the READMEs to match reality | P0 | `PLANNED` |
| [ARCH-001](ARCH/ARCH-001.md) | Restructure the backend package | P1 | `PLANNED` |
| [ARCH-002](ARCH/ARCH-002.md) | Docker Compose for one-command startup | P2 | `PLANNED` |
| [ARCH-003](ARCH/ARCH-003.md) | Deploy the backend and publish the extension | P3 | `PLANNED` |
| [MOB-001](MOB/MOB-001.md) | Web client foundation and shared contract | P2 | `PLANNED` |
| [MOB-002](MOB/MOB-002.md) | CV upload and parsing on the backend | P2 | `PLANNED` |
| [MOB-003](MOB/MOB-003.md) | Analyze from a pasted job URL | P3 | `PLANNED` |
| [MOB-004](MOB/MOB-004.md) | Auth for public clients | P3 | `PLANNED` |
| [MOB-005](MOB/MOB-005.md) | Analysis history | P3 | `PLANNED` |

**Totals: 32 tickets — 0 done, 0 partial, 32 planned.**

## Priorities

| Priority | Meaning |
|----------|---------|
| **P0** | The project is broken or misleading without it. Do first. |
| **P1** | Correctness or safety problem a reviewer will find. |
| **P2** | Makes it look like a real product. |
| **P3** | Nice to have; do after the rest. |

## Ticket template

Each ticket has: Type, Epic, Affects, Priority, Status, Summary, Current behaviour, Why it matters,
Proposed scope, Acceptance criteria, and Notes. Tickets describe **target state**, not current
state — the Status field is what tells you whether the code exists.

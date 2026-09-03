# Job Assistant — Engineering Backlog (Jira Tickets)

This backlog describes the work needed to take the **Job Assistant** MVP (Chrome extension +
NestJS backend + DeepSeek AI) from a personal MVP to a product that reads well on a CV and
survives a technical interview.

## How to use these tickets

- Each file is a Jira-style ticket. Copy the fields (`Summary`, `Description`, `Acceptance
  Criteria`, etc.) straight into your tracker (Jira, Linear, GitHub Projects, Trello).
- Tickets are grouped under **Epics**. The epic ID shown is a proposal to structure the work.
- **No code is provided and nothing is implemented** — these are only scope/requirements
  tickets for you (or a future employer) to implement.

## Epic map

| Epic | Theme | Why it matters on a CV |
|------|-------|------------------------|
| `MS` | Multi-site / multi-tenant support | Shows real system design: per-site extraction, tenants, database, billing-grade isolation |
| `SEC` | Security & prompt-injection defense | Shows you think like a security engineer about ML/AI systems |
| `OBS` | Observability, logging, errors | Production engineering, not just a demo |
| `PERF` | Performance & rate limiting | Shows you care about abuse protection and cost control |
| `DATA` | Data model & persistence | Moves from "return value in memory" to a real domain model |
| `QA` | Testing & CI/CD | The single biggest CV and interview differentiator |
| `EXT` | Extension UX robustness | Polish the shipped product |
| `ARCH` | Architecture & tech hygiene | Makes the codebase maintainable and demonstrable |

## Suggested ordering (priority: high → lower)

1. **MS-001** Multi-site extensible extraction engine (the explicit ask)
2. **SEC-001 / SEC-002** Prompt-injection defense (the explicit ask)
3. **DATA-001** Persistence layer + real domain entity (enables MS/security)
4. **QA-001** Meaningful automated tests (interviews will ask about this)
5. **SEC-005** Auth & tenant isolation if/once real accounts exist
6. The rest as a polish pass.

## Current-state findings (baseline this backlog was written against)

- **Backend** (`backend/`): NestJS 11. Single `JobsModule`. `POST /jobs` sends `{ text, cvText }`
  straight into the DeepSeek prompt. No validation pipe, no DTO decorators, no persistence
  (no DB), no ORM, no auth, no rate limiting, `app.enableCors()` open to all origins, model/config
  hardcoded in `.env` read directly (not via `@nestjs/config` or validation). CRUD stubs return
  placeholder strings.
- **Extension** (`extension/`): Manifest V3 side-panel. Reads `document.body.innerText` of the
  active tab (site-agnostic, single hardcoded marker "prijavi se"), takes PDF CV text, posts to a
  hardcoded `http://localhost:3000/jobs`, sanitizes the AI markdown with DOMPurify before render.
  Only PDF is actually parsed; DOC/DOCX is advertised in the UI but unsupported.

---

Generated as ticket documentation only. See `MS/`, `SEC/`, `OBS/`, `PERF/`, `DATA/`, `QA/`,
`EXT/`, `ARCH/` subfolders for the ticket bodies.

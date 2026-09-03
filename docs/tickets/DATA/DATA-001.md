# DATA-001 — Persistence layer with a real domain model

**Type:** Epic / Backend feature
**Epic:** DATA — Data model & persistence
**Affects:** `backend/`
**Priority:** P1

## Summary
The backend is completely **stateless**: `POST /jobs` returns the AI text and the CRUD stubs
(`findAll`, `findOne`, `update`, `remove`) return placeholder strings, and `Job` entity is empty.
Nothing is stored. Introduce a **database-backed domain model** so the app becomes a real tracked
service, not a stateless proxy.

## Proposed scope
- Add a database (recommend **Postgres** via an ORM such as TypeORM or Prisma; or SQLite for a
  local-only demo — decision noted in implementation).
- Define a real **JobAnalysis** entity: `id`, `siteId`/`tenantId` (MS-002), `jobTitle`, `company`,
  `location`, `description`, `cvText` (or CV reference), `matchScore`, `resultMarkdown`,
  `model`, `promptTokens/usage`, timestamps, and status (pending/complete/failed).
- Implement **migrations** and a seed script.
- Replace the placeholder CRUD with real create/read (list, get-by-id) backed by the repository.
- Keep the AI analysis async-friendly: record the request first, then update with the result
  (aligns with OBS/PERF later).

## Acceptance criteria
- [ ] Postgres (or chosen DB) schema exists via migration; applied and rollback-tested.
- [ ] A JobAnalysis row is created per analysis request and updated with the result/score.
- [ ] `GET /jobs`, `GET /jobs/:id` return real stored data (scoped, see SEC-005/MS-002).
- [ ] Entity carries the structural fields from MS-001's JobListing.
- [ ] A seed/demo script produces a sample dataset for demos and interviews.

## Notes / CV value
This is the ticket that turns "a script that wraps an API" into "a backend with a database".
Pair with MS-002 for a multi-tenant schema story.

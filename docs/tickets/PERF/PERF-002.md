# PERF-002 — Asynchronous analysis (job queue) + result polling

**Type:** Performance / Backend feature
**Epic:** PERF — Performance & rate limiting
**Affects:** `backend/`, `extension/`
**Priority:** P2

## Summary
The AI call happens **synchronously inside the HTTP request** (`await` the model). Long prompts
(DATA persistence + big CVs) mean the user holds a request open for many seconds, and the browser
extension shows a spinner with no progress. Move the analysis off the request path.

## Proposed scope
- Backend: on `POST /jobs`, persist the request (DATA-001) with status `pending`, enqueue the
  analysis, and return `202 Accepted` with a job id immediately.
- Process the analysis in a background worker (NestJS `@nestjs/bull`/`@nestjs/queue`, or a simple
  in-process async task for MVP) and update the entity status on completion (DATA-001).
- Extension: poll `GET /jobs/:id` until status is `complete`, then render (DATA-002/003), with an
  accurate "in progress" UI.

## Acceptance criteria
- [ ] `POST /jobs` returns quickly with an id; analysis runs off the response path.
- [ ] Status transitions `pending → complete/failed` are persisted.
- [ ] Extension polls and updates UI without losing the spinner/progress state.
- [ ] Failure is recorded and surfaced to the user.

## Notes
This is a strong architecture ticket: request/response decoupled from long work via a queue.
Combine with OBS (trace ids) and QA (tests around status transitions).

# ARCH-003 — API documentation (OpenAPI/Swagger) + README / demo guide

**Type:** Docs / DX
**Epic:** ARCH — Architecture & tech hygiene
**Affects:** repo-level
**Priority:** P2

## Summary
The README is minimal and describes how to run locally; there is no API documentation. Adding
**Swagger/OpenAPI** (via `@nestjs/swagger`) and a sharper README (setup, architecture diagram,
env vars, how to demo, testing story) turns the repo into a showcase a recruiter can open cold.

## Proposed scope
- Wire **`@nestjs/swagger`** at `/docs` (or `/api`) exposing the endpoints and DTOs; enable it only
  in appropriate profiles if worried about production.
- Add DTO/entity decorators to drive accurate Swagger docs (ties into SEC-002 validation metadata).
- Rewrite READMEs: quick start, env setup (OBS-003), architecture (MS/segmented layers), scripts,
  testing (QA), security model (SEC), demo runbook.
- Add a short **"Portfolio demo"** section: what to type, expected output, and how to prove the
  prompt-injection guard works (SEC-001/006).

## Acceptance criteria
- [ ] Swagger UI loads and documents the current endpoints accurately.
- [ ] READMEs updated and accurate against the current code.
- [ ] Demo runbook present so someone (or you, in an interview) can reproduce in < 5 min.
- [ ] No secrets/examples committed.

## Notes / CV value
A documented, self-explaining repo actively helps you in interviews and reassures recruiters that
the project isn't a throwaway.

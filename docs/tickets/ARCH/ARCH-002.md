# ARCH-002 — Structured project layout + dependency hygiene

**Type:** Tech debt / Architecture
**Epic:** ARCH — Architecture & tech hygiene
**Affects:** repo-level
**Priority:** P2

## Summary
The backend mixes responsibilities in single files (`jobs.service.ts` holds the AI prompt, parsing,
and calls; config is read inline; the root `app.controller`/`app.service` hold a leftover demo
`POST /` handler). The codebase grew as an MVP; a clean, conventional layout makes it much easier
to demo and to extend, and it signals engineering maturity.

## Proposed scope
- **Remove the leftover demo endpoint** (`app.controller.ts` `POST /` that just logs — it's a
  debug relic and an unnecessary open surface).
- Reorganize into explicit layers: `controllers → services → repositories`, `dto/`, `entities/`,
  and `openai/` (or `ai/`) isolated behind an interface so the DeepSeek call is swappable and
  mockable in tests (QA-001).
- Move the AI **prompt building** out of the service into a dedicated module/builder so it's
  testable and per-tenant (MS-002).
- Confirm `@nestjs/config`, `class-validator`, `class-transformer` are declared as real
  dependencies when used (currently `mapped-types` is `*`).

## Acceptance criteria
- [ ] Demo `POST /` handler removed or clearly disabled.
- [ ] AI provider behind an interface; prompt building in its own module.
- [ ] Layered file/folder structure consistent across modules.
- [ ] package.json dependencies reflect what is actually imported (no stale/`*` pins).

## Notes / CV value
Refactoring into a clean, layered architecture is a story recruiters hear well: "I took an MVP and
made the architecture maintainable and swappable."

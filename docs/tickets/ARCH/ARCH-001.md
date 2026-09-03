# ARCH-001 — Tighten CORS & harden server defaults

**Type:** Security / Backend
**Epic:** ARCH — Architecture & tech hygiene
**Affects:** `backend/`
**Priority:** P1

## Summary
`main.ts` calls **`app.enableCors()` with no options**, which allows requests from **any origin**
to hit the API. For a browser extension (which isn't CORS-bound the same way) and a would-be
hosted backend, this should be locked down to an **explicit allowlist** of origins/extension
contexts, and the app should carry sensible security headers.

## Proposed scope
- Replace open CORS with an **explicit allowed-origins list** (from config — OBS-003). Browser
  extensions use `host_permissions`, so the API can be conservative.
- Add **security headers** (e.g. `helmet`) to the HTTP layer: sensible defaults for
  `X-Content-Type-Options`, `X-Frame-Options`, CSP on responses where appropriate.
- Set the `trust proxy` / body parser size limit appropriately (ties into SEC-003 and PERF-001).
- Keep localhost development workflow working (document the dev origins).

## Acceptance criteria
- [ ] Requests from disallowed origins are rejected (CORS block) while the extension's own context still works.
- [ ] Security headers present on responses; no console CSP violations in the extension.
- [ ] Body size limit enforced (matches SEC-003 cap).
- [ ] Behaviour documented so a future dev/host can extend origins.

## Notes / CV value
Interviewers probe for CORS/headers knowledge all the time — this is a direct match. Combined with
SEC-002/003/005, it shows a deliberate security posture.

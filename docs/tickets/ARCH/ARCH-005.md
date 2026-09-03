# ARCH-005 — API versioning & provider extensibility

**Type:** Backend / tech debt
**Epic:** ARCH — Architecture & tech hygiene
**Affects:** `backend/`
**Priority:** P3

## Summary
The API is a single unversioned `/jobs`. As multi-tenant (MS-002), auth (SEC-005), and async
(PERF-002) land, version the surface (`/api/v1/...`) so changes don't silently break the shipped
extension. Also abstract the AI provider behind an interface (already noted in ARCH-002) so the
`openai`/DeepSeek client isn't the only option (e.g. swap to another provider in a demo).

## Proposed scope
- Enable **global route prefix** (`/api/v1`) via config; keep a stable contract.
- Ensure the AI provider is behind an interface (ARCH-002) with DeepSeek as the concrete
  implementation and a provider selection in config (OBS-003).
- Add a **health endpoint** (`/healthz`) used by deploy targets (ARCH-004).
- Keep the extension's configured URL pointing at the correct version (EXT-002).

## Acceptance criteria
- [ ] Endpoints served under an explicit versioned prefix; documented in Swagger (ARCH-003).
- [ ] Provider swap requires only config, not code edits (one concrete secondary provider optional).
- [ ] `/healthz` returns liveness for deploy checks.

## Notes
These are "API/platform engineering" signals. Keep provider abstraction minimal to avoid
over-engineering — an interface + config is enough for a portfolio.

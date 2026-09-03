# PERF-001 — Rate limiting & abuse protection

**Type:** Performance / Security
**Epic:** PERF — Performance & rate limiting
**Affects:** `backend/`
**Priority:** P1

## Summary
There is **no rate limiting**. Each call burns paid DeepSeek tokens. An open, unauthenticated,
unlimited endpoint (see SEC-002/003/005) means anyone can exhaust your quota or run up charges.
Add per-IP and (later) per-key/per-tenant throttling.

## Proposed scope
- Add **per-IP rate limiting** (e.g. `@nestjs/throttler`) on `/jobs` and any AI-calling endpoint
  (e.g. limit N requests per minute/day).
- Make limits configurable per tenant once MS-002 lands (tenant A gets a different budget than
  tenant B).
- Return a proper `429 Too Many Requests` with `Retry-After`.
- Track daily token/cost budget and refuse further AI calls once a configured cap is hit
  (protects the API key / billing).

## Acceptance criteria
- [ ] Burst of requests beyond the limit returns `429` and is throttled.
- [ ] Per-tenant limits take effect when tenant metadata is present (MS-002).
- [ ] A daily token/cost budget guard stops AI calls before overspend.
- [ ] Tests confirm the throttle count and the 429 response contract.

## Notes / CV value
"Rate limiting + spend controls on an LLM backend" is a concrete production concern most juniors
never touch.

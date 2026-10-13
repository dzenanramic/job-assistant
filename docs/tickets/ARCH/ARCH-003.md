# ARCH-003 — Deploy the backend and publish the extension

**Type:** DevOps / Release
**Epic:** ARCH — Architecture & delivery
**Affects:** repo root, `backend/`, `extension/`
**Priority:** P3
**Status:** `PLANNED`

## Summary
The project only runs on localhost. Nobody can try it without cloning the repo, installing Python,
obtaining a DeepSeek API key, and loading an unpacked extension — which in practice means nobody
tries it.

## Current behaviour
Everything is local: the extension calls `http://127.0.0.1:8000/jobs` (EXT-005), the backend has no
deployment configuration, and there is no public URL or listing.

## Why it matters
A live link turns "I built this" into "here, try it" — the difference between a claim and a demo.
It also forces you to confront the production concerns (secrets, CORS, rate limits, cost caps) that
this backlog has been building toward, which makes for much better interview material than a
localhost-only project.

## Proposed scope
- **Backend:** deploy the container (ARCH-002) to a host with a free or cheap tier. Configure
  secrets through the host's secret store, never in the image.
- **Cost safety first:** confirm the rate limit and daily budget cap (BE-005) and the input size
  caps (BE-004) are active **before** the URL is public. An open, uncapped LLM endpoint on a public
  URL is a real financial risk — treat this as a hard prerequisite, not a follow-up.
- **Extension:** either publish to the Chrome Web Store, or — much cheaper and faster — package a
  `.zip` with `chrome://extensions` → Load unpacked instructions and a short demo GIF in the
  README. For a CV project, the unpacked route is usually the better tradeoff; publishing adds
  review time, a developer account fee, and ongoing maintenance obligations.
- Point the extension's default URL at the deployed backend (EXT-005) and update
  `host_permissions` accordingly.
- Add a deploy job to CI (QA-002) gated on tests passing, or document the manual deploy steps.
- Document the deployed URL, the demo flow, and any limitations (cold starts, quotas) in the README.
- Consider a `/demo` or seeded example so a visitor without a CV can still see the output.

## Acceptance criteria
- [ ] A public HTTPS URL serves the API and `/health` responds.
- [ ] Rate limiting and the daily budget cap are verified active on the deployed instance.
- [ ] No secret is present in the image, the repo, or the client bundle.
- [ ] CORS is restricted to the deployed extension/web origins (BE-006).
- [ ] The extension can be pointed at the deployed backend and works end to end.
- [ ] README documents the live URL and the demo flow.
- [ ] A cost ceiling exists that limits the maximum possible spend.

## Notes
The interesting engineering content here is the cost-safety prerequisite, not the deploy command —
so do the caps first and say so in the README. "I deployed it, and here is how I made sure a public
LLM endpoint cannot run up a bill" is a far better answer than "I pushed it to a host."

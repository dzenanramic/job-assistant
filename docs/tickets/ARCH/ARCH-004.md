# ARCH-004 — Deployment & environment parity (Docker / hosted backend)

**Type:** DevOps / Backend
**Epic:** ARCH — Architecture & tech hygiene
**Affects:** repo-level
**Priority:** P3

## Summary
The app only runs on `localhost`. For a CV project the ability to say "it's deployed / it can be
deployed and talked to over HTTPS" is much stronger than "runs locally". Provide a repeatable way
to stand up the backend (and ideally the extension against a hosted URL, see EXT-002).

## Proposed scope
- Add a **Dockerfile** (multi-stage build) and **docker-compose** for the backend + chosen DB
  (DATA-001) with a one-command local/prod-ish boot.
- Document a **deploy** path (e.g. Render/Fly/Railway/AWS) with env-driven config (OBS-003),
  HTTPS, and migrations (DATA-001).
- Wire deployment into CI (QA-002) so a `main` merge can deploy.
- Add health endpoint/check used by the deploy target.

## Acceptance criteria
- [ ] `docker compose up` starts backend + DB cleanly on a fresh machine.
- [ ] Deploy target documented; backend reachable over HTTPS in the intended environment.
- [ ] Migrations run as part of deploy (not manually first-run only).
- [ ] Extension can target the deployed URL (EXT-002).

## Notes
Scope is intentionally later (P3): deploying before data model + auth are coherent could trap you
in a demo broken by a missing `.env`. Build on DATA-001, OBS-003, and SEC-005.

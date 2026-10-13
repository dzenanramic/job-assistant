# ARCH-002 — Docker Compose for one-command startup

**Type:** DX / DevOps
**Epic:** ARCH — Architecture & delivery
**Affects:** repo root, `backend/`
**Priority:** P2
**Status:** `PLANNED`

## Summary
Running the project requires installing Python 3.10+, `uv`, and Node, then following manual steps in
the right order with the right working directory — which is exactly the class of setup that breaks
for a reviewer.

## Current behaviour
There is no container configuration, no Makefile, and no single startup command. The documented
setup involves backend `uv` setup plus extension `npm install` plus manual Chrome steps, and the
documented commands are currently wrong anyway (BE-001, DOC-001).

## Why it matters
"One command and it runs" removes the largest source of friction between a reviewer and your
project. It also demonstrates packaging and environment-parity thinking, which is a standard
backend interview topic.

## Proposed scope
- Add a `backend/Dockerfile`: a slim Python base, `uv` for dependency installation, a non-root user,
  a `.dockerignore`, and a `HEALTHCHECK` hitting `GET /health` (BE-011).
  Use a multi-stage build so build tooling does not ship in the final image.
- Add `docker-compose.yml` at the root with a `backend` service: port mapping, env file, and a
  healthcheck. Keep it minimal — there is no database yet.
- Add a `Makefile` (or `justfile`) with the handful of commands a reviewer needs:
  `make up`, `make test`, `make lint`, `make down`.
- Add a `.env.example` alongside so `cp .env.example .env && make up` is the whole setup (BE-007).
- Document the container path in the README as the **recommended** path, with the manual path kept
  as an alternative for development.
- Note clearly that the **extension is not containerised** — it is loaded into Chrome by hand — so
  the reviewer knows what Compose does and does not cover.
- Leave a commented-out `db` service placeholder referencing MOB-005, so the growth path is visible.

## Acceptance criteria
- [ ] `cp .env.example .env && docker compose up` starts a working backend.
- [ ] `/health` responds and the container healthcheck reports healthy.
- [ ] The image runs as a non-root user and contains no build tooling or secrets.
- [ ] `make test` and `make lint` run the same commands as CI (QA-002).
- [ ] README documents the container path and the extension's manual step.
- [ ] Build is reproducible and the image is reasonably small.

## Notes
Do this after BE-007 (config) and BE-011 (health), since the container depends on both. Do not add
Kubernetes, multiple services, or a database to this — the value is in the simplicity, and
over-engineering the deployment is a common own-goal in portfolio projects.

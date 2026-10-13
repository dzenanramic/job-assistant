# ARCH-001 — Restructure the backend package

**Type:** Refactor
**Epic:** ARCH — Architecture & delivery
**Affects:** `backend/`
**Priority:** P1
**Status:** `PLANNED`

## Summary
The backend package mixes layer-based and feature-based layout, the package root is ambiguous, and
the project metadata still carries uv's scaffold defaults.

## Current behaviour
```
backend/
├── pyproject.toml          # name = "backend", description = "Add your description here"
├── README.md               # 0 bytes
├── .python-version
├── uv.lock
└── src/
    └── job_assistant/
        ├── main.py                     # app + CORS + router registration
        ├── api/v1/analyze.py           # route
        ├── schemas/schemas.py          # Pydantic models
        ├── services/analyzer.py        # orchestration
        ├── services/deepseek_client.py # provider
        ├── services/prompt_guard.py    # second provider
        └── __pycache__/                # committed build artifacts
```

Problems:

- **The project is named `backend`**, not `job-assistant`. `description = "Add your description
  here"` is untouched scaffold text.
- **The package root is ambiguous**, which is what caused BE-001: is it `backend/` or
  `backend/src/job_assistant/`? The imports assume the latter, `uv` assumes the former.
- `schemas/schemas.py` is a stuttering path, and renaming the package to `models/` would collide
  conceptually with ML "model" terminology.
- `services/` mixes orchestration (`analyzer`) with provider access (`deepseek_client`,
  `prompt_guard`). As MOB-002 adds CV parsing and MOB-003 adds URL fetching, this directory will
  become a grab bag.
- Provider clients are constructed at **import time**, which makes the code untestable without
  dummy keys and crashes the process on a missing variable (BE-007).
- `__pycache__/*.pyc` files are committed.
- No `tests/` directory.

## Why it matters
Layout is the first thing a reviewer assesses when they open `backend/`. Consistent layer separation
also makes the interfaces obvious, which matters as the project grows toward a second client.

## Proposed scope
- Rename the project: `name = "job-assistant"`, a real description, and a `[project.scripts]` entry
  if useful.
- Settle the package root explicitly: declare the package in `pyproject.toml` (`[tool.hatch.build]`
  / setuptools `packages`) so `uv sync` installs it and `uv run` works from `backend/` without
  `PYTHONPATH` tricks.
- Separate concerns:

  ```
  job_assistant/
    main.py            # app factory + middleware + router registration
    config.py          # settings (BE-007)
    api/               # HTTP layer only: routes, dependencies, error handlers
    schemas/           # request/response models
    services/          # orchestration: analysis service
    clients/           # external providers: deepseek, typesafe guard
  ```
  Keep it small — this is a two-endpoint service, not a monolith. The goal is that each file has one
  reason to change, not a prescribed number of directories.
- Use an **app factory** (`create_app()`) so tests can build an app with stubbed dependencies
  (QA-001) rather than importing a module-level singleton.
- Construct provider clients lazily, inside a dependency, not at import time.
- Add `ruff` config and a formatter.
- Add `.gitignore` entries for `__pycache__/`, `.pytest_cache/`, `.ruff_cache/`, `.venv/`, `.env`,
  and untrack the currently committed `.pyc` files.

## Acceptance criteria
- [ ] `pyproject.toml` describes the real project, not a scaffold.
- [ ] `uv sync && uv run uvicorn job_assistant.main:app` works from `backend/` with no `PYTHONPATH`.
- [ ] Importing any module requires no environment variables (BE-007).
- [ ] `create_app()` exists and is used by the tests.
- [ ] No `.pyc`, `.venv`, or `__pycache__` path is tracked in git.
- [ ] `ruff check` and `ruff format --check` pass.
- [ ] Each module has a single clear responsibility, stated in a one-line docstring.

## Notes
Do this **after** BE-001 fixes the imports and once QA-001 has enough tests to refactor safely.
Restructuring first means fixing the same import paths twice.

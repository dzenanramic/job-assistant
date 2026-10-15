# Job Assistant — Backend

FastAPI service that takes a job posting and a CV, checks the input for prompt injection, and asks
DeepSeek for a structured fit analysis.

See the [root README](../README.md) for the full project — this file covers the backend only.

## Quick start

```bash
cp .env.example .env     # then fill in both keys
uv sync
uv run uvicorn job_assistant.main:app --reload --port 8000
```

- API: <http://127.0.0.1:8000>
- Interactive docs: <http://127.0.0.1:8000/docs>

Port **8000** is what the Chrome extension expects.

## Configuration

All settings come from environment variables, loaded from `backend/.env` by
[`config.py`](src/job_assistant/config.py).

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `DEEPSEEK_API_KEY` | **yes** | — | DeepSeek analysis. Get one at <https://platform.deepseek.com/> |
| `TYPESAFE_API_KEY` | **yes** | — | TypeSafe prompt-injection guard. Get one at <https://typesafe.ai/> |

Copy [`.env.example`](.env.example) to `.env` and fill both in. `.env` is gitignored — never
commit real keys.

### How config is loaded

```python
# src/job_assistant/config.py
BASE_DIR = Path(__file__).resolve().parent.parent.parent   # -> backend/
```

The path to `.env` is anchored to `__file__`, **not** the current working directory, so the service
behaves the same however you launch it.

Settings are built **lazily**, via `get_settings()`, rather than at import:

```python
def get_settings() -> Settings:
    return Settings()
```

This matters — it means importing any module works with no credentials present, so tests and
tooling never need keys. If you ever move `Settings()` to module level, you break that guarantee and
the test suite will tell you.

### Behaviour worth knowing

- **Required fields have no defaults.** A missing key raises a `ValidationError` naming the field,
  at startup rather than on the first request.
- **Name mapping is automatic.** The field `deepseek_api_key` reads `DEEPSEEK_API_KEY`. A typo on
  either side produces an `AttributeError` at call time — `tests/test_config.py` guards this.
- **Real environment variables beat `.env`.** Production can override without touching the file.

## API

### `POST /jobs/`

**Request**

```json
{ "text": "job posting text", "cvText": "CV as plain text" }
```

**Response** — `200 OK`

```json
{
  "score": 88,
  "strengths": ["Python", "FastAPI"],
  "gaps": ["No Kubernetes experience"],
  "suggestions": ["Add measurable outcomes to your last role"],
  "flags": []
}
```

| Status | When |
|--------|------|
| `400` | The injection guard flagged the input; no paid call is made |
| `422` | Body failed validation (e.g. missing `cvText`) |

### `GET /`

`{"message": "Hello World"}` — a scaffold placeholder. A real health endpoint is planned (BE-011).

## Tests

```bash
uv run pytest -v
```

No API keys and no network required — both providers are mocked.

```bash
# prove the suite needs no credentials
env -u DEEPSEEK_API_KEY -u TYPESAFE_API_KEY uv run pytest -v
```

| File | Covers |
|------|--------|
| `tests/test_config.py` | Settings load, field-name contract, missing-key error |
| `tests/test_analyze.py` | Response parsing, injection rejection, request validation |

## Layout

```
src/job_assistant/
├── main.py             # FastAPI app, CORS, router registration
├── config.py           # settings — the single source of configuration
├── api/v1/analyze.py   # POST /jobs/
├── schemas/            # request/response models
├── clients/            # external providers: deepseek, typesafe
└── services/           # orchestration: guard, then analyse, then parse
```

The rule of thumb: `clients/` talks to the outside world, `services/` orchestrates, `api/` handles
HTTP, and `config.py` is the only place that reads the environment.

## Adding configuration

1. Add a field to `Settings` in [`config.py`](src/job_assistant/config.py) — no default makes it
   required.
2. Add the variable to [`.env.example`](.env.example) with a placeholder and a comment.
3. Add it to the table above.
4. If a client reads it, extend the contract test in `tests/test_config.py`.

## Known issues

Tracked in [`../docs/tickets/`](../docs/tickets/):

- CORS is wide open (`allow_origins=["*"]`) — **BE-006**
- No rate limiting or per-day spend cap — **BE-005**
- `GET /` is scaffold output; no health endpoint — **BE-011**
- No request correlation or token/cost tracking — **BE-010**

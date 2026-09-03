# DATA-002 — Structured AI result (rubric) + match scoring

**Type:** Backend feature
**Epic:** DATA — Data model & persistence
**Affects:** `backend/`, `extension/`
**Priority:** P2

## Summary
Today the AI returns a free-form markdown blob (`{ text: answer }`). There is no machine-readable
output, so nothing can be scored, stored, filtered, or re-evaluated. Make the model return a
**structured result** (JSON) so match data can be persisted (DATA-001) and displayed cleanly.

## Proposed scope
- Ask the model to return **structured JSON** (or a strict-markdown section set) conforming to a
  fixed rubric, e.g. `{ matchScore: number(0-100), strengths: string[], gaps: string[],
  suggestions: string[], summary: string }`.
- Validate/parse the JSON server-side (reject/repair malformed output rather than passing raw text).
- Persist the parsed fields (score, strengths, gaps, suggestions) in the entity (DATA-001).
- Pass the structured JSON to the extension so the popup can render a **score badge + sections**
  instead of one wall of markdown.

## Acceptance criteria
- [ ] Model output is parsed into the rubric schema; malformed output handled gracefully.
- [ ] `matchScore` is stored and queryable.
- [ ] Popup renders a score plus clearly separated sections.
- [ ] Backwards-compatible: endpoint still works even if parsing fails (returns raw text as fallback).

## Notes / CV value
Structured LLM output + JSON-schema validation is a concrete "I built an LLM feature properly"
story. Nice pairing with SEC-004 (sanitize rich output) and QA (test the parser).

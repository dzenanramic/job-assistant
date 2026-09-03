# DATA-004 — AI output evaluation & quality regression set

**Type:** AI / QA feature
**Epic:** DATA — Data model & persistence
**Affects:** `backend/` (prompt/eval)
**Priority:** P3

## Summary
There is no way to tell whether a prompt change improves or degrades the analysis. As prompts grow
per-tenant (MS-002), you need an **offline evaluation harness**: a fixed set of (job, CV, expected-ish
rubric) fixtures run against the current prompt to catch regressions in score structure, tone and
completeness — independent of the red-team suite (SEC-006).

## Proposed scope
- Curate a **small golden dataset** of representative jobs + CVs with expected sections present.
- Run the prompt against them on-demand and assert structural invariants (has `matchScore`,
  strengths/gaps/suggestions non-empty) and, loosely, that the score is a sane number in 0–100.
- Compare across prompt/config versions (tie prompt version into the stored entity, DATA-001).
- Surface a small **report** (score distribution, missing-section counts) to guide prompt edits.

## Acceptance criteria
- [ ] `npm run eval` (new script) runs the golden set and prints a report.
- [ ] A prompt change can be A/B'd against the previous recorded run.
- [ ] Sections present/absent are reported per analysis, not just eyeballed.
- [ ] Results recorded so regressions are visible over time.

## Notes / CV value
"Built an LLM eval/regression harness" is a differentiator for AI/ML-backend roles and complements
the prompt-injection suite (SEC-006) as the "quality half" vs the "safety half."

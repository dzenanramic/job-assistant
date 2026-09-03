# DATA-003 — History / saved analyses + retrieval UI

**Type:** Backend feature
**Epic:** DATA — Data model & persistence
**Affects:** `backend/`, `extension/`
**Priority:** P3

## Summary
Once analyses are persisted (DATA-001) and structured (DATA-002), let the user **browse past
analyses** in the extension instead of only ever seeing the current result. This turns the product
from a one-shot tool into a useable job-search companion and gives demos real footage.

## Proposed scope
- Backend: list/`getById` endpoints returning saved analyses (scoped — see SEC-005/MS-002).
- Extension: a "History" view in the popup listing past analyses (title, company, score, date),
  clickable to re-open a past result.
- Keep the current-session result path intact.

## Acceptance criteria
- [ ] Saved analyses appear in a history list, most-recent-first.
- [ ] Opening a past analysis renders its stored structured result.
- [ ] Scoping respected (only the user's/tenant's analyses, see SEC-005).

## Notes
This is a "closing the loop with a DB" showcase — pairs naturally with DATA-001/DATA-002.

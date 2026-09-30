# Landing API Changelog & Deprecation Policy

## v4 final — 2026-09-29
- Repaired durable idempotency reservation so the deterministic response is persisted with the reservation instead of referencing an undefined value.
- Repaired replay semantics so a durable row with a stored response is replayable even when `processing=true` after a committed transaction.
- Repaired the global success response mapping so `LandingCommandResult` becomes the exact canonical `{success,message,data:null}` frontend envelope rather than being nested under `data`.
- Added regression coverage for both response mapping branches and the no-response in-progress conflict.
- Regenerated Selenium coverage from exact frontend `data-testid` evidence.
- Refreshed all delivery/audit documentation against the supplied frontend archive.

## Compatibility contract
- `POST /api/v1/landing/booking` and `POST /api/v1/landing/contact` remain the canonical versioned routes.
- `POST /api/landing/booking`, `POST /api/landing/bookings`, and `POST /api/landing/contact` remain compatibility aliases.
- The plural booking alias is retained because it is the actual frontend API contract.

## Deprecation policy
1. A destructive route or field change MUST NOT be introduced without a compatibility window.
2. During deprecation, the server MUST send a `Deprecation` response header.
3. A concrete `Sunset` date MUST be published in the API documentation and this changelog.
4. The replacement route/field and migration deadline MUST be documented before removal.
5. Compatibility behavior MUST continue to use the same feature orchestrator so business semantics do not fork.

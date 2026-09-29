# Changelog — backend_landing

## v4 fix — 2026-09-29
- Repaired durable idempotency response persistence.
- Repaired crash-window idempotency replay semantics.
- Repaired canonical success response mapping for the frontend contract.
- Added response interceptor regression coverage.
- Added no-response in-progress idempotency regression coverage.
- Regenerated Selenium tests from supplied frontend `data-testid` evidence.
- Rebuilt all audit/integration documentation against current frontend + backend evidence.

No frontend source file was modified.

# Landing Backend Dependencies — v4 final

## Business Feature Dependencies
- None.

## Infrastructure Dependencies
- Trusted master tenant registry and database-per-tenant DataSource resolution.
- Redis for public rate limiting and strict mutation concurrency locking.
- Tenant PostgreSQL for authoritative business state and durable idempotency replay state.
- TypeORM/PostgreSQL repositories and UnitOfWork abstraction.
- Global response/filter, structured logger, AsyncLocalStorage context, health, and metrics infrastructure.

## Frontend Contract Dependencies
- Booking: `POST /api/landing/bookings` with `Idempotency-Key`.
- Contact: `POST /api/landing/contact` with `Idempotency-Key`.
- Booking date: offset-aware ISO-8601 string; backend stores `TIMESTAMPTZ`.
- Success: canonical envelope with `data:null`.
- Backend message may be displayed directly by the frontend when `isBackendMessage=true`.

## Runtime / Event Dependencies
- `LANDING.BOOKING.CREATED` and `LANDING.CONTACT.CREATED` are registered event names for future durable consumers; current synchronous frontend contract does not require a downstream consumer.

## Redis Keys
- `rate:{{trustedTenantId}}:{{ip}}:{{method}}:{{path}}`.
- `idempotency:{{trustedTenantId}}:landing.booking.create:lock:{{key}}` TTL 300s.
- `idempotency:{{trustedTenantId}}:landing.contact.create:lock:{{key}}` TTL 300s.

## Test / QA Dependencies
- API E2E: `backend_e2e/backend_landing_e2e/landing/test_landing_api.py`.
- Selenium: `backend_selenium/backend_landing_selenium/landing/test_landing_ui.py`, `test_landing_ui_edge.py`.
- The external pre-existing E2E/Selenium ZIP was not supplied; generated tests are deliverables, not proof that an external suite was previously audited.

## Dependency Guardrail
No direct sibling business-module import is permitted. New runtime dependencies require human approval under Rule 77. v4 introduces no new runtime dependency.

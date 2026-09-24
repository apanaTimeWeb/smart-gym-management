# Landing Backend Dependencies

## Business Feature Dependencies
- None.

## Infrastructure Dependencies
- Master tenant registry and tenant DataSource resolution.
- Redis for rate limiting and best-effort idempotency replay caching.
- Durable tenant PostgreSQL `idempotency_records` state for transactionally safe reservations/completions.
- TypeORM/PostgreSQL through repository boundaries.
- Global response interceptor, validation filter, structured logger, AsyncLocalStorage request context, health/metrics infrastructure.

## Runtime/Event Dependencies
- Publishes are reserved for future consumers; current landing mutations do not require an event consumer to satisfy the supplied frontend contract.
- Contractually registered event names: `LANDING.BOOKING.CREATED`, `LANDING.CONTACT.CREATED`.

## Dependency Guardrail
Landing must not import sibling business modules. New business dependencies require a documented dependency update and architecture review.

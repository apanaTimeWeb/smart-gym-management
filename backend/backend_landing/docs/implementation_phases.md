# Backend Implementation Phases — V1

## Phase 0 — Scope Lock
- Identified the supplied frontend root as `landing`.
- Applied the backend architecture document as the normative implementation standard.
- Refused to invent a Superadmin business domain that was not supplied.

## Phase 1 — Frontend Reverse Engineering
- Mapped frontend backend-facing forms and API calls.
- Extracted exact request fields, enum values, date semantics, and response envelope requirements.
- Recorded the `/landing/booking` vs `/api/landing/bookings` source conflict.
- Classified the newsletter flow as frontend mail-client behavior, not a backend subscription capability.

## Phase 2 — Core Platform Infrastructure
- NestJS 12 + TypeScript strict mode.
- PostgreSQL 17 + TypeORM 1.x.
- Master tenant registry and database-per-tenant routing.
- AsyncLocalStorage request context and OpenTelemetry instrumentation.
- Redis-backed rate limiting plus durable transaction-scoped idempotency records with Redis replay caching.
- Global validation, response envelope, structured logging, health probes, compression, Helmet, CORS, and Prometheus metrics.

## Phase 3 — Landing Feature Slice
- Command controller only because the supplied frontend has no Landing GET API.
- Booking and contact DTOs, domain models, mappers, repositories, services, and orchestrators.
- Atomic transaction + audit trail + durable idempotency completion in the same transaction.
- Soft-delete columns and explicit named database constraints.
- Versioned canonical endpoints plus documented compatibility aliases.

## Phase 4 — Database & Operational Safety
- Master migration for tenant registry.
- Tenant migration for Landing records, audit trail, and durable idempotency inspection table.
- Explicit indexes and connection-pool ceilings.
- Graceful shutdown and tenant DataSource cleanup.

## Phase 5 — Verification Assets
- Co-located Jest unit tests for mapping, repository soft-delete scope, mutation behavior, and durable idempotency replay.
- Python Pytest black-box lifecycle suite for booking/contact.
- Architecture verifier, forbidden-pattern checks, README, feature map, dependency map, and forbidden-pattern document.
- Test-only isolated tenant provisioning/cleanup API plus human-review gate for tenant/provisioning/public-write/security-sensitive changes.

## Phase 6 — Release Package
- Static syntax verification performed.
- Python E2E syntax verification performed.
- Architecture/file-size/import checks performed.
- Live dependency installation and runtime E2E remain environment-dependent because package installation timed out in the supplied build environment.

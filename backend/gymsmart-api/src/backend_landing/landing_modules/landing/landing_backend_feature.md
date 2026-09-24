# Landing Backend Feature Map

## Module Purpose
The `landing` module is the public GymSmart conversion boundary exposed to visitors before authentication. In the supplied frontend, the backend-facing business flows are booking requests and contact-message submissions; BMI, plans, services, schedule, gallery, trainers, testimonials, transformations, and newsletter handling are client-owned/static or mail-client behavior. All Landing persistence is tenant-isolated and all mutations are handled through the module's orchestrator/service/repository chain so the feature remains an AI repair boundary.

## Directory Structure

| File | Responsibility |
|---|---|
| `landing-command.controller.ts` | Receives `POST /landing/booking` and `POST /landing/contact`; no business logic. |
| `landing-api-success-response.dto.ts` | Documents the concrete successful null-data response envelope for Swagger. |
| `landing-api-error-response.dto.ts` | Documents the canonical validation/business error envelope for Swagger. |
| `landing.seeder.ts` | Provides deterministic/idempotent seed hook; current Landing has no reference data requiring inserts. |
| `dtos/landing-create-booking.dto.ts` | Validates name/email/phone/UTC date/booking type. |
| `dtos/landing-create-contact.dto.ts` | Validates name/email/message. |
| `services/landing-booking-orchestrator.service.ts` | Opens booking transaction and coordinates idempotency. |
| `services/landing-contact-orchestrator.service.ts` | Opens contact transaction and coordinates idempotency. |
| `services/landing-booking.service.ts` | Executes booking business flow and audit write. |
| `services/landing-contact.service.ts` | Executes contact business flow and audit write. |
| `repositories/landing-booking.repository.ts` | Owns booking persistence. |
| `repositories/landing-contact.repository.ts` | Owns contact persistence. |
| `repositories/landing-audit-log.repository.ts` | Owns mutation audit persistence. |
| `entities/landing-booking.entity.ts` | Maps `landing_bookings`. |
| `entities/landing-contact.entity.ts` | Maps `landing_contacts`. |
| `entities/landing-audit-log.entity.ts` | Maps `audit_logs`. |
| `mappers/landing-booking.mapper.ts` | Translates booking ORM entities and application input. |
| `mappers/landing-contact.mapper.ts` | Translates contact ORM entities and application input. |
| `landing.constants.ts` | Error messages, mutation scopes, and field limits. |
| `landing.exceptions.ts` | Typed Landing HTTP exceptions. |
| `repositories/landing-booking.repository.ts` | Owns booking persistence and inherits `CoreBaseRepository`. |
| `repositories/landing-contact.repository.ts` | Owns contact persistence and inherits `CoreBaseRepository`. |
| `repositories/landing-audit-log.repository.ts` | Owns audit-log persistence and inherits `CoreBaseRepository`. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| LandingCommandController | POST | `/api/v1/landing/booking` | Stores a public trial, membership, or class booking request atomically and returns the frozen null-data response envelope. | `LandingCreateBookingDto` | `ApiResponse<null>` |
| LandingCommandController | POST | `/api/v1/landing/contact` | Stores a public contact message atomically and returns the frozen null-data response envelope. | `LandingCreateContactDto` | `ApiResponse<null>` |
| Compatibility route | POST | `/api/landing/booking` | Compatibility alias for the frontend runtime API path; forwards the same booking behavior. | `LandingCreateBookingDto` | `ApiResponse<null>` |
| Compatibility route | POST | `/api/landing/bookings` | Compatibility alias for the plural path documented by the supplied feature map; forwards the same booking behavior. | `LandingCreateBookingDto` | `ApiResponse<null>` |

## Approved External Dependencies
- Business feature dependencies: None.
- Infrastructure dependencies: master tenant registry, tenant DataSource manager, Redis, TypeORM, global response/validation infrastructure.
- Runtime/event dependencies: `LANDING.BOOKING.CREATED`, `LANDING.CONTACT.CREATED` are the registered names reserved for future asynchronous consumers; current frontend flows do not require consumers.

## Data and State Architecture
- DB entities: `landing_bookings`, `landing_contacts`, `audit_logs`, `idempotency_records` (shared core infrastructure table in each tenant database).
- Constraints: `PK_landing_bookings`, `CHK_landing_bookings_type`, `CHK_landing_bookings_phone`, `PK_landing_contacts`, `PK_audit_logs`, `PK_idempotency_records`, `UQ_idempotency_records_scope_key`, `CHK_idempotency_records_completed_has_response`. 
- Tenant database: each active tenant receives its own PostgreSQL database; Landing rows never use a shared `tenant_id`.
- Redis keys (replay cache only; durable state is PostgreSQL):
  - `rate:{ip}:{method}:{path}` with the configured rate-limit window.
  - `idempotency:landing.booking.create:{key}` TTL 24h.
  - `idempotency:landing.contact.create:{key}` TTL 24h.
- Audit events/actions: `LANDING_BOOKING_CREATED`, `LANDING_CONTACT_CREATED`.
- Background jobs: none required by the current frontend; booking/contact are standard synchronous requests.
- Idempotency: optional `Idempotency-Key` is supported for both mutations so the existing frontend body contract remains unchanged.

## Business Flow / Key Sequences

### Booking
1. `LandingCommandController` receives `POST /api/v1/landing/booking`.
2. Global `ValidationPipe` validates and normalizes `LandingCreateBookingDto`.
3. `TenantResolutionMiddleware` establishes only the configured public tenant for anonymous Landing traffic; arbitrary tenant selection is rejected.
4. `LandingBookingOrchestratorService` computes a deterministic request hash and checks the Redis replay cache before opening the transaction.
5. `TypeOrmUnitOfWorkService` opens a tenant PostgreSQL transaction.
6. `LandingBookingService` calls `LandingBookingRepository.createBooking()`.
7. `LandingAuditLogRepository.recordCreate()` records the mutation in the same transaction.
8. The response is stored in `idempotency_records` inside the same transaction as the booking and audit row.
9. After commit, Redis is populated as a best-effort replay cache; Redis failure cannot turn a committed mutation into a 503.
10. The controller result is returned through the canonical response path.

### Contact
1. `LandingCommandController` receives `POST /api/v1/landing/contact`.
2. Global validation sanitizes and validates the DTO.
3. Tenant context is resolved before tenant DB access.
4. `LandingContactOrchestratorService` performs idempotency handling.
5. `TypeOrmUnitOfWorkService` opens a tenant transaction.
6. `LandingContactService` calls `LandingContactRepository.createContact()`.
7. `LandingAuditLogRepository.recordCreate()` writes the audit trail atomically.
8. The response is stored in `idempotency_records` inside the same transaction; Redis is populated only as a best-effort replay cache after commit.

## File Responsibility Map
- `landing-command.controller.ts` — HTTP boundary only; MUST NOT contain business logic.
- `landing-booking-orchestrator.service.ts` — transaction and idempotency orchestration; MUST NOT contain persistence code.
- `landing-booking.service.ts` — booking business flow only; MUST NOT access TypeORM APIs.
- `landing-booking.repository.ts` — booking DB writes/reads only; MUST NOT call another business repository.
- `landing-contact-orchestrator.service.ts` — transaction and idempotency orchestration; MUST NOT contain contact business rules.
- `landing-contact.service.ts` — contact business flow only; MUST NOT access ORM APIs.
- `landing-contact.repository.ts` — contact DB access only.
- `landing-audit-log.repository.ts` — audit persistence only; MUST NOT own HTTP behavior.
- `landing-booking.mapper.ts` — booking ORM/domain translation only.
- `landing-contact.mapper.ts` — contact ORM/domain translation only.

## Permissions and Security
- Endpoint access: public/unauthenticated visitor.
- Tenant rule: anonymous Landing traffic can only use the configured `PUBLIC_TENANT_ID`; a different client-supplied `x-tenant-id` is rejected. Non-public traffic requires an authenticated actor whose authorized tenant set contains the selected tenant.
- Resource-level checks: not applicable because the current frontend creates new records and does not expose read/edit/delete operations.
- Idempotency: supported with `Idempotency-Key` for both resource-creation mutations.

## Edge Cases / AI Warnings
- **Frontend route conflict:** `landing_features.md` names `/api/landing/bookings`, while the actual `LandingUrlConfig`, API client test, and MSW handler use `/landing/booking`. Treat the client/MSW path as direct runtime evidence; do not rename it silently — Rule 67.
- **UTC booking date:** `date` is a local `YYYY-MM-DD` input in the frontend but is serialized to offset-aware UTC ISO-8601 before transmission. The DB stores `timestamptz`; never reinterpret it as a local date — Rule 71.
- **No fake newsletter backend:** the footer uses a mail-client handoff and the supplied module has no subscription API. Do not invent a backend subscription flow.
- **Public tenant context:** the current frontend has no tenant selector/header, so anonymous Landing uses `PUBLIC_TENANT_ID`; future frontend tenant routing must update this contract before changing the resolver.
- **Contact message sanitization:** free-text HTML tags are stripped before persistence to reduce XSS/storage abuse — Rule 46.
- **No financial fields:** current Landing does not perform a charge or monetary mutation, so Paise/cents handling is not applicable to its current API.
- **No async queue:** the current frontend expects an immediate success/error message and does not expose a job lifecycle; do not turn the current flows into a fake `202` operation.

## Frozen API Contract

### Request Shape

| Endpoint | Method | Request DTO fields |
|---|---|---|
| `/api/v1/landing/booking` | POST | `name: string`, `email: string`, `phone: string`, `date: ISO-8601 string`, `type: 'trial' \| 'membership' \| 'class'` |
| `/api/v1/landing/contact` | POST | `name: string`, `email: string`, `message: string` |

### Response Shape

| Endpoint | Response DTO fields | Notes |
|---|---|---|
| Booking | `success`, `message`, `data: null`, optional `error`, `errorCode`, `statusCode`, `validationErrors` | Success message matches the supplied frontend MSW contract. |
| Contact | `success`, `message`, `data: null`, optional `error`, `errorCode`, `statusCode`, `validationErrors` | Success message matches the supplied frontend MSW contract. |

### UI-Required Fields
- Booking response: `message` only; `data` is required and must be `null`.
- Contact response: `message` only; `data` is required and must be `null`.
- No server-backed table/KPI/chart/lookup fields are consumed by the current Landing surface.

### Pagination / Error Contract
- Pagination: not applicable; current Landing endpoints are mutation endpoints returning null data.
- Validation errors: canonical 400 response with `VALIDATION.DTO.FAILED`.
- Business errors: `LANDING.<ENTITY>.<REASON>`.

## Rule Compliance Checklist
- [x] Rule 7: TypeORM is the single project ORM and DB access is isolated behind repositories.
- [x] Rule 19: Feature documentation is co-located with the module and updated with this repair.
- [x] Rule 39: Anonymous Landing traffic cannot select arbitrary tenant databases; tenant selection is application-controlled for public routes.
- [x] Rule 58: Landing repositories inherit CoreBaseRepository and CoreBaseEntity declares the common UUID identity abstraction.
- [x] Rule 81: Landing endpoints are fully implemented; no production stub remains.
- [x] Rule 28: Global response envelope infrastructure exists.
- [x] Rule 29: Soft deletes are represented with `deleted_at` and repository filters.
- [x] Rule 31: Idempotency is transactionally durable in tenant PostgreSQL with Redis replay caching; frontend retry support remains dependent on the frontend sending the same `Idempotency-Key` for a mutation intent.
- [x] Rule 34: No list queries or N+1 patterns are present in the current feature.
- [x] Rule 36: DTO + service/database fail-fast validation exists.
- [x] Rule 48: Command controller is isolated; no query controller is needed for the current frontend because there are no Landing GET API calls.
- [x] Rule 56: Repository `findById()` is nullable by type; `findByIdOrThrow` is the defensive API for callers.
- [x] Rule 62: Service and repository methods have explicit return types; tenant DataSource transactions are resolved through the UnitOfWork abstraction.
- [x] Rule 76/79/80: Responsibility/flow comments and JSDoc are present on authored backend service/repository/utility boundaries.
- [x] Rule 83: Public Landing endpoints are unauthenticated by contract; there is no hidden role requirement to enforce.
- [x] Rule 85/87: Business methods use shallow branching and are kept micro-scoped.
- [x] Rule 89: ORM entities are mapped into domain objects.
- [x] Rule 99: Entity mutations remain inside repositories.
- [x] Rule 100: DB constraint names are explicit and human-readable.
- [x] Rule 101: Unit/E2E tests must verify observable behavior; tests are included in the archive.

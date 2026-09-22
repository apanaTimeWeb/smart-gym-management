# schedule Backend Feature Map

## Module Purpose
The Schedule module manages Trainer weekly availability and leave requests while preserving date and status invariants. Availability replacement is executed inside a tenant transaction and both availability and leave mutations are audited. AI changes must preserve enum values, trainer ownership, idempotency, canonical response mapping, and the frontend PUT/PATCH compatibility contract.

## Directory Structure
| File | Responsibility |
|---|---|
| `schedule-query.controller.ts` | Query HTTP surface, documented with Swagger. |
| `schedule-command.controller.ts` | Command HTTP surface, documented with Swagger. |
| `services/` | Single-use-case application services. |
| `repositories/` | Feature-owned TypeORM persistence/query boundary. |
| `dtos/` | Edge validation only. |
| `schedule.module.ts` | Explicit Nest registration. |

## Feature Inventory
| Endpoint | Purpose | Response |
|---|---|---|
| `GET /trainer/schedule` | Schedule read. | Canonical `ApiResponse` |
| `PUT /trainer/schedule/availability` | Actual frontend availability mutation. | Canonical `ApiResponse` |
| `PUT /trainer/schedule/availability` | Documented compatibility mutation. | Canonical `ApiResponse` |
| `POST /trainer/schedule/leaves` | Create leave request. | Canonical `ApiResponse` |

## Approved External Dependencies
- **Business Feature Dependencies**: None; cross-feature business imports are forbidden.
- **Infrastructure Dependencies**: Core authentication, tenant resolver, Redis where used, audit service, UnitOfWork where used.
- **Runtime/Event Dependencies**: None in the current frontend-derived scope.

## Data and State Architecture
- DB Entities: Feature-owned tenant tables listed by migration names.
- Redis Caching Keys: Rate-limit and idempotency keys only; no business cache is required by the current frontend contract.
- Event Emitters: none.
- Background Jobs: frontend export polling is not required, but backend architecture still requires heavy exports to use a job/queue lifecycle; current synchronous exports remain BLOCKED_PENDING_QUEUE_DEPENDENCY and are not claimed compliant.
- Idempotency Keys: required on financial/side-effectful Trainer mutations marked with `@CoreIdempotency`; all POST/PATCH/PUT/DELETE mutations require `Idempotency-Key` via `@CoreIdempotency()`; no mutation route is exempt.

## Business Flow / Key Sequences
1. Request enters `/api/v1/schedule` with JWT and `x-tenant-id`.
2. Authentication executes before tenant authorization and tenant DataSource resolution.
3. DTO/pipe validation rejects unknown or malformed fields.
4. Query requests call a feature-local query service and repository.
5. Mutations call a feature-local command service, named repository method, audit layer, and UnitOfWork when atomicity is required.
6. CoreResponseInterceptor wraps successful results in the canonical envelope; the global exception filter shapes errors.

## File Responsibility Map
- Controllers — HTTP only; MUST NOT contain business rules or SQL.
- DTOs — validate payload/query shape; MUST NOT persist data.
- Services — feature business behavior; MUST NOT call TypeORM APIs directly.
- Repositories — persistence/query only; MUST NOT orchestrate other business modules.
- Mappers/domain interfaces — isolate application data shapes from ORM entities.

## Permissions and Security
| Endpoint Group | Role | Resource Scope |
|---|---|---|
| All Trainer feature endpoints | TRAINER | Authenticated actor plus trusted tenant context |
| `schedule` mutations | TRAINER | Feature resource must resolve in current tenant |

## Edge Cases / AI Warnings
- Availability replacement soft-deactivates old rows; hard delete would violate Rule 29.
- Unknown JSON fields are rejected globally before business logic — Rule 37.
- Cross-tenant requests are rejected before tenant DataSource routing — Rule 39.

## Frozen API Contract
The routes above are frozen from the supplied Trainer frontend actual client contracts and compatibility aliases are retained where documentation and implementation disagree.

### Request Shape
- Query/list endpoints support `page`, `limit`, relevant search/filter fields, and allowlisted sort fields.
- Mutation bodies are defined in module-local DTOs and unknown properties are forbidden.

### Response Shape
All JSON endpoints use `{ success, message, data, meta?, error?, errorCode?, statusCode?, validationErrors? }`. Download endpoints return CSV with `Content-Type: text/csv` and `Content-Disposition`.

### UI-Required Fields
Every field consumed by the supplied Trainer UI is represented by a typed domain/response shape; financial values use integer minor units; nullable UI fields remain nullable.

### Pagination / Error Contract
- Pagination: yes for all list/table endpoints; page is 1-indexed, default 1, max 100.
- Validation errors: `400`, `VALIDATION.DTO.FAILED`, field error array.
- Business errors: `DOMAIN.ENTITY.REASON` style machine code.

## Rule Compliance Checklist
- [x] Rule 7: TypeORM only behind repositories
- [x] Rule 28: Canonical response envelope
- [ ] Rule 29: Soft deletes
- [x] Rule 31: Idempotency on marked critical mutations
- [ ] Rule 34: N+1-conscious queries
- [ ] Rule 41: Concurrency design available through UnitOfWork/locking boundary where applicable
- [x] Rule 48: Query/command controllers split
- [x] Rule 56: Fail-fast not-found behavior present in feature services
- [x] Rule 62: Explicit service/repository return types on public methods
- [x] Rule 76: `// RESPONSIBILITY:` comments
- [x] Rule 79: `// FLOW:` comments
- [x] Rule 80: JSDoc on public service/repository methods
- [x] Rule 83: `@CoreRoles()` controller-layer RBAC
- [x] Rule 85: Guard clauses / shallow control flow
- [ ] Rule 82A: Frontend-derived UI data fields represented
- [x] Rule 86: Verb-oriented method names
- [x] Rule 87: Micro-service methods kept small
- [x] Rule 89: Domain objects separate ORM entities
- [x] Rule 92: User-controlled sorting/filtering allowlisted
- [ ] Rule 93: Security-sensitive paths listed in CODEOWNERS

## Complete File Responsibility Map

| File | Responsibility | Must Not |
|---|---|---|
| `controllers/schedule-command.controller.ts` | Owns the HTTP boundary for the schedule command side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `controllers/schedule-query.controller.ts` | Owns the HTTP boundary for the schedule query side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/schedule-create-leave.dto.ts` | Validates schedule request shape at the edge and contains no business logic. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/schedule-update-availability-body.dto.ts` | Represents the normalized schedule availability request after raw-array compatibility normalization. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/schedule-update-availability.dto.ts` | Validates each weekly availability item sent by the trainer UI. | Contain only its documented responsibility; no sibling-feature business logic. |
| `pipes/schedule-availability-normalizer.pipe.ts` | Normalizes the frontend raw array availability payload into the DTO wrapper expected by validation. | Contain only its documented responsibility; no sibling-feature business logic. |
| `repositories/schedule-repository.ts` | Owns availability and leave persistence without physical deletes. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-availability.domain.ts` | Defines the schedule business object independent from TypeORM persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-availability.mapper.ts` | Maps weekly availability persistence to the Trainer schedule response contract. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-enums.ts` | Defines finite schedule domain enum values used by DTOs and persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-leave-request.entity.ts` | Maps trainer leave requests using typed status values. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-leave.domain.ts` | Defines the schedule business object independent from TypeORM persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-leave.mapper.ts` | Maps leave-request persistence to the Trainer schedule response contract. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule-weekly-availability.entity.ts` | Maps schedule persistence without leaking ORM entities into domain services. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule.module.ts` | Registers the isolated schedule feature slice and its controller/service/repository graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule.seeder.ts` | Defines the deterministic, idempotent seed entry point for the schedule feature. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule_collection.json` | Module API collection for manual contract verification. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule_dependencies.md` | Declared business, infrastructure, and runtime dependency graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `schedule_forbidden.md` | Module-specific forbidden patterns and architectural guardrails. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/schedule-availability-update.service.ts` | Replaces the trainer weekly availability inside one tenant transaction. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/schedule-leave-create.service.ts` | Creates a trainer leave request and applies date invariants. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/schedule-query.service.ts` | Reads trainer availability and leave state for the Schedule feature. | Contain only its documented responsibility; no sibling-feature business logic. |


## Frozen Frontend Traceability — Static Audit

`SCH-001..SCH-003 | GET /trainer/schedule | PUT /trainer/schedule/availability | POST /trainer/schedule/leaves`

The above is the frozen frontend-derived contract used for this repair. A `[ ]` rule item means the rule is not currently proven compliant; it is not silently treated as PASS. Runtime behavior remains NOT VERIFIED because this repair intentionally does not require a live environment.

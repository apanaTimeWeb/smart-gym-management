# attendance Backend Feature Map

## Module Purpose
The Attendance module records Trainer-scoped member and self attendance while keeping check-in/check-out mutations auditable and idempotent. It enforces member ownership before a Trainer can create or query attendance state and keeps all persistence behind the feature repository boundary. AI changes must preserve the trainer ownership checks, soft-delete semantics, canonical response contract, and bounded export behavior.

## Directory Structure
| File | Responsibility |
|---|---|
| `attendance-query.controller.ts` | Query HTTP surface, documented with Swagger. |
| `attendance-command.controller.ts` | Command HTTP surface, documented with Swagger. |
| `services/` | Single-use-case application services. |
| `repositories/` | Feature-owned TypeORM persistence/query boundary. |
| `dtos/` | Edge validation only. |
| `attendance.module.ts` | Explicit Nest registration. |

## Feature Inventory
| Endpoint | Purpose | Response |
|---|---|---|
| `GET /trainer/attendance` | Filtered attendance list. | Canonical `ApiResponse` |
| `GET /trainer/attendance/stats` | Attendance KPI counts. | Canonical `ApiResponse` |
| `GET /trainer/attendance/members-basic` | Member selector options. | Canonical `ApiResponse` |
| `POST /trainer/attendance` | Create member/staff attendance. | Canonical `ApiResponse` |
| `POST /trainer/attendance/checkout/:id` | Close trainer attendance. | Canonical `ApiResponse` |
| `PATCH /trainer/attendance/checkout/:staffId` | Compatibility checkout. | Canonical `ApiResponse` |

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
1. Request enters `/api/v1/attendance` with JWT and `x-tenant-id`.
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
| `attendance` mutations | TRAINER | Feature resource must resolve in current tenant |

## Edge Cases / AI Warnings
- Trainer self-checkout must only mutate the authenticated trainer-owned open row — Rule 36.
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
| `attendance-enums.ts` | Defines finite attendance domain enum values used by DTOs and persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance-exceptions.ts` | Defines attendance-specific business exceptions for required actor, type, ownership, and trainer-scope rules. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance-record.domain.ts` | Defines the Attendance business representation returned to application services. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance-record.entity.ts` | Maps trainer/member attendance records with finite type and method values. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance-record.mapper.ts` | Maps attendance ORM state to the frontend-required domain response shape. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance.module.ts` | Registers the isolated attendance feature slice and its controller/service/repository graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance.seeder.ts` | Defines the deterministic, idempotent seed entry point for the attendance feature. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance_collection.json` | Module API collection for manual contract verification. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance_dependencies.md` | Declared business, infrastructure, and runtime dependency graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `attendance_forbidden.md` | Module-specific forbidden patterns and architectural guardrails. | Contain only its documented responsibility; no sibling-feature business logic. |
| `controllers/attendance-command.controller.ts` | Owns the HTTP boundary for attendance mutations only. | Contain only its documented responsibility; no sibling-feature business logic. |
| `controllers/attendance-query.controller.ts` | Owns the HTTP boundary for the attendance query side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/attendance-checkout-attendance.dto.ts` | Validates the Trainer attendance checkout request shape only. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/attendance-create-attendance.dto.ts` | Validates the Trainer attendance creation request shape only. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/attendance-query.dto.ts` | Validates attendance request shape at the edge and contains no business logic. | Contain only its documented responsibility; no sibling-feature business logic. |
| `repositories/attendance-repository.ts` | Owns Trainer attendance persistence, member selectors, and trainer-scoped attendance queries. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/attendance-checkout.service.ts` | Closes only the authenticated Trainer's own open staff attendance row. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/attendance-create.service.spec.ts` | Proves the attendance create service enforces member identity before persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/attendance-create.service.ts` | Creates one attendance record for the authenticated Trainer. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/attendance-export.service.ts` | Produces a bounded CSV attendance export for the authenticated Trainer. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/attendance-query.service.ts` | Builds Trainer attendance list, KPI, and member-selector response data. | Contain only its documented responsibility; no sibling-feature business logic. |


## Frozen Frontend Traceability — Static Audit

`ATT-001..ATT-006 | GET /trainer/attendance | GET /trainer/attendance/stats | GET /trainer/attendance/members-basic | POST /trainer/attendance | PATCH /trainer/attendance/checkout/:staffId`

The above is the frozen frontend-derived contract used for this repair. A `[ ]` rule item means the rule is not currently proven compliant; it is not silently treated as PASS. Runtime behavior remains NOT VERIFIED because this repair intentionally does not require a live environment.

# notifications Backend Feature Map

## Module Purpose
The Notifications module lists Trainer notifications, exposes notification preferences, and applies read-state/preference mutations. It maps persistence fields to the exact frontend `text`, `time`, `unread`, and preference contracts and keeps read operations scoped to the authenticated Trainer. AI changes must preserve notification-type enums, canonical pagination, soft-delete filtering, audit records, and idempotency exceptions.

## Directory Structure
| File | Responsibility |
|---|---|
| `notifications-query.controller.ts` | Query HTTP surface, documented with Swagger. |
| `notifications-command.controller.ts` | Command HTTP surface, documented with Swagger. |
| `services/` | Single-use-case application services. |
| `repositories/` | Feature-owned TypeORM persistence/query boundary. |
| `dtos/` | Edge validation only. |
| `notifications.module.ts` | Explicit Nest registration. |

## Feature Inventory
| Endpoint | Purpose | Response |
|---|---|---|
| `GET /trainer/notifications` | Paginated notifications. | Canonical `ApiResponse` |
| `PATCH /trainer/notifications/:id/read` | Mark one read. | Canonical `ApiResponse` |
| `PATCH /trainer/notifications/read-all` | Mark all read. | Canonical `ApiResponse` |
| `GET /trainer/notifications/preferences` | Read preferences. | Canonical `ApiResponse` |
| `PATCH /trainer/notifications/preferences` | Update preferences. | Canonical `ApiResponse` |

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
1. Request enters `/api/v1/notifications` with JWT and `x-tenant-id`.
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
| `notifications` mutations | TRAINER | Feature resource must resolve in current tenant |

## Edge Cases / AI Warnings
- Read operations are naturally repeat-safe and are explicitly exempted from idempotency — Rule 31 exception by contract.
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
| `controllers/notifications-command.controller.ts` | Owns the HTTP boundary for the notifications command side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `controllers/notifications-query.controller.ts` | Owns the HTTP boundary for the notifications query side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/notifications-query.dto.ts` | Validates notifications request shape at the edge and contains no business logic. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/notifications-update-preferences.dto.ts` | Validates notifications request shape at the edge and contains no business logic. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications-enums.ts` | Defines the finite notification kinds accepted by the Trainer API and persistence layer. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications-notification-preference.entity.ts` | Maps trainer notification preferences. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications-notification.domain.ts` | Defines the notifications business object independent from TypeORM persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications-notification.entity.ts` | Maps notification persistence fields to the tenant PostgreSQL notifications table. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications-notification.mapper.ts` | Converts a notification ORM entity into the Trainer frontend response shape. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications.module.ts` | Registers the isolated notifications feature slice and its controller/service/repository graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications.seeder.ts` | Defines the deterministic, idempotent seed entry point for the notifications feature. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications_collection.json` | Module API collection for manual contract verification. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications_dependencies.md` | Declared business, infrastructure, and runtime dependency graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `notifications_forbidden.md` | Module-specific forbidden patterns and architectural guardrails. | Contain only its documented responsibility; no sibling-feature business logic. |
| `repositories/notifications-repository.ts` | Owns notification list/read/preference queries and updates for the Trainer module. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/notifications-command.service.spec.ts` | Proves notification read-state mutation and fail-fast behavior. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/notifications-command.service.ts` | Applies Trainer notification read-state and preference mutations with audit records. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/notifications-query.service.ts` | Builds Trainer notification list and preference response contracts. | Contain only its documented responsibility; no sibling-feature business logic. |


## Frozen Frontend Traceability — Static Audit

`NOT-001..NOT-003 | GET /trainer/notifications | PATCH /trainer/notifications/:id/read | PATCH /trainer/notifications/read-all | WebSocket /ws notification.received is required by frontend but backend capability remains BLOCKED_PENDING_REALTIME_DEPENDENCY`

The above is the frozen frontend-derived contract used for this repair. A `[ ]` rule item means the rule is not currently proven compliant; it is not silently treated as PASS. Runtime behavior remains NOT VERIFIED because this repair intentionally does not require a live environment.

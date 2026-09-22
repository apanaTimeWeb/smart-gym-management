# members Backend Feature Map

## Module Purpose
The Members module exposes the Trainer member list, member KPIs, detail view, notes, attendance history, diet/workout selectors, progress history, updates, and bounded CSV export. Member mutations are restricted to authenticated Trainer-owned records and return explicit domain/DTO shapes rather than ORM entities. AI changes must preserve the frozen UI fields, ownership checks, soft deletes, snapshots, audit trail, pagination, and lookup semantics.

## Directory Structure
| File | Responsibility |
|---|---|
| `members-query.controller.ts` | Query HTTP surface, documented with Swagger. |
| `members-command.controller.ts` | Command HTTP surface, documented with Swagger. |
| `services/` | Single-use-case application services. |
| `repositories/` | Feature-owned TypeORM persistence/query boundary. |
| `dtos/` | Edge validation only. |
| `members.module.ts` | Explicit Nest registration. |

## Feature Inventory
| Endpoint | Purpose | Response |
|---|---|---|
| `GET /trainer/members` | Paginated members. | Canonical `ApiResponse` |
| `GET /trainer/members/stats` | Member KPIs. | Canonical `ApiResponse` |
| `GET /trainer/members/:id` | Member detail. | Canonical `ApiResponse` |
| `GET /trainer/members/:id/notes` | Member notes. | Canonical `ApiResponse` |
| `GET /trainer/members/:id/attendance` | Member attendance. | Canonical `ApiResponse` |
| `GET /trainer/members/:id/diet` | Diet lookup. | Canonical `ApiResponse` |
| `GET /trainer/members/:id/workout` | Workout lookup. | Canonical `ApiResponse` |
| `GET /trainer/members/:id/progress` | Progress history. | Canonical `ApiResponse` |
| `PATCH /trainer/members/:id` | Update member. | Canonical `ApiResponse` |
| `POST /trainer/members/:id/notes` | Create member note. | Canonical `ApiResponse` |

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
1. Request enters `/api/v1/members` with JWT and `x-tenant-id`.
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
| `members` mutations | TRAINER | Feature resource must resolve in current tenant |

## Edge Cases / AI Warnings
- Member updates require Idempotency-Key and audit logging — Rules 31 and 30.
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
| `controllers/members-command.controller.ts` | Owns the HTTP boundary for the members command side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `controllers/members-query.controller.ts` | Owns the HTTP boundary for the members query side. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/members-create-member-note.dto.ts` | Validates members request shape at the edge and contains no business logic. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/members-export-query.dto.ts` | Validates member export format at the HTTP query boundary. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/members-query.dto.ts` | Validates members request shape at the edge and contains no business logic. | Contain only its documented responsibility; no sibling-feature business logic. |
| `dtos/members-update-member.dto.ts` | Validates fields the Trainer UI may submit when updating a member. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-enums.ts` | Defines finite members domain enum values for DTOs and TypeORM persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-member-note.domain.ts` | Defines a trainer member note response independently from TypeORM. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-member-note.entity.ts` | Maps trainer-authored member notes to the tenant database. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-member-note.mapper.ts` | Maps member-note persistence into the frontend note contract. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-member.domain.ts` | Defines the members business object independently from TypeORM persistence. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-member.entity.ts` | Maps trainer-visible member profiles and assignment references. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members-member.mapper.ts` | Maps member ORM state into the explicit Trainer member domain contract. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members.interfaces.ts` | Defines application-level member inputs and response-supporting types without ORM coupling. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members.module.ts` | Registers the isolated members feature slice and its controller/service/repository graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members.seeder.ts` | Defines the deterministic, idempotent seed entry point for the members feature. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members_collection.json` | Module API collection for manual contract verification. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members_dependencies.md` | Declared business, infrastructure, and runtime dependency graph. | Contain only its documented responsibility; no sibling-feature business logic. |
| `members_forbidden.md` | Module-specific forbidden patterns and architectural guardrails. | Contain only its documented responsibility; no sibling-feature business logic. |
| `repositories/members-repository.ts` | Owns Trainer member persistence and trainer-scoped read queries. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/members-export.service.ts` | Produces a bounded CSV export for trainer-owned members. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/members-note.service.ts` | Adds a trainer-authored note and returns the updated member-detail contract expected by the frontend. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/members-query.service.ts` | Builds Trainer member list, detail, and related read contracts. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/members-update.service.spec.ts` | Proves member update success and fail-fast not-found behavior. | Contain only its documented responsibility; no sibling-feature business logic. |
| `services/members-update.service.ts` | Updates one trainer-owned member record with an application input shape and audit trail. | Contain only its documented responsibility; no sibling-feature business logic. |


## Frozen Frontend Traceability — Static Audit

`MEM-001..MEM-012 | GET /trainer/members | GET /trainer/members/:id | PATCH /trainer/members/:id | POST /trainer/members/:id/notes | related member attendance/progress/diet/workout lookups`

The above is the frozen frontend-derived contract used for this repair. A `[ ]` rule item means the rule is not currently proven compliant; it is not silently treated as PASS. Runtime behavior remains NOT VERIFIED because this repair intentionally does not require a live environment.

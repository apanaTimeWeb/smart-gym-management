# Pt Backend Feature Map

## Module Purpose
Manager pt owns the backend-facing capabilities required by the supplied Manager frontend feature map. The feature is an AI repair boundary: controllers remain thin, use cases remain single-purpose, repositories own TypeORM persistence, and mutations flow through the feature orchestrator when a transaction is required. The feature must not import sibling business modules or move domain logic into the Manager role container.

## Directory Structure
| File | Responsibility |
|---|---|
| pt-query.controller.ts | Read-only HTTP endpoints for this feature. |
| pt-command.controller.ts | Write HTTP endpoints for this feature. |
| services/ | One micro-use-case per frontend capability plus the transaction orchestrator. |
| repositories/pt-repository.ts | Named TypeORM query/mutation methods only. |
| mappers/pt-mapper.ts | ORM entity/domain translation. |
| dtos/ | Feature-local request/query/response contracts. |
| pt.entity.ts | TypeORM tenant table `manager_pts`. |

## Feature Inventory
| Function | HTTP | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchPtDashboardKpis` | `GET` | `/api/v1/manager/pt/kpis` | `—` | `PtDashboardKpis` |
| `fetchWorkload` | `GET` | `/api/v1/manager/pt/workload` | `—` | `PtTrainerWorkload[]` |
| `fetchPackages` | `GET` | `/api/v1/manager/pt/packages` | `—` | `PtPackage[]` |
| `fetchAssignments` | `GET` | `/api/v1/manager/pt/assignments` | `{ page?, limit?, search?, trainerId?, status? }` | `PtAssignmentsResponse` |
| `createAssignment` | `POST` | `/api/v1/manager/pt/assignments` | `CreatePtAssignmentPayload` | `PtAssignment` |
| `markSessionComplete` | `PATCH` | `/api/v1/manager/pt/assignments/:assignmentId/complete-session` | `{ assignmentId: string }` | `PtAssignment` |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: CoreConfigService, AsyncLocalStorage request context, master tenant authorization, tenant DataSource, Redis idempotency, TypeORM repository layer, global response/error infrastructure.
- **Runtime/Event Dependencies**: MANAGER.RECORD.CREATED, MANAGER.RECORD.UPDATED, MANAGER.RECORD.DELETED where a mutation is implemented.

## Data and State Architecture
- **DB Entity**: `PtEntity` -> `manager_pts` in the trusted tenant database.
- **Redis Caching Keys**: none feature-owned; idempotency uses route-scoped keys `idempotency:<method> <route>:<key>` with 24h result TTL and 30s in-progress lock.
- **Event Emitters**: Manager record lifecycle events are emitted after successful orchestrated mutations.
- **Background Jobs**: none owned by this feature in the supplied frontend contract.
- **Idempotency Keys**: all non-GET mutation endpoints expose and enforce `Idempotency-Key` in the Manager API boundary.

## Permissions and Security
| Endpoint | Required Role | Resource-Level Notes |
|---|---|---|
| `GET /api/v1/manager/pt/kpis` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/pt/workload` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/pt/packages` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/pt/assignments` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/pt/assignments` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/pt/assignments/:assignmentId/complete-session` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |

## Database Constraints
- `PK_manager_pts`
- `IDX_manager_pts_created_at`
- `IDX_manager_pts_updated_at`
- `IDX_manager_pts_status`
- `CHK_manager_pts_payload_object`
- `UQ_...` / `FK_...`: no feature-specific unique/FK contract was directly evidenced by the supplied frontend contract and therefore is not invented here.

## Frozen API Contract
### Request Shape
| Endpoint | Method | Fields |
|---|---|---|
| `/api/v1/manager/pt/kpis` | `GET` | `—` |
| `/api/v1/manager/pt/workload` | `GET` | `—` |
| `/api/v1/manager/pt/packages` | `GET` | `—` |
| `/api/v1/manager/pt/assignments` | `GET` | `{ page?, limit?, search?, trainerId?, status? }` |
| `/api/v1/manager/pt/assignments` | `POST` | `CreatePtAssignmentPayload` |
| `/api/v1/manager/pt/assignments/:assignmentId/complete-session` | `PATCH` | `{ assignmentId: string }` |

### Response Shape
| Endpoint | Response | UI usage |
|---|---|---|
| `/api/v1/manager/pt/kpis` | `PtDashboardKpis` | data.totalActiveAssignments (totalActiveAssignments); data.sessionsScheduledToday (sessionsScheduledToday); data.packagesExpiringSoon (packagesExpiringSoon); data.monthlyPtRevenue (monthlyPtRevenue) |
| `/api/v1/manager/pt/workload` | `PtTrainerWorkload[]` | data[].trainerName (trainerName); data[].activeClients (activeClients) |
| `/api/v1/manager/pt/packages` | `PtPackage[]` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/pt/assignments` | `PtAssignmentsResponse` | data.assignments[].memberName (memberName); data.assignments[].trainerName (trainerName); data.assignments[].packageName (packageName); data.assignments[].sessionsRemaining (sessionsRemaining); data.assignments[].paymentStatus (paymentStatus); data.assignments[].amountPaid (amountPaid) |
| `/api/v1/manager/pt/assignments` | `PtAssignment` | data.assignments[].memberName (memberName); data.assignments[].trainerName (trainerName); data.assignments[].packageName (packageName); data.assignments[].sessionsRemaining (sessionsRemaining); data.assignments[].paymentStatus (paymentStatus); data.assignments[].amountPaid (amountPaid) |
| `/api/v1/manager/pt/assignments/:assignmentId/complete-session` | `PtAssignment` | No UI-derived field rows; response type remains the frontend contract source. |

## UI-Required Fields
- `/api/v1/manager/pt/kpis` -> `data.totalActiveAssignments` -> `totalActiveAssignments`
- `/api/v1/manager/pt/kpis` -> `data.sessionsScheduledToday` -> `sessionsScheduledToday`
- `/api/v1/manager/pt/kpis` -> `data.packagesExpiringSoon` -> `packagesExpiringSoon`
- `/api/v1/manager/pt/kpis` -> `data.monthlyPtRevenue` -> `monthlyPtRevenue`
- `/api/v1/manager/pt/workload` -> `data[].trainerName` -> `trainerName`
- `/api/v1/manager/pt/workload` -> `data[].activeClients` -> `activeClients`
- `/api/v1/manager/pt/assignments` -> `data.assignments[].memberName` -> `memberName`
- `/api/v1/manager/pt/assignments` -> `data.assignments[].trainerName` -> `trainerName`
- `/api/v1/manager/pt/assignments` -> `data.assignments[].packageName` -> `packageName`
- `/api/v1/manager/pt/assignments` -> `data.assignments[].sessionsRemaining` -> `sessionsRemaining`
- `/api/v1/manager/pt/assignments` -> `data.assignments[].paymentStatus` -> `paymentStatus`
- `/api/v1/manager/pt/assignments` -> `data.assignments[].amountPaid` -> `amountPaid`

## Search / Filter / Sort / Pagination
- All paginated endpoints extend the shared `PaginationQueryDto`.
- User-selectable sort fields are allowlisted before repository order-by use.
- Page numbers are 1-indexed and `PaginationMeta` is generated by `buildPaginationMeta()`.

## Edge Cases / AI Warnings
- Rule 0C/49: sibling business imports are forbidden; cross-feature behavior must use declared events.
- Rule 31: protected mutations require route-scoped `Idempotency-Key` replay to prevent duplicate execution on retries.
- Rule 39: tenant selection must use master-DB authorization; client-supplied tenant IDs are never trusted for database selection.
- Rule 82A: response payloads must preserve every frontend-consumed field documented in this file.
- Rule 92: user-controlled sort/filter keys must be checked against an allowlist before ORM query construction.
- Rule 95: finite status values use a TypeScript enum and PostgreSQL enum column.
- Rule 100/102: database constraints are explicit and feature tables use the `manager_<plural_feature>` prefix.

## Rule Compliance Checklist
- [x] Manager feature remains isolated under `modules/backend_manager/<feature>/`; no sibling business imports were introduced.
- [x] Commands and queries remain separated into dedicated controllers.
- [x] DTO validation remains at the HTTP edge with global whitelist/forbid-non-whitelisted enforcement.
- [x] Mutation endpoints in this feature require the canonical `CoreRequireIdempotencyKey` decorator.
- [x] Repository owns ORM persistence and maps ORM entities through the feature mapper.
- [x] Paginated reads use the canonical `PaginationMeta` utility and bounded page/limit values.
- [x] User-controlled sort/filter values are constrained before query construction.
- [x] Soft-deleted rows are excluded from feature queries.
- [ ] Runtime/build/black-box E2E proof is intentionally not claimed in this package; see the consolidated V1 repair report.
- [ ] Database normalization beyond the current typed JSONB storage remains a planned follow-up; no fabricated relational provenance is claimed.

## V2 Release Compliance

This feature remains an isolated Manager feature boundary. Its controllers, DTOs, use-case services, repositories, mappers, tests, collection and documentation are co-located so an AI repair can remain within this feature unless a documented infrastructure dependency is genuinely required.

### Frozen API Contract
The canonical endpoint surface is `/api/v1/manager/pt` plus the exact paths implemented by the feature command/query controllers. Request DTOs are strict and unknown properties are rejected globally. Success/error responses are wrapped by the global canonical `ApiResponse<T>` contract.

### Permissions and Tenant
Every endpoint is restricted to `MANAGER` at controller level and executes only after JWT authentication and master-database tenant authorization. Feature repositories resolve the tenant DataSource from the trusted request context; client-provided tenant IDs are never used directly as database names.

### Required Invariants
- Soft delete only; no physical production deletes (Rule 29).
- Named repository methods own TypeORM persistence (Rule 99).
- Paginated queries use the canonical pagination utility and allowlisted ordering/filter inputs (Rules 92 and 94).
- Co-located Jest tests and domain-mirrored pytest black-box tests are required (Rule 11/27).
- This file must change in the same commit as feature code (Rule 19).


## Current Repair Verification
- Mutation endpoints: `CoreRequireIdempotencyKey` is enforced at the Manager command-controller boundary.
- Response envelopes: global interceptor/filter remain the canonical response/error boundary.
- Historical compliance checkboxes in this file are not treated as implementation proof.
- Repository-wide runtime/CI verification remains dependent on the full project root configuration and live environment.

## Business Flow / Key Sequences
1. Query/read requests enter the feature query controller and pass through the feature DTO validation boundary.
2. Command/write requests enter the feature command controller, enforce centralized RBAC and idempotency at the HTTP boundary, and delegate to the owning service/orchestrator.
3. Services operate on ORM-free domain payloads; repositories own TypeORM persistence, locking, soft-delete filtering, and tenant DataSource access.
4. The response interceptor supplies the canonical ApiResponse envelope; errors remain outside `data` and use machine-readable error codes.

## File Responsibility Map
- `pt-create-assignment.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-create-assignment.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-assignments.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-assignments.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-packages.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-packages.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-pt-dashboard-kpis.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-pt-dashboard-kpis.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-workload.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-workload.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-mark-session-complete.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-mark-session-complete.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-orchestrator.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-repository.ts` — Owns the `repositories` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-mapper.ts` — Owns the `mappers` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-create-assignment.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-create-assignment.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-assignments.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-packages.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-pt-dashboard-kpis.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-fetch-workload.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-mark-session-complete.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-mark-session-complete.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `pt-query.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.

## V1 AUTHORITATIVE IMPLEMENTATION MAP

- **Owning table:** `manager_pts`.
- **Controller boundary:** the feature keeps read operations in the query controller and mutations in the command controller.
- **Persistence boundary:** the feature repository is the only layer allowed to call TypeORM persistence APIs; services consume mapped domain data.
- **Security boundary:** Manager routes require centralized JWT + tenant + role guards; resource identifiers must be checked inside the trusted tenant scope.
- **Mutation boundary:** every POST/PATCH/PUT/DELETE route has an explicit `CoreRequireIdempotencyKey` decorator in the command controller.
- **Response boundary:** controller results are wrapped by the global `CoreResponseInterceptor`; paginated results use canonical `PaginationMeta`.
- **Important limitation:** current Manager archive still uses a typed JSONB payload for many business objects; this is intentionally documented as a remaining schema-normalization item rather than silently pretending relational provenance exists.

### Exact Frontend Operation Surface

| Method | Endpoint | Backend owner |
|---|---|---|
| `GET` | `/api/v1/manager/pt/kpis` | `pt` command/query controller |
| `GET` | `/api/v1/manager/pt/workload` | `pt` command/query controller |
| `GET` | `/api/v1/manager/pt/packages` | `pt` command/query controller |
| `GET` | `/api/v1/manager/pt/assignments` | `pt` command/query controller |
| `POST` | `/api/v1/manager/pt/assignments` | `pt` command/query controller |
| `PATCH` | `/api/v1/manager/pt/assignments/:assignmentId/complete-session` | `pt` command/query controller |

### V1 Repair Notes

- All changes in this V1 remain inside the Manager backend boundary except documented core infrastructure files required by the architecture.
- Runtime execution was intentionally not performed; static evidence is explicitly labeled as such.
- The frontend frozen API contract is preserved; no request field was made mandatory solely to satisfy a backend-only architecture preference.

### Documentation Authority

This section is authoritative for the V1 package when older checklist text in this file conflicts with the actual source tree. Historical checkbox text is not treated as proof of implementation.

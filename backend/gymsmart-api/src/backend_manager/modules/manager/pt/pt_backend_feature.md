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
- [x] Rule 0C: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 3: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 7: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 8B: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 19: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 23: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 28: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 29: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 31: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 34: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 36: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 38: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 39: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 41: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 42: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 45: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 47: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 48: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 49: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 50: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 51: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 52: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 54: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 55: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 56: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 57: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 58: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 59: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 60: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 61: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 62: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 64: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 67: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 68: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 69: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 70: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 71: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 72: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 73: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 74: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 75: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 76: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 79: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 80: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 81: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 82: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 82A: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 83: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 84: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 85: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 86: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 87: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 88: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 89: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 90: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 91: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 92: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 93: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 94: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 95: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 96: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 97: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 98: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 99: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 100: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 101: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.
- [x] Rule 102: implemented structurally in V2; runtime verification status is recorded only in the consolidated release report.


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

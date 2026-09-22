# Library Backend Feature Map

## Module Purpose
Manager library owns the backend-facing capabilities required by the supplied Manager frontend feature map. The feature is an AI repair boundary: controllers remain thin, use cases remain single-purpose, repositories own TypeORM persistence, and mutations flow through the feature orchestrator when a transaction is required. The feature must not import sibling business modules or move domain logic into the Manager role container.

## Directory Structure
| File | Responsibility |
|---|---|
| library-query.controller.ts | Read-only HTTP endpoints for this feature. |
| library-command.controller.ts | Write HTTP endpoints for this feature. |
| services/ | One micro-use-case per frontend capability plus the transaction orchestrator. |
| repositories/library-repository.ts | Named TypeORM query/mutation methods only. |
| mappers/library-mapper.ts | ORM entity/domain translation. |
| dtos/ | Feature-local request/query/response contracts. |
| library.entity.ts | TypeORM tenant table `manager_libraries`. |

## Feature Inventory
| Function | HTTP | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchExercises` | `GET` | `/api/v1/manager/library/exercises` | `{ page?, limit?, search?, category?, difficulty? }` | `{ exercises: Exercise[]; total: number }` |
| `createExercise` | `POST` | `/api/v1/manager/library/exercises` | `Partial<Exercise>` | `Exercise` |
| `updateExercise` | `PATCH` | `/api/v1/manager/library/exercises/:id` | `{ id: string; body: Partial<Exercise> }` | `Exercise` |
| `deleteExercise` | `DELETE` | `/api/v1/manager/library/exercises/:id` | `{ id: string }` | `{ id: string }` |
| `fetchDietPlans` | `GET` | `/api/v1/manager/library/diet-plans` | `{ page?, limit?, search?, goal? }` | `{ dietPlans: DietPlan[]; total: number }` |
| `createDietPlan` | `POST` | `/api/v1/manager/library/diet-plans` | `Partial<DietPlan>` | `DietPlan` |
| `updateDietPlan` | `PATCH` | `/api/v1/manager/library/diet-plans/:id` | `{ id: string; body: Partial<DietPlan> }` | `DietPlan` |
| `deleteDietPlan` | `DELETE` | `/api/v1/manager/library/diet-plans/:id` | `{ id: string }` | `{ id: string }` |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: CoreConfigService, AsyncLocalStorage request context, master tenant authorization, tenant DataSource, Redis idempotency, TypeORM repository layer, global response/error infrastructure.
- **Runtime/Event Dependencies**: MANAGER.RECORD.CREATED, MANAGER.RECORD.UPDATED, MANAGER.RECORD.DELETED where a mutation is implemented.

## Data and State Architecture
- **DB Entity**: `LibraryEntity` -> `manager_libraries` in the trusted tenant database.
- **Redis Caching Keys**: none feature-owned; idempotency uses route-scoped keys `idempotency:<method> <route>:<key>` with 24h result TTL and 30s in-progress lock.
- **Event Emitters**: Manager record lifecycle events are emitted after successful orchestrated mutations.
- **Background Jobs**: none owned by this feature in the supplied frontend contract.
- **Idempotency Keys**: all non-GET mutation endpoints expose and enforce `Idempotency-Key` in the Manager API boundary.

## Permissions and Security
| Endpoint | Required Role | Resource-Level Notes |
|---|---|---|
| `GET /api/v1/manager/library/exercises` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/library/exercises` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/library/exercises/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `DELETE /api/v1/manager/library/exercises/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/library/diet-plans` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/library/diet-plans` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/library/diet-plans/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `DELETE /api/v1/manager/library/diet-plans/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |

## Database Constraints
- `PK_manager_libraries`
- `IDX_manager_libraries_created_at`
- `IDX_manager_libraries_updated_at`
- `IDX_manager_libraries_status`
- `CHK_manager_libraries_payload_object`
- `UQ_...` / `FK_...`: no feature-specific unique/FK contract was directly evidenced by the supplied frontend contract and therefore is not invented here.

## Frozen API Contract
### Request Shape
| Endpoint | Method | Fields |
|---|---|---|
| `/api/v1/manager/library/exercises` | `GET` | `{ page?, limit?, search?, category?, difficulty? }` |
| `/api/v1/manager/library/exercises` | `POST` | `Partial<Exercise>` |
| `/api/v1/manager/library/exercises/:id` | `PATCH` | `{ id: string; body: Partial<Exercise> }` |
| `/api/v1/manager/library/exercises/:id` | `DELETE` | `{ id: string }` |
| `/api/v1/manager/library/diet-plans` | `GET` | `{ page?, limit?, search?, goal? }` |
| `/api/v1/manager/library/diet-plans` | `POST` | `Partial<DietPlan>` |
| `/api/v1/manager/library/diet-plans/:id` | `PATCH` | `{ id: string; body: Partial<DietPlan> }` |
| `/api/v1/manager/library/diet-plans/:id` | `DELETE` | `{ id: string }` |

### Response Shape
| Endpoint | Response | UI usage |
|---|---|---|
| `/api/v1/manager/library/exercises` | `{ exercises: Exercise[]; total: number }` | data.exercises[].name (name); data.exercises[].category (category); data.exercises[].muscleGroup (muscleGroup); data.exercises[].difficulty (difficulty); data.exercises[].isActive (isActive) |
| `/api/v1/manager/library/exercises` | `Exercise` | data.exercises[].name (name); data.exercises[].category (category); data.exercises[].muscleGroup (muscleGroup); data.exercises[].difficulty (difficulty); data.exercises[].isActive (isActive) |
| `/api/v1/manager/library/exercises/:id` | `Exercise` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/library/exercises/:id` | `{ id: string }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/library/diet-plans` | `{ dietPlans: DietPlan[]; total: number }` | data.dietPlans[].name (name); data.dietPlans[].goal (goal); data.dietPlans[].calories (calories); data.dietPlans[].protein (protein); data.dietPlans[].carbs (carbs); data.dietPlans[].fats (fats); data.dietPlans[].isActive (isActive); data.dietPlans[].meals[] (meals[]) |
| `/api/v1/manager/library/diet-plans` | `DietPlan` | data.dietPlans[].name (name); data.dietPlans[].goal (goal); data.dietPlans[].calories (calories); data.dietPlans[].protein (protein); data.dietPlans[].carbs (carbs); data.dietPlans[].fats (fats); data.dietPlans[].isActive (isActive); data.dietPlans[].meals[] (meals[]) |
| `/api/v1/manager/library/diet-plans/:id` | `DietPlan` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/library/diet-plans/:id` | `{ id: string }` | No UI-derived field rows; response type remains the frontend contract source. |

## UI-Required Fields
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].name` -> `name`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].goal` -> `goal`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].calories` -> `calories`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].protein` -> `protein`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].carbs` -> `carbs`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].fats` -> `fats`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].isActive` -> `isActive`
- `/api/v1/manager/library/diet-plans` -> `data.dietPlans[].meals[]` -> `meals[]`
- `/api/v1/manager/library/exercises` -> `data.exercises[].name` -> `name`
- `/api/v1/manager/library/exercises` -> `data.exercises[].category` -> `category`
- `/api/v1/manager/library/exercises` -> `data.exercises[].muscleGroup` -> `muscleGroup`
- `/api/v1/manager/library/exercises` -> `data.exercises[].difficulty` -> `difficulty`
- `/api/v1/manager/library/exercises` -> `data.exercises[].isActive` -> `isActive`

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
The canonical endpoint surface is `/api/v1/manager/library` plus the exact paths implemented by the feature command/query controllers. Request DTOs are strict and unknown properties are rejected globally. Success/error responses are wrapped by the global canonical `ApiResponse<T>` contract.

### Permissions and Tenant
Every endpoint is restricted to `MANAGER` at controller level and executes only after JWT authentication and master-database tenant authorization. Feature repositories resolve the tenant DataSource from the trusted request context; client-provided tenant IDs are never used directly as database names.

### Required Invariants
- Soft delete only; no physical production deletes (Rule 29).
- Named repository methods own TypeORM persistence (Rule 99).
- Paginated queries use the canonical pagination utility and allowlisted ordering/filter inputs (Rules 92 and 94).
- Co-located Jest tests and domain-mirrored pytest black-box tests are required (Rule 11/27).
- This file must change in the same commit as feature code (Rule 19).

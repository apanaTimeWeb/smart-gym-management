# Members Backend Feature Map

## Module Purpose
Manager members owns the backend-facing capabilities required by the supplied Manager frontend feature map. The feature is an AI repair boundary: controllers remain thin, use cases remain single-purpose, repositories own TypeORM persistence, and mutations flow through the feature orchestrator when a transaction is required. The feature must not import sibling business modules or move domain logic into the Manager role container.

## Directory Structure
| File | Responsibility |
|---|---|
| members-query.controller.ts | Read-only HTTP endpoints for this feature. |
| members-command.controller.ts | Write HTTP endpoints for this feature. |
| services/ | One micro-use-case per frontend capability plus the transaction orchestrator. |
| repositories/members-repository.ts | Named TypeORM query/mutation methods only. |
| mappers/members-mapper.ts | ORM entity/domain translation. |
| dtos/ | Feature-local request/query/response contracts. |
| members.entity.ts | TypeORM tenant table `manager_members`. |

## Feature Inventory
| Function | HTTP | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchMembers` | `GET` | `/api/v1/manager/members` | `{ page?, limit?, search?, status?, gender?, plan?, expiryFrom?, expiryTo?, sort?, dir? }` | `{ members: Member[]; total: number; page: number; limit: number }` |
| `fetchMemberById` | `GET` | `/api/v1/manager/members/:id` | `{ id: string }` | `Member` |
| `fetchMemberStats` | `GET` | `/api/v1/manager/members/stats` | `—` | `MemberStats` |
| `createMember` | `POST` | `/api/v1/manager/members` | `Partial<Member>` | `Member` |
| `updateMember` | `PATCH` | `/api/v1/manager/members/:id` | `{ id: string; body: Partial<Member> }` | `Member` |
| `deleteMember` | `DELETE` | `/api/v1/manager/members/:id` | `{ id: string }` | `{ id: string }` |
| `renewMember` | `POST` | `/api/v1/manager/members/:id/renew` | `Record<string, unknown>` | `Member` |
| `exportMembersReport` | `GET` | `/api/v1/manager/members/export` | `{ page?, limit?, filters..., format? }` | `{ members: Member[]; total: number }` |
| `fetchMemberTrainers` | `GET` | `/api/v1/manager/members/trainers` | `—` | `{ staff: { id; name; role }[] }` |
| `fetchMemberPlans` | `GET` | `/api/v1/manager/members/plans` | `—` | `PlanSnapshot[]` |
| `fetchMemberPayments` | `GET` | `/api/v1/manager/members/:memberId/payments` | `{ memberId: string }` | `PaymentSnapshot[]` |
| `addMemberPayment` | `POST` | `/api/v1/manager/members/:memberId/payments` | `Record<string, unknown>` | `PaymentSnapshot` |
| `fetchMemberAttendance` | `GET` | `/api/v1/manager/members/:memberId/attendance` | `{ memberId: string }` | `AttendanceSnapshot[]` |
| `fetchMemberDietPlans` | `GET` | `/api/v1/manager/members/diet-plans` | `—` | `DietPlanSnapshot[]` |
| `assignDietPlan` | `POST` | `/api/v1/manager/members/:memberId/diet-plans` | `{ memberId; dietPlanId }` | `{ success: boolean }` |
| `fetchMemberWorkouts` | `GET` | `/api/v1/manager/members/workouts` | `—` | `WorkoutSnapshot[]` |
| `assignWorkout` | `POST` | `/api/v1/manager/members/:memberId/workouts` | `{ memberId; workoutId }` | `{ success: boolean }` |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: CoreConfigService, AsyncLocalStorage request context, master tenant authorization, tenant DataSource, Redis idempotency, TypeORM repository layer, global response/error infrastructure.
- **Runtime/Event Dependencies**: MANAGER.RECORD.CREATED, MANAGER.RECORD.UPDATED, MANAGER.RECORD.DELETED where a mutation is implemented.

## Data and State Architecture
- **DB Entity**: `MembersEntity` -> `manager_members` in the trusted tenant database.
- **Redis Caching Keys**: none feature-owned; idempotency uses route-scoped keys `idempotency:<method> <route>:<key>` with 24h result TTL and 30s in-progress lock.
- **Event Emitters**: Manager record lifecycle events are emitted after successful orchestrated mutations.
- **Background Jobs**: none owned by this feature in the supplied frontend contract.
- **Idempotency Keys**: all non-GET mutation endpoints expose and enforce `Idempotency-Key` in the Manager API boundary.

## Permissions and Security
| Endpoint | Required Role | Resource-Level Notes |
|---|---|---|
| `GET /api/v1/manager/members` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/stats` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/members` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/members/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `DELETE /api/v1/manager/members/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/members/:id/renew` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/export` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/trainers` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/plans` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/:memberId/payments` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/members/:memberId/payments` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/:memberId/attendance` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/diet-plans` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/members/:memberId/diet-plans` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/members/workouts` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/members/:memberId/workouts` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |

## Database Constraints
- `PK_manager_members`
- `IDX_manager_members_created_at`
- `IDX_manager_members_updated_at`
- `IDX_manager_members_status`
- `CHK_manager_members_payload_object`
- `UQ_...` / `FK_...`: no feature-specific unique/FK contract was directly evidenced by the supplied frontend contract and therefore is not invented here.

## Frozen API Contract
### Request Shape
| Endpoint | Method | Fields |
|---|---|---|
| `/api/v1/manager/members` | `GET` | `{ page?, limit?, search?, status?, gender?, plan?, expiryFrom?, expiryTo?, sort?, dir? }` |
| `/api/v1/manager/members/:id` | `GET` | `{ id: string }` |
| `/api/v1/manager/members/stats` | `GET` | `—` |
| `/api/v1/manager/members` | `POST` | `Partial<Member>` |
| `/api/v1/manager/members/:id` | `PATCH` | `{ id: string; body: Partial<Member> }` |
| `/api/v1/manager/members/:id` | `DELETE` | `{ id: string }` |
| `/api/v1/manager/members/:id/renew` | `POST` | `Record<string, unknown>` |
| `/api/v1/manager/members/export` | `GET` | `{ page?, limit?, filters..., format? }` |
| `/api/v1/manager/members/trainers` | `GET` | `—` |
| `/api/v1/manager/members/plans` | `GET` | `—` |
| `/api/v1/manager/members/:memberId/payments` | `GET` | `{ memberId: string }` |
| `/api/v1/manager/members/:memberId/payments` | `POST` | `Record<string, unknown>` |
| `/api/v1/manager/members/:memberId/attendance` | `GET` | `{ memberId: string }` |
| `/api/v1/manager/members/diet-plans` | `GET` | `—` |
| `/api/v1/manager/members/:memberId/diet-plans` | `POST` | `{ memberId; dietPlanId }` |
| `/api/v1/manager/members/workouts` | `GET` | `—` |
| `/api/v1/manager/members/:memberId/workouts` | `POST` | `{ memberId; workoutId }` |

### Response Shape
| Endpoint | Response | UI usage |
|---|---|---|
| `/api/v1/manager/members` | `{ members: Member[]; total: number; page: number; limit: number }` | data.members[].name (name); data.members[].email (email); data.members[].phone (phone); data.members[].gender (gender); data.members[].joinDate (joinDate); data.members[].expiryDate (expiryDate); data.members[].plan.name (plan.name); data.members[].paidAmount (paidAmount); data.members[].pendingAmount (pendingAmount); data.members[].status (status) |
| `/api/v1/manager/members/:id` | `Member` | data.recentPayments[].amount (recentPayments[].amount); data.dietPlan.name (dietPlan.name); data.workoutPlan.name (workoutPlan.name) |
| `/api/v1/manager/members/stats` | `MemberStats` | data.total (total); data.active (active); data.expired (expired) |
| `/api/v1/manager/members` | `Member` | data.members[].name (name); data.members[].email (email); data.members[].phone (phone); data.members[].gender (gender); data.members[].joinDate (joinDate); data.members[].expiryDate (expiryDate); data.members[].plan.name (plan.name); data.members[].paidAmount (paidAmount); data.members[].pendingAmount (pendingAmount); data.members[].status (status) |
| `/api/v1/manager/members/:id` | `Member` | data.recentPayments[].amount (recentPayments[].amount); data.dietPlan.name (dietPlan.name); data.workoutPlan.name (workoutPlan.name) |
| `/api/v1/manager/members/:id` | `{ id: string }` | data.recentPayments[].amount (recentPayments[].amount); data.dietPlan.name (dietPlan.name); data.workoutPlan.name (workoutPlan.name) |
| `/api/v1/manager/members/:id/renew` | `Member` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/export` | `{ members: Member[]; total: number }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/trainers` | `{ staff: { id; name; role }[] }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/plans` | `PlanSnapshot[]` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/:memberId/payments` | `PaymentSnapshot[]` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/:memberId/payments` | `PaymentSnapshot` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/:memberId/attendance` | `AttendanceSnapshot[]` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/diet-plans` | `DietPlanSnapshot[]` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/:memberId/diet-plans` | `{ success: boolean }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/workouts` | `WorkoutSnapshot[]` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/members/:memberId/workouts` | `{ success: boolean }` | No UI-derived field rows; response type remains the frontend contract source. |

## UI-Required Fields
- `/api/v1/manager/members/stats` -> `data.total` -> `total`
- `/api/v1/manager/members/stats` -> `data.active` -> `active`
- `/api/v1/manager/members/stats` -> `data.expired` -> `expired`
- `/api/v1/manager/members` -> `data.members[].name` -> `name`
- `/api/v1/manager/members` -> `data.members[].email` -> `email`
- `/api/v1/manager/members` -> `data.members[].phone` -> `phone`
- `/api/v1/manager/members` -> `data.members[].gender` -> `gender`
- `/api/v1/manager/members` -> `data.members[].joinDate` -> `joinDate`
- `/api/v1/manager/members` -> `data.members[].expiryDate` -> `expiryDate`
- `/api/v1/manager/members` -> `data.members[].plan.name` -> `plan.name`
- `/api/v1/manager/members` -> `data.members[].paidAmount` -> `paidAmount`
- `/api/v1/manager/members` -> `data.members[].pendingAmount` -> `pendingAmount`
- `/api/v1/manager/members` -> `data.members[].status` -> `status`
- `/api/v1/manager/members/:id` -> `data.recentPayments[].amount` -> `recentPayments[].amount`
- `/api/v1/manager/members/:id` -> `data.dietPlan.name` -> `dietPlan.name`
- `/api/v1/manager/members/:id` -> `data.workoutPlan.name` -> `workoutPlan.name`

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
The canonical endpoint surface is `/api/v1/manager/members` plus the exact paths implemented by the feature command/query controllers. Request DTOs are strict and unknown properties are rejected globally. Success/error responses are wrapped by the global canonical `ApiResponse<T>` contract.

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
- `members-add-member-payment.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-add-member-payment.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-diet-plan.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-diet-plan.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-workout.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-workout.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-create-member.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-create-member.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-delete-member.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-delete-member.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-export-members-report.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-export-members-report.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-attendance.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-attendance.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-by-id.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-by-id.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-diet-plans.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-diet-plans.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-payments.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-payments.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-plans.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-plans.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-stats.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-stats.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-trainers.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-trainers.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-workouts.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-workouts.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-members.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-members.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-orchestrator.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-renew-member.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-renew-member.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-update-member.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-update-member.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-repository.ts` — Owns the `repositories` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-mapper.ts` — Owns the `mappers` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-add-member-payment.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-add-member-payment.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-diet-plan.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-diet-plan.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-workout.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-assign-workout.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-create-member.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-create-member.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-delete-member.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-export-members-report.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-attendance.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-by-id.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-diet-plans.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-payments.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-plans.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-stats.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-trainers.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-member-workouts.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-fetch-members.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-query.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-renew-member.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-renew-member.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-update-member.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `members-update-member.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.

## V1 AUTHORITATIVE IMPLEMENTATION MAP

- **Owning table:** `manager_members`.
- **Controller boundary:** the feature keeps read operations in the query controller and mutations in the command controller.
- **Persistence boundary:** the feature repository is the only layer allowed to call TypeORM persistence APIs; services consume mapped domain data.
- **Security boundary:** Manager routes require centralized JWT + tenant + role guards; resource identifiers must be checked inside the trusted tenant scope.
- **Mutation boundary:** every POST/PATCH/PUT/DELETE route has an explicit `CoreRequireIdempotencyKey` decorator in the command controller.
- **Response boundary:** controller results are wrapped by the global `CoreResponseInterceptor`; paginated results use canonical `PaginationMeta`.
- **Important limitation:** current Manager archive still uses a typed JSONB payload for many business objects; this is intentionally documented as a remaining schema-normalization item rather than silently pretending relational provenance exists.

### Exact Frontend Operation Surface

| Method | Endpoint | Backend owner |
|---|---|---|
| `GET` | `/api/v1/manager/members` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/:id` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/stats` | `members` command/query controller |
| `POST` | `/api/v1/manager/members` | `members` command/query controller |
| `PATCH` | `/api/v1/manager/members/:id` | `members` command/query controller |
| `DELETE` | `/api/v1/manager/members/:id` | `members` command/query controller |
| `POST` | `/api/v1/manager/members/:id/renew` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/export` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/trainers` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/plans` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/:memberId/payments` | `members` command/query controller |
| `POST` | `/api/v1/manager/members/:memberId/payments` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/:memberId/attendance` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/diet-plans` | `members` command/query controller |
| `POST` | `/api/v1/manager/members/:memberId/diet-plans` | `members` command/query controller |
| `GET` | `/api/v1/manager/members/workouts` | `members` command/query controller |
| `POST` | `/api/v1/manager/members/:memberId/workouts` | `members` command/query controller |

### V1 Repair Notes

- All changes in this V1 remain inside the Manager backend boundary except documented core infrastructure files required by the architecture.
- Runtime execution was intentionally not performed; static evidence is explicitly labeled as such.
- The frontend frozen API contract is preserved; no request field was made mandatory solely to satisfy a backend-only architecture preference.

### Documentation Authority

This section is authoritative for the V1 package when older checklist text in this file conflicts with the actual source tree. Historical checkbox text is not treated as proof of implementation.

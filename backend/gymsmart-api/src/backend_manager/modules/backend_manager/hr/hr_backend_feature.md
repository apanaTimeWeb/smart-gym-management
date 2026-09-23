# Hr Backend Feature Map

## Module Purpose
Manager hr owns the backend-facing capabilities required by the supplied Manager frontend feature map. The feature is an AI repair boundary: controllers remain thin, use cases remain single-purpose, repositories own TypeORM persistence, and mutations flow through the feature orchestrator when a transaction is required. The feature must not import sibling business modules or move domain logic into the Manager role container.

## Directory Structure
| File | Responsibility |
|---|---|
| hr-query.controller.ts | Read-only HTTP endpoints for this feature. |
| hr-command.controller.ts | Write HTTP endpoints for this feature. |
| services/ | One micro-use-case per frontend capability plus the transaction orchestrator. |
| repositories/hr-repository.ts | Named TypeORM query/mutation methods only. |
| mappers/hr-mapper.ts | ORM entity/domain translation. |
| dtos/ | Feature-local request/query/response contracts. |
| hr.entity.ts | TypeORM tenant table `manager_hrs`. |

## Feature Inventory
| Function | HTTP | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchStaff` | `GET` | `/api/v1/manager/hr/staff` | `{ search?, role?, page?, limit? }` | `{ staff: Staff[]; total: number }` |
| `fetchStaffById` | `GET` | `/api/v1/manager/hr/staff/:id` | `{ id: string }` | `Staff` |
| `createStaff` | `POST` | `/api/v1/manager/hr/staff` | `Partial<Staff>` | `Staff` |
| `updateStaff` | `PATCH` | `/api/v1/manager/hr/staff/:id` | `{ id: string; body: Partial<Staff> }` | `Staff` |
| `deleteStaff` | `DELETE` | `/api/v1/manager/hr/staff/:id` | `{ id: string }` | `{ id: string }` |
| `fetchPayrolls` | `GET` | `/api/v1/manager/hr/payrolls` | `{ month?, page?, limit? }` | `{ payrolls: Payroll[]; total: number }` |
| `generatePayrolls` | `POST` | `/api/v1/manager/hr/payrolls/generate` | `{ month: string }` | `{ payrolls: Payroll[] }` |
| `createPayroll` | `POST` | `/api/v1/manager/hr/payrolls` | `Partial<Payroll>` | `Payroll` |
| `updatePayroll` | `PATCH` | `/api/v1/manager/hr/payrolls/:id` | `{ id: string; body: Partial<Payroll> }` | `Payroll` |
| `updatePayrollStatus` | `PATCH` | `/api/v1/manager/hr/payrolls/:id/status` | `{ id: string; status: string }` | `Payroll` |
| `fetchHrSummary` | `GET` | `/api/v1/manager/hr/summary` | `—` | `HrSummary` |
| `fetchLedger` | `GET` | `/api/v1/manager/hr/ledger/:staffId` | `{ staffId: string }` | `{ ledger: LedgerEntry[]; total: number }` |
| `giveStaffAdvance` | `POST` | `/api/v1/manager/hr/ledger/advance` | `Record<string, unknown>` | `{ advanceAmount: number }` |
| `payStaffDue` | `POST` | `/api/v1/manager/hr/ledger/paydue` | `Record<string, unknown>` | `{ paidAmount: number }` |
| `fetchStaffAttendance` | `GET` | `/api/v1/manager/hr/staff/:staffId/attendance?month=YYYY-MM` | `{ staffId: string; month: string }` | `{ history: { date: string; status: string }[] }` |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: CoreConfigService, AsyncLocalStorage request context, master tenant authorization, tenant DataSource, Redis idempotency, TypeORM repository layer, global response/error infrastructure.
- **Runtime/Event Dependencies**: MANAGER.RECORD.CREATED, MANAGER.RECORD.UPDATED, MANAGER.RECORD.DELETED where a mutation is implemented.

## Data and State Architecture
- **DB Entity**: `HrEntity` -> `manager_hrs` in the trusted tenant database.
- **Redis Caching Keys**: none feature-owned; idempotency uses route-scoped keys `idempotency:<method> <route>:<key>` with 24h result TTL and 30s in-progress lock.
- **Event Emitters**: Manager record lifecycle events are emitted after successful orchestrated mutations.
- **Background Jobs**: none owned by this feature in the supplied frontend contract.
- **Idempotency Keys**: all non-GET mutation endpoints expose and enforce `Idempotency-Key` in the Manager API boundary.

## Permissions and Security
| Endpoint | Required Role | Resource-Level Notes |
|---|---|---|
| `GET /api/v1/manager/hr/staff` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/hr/staff/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/hr/staff` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/hr/staff/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `DELETE /api/v1/manager/hr/staff/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/hr/payrolls` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/hr/payrolls/generate` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/hr/payrolls` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/hr/payrolls/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/hr/payrolls/:id/status` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/hr/summary` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/hr/ledger/:staffId` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/hr/ledger/advance` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/hr/ledger/paydue` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/hr/staff/:staffId/attendance?month=YYYY-MM` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |

## Database Constraints
- `PK_manager_hrs`
- `IDX_manager_hrs_created_at`
- `IDX_manager_hrs_updated_at`
- `IDX_manager_hrs_status`
- `CHK_manager_hrs_payload_object`
- `UQ_...` / `FK_...`: no feature-specific unique/FK contract was directly evidenced by the supplied frontend contract and therefore is not invented here.

## Frozen API Contract
### Request Shape
| Endpoint | Method | Fields |
|---|---|---|
| `/api/v1/manager/hr/staff` | `GET` | `{ search?, role?, page?, limit? }` |
| `/api/v1/manager/hr/staff/:id` | `GET` | `{ id: string }` |
| `/api/v1/manager/hr/staff` | `POST` | `Partial<Staff>` |
| `/api/v1/manager/hr/staff/:id` | `PATCH` | `{ id: string; body: Partial<Staff> }` |
| `/api/v1/manager/hr/staff/:id` | `DELETE` | `{ id: string }` |
| `/api/v1/manager/hr/payrolls` | `GET` | `{ month?, page?, limit? }` |
| `/api/v1/manager/hr/payrolls/generate` | `POST` | `{ month: string }` |
| `/api/v1/manager/hr/payrolls` | `POST` | `Partial<Payroll>` |
| `/api/v1/manager/hr/payrolls/:id` | `PATCH` | `{ id: string; body: Partial<Payroll> }` |
| `/api/v1/manager/hr/payrolls/:id/status` | `PATCH` | `{ id: string; status: string }` |
| `/api/v1/manager/hr/summary` | `GET` | `—` |
| `/api/v1/manager/hr/ledger/:staffId` | `GET` | `{ staffId: string }` |
| `/api/v1/manager/hr/ledger/advance` | `POST` | `Record<string, unknown>` |
| `/api/v1/manager/hr/ledger/paydue` | `POST` | `Record<string, unknown>` |
| `/api/v1/manager/hr/staff/:staffId/attendance?month=YYYY-MM` | `GET` | `{ staffId: string; month: string }` |

### Response Shape
| Endpoint | Response | UI usage |
|---|---|---|
| `/api/v1/manager/hr/staff` | `{ staff: Staff[]; total: number }` | data.staff[].name (name); data.staff[].email (email); data.staff[].role (role); data.staff[].phone (phone); data.staff[].salary (salary); data.staff[].advanceSalary (advanceSalary); data.staff[].joinDate (joinDate) |
| `/api/v1/manager/hr/staff/:id` | `Staff` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/staff` | `Staff` | data.staff[].name (name); data.staff[].email (email); data.staff[].role (role); data.staff[].phone (phone); data.staff[].salary (salary); data.staff[].advanceSalary (advanceSalary); data.staff[].joinDate (joinDate) |
| `/api/v1/manager/hr/staff/:id` | `Staff` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/staff/:id` | `{ id: string }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/payrolls` | `{ payrolls: Payroll[]; total: number }` | data.payrolls[].staff.name (staff.name); data.payrolls[].month (month); data.payrolls[].netPayable (netPayable); data.payrolls[].paidAmount (paidAmount); data.payrolls[].pendingAmount (pendingAmount); data.payrolls[].status (status) |
| `/api/v1/manager/hr/payrolls/generate` | `{ payrolls: Payroll[] }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/payrolls` | `Payroll` | data.payrolls[].staff.name (staff.name); data.payrolls[].month (month); data.payrolls[].netPayable (netPayable); data.payrolls[].paidAmount (paidAmount); data.payrolls[].pendingAmount (pendingAmount); data.payrolls[].status (status) |
| `/api/v1/manager/hr/payrolls/:id` | `Payroll` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/payrolls/:id/status` | `Payroll` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/summary` | `HrSummary` | data.totalSalaryThisMonth (totalSalaryThisMonth); data.totalSalaryPaid (totalSalaryPaid); data.totalSalaryDue (totalSalaryDue); data.totalAdvanceGiven (totalAdvanceGiven); data.activeStaff (activeStaff) |
| `/api/v1/manager/hr/ledger/:staffId` | `{ ledger: LedgerEntry[]; total: number }` | data.ledger[].date (date); data.ledger[].type (type); data.ledger[].credit (credit); data.ledger[].debit (debit); data.ledger[].balance (balance) |
| `/api/v1/manager/hr/ledger/advance` | `{ advanceAmount: number }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/ledger/paydue` | `{ paidAmount: number }` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/hr/staff/:staffId/attendance?month=YYYY-MM` | `{ history: { date: string; status: string }[] }` | No UI-derived field rows; response type remains the frontend contract source. |

## UI-Required Fields
- `/api/v1/manager/hr/summary` -> `data.totalSalaryThisMonth` -> `totalSalaryThisMonth`
- `/api/v1/manager/hr/summary` -> `data.totalSalaryPaid` -> `totalSalaryPaid`
- `/api/v1/manager/hr/summary` -> `data.totalSalaryDue` -> `totalSalaryDue`
- `/api/v1/manager/hr/summary` -> `data.totalAdvanceGiven` -> `totalAdvanceGiven`
- `/api/v1/manager/hr/summary` -> `data.activeStaff` -> `activeStaff`
- `/api/v1/manager/hr/staff` -> `data.staff[].name` -> `name`
- `/api/v1/manager/hr/staff` -> `data.staff[].email` -> `email`
- `/api/v1/manager/hr/staff` -> `data.staff[].role` -> `role`
- `/api/v1/manager/hr/staff` -> `data.staff[].phone` -> `phone`
- `/api/v1/manager/hr/staff` -> `data.staff[].salary` -> `salary`
- `/api/v1/manager/hr/staff` -> `data.staff[].advanceSalary` -> `advanceSalary`
- `/api/v1/manager/hr/staff` -> `data.staff[].joinDate` -> `joinDate`
- `/api/v1/manager/hr/payrolls` -> `data.payrolls[].staff.name` -> `staff.name`
- `/api/v1/manager/hr/payrolls` -> `data.payrolls[].month` -> `month`
- `/api/v1/manager/hr/payrolls` -> `data.payrolls[].netPayable` -> `netPayable`
- `/api/v1/manager/hr/payrolls` -> `data.payrolls[].paidAmount` -> `paidAmount`
- `/api/v1/manager/hr/payrolls` -> `data.payrolls[].pendingAmount` -> `pendingAmount`
- `/api/v1/manager/hr/payrolls` -> `data.payrolls[].status` -> `status`
- `/api/v1/manager/hr/ledger/:staffId` -> `data.ledger[].date` -> `date`
- `/api/v1/manager/hr/ledger/:staffId` -> `data.ledger[].type` -> `type`
- `/api/v1/manager/hr/ledger/:staffId` -> `data.ledger[].credit` -> `credit`
- `/api/v1/manager/hr/ledger/:staffId` -> `data.ledger[].debit` -> `debit`
- `/api/v1/manager/hr/ledger/:staffId` -> `data.ledger[].balance` -> `balance`

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
The canonical endpoint surface is `/api/v1/manager/hr` plus the exact paths implemented by the feature command/query controllers. Request DTOs are strict and unknown properties are rejected globally. Success/error responses are wrapped by the global canonical `ApiResponse<T>` contract.

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
- `hr-create-payroll.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-payroll.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-staff.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-staff.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-delete-staff.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-delete-staff.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-hr-summary.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-hr-summary.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-ledger.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-ledger.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-payrolls.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-payrolls.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff-attendance.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff-attendance.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff-by-id.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff-by-id.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-generate-payrolls.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-generate-payrolls.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-give-staff-advance.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-give-staff-advance.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-orchestrator.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-pay-staff-due.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-pay-staff-due.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll-status.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll-status.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-staff.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-staff.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-repository.ts` — Owns the `repositories` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-mapper.ts` — Owns the `mappers` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-payroll.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-payroll.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-staff.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-create-staff.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-delete-staff.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-hr-summary.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-ledger.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-payrolls.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff-attendance.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff-by-id.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-fetch-staff.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-generate-payrolls.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-generate-payrolls.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-give-staff-advance.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-give-staff-advance.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-pay-staff-due.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-pay-staff-due.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-query.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll-status.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll-status.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-payroll.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-staff.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `hr-update-staff.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.

## V1 AUTHORITATIVE IMPLEMENTATION MAP

- **Owning table:** `manager_hrs`.
- **Controller boundary:** the feature keeps read operations in the query controller and mutations in the command controller.
- **Persistence boundary:** the feature repository is the only layer allowed to call TypeORM persistence APIs; services consume mapped domain data.
- **Security boundary:** Manager routes require centralized JWT + tenant + role guards; resource identifiers must be checked inside the trusted tenant scope.
- **Mutation boundary:** every POST/PATCH/PUT/DELETE route has an explicit `CoreRequireIdempotencyKey` decorator in the command controller.
- **Response boundary:** controller results are wrapped by the global `CoreResponseInterceptor`; paginated results use canonical `PaginationMeta`.
- **Important limitation:** current Manager archive still uses a typed JSONB payload for many business objects; this is intentionally documented as a remaining schema-normalization item rather than silently pretending relational provenance exists.

### Exact Frontend Operation Surface

| Method | Endpoint | Backend owner |
|---|---|---|
| `GET` | `/api/v1/manager/hr/staff` | `hr` command/query controller |
| `GET` | `/api/v1/manager/hr/staff/:id` | `hr` command/query controller |
| `POST` | `/api/v1/manager/hr/staff` | `hr` command/query controller |
| `PATCH` | `/api/v1/manager/hr/staff/:id` | `hr` command/query controller |
| `DELETE` | `/api/v1/manager/hr/staff/:id` | `hr` command/query controller |
| `GET` | `/api/v1/manager/hr/payrolls` | `hr` command/query controller |
| `POST` | `/api/v1/manager/hr/payrolls/generate` | `hr` command/query controller |
| `POST` | `/api/v1/manager/hr/payrolls` | `hr` command/query controller |
| `PATCH` | `/api/v1/manager/hr/payrolls/:id` | `hr` command/query controller |
| `PATCH` | `/api/v1/manager/hr/payrolls/:id/status` | `hr` command/query controller |
| `GET` | `/api/v1/manager/hr/summary` | `hr` command/query controller |
| `GET` | `/api/v1/manager/hr/ledger/:staffId` | `hr` command/query controller |
| `POST` | `/api/v1/manager/hr/ledger/advance` | `hr` command/query controller |
| `POST` | `/api/v1/manager/hr/ledger/paydue` | `hr` command/query controller |
| `GET` | `/api/v1/manager/hr/staff/:staffId/attendance?month=YYYY-MM` | `hr` command/query controller |

### V1 Repair Notes

- All changes in this V1 remain inside the Manager backend boundary except documented core infrastructure files required by the architecture.
- Runtime execution was intentionally not performed; static evidence is explicitly labeled as such.
- The frontend frozen API contract is preserved; no request field was made mandatory solely to satisfy a backend-only architecture preference.

### Documentation Authority

This section is authoritative for the V1 package when older checklist text in this file conflicts with the actual source tree. Historical checkbox text is not treated as proof of implementation.

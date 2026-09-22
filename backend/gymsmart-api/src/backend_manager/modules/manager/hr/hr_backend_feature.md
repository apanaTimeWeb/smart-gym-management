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
The canonical endpoint surface is `/api/v1/manager/hr` plus the exact paths implemented by the feature command/query controllers. Request DTOs are strict and unknown properties are rejected globally. Success/error responses are wrapped by the global canonical `ApiResponse<T>` contract.

### Permissions and Tenant
Every endpoint is restricted to `MANAGER` at controller level and executes only after JWT authentication and master-database tenant authorization. Feature repositories resolve the tenant DataSource from the trusted request context; client-provided tenant IDs are never used directly as database names.

### Required Invariants
- Soft delete only; no physical production deletes (Rule 29).
- Named repository methods own TypeORM persistence (Rule 99).
- Paginated queries use the canonical pagination utility and allowlisted ordering/filter inputs (Rules 92 and 94).
- Co-located Jest tests and domain-mirrored pytest black-box tests are required (Rule 11/27).
- This file must change in the same commit as feature code (Rule 19).

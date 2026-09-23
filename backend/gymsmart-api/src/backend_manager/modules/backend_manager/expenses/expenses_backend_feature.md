# Expenses Backend Feature Map

## Module Purpose
Manager expenses owns the backend-facing capabilities required by the supplied Manager frontend feature map. The feature is an AI repair boundary: controllers remain thin, use cases remain single-purpose, repositories own TypeORM persistence, and mutations flow through the feature orchestrator when a transaction is required. The feature must not import sibling business modules or move domain logic into the Manager role container.

## Directory Structure
| File | Responsibility |
|---|---|
| expenses-query.controller.ts | Read-only HTTP endpoints for this feature. |
| expenses-command.controller.ts | Write HTTP endpoints for this feature. |
| services/ | One micro-use-case per frontend capability plus the transaction orchestrator. |
| repositories/expenses-repository.ts | Named TypeORM query/mutation methods only. |
| mappers/expenses-mapper.ts | ORM entity/domain translation. |
| dtos/ | Feature-local request/query/response contracts. |
| expenses.entity.ts | TypeORM tenant table `manager_expenses`. |

## Feature Inventory
| Function | HTTP | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchExpenses` | `GET` | `/api/v1/manager/expenses` | `{ page?, limit?, search?, category?, status?, startDate?, endDate? }` | `{ expenses: Expense[]; total: number; page: number; limit: number }` |
| `fetchExpenseById` | `GET` | `/api/v1/manager/expenses/:id` | `{ id: string }` | `Expense` |
| `fetchExpenseStats` | `GET` | `/api/v1/manager/expenses/stats` | `{ startDate?, endDate? }` | `ExpenseStats` |
| `createExpense` | `POST` | `/api/v1/manager/expenses` | `Partial<Expense>` | `Expense` |
| `updateExpense` | `PATCH` | `/api/v1/manager/expenses/:id` | `{ id: string; body: Partial<Expense> }` | `Expense` |
| `deleteExpense` | `DELETE` | `/api/v1/manager/expenses/:id` | `{ id: string }` | `{ id: string }` |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: CoreConfigService, AsyncLocalStorage request context, master tenant authorization, tenant DataSource, Redis idempotency, TypeORM repository layer, global response/error infrastructure.
- **Runtime/Event Dependencies**: MANAGER.RECORD.CREATED, MANAGER.RECORD.UPDATED, MANAGER.RECORD.DELETED where a mutation is implemented.

## Data and State Architecture
- **DB Entity**: `ExpensesEntity` -> `manager_expenses` in the trusted tenant database.
- **Redis Caching Keys**: none feature-owned; idempotency uses route-scoped keys `idempotency:<method> <route>:<key>` with 24h result TTL and 30s in-progress lock.
- **Event Emitters**: Manager record lifecycle events are emitted after successful orchestrated mutations.
- **Background Jobs**: none owned by this feature in the supplied frontend contract.
- **Idempotency Keys**: all non-GET mutation endpoints expose and enforce `Idempotency-Key` in the Manager API boundary.

## Permissions and Security
| Endpoint | Required Role | Resource-Level Notes |
|---|---|---|
| `GET /api/v1/manager/expenses` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/expenses/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `GET /api/v1/manager/expenses/stats` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `POST /api/v1/manager/expenses` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `PATCH /api/v1/manager/expenses/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |
| `DELETE /api/v1/manager/expenses/:id` | `MANAGER` | Tenant context is resolved from the master DB; resource-ID routes must resolve the resource inside the trusted tenant before mutation. |

## Database Constraints
- `PK_manager_expenses`
- `IDX_manager_expenses_created_at`
- `IDX_manager_expenses_updated_at`
- `IDX_manager_expenses_status`
- `CHK_manager_expenses_payload_object`
- `UQ_...` / `FK_...`: no feature-specific unique/FK contract was directly evidenced by the supplied frontend contract and therefore is not invented here.

## Frozen API Contract
### Request Shape
| Endpoint | Method | Fields |
|---|---|---|
| `/api/v1/manager/expenses` | `GET` | `{ page?, limit?, search?, category?, status?, startDate?, endDate? }` |
| `/api/v1/manager/expenses/:id` | `GET` | `{ id: string }` |
| `/api/v1/manager/expenses/stats` | `GET` | `{ startDate?, endDate? }` |
| `/api/v1/manager/expenses` | `POST` | `Partial<Expense>` |
| `/api/v1/manager/expenses/:id` | `PATCH` | `{ id: string; body: Partial<Expense> }` |
| `/api/v1/manager/expenses/:id` | `DELETE` | `{ id: string }` |

### Response Shape
| Endpoint | Response | UI usage |
|---|---|---|
| `/api/v1/manager/expenses` | `{ expenses: Expense[]; total: number; page: number; limit: number }` | data.expenses[].id (id); data.expenses[].title (title); data.expenses[].category (category); data.expenses[].amount (amount); data.expenses[].date (date); data.expenses[].status (status); data.expenses[].paymentMode (paymentMode); data.expenses[].vendorName (vendorName) |
| `/api/v1/manager/expenses/:id` | `Expense` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/expenses/stats` | `ExpenseStats` | data.totalAmount (totalAmount); data.paidAmount (paidAmount); data.pendingAmount (pendingAmount); data.thisMonthAmount (thisMonthAmount) |
| `/api/v1/manager/expenses` | `Expense` | data.expenses[].id (id); data.expenses[].title (title); data.expenses[].category (category); data.expenses[].amount (amount); data.expenses[].date (date); data.expenses[].status (status); data.expenses[].paymentMode (paymentMode); data.expenses[].vendorName (vendorName) |
| `/api/v1/manager/expenses/:id` | `Expense` | No UI-derived field rows; response type remains the frontend contract source. |
| `/api/v1/manager/expenses/:id` | `{ id: string }` | No UI-derived field rows; response type remains the frontend contract source. |

## UI-Required Fields
- `/api/v1/manager/expenses/stats` -> `data.totalAmount` -> `totalAmount`
- `/api/v1/manager/expenses/stats` -> `data.paidAmount` -> `paidAmount`
- `/api/v1/manager/expenses/stats` -> `data.pendingAmount` -> `pendingAmount`
- `/api/v1/manager/expenses/stats` -> `data.thisMonthAmount` -> `thisMonthAmount`
- `/api/v1/manager/expenses` -> `data.expenses[].id` -> `id`
- `/api/v1/manager/expenses` -> `data.expenses[].title` -> `title`
- `/api/v1/manager/expenses` -> `data.expenses[].category` -> `category`
- `/api/v1/manager/expenses` -> `data.expenses[].amount` -> `amount`
- `/api/v1/manager/expenses` -> `data.expenses[].date` -> `date`
- `/api/v1/manager/expenses` -> `data.expenses[].status` -> `status`
- `/api/v1/manager/expenses` -> `data.expenses[].paymentMode` -> `paymentMode`
- `/api/v1/manager/expenses` -> `data.expenses[].vendorName` -> `vendorName`

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
The canonical endpoint surface is `/api/v1/manager/expenses` plus the exact paths implemented by the feature command/query controllers. Request DTOs are strict and unknown properties are rejected globally. Success/error responses are wrapped by the global canonical `ApiResponse<T>` contract.

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
- `expenses-create-expense.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-create-expense.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-delete-expense.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-delete-expense.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expense-by-id.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expense-by-id.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expense-stats.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expense-stats.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expenses.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expenses.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-orchestrator.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-update-expense.service.spec.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-update-expense.service.ts` — Owns the `services` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-repository.ts` — Owns the `repositories` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-mapper.ts` — Owns the `mappers` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-create-expense.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-create-expense.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-delete-expense.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expense-by-id.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expense-stats.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-fetch-expenses.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-query.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-update-expense.request.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.
- `expenses-update-expense.response.dto.ts` — Owns the `dtos` responsibility for this feature; MUST NOT absorb unrelated feature logic.

## V1 AUTHORITATIVE IMPLEMENTATION MAP

- **Owning table:** `manager_expenses`.
- **Controller boundary:** the feature keeps read operations in the query controller and mutations in the command controller.
- **Persistence boundary:** the feature repository is the only layer allowed to call TypeORM persistence APIs; services consume mapped domain data.
- **Security boundary:** Manager routes require centralized JWT + tenant + role guards; resource identifiers must be checked inside the trusted tenant scope.
- **Mutation boundary:** every POST/PATCH/PUT/DELETE route has an explicit `CoreRequireIdempotencyKey` decorator in the command controller.
- **Response boundary:** controller results are wrapped by the global `CoreResponseInterceptor`; paginated results use canonical `PaginationMeta`.
- **Important limitation:** current Manager archive still uses a typed JSONB payload for many business objects; this is intentionally documented as a remaining schema-normalization item rather than silently pretending relational provenance exists.

### Exact Frontend Operation Surface

| Method | Endpoint | Backend owner |
|---|---|---|
| `GET` | `/api/v1/manager/expenses` | `expenses` command/query controller |
| `GET` | `/api/v1/manager/expenses/:id` | `expenses` command/query controller |
| `GET` | `/api/v1/manager/expenses/stats` | `expenses` command/query controller |
| `POST` | `/api/v1/manager/expenses` | `expenses` command/query controller |
| `PATCH` | `/api/v1/manager/expenses/:id` | `expenses` command/query controller |
| `DELETE` | `/api/v1/manager/expenses/:id` | `expenses` command/query controller |

### V1 Repair Notes

- All changes in this V1 remain inside the Manager backend boundary except documented core infrastructure files required by the architecture.
- Runtime execution was intentionally not performed; static evidence is explicitly labeled as such.
- The frontend frozen API contract is preserved; no request field was made mandatory solely to satisfy a backend-only architecture preference.

### Documentation Authority

This section is authoritative for the V1 package when older checklist text in this file conflicts with the actual source tree. Historical checkbox text is not treated as proof of implementation.

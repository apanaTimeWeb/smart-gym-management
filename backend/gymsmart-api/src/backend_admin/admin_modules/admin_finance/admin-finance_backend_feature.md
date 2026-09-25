# Finance Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `finance` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

## Directory Structure
| File | Responsibility |
|---|---|
| `_locales/bn/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/bn/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/de/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/de/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/en/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/en/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/fr/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/fr/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/gu/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/gu/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/hi/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/hi/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/kn/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/kn/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ml/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ml/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/mr/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/mr/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/nl/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/nl/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/pa/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/pa/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ta/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ta/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/te/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/te/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-finance-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-finance.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-finance.module.ts` | Feature module registration and dependency wiring. |
| `admin-finance.seeder.ts` | Idempotent feature-local seed data. |
| `admin-finance_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-finance_collection.json` | Module-local API collection for endpoint verification. |
| `admin-finance_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-finance_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `finance_controllers/admin-finance-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `finance_domain/admin-finance.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `finance_dtos/admin-finance-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `finance_dtos/admin-finance-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `finance_dtos/admin-finance-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `finance_entities/admin-finance-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `finance_mappers/admin-finance.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `finance_mappers/admin-finance.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `finance_mappers/admin-finance.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `finance_repositories/admin-finance-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `finance_services/admin-finance-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `finance_utils/admin-finance-query-window.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-finance-query.controller.ts:findAllPayments` | GET | `/api/v1/admin/finance/payments/fetchPayments` | Executes the `findAllPayments` use case for Admin `finance` within the owning feature boundary. | `AdminFinanceQueryDto` (query: AdminFinanceQueryDto) | `Promise<AdminFinancePaymentResponseDto>` |
| `admin-finance-query.controller.ts:findFinanceSummary` | GET | `/api/v1/admin/finance/summary` | Executes the `findFinanceSummary` use case for Admin `finance` within the owning feature boundary. | `AdminFinanceQueryDto` (query: AdminFinanceQueryDto) | `Promise<AdminFinanceSummaryResponseDto>` |
| `admin-finance-query.controller.ts:findPnl` | GET | `/api/v1/admin/finance/pnl` | Executes the `findPnl` use case for Admin `finance` within the owning feature boundary. | `AdminFinanceQueryDto` (query: AdminFinanceQueryDto) | `Promise<AdminFinancePnlRecordDto[]>` |
| `admin-finance-query.controller.ts:findAllExpenses` | GET | `/api/v1/admin/finance/payments/fetchExpenses` | Executes the `findAllExpenses` use case for Admin `finance` within the owning feature boundary. | `AdminFinanceQueryDto` (query: AdminFinanceQueryDto) | `Promise<AdminFinanceExpenseResponseDto>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `finance` tenant table/entity plus JSONB frontend contract payload.
- Redis Caching Keys: No feature-specific cache key is required in v1 unless later documented.
- Event Emitters: None declared in v1.
- Background Jobs: Data export uses the background-job pattern documented at core level; other endpoints are synchronous unless the route contract indicates otherwise.
- Idempotency Keys: Required on critical mutations; command controllers accept `Idempotency-Key` where duplicate execution would be unsafe.

## Business Flow / Key Sequences
1. Controller receives the frontend-aligned request.
2. Global validation, JWT authentication, tenant authorization, and canonical response/error infrastructure execute at the framework boundary.
3. The feature service validates the business state and calls only the feature repository.
4. The repository resolves the trusted tenant DataSource, performs parameterized TypeORM access, and returns an entity/domain mapping.
5. Mutation results are audited and returned through the canonical response interceptor.

## File Responsibility Map
- `admin-finance-exceptions.ts` — Feature-owned implementation artifact.
- `admin-finance.constants.ts` — Feature-owned implementation artifact.
- `admin-finance.module.ts` — Feature module provider/controller registration only.
- `admin-finance.seeder.ts` — Idempotent feature seed data only.
- `admin-finance_collection.json` — Module-local API collection/configuration artifact.
- `admin-finance_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-finance_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `finance_controllers/admin-finance-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `finance_domain/admin-finance.domain.ts` — Framework-independent domain shape.
- `finance_dtos/admin-finance-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `finance_dtos/admin-finance-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `finance_dtos/admin-finance-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `finance_entities/admin-finance-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `finance_mappers/admin-finance.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `finance_mappers/admin-finance.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `finance_repositories/admin-finance-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `finance_services/admin-finance-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `finance_utils/admin-finance-query-window.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `GET /api/v1/admin/finance/payments/fetchPayments` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/finance/summary` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/finance/pnl` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/finance/payments/fetchExpenses` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `finance` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/finance/payments/fetchPayments` | GET | query: AdminFinanceQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminFinanceStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminFinancePnlPeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/finance/summary` | GET | query: AdminFinanceQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminFinanceStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminFinancePnlPeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/finance/pnl` | GET | query: AdminFinanceQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminFinanceStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminFinancePnlPeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/finance/payments/fetchExpenses` | GET | query: AdminFinanceQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminFinanceStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminFinancePnlPeriod`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/finance/payments/fetchPayments` | `findAllPayments` | `Promise<AdminFinancePaymentResponseDto>` | AdminFinancePaymentResponseDto: `payments: AdminFinancePaymentDto[]`, `total: number` |
| `/api/v1/admin/finance/summary` | `findFinanceSummary` | `Promise<AdminFinanceSummaryResponseDto>` | AdminFinanceSummaryResponseDto: `totalRevenue: number`, `monthlyRevenue: number`, `pendingAmount: number`, `totalPayments: number`, `totalExpenses: number`, `netProfit: number`, `revenueByMethod: RevenueByMethodDto`, `monthlyData: MonthlyDataDto[]`, `currency: string`, `memberships: number`, `ptSessions: number`, `products: number`, `other: number`, `rent: number`, `salaries: number`, `utilities: number`, `maintenance: number`, `marketing: number` |
| `/api/v1/admin/finance/pnl` | `findPnl` | `Promise<AdminFinancePnlRecordDto[]>` | AdminFinancePnlRecordDto: `branchId: string`, `branchName: string`, `location: string`, `revenue: number`, `expenses: number`, `netProfit: number`, `marginPct: number`, `status: AdminFinanceStatus`, `momDelta: number`, `revenueBreakdown: BranchRevenueBreakdownDto`, `expenseBreakdown: BranchExpenseBreakdownDto`, `currency: string` |
| `/api/v1/admin/finance/payments/fetchExpenses` | `findAllExpenses` | `Promise<AdminFinanceExpenseResponseDto>` | AdminFinanceExpenseResponseDto: `expenses: AdminFinanceExpenseDto[]`, `total: number`, `totalAmount: number`, `currency: string`, `UPI: number`, `Cash: number`, `Card: number`, `NetBanking: number`, `month: string`, `revenue: number`, `currency: string` |

### UI-Required Fields
The response contract must contain every backend-derived field in the frozen Stage 1 requirement baseline, including table fields, KPIs, chart series, lookup labels, relationship values, computed values, and status badges. Frontend-side reconstruction of business semantics is not an accepted substitute.

### Pagination / Error Contract
- All paginated list endpoints must use server-driven `page`, `limit`, filtering and allowlisted sorting as defined by the module DTO.
- All endpoints return the canonical `ApiResponse<T>` envelope through the global response interceptor; validation failures use `VALIDATION.DTO.FAILED` with `data = null` and `validationErrors[]`.
- Non-paginated endpoints omit `meta`.

## Rule Compliance Checklist
- [ ] Rule 7: TypeORM is the single approved ORM and remains behind repositories.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is provided globally.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency applied to critical mutations.
- [ ] Rule 34: N+1 reviewed.
- [ ] Rule 36: Fail-fast on missing resources.
- [ ] Rule 48: Read/write controllers are separate.
- [ ] Rule 56: `findByIdOrThrow()` is used explicitly.
- [ ] Rule 62: Explicit return types are required.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc are required.
- [ ] Rule 82A: Response DTO covers the frontend UI data contract.
- [ ] Rule 83: RBAC uses controller-layer typed role guards.
- [ ] Rule 85/87: Guard clauses and small single-purpose service methods.
- [ ] Rule 89: ORM entities are mapped before business use.
- [ ] Rule 92: User-controlled ORM identifiers are allowlisted.
- [ ] Rule 93: Security-sensitive areas require human review.
- [ ] Rule 101: Tests must prove observable behavior.

## Source-Frozen Frontend API Contract

The following frontend API-client call sites were inspected during the audit and are retained here as contract evidence. This section is evidence of the current frontend requirement, not proof that the backend implementation works. Any deliberate contract change must update the frontend contract, backend contract, types/schemas, mocks, and tests together.

### `admin/finance/finance_api/AdminFinanceApi.ts`
- `L11: return apiFetch<ApiResponse<{ payments: Payment[]; total: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchPayments${suffix}`, { method: 'GET', dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() }) });`
- `L14: return apiFetch<ApiResponse<FinanceSummary>>(`${FinanceUrlConfig.BACKEND_API.SUMMARY}${branchId || range ? `?${new URLSearchParams({ ...(branchId ? { branchId } : {}), ...(range ? { range } : {}) }).toString()}` : ''}`, { method: 'GET', dataSchema: financeSummarySchema });`
- `L19: return apiFetch<ApiResponse<BranchPnlRecord[]>>(`${FinanceUrlConfig.BACKEND_API.PNL_COMPARISON}?${query.toString()}`, { method: 'GET', dataSchema: z.array(branchPnlRecordSchema) });`
- `L25: return apiFetch<ApiResponse<{ expenses: Expense[]; total: number; totalAmount: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchExpenses${suffix}`, { method: 'GET', dataSchema: z.object({ expenses: z.array(expenseSchema), total: z.number(), totalAmount: z.number() }) });`

### `admin/finance/finance_api/AdminFinanceApi.ts`
- `L11: return apiFetch<ApiResponse<{ payments: Payment[]; total: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchPayments${suffix}`, { method: 'GET', dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() }) });`
- `L14: return apiFetch<ApiResponse<FinanceSummary>>(`${FinanceUrlConfig.BACKEND_API.SUMMARY}${branchId || range ? `?${new URLSearchParams({ ...(branchId ? { branchId } : {}), ...(range ? { range } : {}) }).toString()}` : ''}`, { method: 'GET', dataSchema: financeSummarySchema });`
- `L19: return apiFetch<ApiResponse<BranchPnlRecord[]>>(`${FinanceUrlConfig.BACKEND_API.PNL_COMPARISON}?${query.toString()}`, { method: 'GET', dataSchema: z.array(branchPnlRecordSchema) });`
- `L25: return apiFetch<ApiResponse<{ expenses: Expense[]; total: number; totalAmount: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchExpenses${suffix}`, { method: 'GET', dataSchema: z.object({ expenses: z.array(expenseSchema), total: z.number(), totalAmount: z.number() }) });`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.

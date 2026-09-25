# Subscriptions Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `admin_subscriptions` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-subscriptions-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-subscriptions.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-subscriptions.module.ts` | Feature module registration and dependency wiring. |
| `admin-subscriptions.seeder.ts` | Idempotent feature-local seed data. |
| `admin-subscriptions_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-subscriptions_collection.json` | Module-local API collection for endpoint verification. |
| `admin-subscriptions_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-subscriptions_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `subscriptions_controllers/admin-subscriptions-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `subscriptions_controllers/admin-subscriptions-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `subscriptions_domain/admin-subscriptions.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `subscriptions_dtos/admin-subscriptions-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `subscriptions_dtos/admin-subscriptions-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `subscriptions_dtos/admin-subscriptions-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `subscriptions_dtos/admin-subscriptions-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `subscriptions_entities/admin-subscriptions-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `subscriptions_mappers/admin-subscriptions.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `subscriptions_mappers/admin-subscriptions.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `subscriptions_mappers/admin-subscriptions.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `subscriptions_repositories/admin-subscriptions-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `subscriptions_services/admin-subscriptions-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `subscriptions_services/admin-subscriptions-orchestrator.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `subscriptions_services/admin-subscriptions-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-subscriptions-command.controller.ts:updatePlan` | POST | `/api/v1/admin/subscriptions/upgradePlan` | Executes the `updatePlan` use case for Admin `subscriptions` within the owning feature boundary. | `None` (none) | `Promise<unknown>` |
| `admin-subscriptions-command.controller.ts:updateAutoRenew` | POST | `/api/v1/admin/subscriptions/toggleAutoRenew` | Executes the `updateAutoRenew` use case for Admin `subscriptions` within the owning feature boundary. | `None` (none) | `Promise<unknown>` |
| `admin-subscriptions-command.controller.ts:updateDefaultPaymentMethod` | POST | `/api/v1/admin/subscriptions/setDefaultPaymentMethod` | Executes the `updateDefaultPaymentMethod` use case for Admin `subscriptions` within the owning feature boundary. | `None` (none) | `Promise<unknown>` |
| `admin-subscriptions-command.controller.ts:deletePaymentMethod` | DELETE | `/api/v1/admin/subscriptions/removePaymentMethod` | Executes the `deletePaymentMethod` use case for Admin `subscriptions` within the owning feature boundary. | `None` (none) | `Promise<unknown>` |
| `admin-subscriptions-query.controller.ts:findSubscription` | GET | `/api/v1/admin/subscriptions/fetchSubscription` | Executes the `findSubscription` use case for Admin `subscriptions` within the owning feature boundary. | `AdminSubscriptionsQueryDto` (query: AdminSubscriptionsQueryDto) | `Promise<AdminCurrentSubscriptionDto>` |
| `admin-subscriptions-query.controller.ts:findAllPlans` | GET | `/api/v1/admin/subscriptions/fetchPlans` | Executes the `findAllPlans` use case for Admin `subscriptions` within the owning feature boundary. | `AdminSubscriptionsQueryDto` (query: AdminSubscriptionsQueryDto) | `Promise<AdminSaaSPlanDto[]>` |
| `admin-subscriptions-query.controller.ts:findAllInvoices` | GET | `/api/v1/admin/subscriptions/fetchInvoices` | Executes the `findAllInvoices` use case for Admin `subscriptions` within the owning feature boundary. | `AdminSubscriptionsQueryDto` (query: AdminSubscriptionsQueryDto) | `Promise<AdminCorePaginatedResult<AdminInvoiceDto>>` |
| `admin-subscriptions-query.controller.ts:findAllPaymentMethods` | GET | `/api/v1/admin/subscriptions/fetchPaymentMethods` | Executes the `findAllPaymentMethods` use case for Admin `subscriptions` within the owning feature boundary. | `AdminSubscriptionsQueryDto` (query: AdminSubscriptionsQueryDto) | `Promise<AdminPaymentMethodDto[]>` |
| `admin-subscriptions-query.controller.ts:findSubscriptionKpis` | GET | `/api/v1/admin/subscriptions/fetchKPIs` | Executes the `findSubscriptionKpis` use case for Admin `subscriptions` within the owning feature boundary. | `AdminSubscriptionsQueryDto` (query: AdminSubscriptionsQueryDto) | `Promise<AdminSubscriptionKPIDataDto>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: Master `subscriptions_master`, `plans_master`, `invoices_master`, and `payment_methods_master`; Admin subscription runtime reads/writes these master records for the authenticated tenant.
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
- `admin-subscriptions-exceptions.ts` — Feature-owned implementation artifact.
- `admin-subscriptions.constants.ts` — Feature-owned implementation artifact.
- `admin-subscriptions.module.ts` — Feature module provider/controller registration only.
- `admin-subscriptions.seeder.ts` — Idempotent feature seed data only.
- `admin-subscriptions_collection.json` — Module-local API collection/configuration artifact.
- `admin-subscriptions_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-subscriptions_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `subscriptions_controllers/admin-subscriptions-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `subscriptions_controllers/admin-subscriptions-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `subscriptions_domain/admin-subscriptions.domain.ts` — Framework-independent domain shape.
- `subscriptions_dtos/admin-subscriptions-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `subscriptions_dtos/admin-subscriptions-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `subscriptions_dtos/admin-subscriptions-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `subscriptions_dtos/admin-subscriptions-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `subscriptions_entities/admin-subscriptions-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `subscriptions_mappers/admin-subscriptions.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `subscriptions_mappers/admin-subscriptions.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `subscriptions_repositories/admin-subscriptions-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `subscriptions_services/admin-subscriptions-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `subscriptions_services/admin-subscriptions-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `POST /api/v1/admin/subscriptions/upgradePlan` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/subscriptions/toggleAutoRenew` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/subscriptions/setDefaultPaymentMethod` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/subscriptions/removePaymentMethod` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/subscriptions/fetchSubscription` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/subscriptions/fetchPlans` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/subscriptions/fetchInvoices` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/subscriptions/fetchPaymentMethods` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/subscriptions/fetchKPIs` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `admin_subscriptions` repository backed by master billing entities boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/subscriptions/upgradePlan` | POST | none; none |
| `/api/v1/admin/subscriptions/toggleAutoRenew` | POST | none; none |
| `/api/v1/admin/subscriptions/setDefaultPaymentMethod` | POST | none; none |
| `/api/v1/admin/subscriptions/removePaymentMethod` | DELETE | none; none |
| `/api/v1/admin/subscriptions/fetchSubscription` | GET | query: AdminSubscriptionsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSubscriptionsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/subscriptions/fetchPlans` | GET | query: AdminSubscriptionsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSubscriptionsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/subscriptions/fetchInvoices` | GET | query: AdminSubscriptionsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSubscriptionsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/subscriptions/fetchPaymentMethods` | GET | query: AdminSubscriptionsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSubscriptionsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/subscriptions/fetchKPIs` | GET | query: AdminSubscriptionsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminSubscriptionsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/subscriptions/upgradePlan` | `updatePlan` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/subscriptions/toggleAutoRenew` | `updateAutoRenew` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/subscriptions/setDefaultPaymentMethod` | `updateDefaultPaymentMethod` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/subscriptions/removePaymentMethod` | `deletePaymentMethod` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/subscriptions/fetchSubscription` | `findSubscription` | `Promise<AdminCurrentSubscriptionDto>` | AdminCurrentSubscriptionDto: `planId: string`, `planName: string`, `tier: AdminSubscriptionsTier`, `monthlyPrice: number`, `annualPrice: number`, `currency: string`, `billingCycle: string`, `status: AdminSubscriptionsStatus`, `currentPeriodStart: string`, `currentPeriodEnd: string`, `nextBillingDate: string`, `autoRenew: boolean`, `gymCount: number`, `memberLimit: number`, `staffLimit: number`, `storageGb: number` |
| `/api/v1/admin/subscriptions/fetchPlans` | `findAllPlans` | `Promise<AdminSaaSPlanDto[]>` | AdminSaaSPlanDto: `id: string`, `name: string`, `tier: AdminSubscriptionsTier`, `monthlyPrice: number`, `annualPrice: number`, `currency: string`, `gymLimit: number`, `memberLimit: number`, `staffLimit: number`, `storageGb: number`, `features: string[]`, `isPopular: boolean`, `isCurrent: boolean` |
| `/api/v1/admin/subscriptions/fetchInvoices` | `findAllInvoices` | `Promise<AdminCorePaginatedResult<AdminInvoiceDto>>` | AdminInvoiceDto: `id: string`, `invoiceNo: string`, `date: string`, `dueDate: string`, `amount: number`, `currency: string`, `status: AdminSubscriptionsStatus`, `planName: string`, `billingCycle: string`, `pdfUrl: string`, `taxAmount: number`, `gstNumber: string` |
| `/api/v1/admin/subscriptions/fetchPaymentMethods` | `findAllPaymentMethods` | `Promise<AdminPaymentMethodDto[]>` | AdminPaymentMethodDto: `id: string`, `type: string`, `last4: string`, `brand: string`, `upiId: string`, `bankName: string`, `expiryMonth: number`, `expiryYear: number`, `isDefault: boolean` |
| `/api/v1/admin/subscriptions/fetchKPIs` | `findSubscriptionKpis` | `Promise<AdminSubscriptionKPIDataDto>` | AdminSubscriptionKPIDataDto: `currentPlan: string`, `monthlySpend: number`, `currency: string`, `totalInvoices: number`, `nextBillingAmount: number`, `daysUntilRenewal: number`, `savedWithAnnual: number` |

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
- [x] Rule 29: Payment-method removal is implemented as master-record soft deactivation (`is_active=false`).
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
- [x] Rule 89: ORM access is confined to the repository boundary; services receive repository results only.
- [ ] Rule 92: User-controlled ORM identifiers are allowlisted.
- [ ] Rule 93: Security-sensitive areas require human review.
- [ ] Rule 101: Tests must prove observable behavior.

## Source-Frozen Frontend API Contract

The following frontend API-client call sites were inspected during the audit and are retained here as contract evidence. This section is evidence of the current frontend requirement, not proof that the backend implementation works. Any deliberate contract change must update the frontend contract, backend contract, types/schemas, mocks, and tests together.

### `admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi.ts`
- `L10: return apiFetch<ApiResponse<CurrentSubscription>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchSubscription`, { method: 'GET', dataSchema: currentSubscriptionSchema });`
- `L13: return apiFetch<ApiResponse<SaaSPlan[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPlans`, { method: 'GET', dataSchema: z.array(saaSPlanSchema) });`
- `L17: return apiFetch<ApiResponse<Invoice[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchInvoices?${query}`, { method: 'GET', dataSchema: z.array(invoiceSchema) });`
- `L20: return apiFetch<ApiResponse<PaymentMethod[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPaymentMethods`, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });`
- `L23: return apiFetch<ApiResponse<SubscriptionKPIData>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: subscriptionKpiDataSchema });`
- `L26: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/upgradePlan`, { method: 'POST', body: JSON.stringify(planId), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });`
- `L29: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/toggleAutoRenew`, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });`
- `L32: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/setDefaultPaymentMethod`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.null(),`
- `L37: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/removePaymentMethod`, { method: 'DELETE', body: JSON.stringify(id), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });`

### `admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi.ts`
- `L10: return apiFetch<ApiResponse<CurrentSubscription>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchSubscription`, { method: 'GET', dataSchema: currentSubscriptionSchema });`
- `L13: return apiFetch<ApiResponse<SaaSPlan[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPlans`, { method: 'GET', dataSchema: z.array(saaSPlanSchema) });`
- `L17: return apiFetch<ApiResponse<Invoice[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchInvoices?${query}`, { method: 'GET', dataSchema: z.array(invoiceSchema) });`
- `L20: return apiFetch<ApiResponse<PaymentMethod[]>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchPaymentMethods`, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });`
- `L23: return apiFetch<ApiResponse<SubscriptionKPIData>>(`${AdminSubscriptionsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: subscriptionKpiDataSchema });`
- `L26: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/upgradePlan`, { method: 'POST', body: JSON.stringify(planId), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });`
- `L29: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/toggleAutoRenew`, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });`
- `L32: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/setDefaultPaymentMethod`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.null(),`
- `L37: return apiFetch<ApiResponse<null>>(`${AdminSubscriptionsUrlConfig.api.base}/removePaymentMethod`, { method: 'DELETE', body: JSON.stringify(id), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });`


## Repair Delta — Static Hardening Pass
The Admin subscriptions service no longer depends on missing repository methods or an undefined `repositoryFor()` contract. A concrete repository now owns master-database subscription, plan, invoice, and payment-method access, and all state-changing subscription/payment-method operations execute inside a TypeORM transaction with pessimistic write locking on the affected rows. The service consumes ORM-independent domain contracts through `AdminSubscriptionsMapper` rather than importing master ORM entities directly.

### Money Contract
Subscription monetary response values are represented as integer smallest-unit values and carry an ISO currency code (currently sourced from the master payload with `INR` fallback). Services do not divide amounts by 100 or format currency symbols.

### AI Warnings Added During Repair
- Never move TypeORM master-entity access into the query/command services — keep it inside `AdminSubscriptionsRepository` (Rule 89).
- Never remove the pessimistic write lock from subscription/payment-method mutations; concurrent requests must not produce conflicting billing state (Rule 41).
- Never reintroduce major-unit currency conversion in the service layer; the backend money contract is integer smallest-unit + currency (Rules 73 and 118).

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.

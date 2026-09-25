# Plans Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `admin_plans` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-plans-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-plans.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-plans.module.ts` | Feature module registration and dependency wiring. |
| `admin-plans.seeder.ts` | Idempotent feature-local seed data. |
| `admin-plans_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-plans_collection.json` | Module-local API collection for endpoint verification. |
| `admin-plans_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-plans_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `plans_controllers/admin-plans-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `plans_controllers/admin-plans-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `plans_domain/admin-plans.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `plans_dtos/admin-plans-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `plans_dtos/admin-plans-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `plans_dtos/admin-plans-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `plans_dtos/admin-plans-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `plans_entities/admin-plans-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `plans_mappers/admin-plans.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `plans_mappers/admin-plans.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `plans_mappers/admin-plans.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `plans_repositories/admin-plans-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `plans_services/admin-plans-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `plans_services/admin-plans-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `plans_utils/admin-plans-query-window.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-plans-command.controller.ts:createRecord` | POST | `/api/v1/admin/plans/createPlan` | Executes the `createRecord` use case for Admin `plans` within the owning feature boundary. | `AdminPlansMutationDto` (body: AdminPlansMutationDto) | `Promise<Record<string, unknown>>` |
| `admin-plans-command.controller.ts:updateById` | POST | `/api/v1/admin/plans/updatePlan` | Executes the `updateById` use case for Admin `plans` within the owning feature boundary. | `AdminPlansMutationDto` (body: AdminPlansMutationDto) | `Promise<Record<string, unknown>>` |
| `admin-plans-command.controller.ts:deletePlan` | DELETE | `/api/v1/admin/plans/deletePlan` | Executes the `deletePlan` use case for Admin `plans` within the owning feature boundary. | `AdminPlansIdDto` (body: AdminPlansIdDto) | `Promise<unknown>` |
| `admin-plans-query.controller.ts:findAllPlans` | GET | `/api/v1/admin/plans` | Executes the `findAllPlans` use case for Admin `plans` within the owning feature boundary. | `AdminPlansQueryDto` (query: AdminPlansQueryDto) | `Promise<AdminCorePaginatedResult<AdminPlanDto>>` |
| `admin-plans-query.controller.ts:fetchAllPlansAlias` | GET | `/api/v1/admin/plans/fetchAllPlans` | Executes the `fetchAllPlansAlias` use case for Admin `plans` within the owning feature boundary. | `AdminPlansQueryDto` (query: AdminPlansQueryDto) | `Promise<AdminCorePaginatedResult<AdminPlanDto>>` |
| `admin-plans-query.controller.ts:findPlanById` | GET | `/api/v1/admin/plans/fetchPlanById` | Executes the `findPlanById` use case for Admin `plans` within the owning feature boundary. | `AdminPlansIdDto` (body: AdminPlansIdDto) | `Promise<AdminPlanDto>` |
| `admin-plans-query.controller.ts:fetchPlanRevenueAlias` | GET | `/api/v1/admin/plans/fetchPlanRevenue` | Executes the `fetchPlanRevenueAlias` use case for Admin `plans` within the owning feature boundary. | `AdminPlansQueryDto` (query: AdminPlansQueryDto) | `Promise<AdminPlanRevenueRecordDto[]>` |
| `admin-plans-query.controller.ts:findPlanRevenue` | GET | `/api/v1/admin/plans/revenue` | Executes the `findPlanRevenue` use case for Admin `plans` within the owning feature boundary. | `AdminPlansQueryDto` (query: AdminPlansQueryDto) | `Promise<AdminPlanRevenueRecordDto[]>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `admin_plans` tenant table/entity plus JSONB frontend contract payload.
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
- `admin-plans-exceptions.ts` — Feature-owned implementation artifact.
- `admin-plans.constants.ts` — Feature-owned implementation artifact.
- `admin-plans.module.ts` — Feature module provider/controller registration only.
- `admin-plans.seeder.ts` — Idempotent feature seed data only.
- `admin-plans_collection.json` — Module-local API collection/configuration artifact.
- `admin-plans_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-plans_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `plans_controllers/admin-plans-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `plans_controllers/admin-plans-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `plans_domain/admin-plans.domain.ts` — Framework-independent domain shape.
- `plans_dtos/admin-plans-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `plans_dtos/admin-plans-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `plans_dtos/admin-plans-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `plans_dtos/admin-plans-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `plans_entities/admin-plans-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `plans_mappers/admin-plans.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `plans_mappers/admin-plans.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `plans_repositories/admin-plans-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `plans_services/admin-plans-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `plans_services/admin-plans-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `plans_utils/admin-plans-query-window.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `GET /api/v1/admin/plans/fetchAllPlans` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/plans/fetchPlanById` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/plans/fetchPlanRevenue` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/plans/createPlan` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/plans/updatePlan` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/plans/deletePlan` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `admin_plans` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/plans/createPlan` | POST | body: AdminPlansMutationDto; `id: string`, `name: string`, `tier: AdminPlansTier`, `price1Month: number`, `price3Month: number`, `price6Month: number`, `price12Month: number`, `features: string[]`, `isActive: boolean`, `freezeAllowed: boolean`, `joiningFee: number`, `ptSessionsIncluded: number`, `taxRate: number`, `currency: string` |
| `/api/v1/admin/plans/updatePlan` | POST | body: AdminPlansMutationDto; `id: string`, `name: string`, `tier: AdminPlansTier`, `price1Month: number`, `price3Month: number`, `price6Month: number`, `price12Month: number`, `features: string[]`, `isActive: boolean`, `freezeAllowed: boolean`, `joiningFee: number`, `ptSessionsIncluded: number`, `taxRate: number`, `currency: string` |
| `/api/v1/admin/plans/deletePlan` | DELETE | body: AdminPlansIdDto; `id: string` |
| `/api/v1/admin/plans` | GET | query: AdminPlansQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminPlansStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `tier: AdminPlansTier`, `consumer: string` |
| `/api/v1/admin/plans/fetchAllPlans` | GET | query: AdminPlansQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminPlansStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `tier: AdminPlansTier`, `consumer: string` |
| `/api/v1/admin/plans/fetchPlanById` | GET | body: AdminPlansIdDto; `id: string` |
| `/api/v1/admin/plans/fetchPlanRevenue` | GET | query: AdminPlansQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminPlansStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `tier: AdminPlansTier`, `consumer: string` |
| `/api/v1/admin/plans/revenue` | GET | query: AdminPlansQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminPlansStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `tier: AdminPlansTier`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/plans/createPlan` | `createRecord` | `Promise<Record<string, unknown>>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/plans/updatePlan` | `updateById` | `Promise<Record<string, unknown>>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/plans/deletePlan` | `deletePlan` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/plans` | `findAllPlans` | `Promise<AdminCorePaginatedResult<AdminPlanDto>>` | AdminPlanDto: `id: string`, `name: string`, `tier: AdminPlansTier`, `price1Month: number`, `price3Month: number`, `price6Month: number`, `price12Month: number`, `features: string[]`, `isActive: boolean`, `freezeAllowed: boolean`, `joiningFee: number`, `ptSessionsIncluded: number`, `taxRate: number`, `currency: string` |
| `/api/v1/admin/plans/fetchAllPlans` | `fetchAllPlansAlias` | `Promise<AdminCorePaginatedResult<AdminPlanDto>>` | AdminPlanDto: `id: string`, `name: string`, `tier: AdminPlansTier`, `price1Month: number`, `price3Month: number`, `price6Month: number`, `price12Month: number`, `features: string[]`, `isActive: boolean`, `freezeAllowed: boolean`, `joiningFee: number`, `ptSessionsIncluded: number`, `taxRate: number`, `currency: string` |
| `/api/v1/admin/plans/fetchPlanById` | `findPlanById` | `Promise<AdminPlanDto>` | AdminPlanDto: `id: string`, `name: string`, `tier: AdminPlansTier`, `price1Month: number`, `price3Month: number`, `price6Month: number`, `price12Month: number`, `features: string[]`, `isActive: boolean`, `freezeAllowed: boolean`, `joiningFee: number`, `ptSessionsIncluded: number`, `taxRate: number`, `currency: string` |
| `/api/v1/admin/plans/fetchPlanRevenue` | `fetchPlanRevenueAlias` | `Promise<AdminPlanRevenueRecordDto[]>` | AdminPlanRevenueRecordDto: `id: string`, `planName: string`, `tier: AdminPlansTier`, `totalRevenue: number`, `activeSubscriptions: number`, `newSignups: number`, `renewalRate: number`, `currency: string` |
| `/api/v1/admin/plans/revenue` | `findPlanRevenue` | `Promise<AdminPlanRevenueRecordDto[]>` | AdminPlanRevenueRecordDto: `id: string`, `planName: string`, `tier: AdminPlansTier`, `totalRevenue: number`, `activeSubscriptions: number`, `newSignups: number`, `renewalRate: number`, `currency: string` |

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

### `admin/admin_plans/admin_plans_api/AdminPlansApi.ts`
- `L15: return apiFetch<ApiResponse<Plan[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchAllPlans${suffix}`, { method: 'GET', dataSchema: z.array(planSchema) });`
- `L17: fetchPlanById: async (id: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanById`, { method: 'GET', body: JSON.stringify({ id }), dataSchema: planSchema }),`
- `L18: createPlan: async (body: Partial<Plan>, idempotencyKey?: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/createPlan`, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema,`
- `L21: updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey?: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/updatePlan`, { method: 'POST', body: JSON.stringify({ id, ...body }), dataSchema: planSchema,`
- `L24: deletePlan: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${PlansUrlConfig.BACKEND_API.BASE}/deletePlan`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L28: return apiFetch<ApiResponse<PlanRevenueRecord[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanRevenue?${query.toString()}`, { method: 'GET', dataSchema: z.array(planRevenueRecordSchema) });`

### `admin/admin_plans/admin_plans_api/AdminPlansApi.ts`
- `L15: return apiFetch<ApiResponse<Plan[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchAllPlans${suffix}`, { method: 'GET', dataSchema: z.array(planSchema) });`
- `L17: fetchPlanById: async (id: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanById`, { method: 'GET', body: JSON.stringify({ id }), dataSchema: planSchema }),`
- `L18: createPlan: async (body: Partial<Plan>, idempotencyKey?: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/createPlan`, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema,`
- `L21: updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey?: string) => apiFetch<ApiResponse<Plan>>(`${PlansUrlConfig.BACKEND_API.BASE}/updatePlan`, { method: 'POST', body: JSON.stringify({ id, ...body }), dataSchema: planSchema,`
- `L24: deletePlan: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${PlansUrlConfig.BACKEND_API.BASE}/deletePlan`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L28: return apiFetch<ApiResponse<PlanRevenueRecord[]>>(`${PlansUrlConfig.BACKEND_API.BASE}/fetchPlanRevenue?${query.toString()}`, { method: 'GET', dataSchema: z.array(planRevenueRecordSchema) });`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.

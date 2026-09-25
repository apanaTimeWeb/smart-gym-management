# Dashboard Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `dashboard` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-dashboard-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-dashboard.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-dashboard.module.ts` | Feature module registration and dependency wiring. |
| `admin-dashboard.seeder.ts` | Idempotent feature-local seed data. |
| `admin-dashboard_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-dashboard_collection.json` | Module-local API collection for endpoint verification. |
| `admin-dashboard_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-dashboard_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `dashboard_controllers/admin-dashboard-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `dashboard_domain/admin-dashboard.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `dashboard_dtos/admin-dashboard-chart.dto.ts` | Request/response validation and OpenAPI data contract. |
| `dashboard_dtos/admin-dashboard-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `dashboard_dtos/admin-dashboard-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `dashboard_dtos/admin-dashboard-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `dashboard_entities/admin-dashboard-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `dashboard_mappers/admin-dashboard-widget.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `dashboard_mappers/admin-dashboard.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `dashboard_mappers/admin-dashboard.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `dashboard_mappers/admin-dashboard.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `dashboard_repositories/admin-dashboard-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `dashboard_services/admin-dashboard-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `dashboard_utils/admin-dashboard-query-window.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-dashboard-query.controller.ts:findKpis` | GET | `/api/v1/admin/dashboard/kpis` | Executes the `findKpis` use case for Admin `dashboard` within the owning feature boundary. | `AdminDashboardQueryDto` (query: AdminDashboardQueryDto) | `Promise<AdminDashboardKpisResponseDto>` |
| `admin-dashboard-query.controller.ts:findCharts` | GET | `/api/v1/admin/dashboard/charts` | Executes the `findCharts` use case for Admin `dashboard` within the owning feature boundary. | `AdminDashboardQueryDto` (query: AdminDashboardQueryDto) | `Promise<AdminDashboardChartsResponseDto>` |
| `admin-dashboard-query.controller.ts:findLeaderboard` | GET | `/api/v1/admin/dashboard/leaderboard` | Executes the `findLeaderboard` use case for Admin `dashboard` within the owning feature boundary. | `AdminDashboardQueryDto` (query: AdminDashboardQueryDto) | `Promise<AdminDashboardLeaderboardResponseDto>` |
| `admin-dashboard-query.controller.ts:findAlerts` | GET | `/api/v1/admin/dashboard/alerts` | Executes the `findAlerts` use case for Admin `dashboard` within the owning feature boundary. | `AdminDashboardQueryDto` (query: AdminDashboardQueryDto) | `Promise<AdminDashboardAlertsResponseDto>` |
| `admin-dashboard-query.controller.ts:findLegacyDashboardStats` | GET | `/api/v1/admin/dashboard/fetchDashboardStats` | Executes the `findLegacyDashboardStats` use case for Admin `dashboard` within the owning feature boundary. | `AdminDashboardQueryDto` (query: AdminDashboardQueryDto) | `Promise<AdminDashboardResponseDto>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `dashboard` tenant table/entity plus JSONB frontend contract payload.
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
- `admin-dashboard-exceptions.ts` — Feature-owned implementation artifact.
- `admin-dashboard.constants.ts` — Feature-owned implementation artifact.
- `admin-dashboard.module.ts` — Feature module provider/controller registration only.
- `admin-dashboard.seeder.ts` — Idempotent feature seed data only.
- `admin-dashboard_collection.json` — Module-local API collection/configuration artifact.
- `admin-dashboard_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-dashboard_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `dashboard_controllers/admin-dashboard-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `dashboard_domain/admin-dashboard.domain.ts` — Framework-independent domain shape.
- `dashboard_dtos/admin-dashboard-chart.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `dashboard_dtos/admin-dashboard-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `dashboard_dtos/admin-dashboard-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `dashboard_dtos/admin-dashboard-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `dashboard_entities/admin-dashboard-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `dashboard_mappers/admin-dashboard.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `dashboard_mappers/admin-dashboard.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `dashboard_repositories/admin-dashboard-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `dashboard_services/admin-dashboard-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `dashboard_utils/admin-dashboard-query-window.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `GET /api/v1/admin/dashboard/fetchDashboardStats` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `dashboard` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/dashboard/kpis` | GET | query: AdminDashboardQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDashboardStatus`, `priority: string`, `severity: AdminDashboardSeverity`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/dashboard/charts` | GET | query: AdminDashboardQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDashboardStatus`, `priority: string`, `severity: AdminDashboardSeverity`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/dashboard/leaderboard` | GET | query: AdminDashboardQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDashboardStatus`, `priority: string`, `severity: AdminDashboardSeverity`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/dashboard/alerts` | GET | query: AdminDashboardQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDashboardStatus`, `priority: string`, `severity: AdminDashboardSeverity`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/dashboard/fetchDashboardStats` | GET | query: AdminDashboardQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminDashboardStatus`, `priority: string`, `severity: AdminDashboardSeverity`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/dashboard/kpis` | `findKpis` | `Promise<AdminDashboardKpisResponseDto>` | AdminDashboardKpisResponseDto: `totalMembers: number`, `activeMembers: number`, `newMembersThisMonth: number`, `totalRevenue: number`, `monthlyRevenue: number`, `netProfit: number`, `totalExpenses: number`, `pendingPayments: number`, `totalStaff: number`, `activeStaff: number`, `totalProducts: number`, `lowStockCount: number`, `totalInquiries: number`, `newInquiries: number`, `cancellationRate: number`, `retentionRate: number`, `arpm: number`, `currency: string`, `todayAttendance: number`, `expiringThisWeek: number`, `totalInquiriesOpen: number`, `avgAttendance: number`, `renewalsPending: number` |
| `/api/v1/admin/dashboard/charts` | `findCharts` | `Promise<AdminDashboardChartsResponseDto>` | AdminDashboardChartsResponseDto: `memberGrowth: DashboardMemberGrowth[]`, `revenueTrend: DashboardRevenueTrend[]`, `membersByPlan: DashboardMembersByPlan[]`, `membersByStatus: DashboardMembersByStatus`, `attendanceTrend: DashboardAttendanceTrendPoint[]` |
| `/api/v1/admin/dashboard/leaderboard` | `findLeaderboard` | `Promise<AdminDashboardLeaderboardResponseDto>` | AdminDashboardLeaderboardResponseDto: `branchLeaderboard: DashboardBranchPerformance[]` |
| `/api/v1/admin/dashboard/alerts` | `findAlerts` | `Promise<AdminDashboardAlertsResponseDto>` | AdminDashboardAlertsResponseDto: `systemAlerts: DashboardSystemAlert[]`, `expiringMemberships: DashboardExpiringMembership[]` |
| `/api/v1/admin/dashboard/fetchDashboardStats` | `findLegacyDashboardStats` | `Promise<AdminDashboardResponseDto>` | AdminDashboardResponseDto: `id: string`, `createdAt: string`, `updatedAt: string`, `totalMembers: number`, `activeMembers: number`, `newMembersThisMonth: number`, `totalRevenue: number`, `monthlyRevenue: number`, `netProfit: number`, `totalExpenses: number`, `pendingPayments: number`, `totalStaff: number`, `activeStaff: number`, `totalProducts: number`, `lowStockCount: number`, `totalInquiries: number`, `newInquiries: number`, `cancellationRate: number`, `retentionRate: number`, `arpm: number`, `memberGrowth: DashboardMemberGrowth[]`, `revenueTrend: DashboardRevenueTrend[]`, `membersByPlan: DashboardMembersByPlan[]`, `membersByStatus: DashboardMembersByStatus`, `branchLeaderboard: DashboardBranchPerformance[]`, `systemAlerts: DashboardSystemAlert[]`, `todayAttendance: number`, `expiringThisWeek: number`, `totalInquiriesOpen: number`, `avgAttendance: number`, `renewalsPending: number`, `expiringMemberships: DashboardExpiringMembership[]`, `attendanceTrend: DashboardAttendanceTrendPoint[]`, `currency: string` |

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

### `admin/dashboard/dashboard_api/AdminDashboardApi.ts`
- `L21: return apiFetch<ApiResponse<DashboardStats>>(`

### `admin/dashboard/dashboard_api/AdminDashboardApi.ts`
- `L21: return apiFetch<ApiResponse<DashboardStats>>(`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.

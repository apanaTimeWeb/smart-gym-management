# Dashboard Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/dashboard feature. It exposes 13 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `dashboard_dtos/superadmin-dashboard-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_dtos/superadmin-dashboard-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_dtos/superadmin-dashboard-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-growth-chart-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-kpis-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-recent-onboards-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-revenue-by-geography-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-revenue-by-tier-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_responses/superadmin-dashboard-revenue-chart-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard_services/superadmin-dashboard-business-overview.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-growth-chart.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-kpis.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-recent-onboards.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-revenue-by-geography.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-revenue-by-tier.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-revenue-chart.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_services/superadmin-dashboard-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard_types/superadmin-dashboard.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `dashboard_types/superadmin-dashboard.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-dashboard-business-overview-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-dashboard-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-dashboard-overview-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-dashboard-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-dashboard-response-data.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-dashboard.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-dashboard.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-dashboard.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-dashboard.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-dashboard.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-dashboard.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-dashboard.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-dashboard-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the create operation. | `SuperadminDashboardCreateDto` | `SuperadminDashboardResponseDto` |
| `superadmin-dashboard-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the update operation. | `SuperadminDashboardUpdateDto` | `SuperadminDashboardResponseDto` |
| `superadmin-dashboard-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-dashboard-overview-query.controller.ts::businessOverview` | GET | `superadmin/dashboard/business-overview` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the businessOverview operation. | `SuperadminQueryDto` | `SuperadminDashboardBusinessOverviewResponseDto` |
| `superadmin-dashboard-overview-query.controller.ts::businessOverview` | GET | `api/superadmin/dashboard/business-overview` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the businessOverview operation. | `SuperadminQueryDto` | `SuperadminDashboardBusinessOverviewResponseDto` |
| `superadmin-dashboard-overview-query.controller.ts::kpis` | GET | `superadmin/dashboard/kpis` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the kpis operation. | `SuperadminQueryDto` | `SuperadminDashboardKpisResponseDto` |
| `superadmin-dashboard-overview-query.controller.ts::kpis` | GET | `superadmin/dashboard/metrics` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the kpis operation. | `SuperadminQueryDto` | `SuperadminDashboardKpisResponseDto` |
| `superadmin-dashboard-overview-query.controller.ts::revenueChart` | GET | `superadmin/dashboard/revenue-chart` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the revenueChart operation. | `SuperadminQueryDto` | `[SuperadminDashboardRevenueChartResponseDto]` |
| `superadmin-dashboard-overview-query.controller.ts::growthChart` | GET | `superadmin/dashboard/growth-chart` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the growthChart operation. | `SuperadminQueryDto` | `[SuperadminDashboardGrowthChartResponseDto]` |
| `superadmin-dashboard-overview-query.controller.ts::revenueByTier` | GET | `superadmin/dashboard/revenue-by-tier` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the revenueByTier operation. | `—` | `[SuperadminDashboardRevenueByTierResponseDto]` |
| `superadmin-dashboard-overview-query.controller.ts::revenueByGeography` | GET | `superadmin/dashboard/revenue-by-geography` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the revenueByGeography operation. | `—` | `[SuperadminDashboardRevenueByGeographyResponseDto]` |
| `superadmin-dashboard-overview-query.controller.ts::recentOnboards` | GET | `superadmin/dashboard/recent-onboards` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the recentOnboards operation. | `—` | `[SuperadminDashboardRecentOnboardsResponseDto]` |
| `superadmin-dashboard-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning dashboard use case, and returns the declared contract for the findOne operation. | `—` | `SuperadminDashboardResponseDto` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-dashboard.entity → `superadmin_dashboard_snapshots`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/dashboard`, `/superadmin/dashboard/:id`

## Business Flow / Key Sequences
**Dashboard KPI read**
1. `SuperadminDashboardOverviewQueryController` receives the GET request.
2. `SuperadminQueryDto` validates query parameters.
3. `SuperadminDashboardKpisService` executes the KPI use case.
4. The repository/query layer reads the required persisted data.
5. The service returns `SuperadminDashboardKpisResponseDto`.
6. The global response interceptor applies the canonical response envelope.

**Dashboard update**
1. `SuperadminDashboardCommandController` receives PATCH `/superadmin/dashboard/:id`.
2. `SuperadminDashboardUpdateDto` validates the request body.
3. `@RequireIdempotencyKey()` protects duplicate mutation execution.
4. `SuperadminDashboardUpdateService` validates the target resource and performs the business operation.
5. The repository performs the persistence mutation.
6. The controller returns the typed response and the global response infrastructure shapes the canonical envelope.

## File Responsibility Map
- `superadmin-dashboard-overview-query.controller.ts` — Dashboard widget HTTP transport only; MUST NOT contain dashboard query logic.
- `superadmin-dashboard-query.controller.ts` — Single-resource read transport only; MUST NOT contain persistence logic.
- `superadmin-dashboard-command.controller.ts` — Dashboard mutation transport only; MUST NOT contain business rules or ORM queries.
- `services/superadmin-dashboard-*-service.ts` — One focused dashboard use case per service; MUST NOT construct TypeORM queries.
- `superadmin-dashboard.repository.ts` — Dashboard persistence/query boundary only; MUST NOT own HTTP transport or unrelated feature queries.
- `superadmin-dashboard.mapper.ts` — Maps persistence/domain values to API-safe values; MUST NOT issue database queries.
- `superadmin-dashboard.entity.ts` — Persistence mapping only; MUST NOT contain controller/service orchestration.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/dashboard` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/dashboard/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/dashboard/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/dashboard/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/kpis` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/metrics` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/revenue-chart` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/growth-chart` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/revenue-by-tier` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/revenue-by-geography` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/recent-onboards` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- **Never create `/superadmin/dashboard` as a Mega API** that aggregates every KPI, chart, and recent-onboard widget into one response — this violates Rule 123 and destroys widget-level fault isolation.
- **Do not bypass `@RequireIdempotencyKey()` on dashboard POST/PATCH/DELETE mutations** — duplicate requests can repeat state-changing operations; see Rule 112.
- **Do not move TypeORM access into dashboard services** — persistence must remain behind the repository boundary, otherwise ORM concerns leak into business logic; see Rule 7 and Rule 89.
- **Do not trust frontend role visibility as authorization** — every dashboard endpoint must continue to enforce backend authentication and Superadmin RBAC at the controller boundary; see Rule 83.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `dashboard/superadmin_dashboard_business_overview_features.md`

- **API files:** `dashboard_api/SuperadminDashboardApi.ts`, `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Detected API symbols:** `fetchDashboard` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardMetrics` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardBusinessOverview` — `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `dashboard/superadmin_dashboard_features.md`

- **API files:** `dashboard_api/SuperadminDashboardApi.ts`, `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Detected API symbols:** `fetchDashboard` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardMetrics` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardBusinessOverview` — `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `dashboard/superadmin_dashboard_business_overview_features.md`

- **Data-bearing components:** `page.tsx`, `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx`, `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx`, `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx`, `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `dashboard/superadmin_dashboard_features.md`

- **Data-bearing components:** `page.tsx`, `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx`, `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx`, `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx`, `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``{superadmin}{q}`` | ``ApiResponse<SuperadminDashboardApiData>`` | `REQ-019` / ``fetchDashboard`` |
| ``{superadmin}/metrics`` | ``ApiResponse<SuperadminDashboardApiData>`` | `REQ-020` / ``fetchDashboardMetrics`` |
| ``/api/superadmin/dashboard/business-overview`` | ``ApiResponse<SuperadminDashboardV1Data>`` | `REQ-021` / ``fetchDashboardBusinessOverview`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx`, `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx`, `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx`, `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx`, `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx`, `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx`, `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Rule 7: TypeORM access remains in the repository boundary.
- [x] Rule 19: This feature documentation is synchronized with the current dashboard source tree.
- [x] Rule 28: Responses rely on the global canonical response envelope.
- [x] Rule 29: Dashboard record deletion uses soft-delete semantics.
- [x] Rule 48: Query and command controllers are separated.
- [x] Rule 62: Service and repository methods use explicit return types.
- [x] Rule 76/79: Authored source files contain responsibility/flow markers.
- [x] Rule 83: Superadmin RBAC is enforced at the controller layer.
- [x] Rule 89: ORM entities remain behind the repository boundary.
- [x] Rule 92: User-controlled query fields must use repository/service allowlists.
- [x] Rule 112: Dashboard mutations are protected by `@RequireIdempotencyKey()`.
- [x] Rule 123: Dashboard read capabilities are fragmented into widget-specific APIs.
- [ ] Complete runtime contract verification — blocked by the supplied role-only scope and absent host runtime configuration.


## Repair Baseline — 2026-09-24
2026-09-24 repair: base dashboard GET contract is backed by an isolated aggregate read service while widget-specific read services remain independently owned.

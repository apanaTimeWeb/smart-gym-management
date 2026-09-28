# Manager Dashboard Backend Feature Map

## Module Purpose
The Manager Dashboard provides operational metrics, chart series, recent-member activity, pending-payment visibility, and expiring-membership visibility for the authenticated Manager tenant. The feature is intentionally split into independent widget APIs so a slow aggregation or failing list query does not prevent unrelated dashboard widgets from rendering. All dashboard reads must execute against the trusted Manager tenant context, and this module must never reintroduce a synchronous Mega API such as `/manager/dashboard/stats` on the backend.

Key invariants: KPI and chart queries are read-only widget capabilities; list widgets are server-paginated and server-searchable; monetary values are integers in the smallest currency unit and always include an ISO-4217 `currency`; response envelopes are produced by the global response infrastructure. AI agents must never merge widget queries into a new dashboard-wide endpoint, bypass the repository/query layer, trust client-supplied tenant identity, or silently remove a frontend-required response field.

## Directory Structure
| File | Responsibility |
|---|---|
| `manager-dashboard-query.controller.ts` | Exposes the five Manager dashboard widget GET endpoints and delegates immediately to the focused query services. |
| `dashboard_services/manager-dashboard-find-dashboard-kpis.service.ts` | Builds the KPI widget result from dashboard read queries. |
| `dashboard_services/manager-dashboard-find-dashboard-charts.service.ts` | Builds member-growth, revenue, plan, and status chart data. |
| `dashboard_services/manager-dashboard-find-dashboard-recent-members.service.ts` | Provides recent members with server-side search and pagination. |
| `dashboard_services/manager-dashboard-find-dashboard-pending-payments.service.ts` | Provides pending payments with server-side search and pagination. |
| `dashboard_services/manager-dashboard-find-dashboard-expiring-memberships.service.ts` | Provides expiring memberships with server-side search and pagination. |
| `dashboard_repositories/manager-dashboard-repository.ts` | Owns dashboard read queries and approved tenant-scoped persistence projections only. |
| `dashboard_mappers/manager-dashboard-response.mapper.ts` | Maps dashboard persistence/domain results into explicit response DTO shapes. |
| `dashboard_dtos/manager-dashboard-query.dto.ts` | Validates dashboard query, search, date-range, sort, and pagination inputs. |
| `dashboard_dtos/*response.dto.ts` | Defines explicit widget response contracts and Swagger metadata. |
| `manager-dashboard.constants.ts` | Defines dashboard status/enum/error constants that are module-owned. |
| `manager-dashboard.exceptions.ts` | Defines module-specific business exceptions. |
| `manager-dashboard.seeder.ts` | Provides deterministic, idempotent dashboard seed data for supported local/test scenarios. |
| `dashboard_dependencies.md` | Records approved dependencies and runtime event relationships. |
| `dashboard_forbidden.md` | Records dashboard-specific forbidden patterns with rule references and consequences. |
| `dashboard_collection.json` | Provides the module-specific Postman/Insomnia request collection. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `ManagerDashboardQueryController.findDashboardKpis` | GET | `/api/v1/manager/dashboard/kpis` | Returns the current tenant's KPI values needed by the dashboard KPI cards. | none | `ManagerDashboardFetchDashboardKpisResponseDto` |
| `ManagerDashboardQueryController.findDashboardCharts` | GET | `/api/v1/manager/dashboard/charts` | Returns the dashboard chart series and status/plan distributions for the selected period. | `ManagerDashboardQueryDto` | `ManagerDashboardFetchDashboardChartsResponseDto` |
| `ManagerDashboardQueryController.findDashboardRecentMembers` | GET | `/api/v1/manager/dashboard/recent-members` | Returns a server-paginated and server-searchable list of recently joined members. | `ManagerDashboardQueryDto` | `ManagerDashboardFetchDashboardRecentMembersResponseDto` + `PaginationMeta` |
| `ManagerDashboardQueryController.findDashboardPendingPayments` | GET | `/api/v1/manager/dashboard/pending-payments` | Returns a server-paginated and server-searchable list of pending member payments. | `ManagerDashboardQueryDto` | `ManagerDashboardFetchDashboardPendingPaymentsResponseDto` + `PaginationMeta` |
| `ManagerDashboardQueryController.findDashboardExpiringMemberships` | GET | `/api/v1/manager/dashboard/expiring-memberships` | Returns a server-paginated and server-searchable list of memberships approaching expiry. | `ManagerDashboardQueryDto` | `ManagerDashboardFetchDashboardExpiringMembershipsResponseDto` + `PaginationMeta` |

## Approved External Dependencies
- **Business Feature Dependencies**: Dashboard consumes only approved repository/domain data already exposed through the Manager module graph; direct imports of sibling feature business services are forbidden.
- **Infrastructure Dependencies**: `CoreRequestContextService`, tenant DataSource infrastructure, canonical response/validation infrastructure, pagination utilities, rate-limit guard, observability infrastructure, and cache infrastructure where configured.
- **Runtime/Event Dependencies**: None for the current read-only widget APIs. Dashboard read widgets must not depend on sibling feature runtime imports.

## Data and State Architecture
- **DB Entities**: Dashboard read models/query sources plus referenced tenant entities required to compute member, revenue, payment, staff, product, inquiry, attendance, plan, and membership-expiry metrics. The repository owns the exact SQL/ORM query path.
- **Redis Caching Keys**: Widget-specific keys may be used only where a supplied cache contract exists; keys MUST include trusted tenant identity and deterministic filter state. Mutations MUST invalidate affected keys after successful DB commit.
- **Event Emitters**: None for the current read-only widget APIs.
- **Background Jobs**: None required for the five read widgets. Any future heavy export/reporting capability belongs to the appropriate asynchronous feature, not the dashboard Mega API.
- **Idempotency Keys**: No current endpoint requires an `Idempotency-Key`; there are no dashboard mutation endpoints in the frozen contract.
- **Scheduled Jobs**: None owned by this module.

## Business Flow / Key Sequences
### KPI Widget
1. `ManagerDashboardQueryController.findDashboardKpis()` receives the request.
2. Global authentication, tenant, role, and resource guards execute first.
3. `ManagerDashboardFindDashboardKpisService.findDashboardKpis()` requests the KPI query result from `ManagerDashboardRepository`.
4. Repository queries run inside the trusted tenant DataSource and return explicit domain/result data.
5. Service applies domain-level computation only where required and returns `ManagerDashboardFetchDashboardKpisResponseDto`-compatible data.
6. Global `CoreResponseInterceptor` wraps the successful result in `ApiResponse<T>`.

### Recent Members / Pending Payments / Expiring Memberships
1. Controller validates `ManagerDashboardQueryDto` including search and pagination fields.
2. Focused query service delegates to the repository with the trusted tenant context.
3. Repository applies search/filter conditions before pagination and returns both rows and total count.
4. Service maps rows into the explicit widget DTO and calls `buildPaginationMeta()`.
5. Global response infrastructure returns the canonical envelope with `data` and `meta`.

### Dashboard Mutations
No dashboard mutation endpoints are currently defined. Keep this feature read-only; future mutations require a separately frozen API contract and the global mutation/orchestration rules before implementation.

## File Responsibility Map
- `manager-dashboard-query.controller.ts` — HTTP routing only; MUST NOT perform repository calls or calculate business aggregates.
- `manager-dashboard-find-dashboard-kpis.service.ts` — KPI business/read assembly only; MUST NOT access ORM APIs directly.
- `manager-dashboard-find-dashboard-charts.service.ts` — chart query/result assembly only; MUST NOT perform unrelated mutations.
- `manager-dashboard-find-dashboard-recent-members.service.ts` — recent-member search/pagination only; MUST NOT fetch all records into memory.
- `manager-dashboard-find-dashboard-pending-payments.service.ts` — pending-payment search/pagination only; MUST NOT bypass tenant scope.
- `manager-dashboard-find-dashboard-expiring-memberships.service.ts` — expiry-list search/pagination only; MUST NOT reconstruct business values in the frontend.
- `manager-dashboard-repository.ts` — dashboard persistence/query boundary only; MUST NOT contain HTTP concerns.
- `manager-dashboard-response.mapper.ts` — persistence/domain-to-response mapping only; MUST NOT query the database.
- `manager-dashboard.constants.ts` — dashboard-owned constants/enums only; MUST NOT become global business utility storage.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| GET `/api/v1/manager/dashboard/kpis` | `MANAGER` | Trusted tenant context must be established before query execution. |
| GET `/api/v1/manager/dashboard/charts` | `MANAGER` | Trusted tenant context must be established before query execution. |
| GET `/api/v1/manager/dashboard/recent-members` | `MANAGER` | Tenant scope plus resource checks for any UUID route parameter if introduced. |
| GET `/api/v1/manager/dashboard/pending-payments` | `MANAGER` | Tenant scope plus resource checks for any UUID route parameter if introduced. |
| GET `/api/v1/manager/dashboard/expiring-memberships` | `MANAGER` | Tenant scope plus resource checks for any UUID route parameter if introduced. |

## Edge Cases / AI Warnings
- **Widget fragmentation is mandatory** — adding a backend `/dashboard/stats` Mega API violates Rule 123 and collapses fault isolation.
- **Server-side filtering/pagination is mandatory** — moving recent-member or payment filtering into frontend memory violates Rule 17 and creates unbounded payload growth.
- **Currency pairing is mandatory** — monetary dashboard fields must remain integer smallest-unit values with a paired ISO-4217 `currency` field under Rule 118.
- **Tenant scope is mandatory** — every repository query must use the trusted tenant DataSource/context; client-supplied tenant identity must never select a database directly (Rule 39).
- **Response completeness is mandatory** — removing a field consumed by a dashboard KPI, chart, table, or badge violates Rule 82A even when the remaining response remains type-correct.
- **Mutations remain atomic** — any future multi-step dashboard mutation must use the orchestrator/UnitOfWork boundary and post-commit event ordering required by Rule 8B.

## Frozen API Contract

### Request Shape
| Endpoint | Method | Request DTO fields |
|---|---|---|
| `/api/v1/manager/dashboard/kpis` | GET | selected date/range query values when supported by `ManagerDashboardQueryDto` |
| `/api/v1/manager/dashboard/charts` | GET | selected date/range query values when supported by `ManagerDashboardQueryDto` |
| `/api/v1/manager/dashboard/recent-members` | GET | `search?`, `page?`, `limit?`, selected date/range fields where consumed by the frontend |
| `/api/v1/manager/dashboard/pending-payments` | GET | `search?`, `page?`, `limit?`, selected date/range fields where consumed by the frontend |
| `/api/v1/manager/dashboard/expiring-memberships` | GET | `search?`, `page?`, `limit?`, selected date/range fields where consumed by the frontend |

### Response Shape
| Endpoint | Response DTO fields | Notes |
|---|---|---|
| `/api/v1/manager/dashboard/kpis` | `totalMembers`, `activeMembers`, `newMembersThisMonth`, `totalRevenue`, `monthlyRevenue`, `pendingPayments`, `totalStaff`, `activeStaff`, `totalProducts`, `lowStockCount`, `totalInquiries`, `newInquiries`, `todayAttendance`, `trainerAttendance`, `churnRate`, `revenueGrowthPercent`, `todayCollection`, `frozenMembershipsCount`, `totalPTRevenue`, `currency` | Monetary values use smallest-unit integers; `currency` is the ISO-4217 response currency. |
| `/api/v1/manager/dashboard/charts` | `memberGrowth[]`, `revenueChart[]`, `membersByPlan[]`, `membersByStatus`, `currency` | `revenueChart[].revenue` uses smallest-unit integers. |
| `/api/v1/manager/dashboard/recent-members` | `recentMembers[]`, `totalRecentMembers`, `meta` | `recentMembers[]` includes `id`, `name`, `plan`, `status`, `joinDate`, `paidAmount`, `currency`. |
| `/api/v1/manager/dashboard/pending-payments` | `pendingPaymentsList[]`, `total`, `meta` | Each row includes `pendingAmount` and `currency`. |
| `/api/v1/manager/dashboard/expiring-memberships` | `expiringMemberships[]`, `total`, `meta` | Each row includes `pendingAmount` only when the frontend contract consumes it, plus `currency`. |

### UI-Required Fields
- **KPI cards**: `totalMembers`, `activeMembers`, `newMembersThisMonth`, `totalRevenue`, `monthlyRevenue`, `pendingPayments`, `totalStaff`, `activeStaff`, `totalProducts`, `lowStockCount`, `totalInquiries`, `newInquiries`, `todayAttendance`, `trainerAttendance.present`, `trainerAttendance.total`, `churnRate`, `revenueGrowthPercent`, `todayCollection`, `frozenMembershipsCount`, `totalPTRevenue`, `currency`.
- **Charts**: `memberGrowth[].month`, `memberGrowth[].count`, `revenueChart[].month`, `revenueChart[].revenue`, `membersByPlan[].plan`, `membersByPlan[].count`, `membersByStatus.active`, `membersByStatus.pending`, `membersByStatus.expired`, `currency`.
- **Recent members table**: `id`, `name`, `plan`, `status`, `joinDate`, `paidAmount`, `currency`, plus pagination totals.
- **Pending payments table**: `id`, `name`, `pendingAmount`, `currency`, `expiryDate`, plus pagination totals.
- **Expiring memberships table**: `id`, `name`, `pendingAmount`, `currency`, `expiryDate`, plus pagination totals.

### Pagination / Error Contract
- Pagination: `recent-members`, `pending-payments`, and `expiring-memberships` are paginated and return canonical `PaginationMeta` (`total`, `page`, `limit`, `totalPages`, `hasNextPage`, `hasPrevPage`). KPI and chart widgets are non-paginated and omit `meta`.
- Validation errors: HTTP `400`, `data: null`, `error: "VALIDATION_ERROR"`, `errorCode: "VALIDATION.DTO.FAILED"`, `statusCode: 400`, and `validationErrors[]` containing exact DTO field paths.
- Business errors: `errorCode` uses `DOMAIN.ENTITY.REASON`, `data` is always `null`, and human-readable messages resolve through the configured locale fallback chain.

## Rule Compliance Checklist
- [ ] Rule 7: approved project ORM only.
- [x] Rule 19: feature map synchronized with the current widget architecture.
- [x] Rule 28: canonical response envelope supplied by global response infrastructure.
- [x] Rule 29: soft deletes enforced by repository/core persistence boundaries where mutations exist.
- [x] Rule 31/112: no current dashboard mutation endpoints exist; any future mutation must inherit global idempotency enforcement before implementation.
- [x] Rule 34: repository queries must avoid N+1 loading.
- [x] Rule 41: concurrent mutable dashboard resources require locking/optimistic concurrency where applicable.
- [x] Rule 48: command/query controllers are separated.
- [x] Rule 62: focused services and repositories declare explicit return types.
- [x] Rule 76/79: controller/service/repository files begin with `RESPONSIBILITY` and `FLOW` comments.
- [x] Rule 80: public service/repository methods carry JSDoc contracts.
- [x] Rule 83: Manager RBAC is declarative at controller level.
- [x] Rule 85/87: service methods use guard clauses and small single-purpose bodies.
- [x] Rule 82A: widget DTOs explicitly document frontend UI-required fields.
- [x] Rule 86: verb-based `find...` naming is used for dashboard queries.
- [x] Rule 89: response paths must not expose raw ORM entities.
- [x] Rule 92: user-controlled filters/sort fields require allowlisting in the repository/query layer.
- [x] Rule 118: monetary values are paired with `currency` in exposed dashboard response contracts.
- [x] Rule 123: dashboard reads remain fragmented into widget-based APIs.

### Resource Authorization Note
Resource-ID routes use the explicit CoreAuthorizeResourceParam controller boundary and the feature-owned authorization service before the use-case service.

## Repair Baseline — 2026-09-24
- Controller/resource authorization remains centralized; foreign resource identifiers must declare their owning feature.
- All mutating endpoints use controller-level idempotency enforcement.
- All mutation flows remain inside the feature UnitOfWork/orchestrator boundary.
- Any durable event emitted by this feature is append-only for analytics; business state remains tenant-scoped.
- Changes in this repair set must remain inside this feature unless an explicit core/infrastructure dependency is required.

## Contract Governance Note — 2026-09-24
- Dashboard backend remains widget-sliced. The current frontend source still calls the aggregate `/api/v1/manager/dashboard/stats` operation; this is retained as a documented SOURCE CONFLICT rather than creating a forbidden Mega API.

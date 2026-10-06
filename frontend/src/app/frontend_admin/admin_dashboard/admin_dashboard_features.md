# Admin Dashboard — Feature Map

## Module Purpose
The Admin Dashboard module is the authenticated administrative overview surface for current operational health and performance signals. Users can inspect headline KPIs, revenue and attendance trends, branch performance, expiring-member information, system alerts, and period filters that drive dashboard queries. The module is read-oriented and derives all server-backed values through its query/API flow. It does not own mutation workflows or business data belonging to members, finance, HR, or subscriptions.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/dashboard` | ``frontend_admin/admin_dashboard/page.tsx`` | ``frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_main/AdminDashboardMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_dashboard/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_dashboard_api/` | Typed API transport boundary. | AdminDashboardApi.ts |
| `admin_dashboard_components/` | Feature component root. | (empty) |
| `admin_dashboard_constants/` | Static business configuration and query-key registries. | AdminDashboardConstants.ts, AdminDashboardQueryKeys.ts |
| `admin_dashboard_hooks/` | Feature data-flow and interaction hooks. | useAdminDashboardDateRangeSuffix.test.ts, useAdminDashboardDateRangeSuffix.ts, useAdminDashboardLogic.test.ts, useAdminDashboardLogic.ts |
| `admin_dashboard_locales/` | Module-owned localized resources. | admin_dashboard_en.json, admin_dashboard_hi.json |
| `admin_dashboard_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_dashboard_schemas/` | Zod validation/runtime contracts. | AdminDashboardSchemas.ts |
| `admin_dashboard_types/` | Domain, DTO, state, and prop type contracts. | AdminDashboardBranchLeaderboardSortIconPropsTypes.ts, AdminDashboardBranchLeaderboardTypes.ts, AdminDashboardDateFilterTypes.ts, AdminDashboardEmptyStatePropsTypes.ts, AdminDashboardErrorPropsTypes.ts, AdminDashboardQueryTypes.ts, AdminDashboardRangeTypes.ts, AdminDashboardTypes.ts |
| `admin_dashboard_utils/` | Feature-local deterministic utilities and formatters. | AdminDashboardFormatCurrency.test.ts, AdminDashboardFormatCurrency.ts, AdminDashboardFormatters.test.ts, AdminDashboardFormatters.ts, AdminDashboardSortBranchPerformanceRows.test.ts, AdminDashboardSortBranchPerformanceRows.ts |
| `admin_dashboard_components/admin_dashboard_alerts/` | Feature-owned implementation boundary. | AdminDashboardAlerts.tsx |
| `admin_dashboard_components/admin_dashboard_attendance_trend/` | Feature-owned implementation boundary. | AdminDashboardAttendanceTrend.tsx |
| `admin_dashboard_components/admin_dashboard_branch_leaderboard/` | Feature-owned implementation boundary. | AdminDashboardBranchLeaderboard.tsx, AdminDashboardBranchLeaderboardSortIcon.tsx |
| `admin_dashboard_components/admin_dashboard_date_filter/` | Feature-owned implementation boundary. | AdminDashboardDateFilterDropdown.tsx |
| `admin_dashboard_components/admin_dashboard_empty_state/` | Feature-owned implementation boundary. | AdminDashboardEmptyState.tsx |
| `admin_dashboard_components/admin_dashboard_expiring_widget/` | Feature-owned implementation boundary. | AdminDashboardExpiringWidget.tsx |
| `admin_dashboard_components/admin_dashboard_kpis/` | Feature-owned implementation boundary. | AdminDashboardKPIs.tsx |
| `admin_dashboard_components/admin_dashboard_main/` | Feature-owned implementation boundary. | AdminDashboardMain.tsx, AdminDashboardSkeleton.tsx |
| `admin_dashboard_components/admin_dashboard_revenue_trend/` | Feature-owned implementation boundary. | AdminDashboardRevenueTrend.tsx |
| `admin_dashboard_mocks/admin_dashboard_fixtures/` | Module-owned mock API datasets. | AdminDashboardMockFixtures.test.ts, AdminDashboardMockFixtures.ts |
| `admin_dashboard_mocks/admin_dashboard_handlers/` | Module-owned MSW request handlers. | AdminDashboardMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminDashboardAlerts.tsx` | `Renders/orchestrates AdminDashboardAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.` |
| `AdminDashboardAttendanceTrend.tsx` | `Renders the cross-branch daily attendance trend chart using ApexCharts.` |
| `AdminDashboardBranchLeaderboard.tsx` | `Renders the dashboard branch leaderboard with accessible, functional column sorting.` |
| `AdminDashboardBranchLeaderboardSortIcon.tsx` | `Renders the sortable-direction icon for a dashboard leaderboard header.` |
| `AdminDashboardDateFilterDropdown.tsx` | `A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).` |
| `AdminDashboardEmptyState.tsx` | `Renders the empty state for dashboard leaderboard data.` |
| `AdminDashboardExpiringWidget.tsx` | `Renders the expiring memberships widget showing members expiring this week and month across all branches.` |
| `AdminDashboardKPIs.tsx` | `Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic.` |
| `AdminDashboardMain.tsx` | `Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.` |
| `AdminDashboardSkeleton.tsx` | `Renders the dashboard route skeleton with KPI and chart-shaped placeholders.` |
| `AdminDashboardRevenueTrend.tsx` | `Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62).` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminDashboardDateRangeSuffix.ts`, `useAdminDashboardLogic.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `dashboard`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminDashboardApi.ts` | `fetchDashboardStats` | `GET` | `params: AdminDashboardStatsParams` | `ApiResponse<DashboardStats` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminDashboardAlerts.tsx` | Renders/orchestrates AdminDashboardAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardBranchLeaderboard.tsx` | Renders the dashboard branch leaderboard with accessible, functional column sorting. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardEmptyState.tsx` | Renders the empty state for dashboard leaderboard data. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardExpiringWidget.tsx` | Renders the expiring memberships widget showing members expiring this week and month across all branches. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardKPIs.tsx` | Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardMain.tsx` | Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.


## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.


## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminDashboardAlerts.tsx` | Renders/orchestrates AdminDashboardAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 2 |
| `AdminDashboardAttendanceTrend.tsx` | Renders the cross-branch daily attendance trend chart using ApexCharts. | 0 |
| `AdminDashboardBranchLeaderboard.tsx` | Renders the dashboard branch leaderboard with accessible, functional column sorting. | 2 |
| `AdminDashboardBranchLeaderboardSortIcon.tsx` | Renders the sortable-direction icon for a dashboard leaderboard header. | 0 |
| `AdminDashboardDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 |
| `AdminDashboardEmptyState.tsx` | Renders the empty state for dashboard leaderboard data. | 1 |
| `AdminDashboardExpiringWidget.tsx` | Renders the expiring memberships widget showing members expiring this week and month across all branches. | 3 |
| `AdminDashboardKPIs.tsx` | Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic. | 0 |
| `AdminDashboardMain.tsx` | Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context. | 0 |
| `AdminDashboardSkeleton.tsx` | Renders the dashboard route skeleton with KPI and chart-shaped placeholders. | 0 |
| `AdminDashboardRevenueTrend.tsx` | Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62). | 0 |


## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.


## Component Tree

`admin_dashboard_components/`
- `admin_dashboard_alerts/AdminDashboardAlerts.tsx`
- `admin_dashboard_attendance_trend/AdminDashboardAttendanceTrend.tsx`
- `admin_dashboard_branch_leaderboard/AdminDashboardBranchLeaderboard.tsx`
- `admin_dashboard_branch_leaderboard/AdminDashboardBranchLeaderboardSortIcon.tsx`
- `admin_dashboard_date_filter/AdminDashboardDateFilterDropdown.tsx`
- `admin_dashboard_empty_state/AdminDashboardEmptyState.tsx`
- `admin_dashboard_expiring_widget/AdminDashboardExpiringWidget.tsx`
- `admin_dashboard_kpis/AdminDashboardKPIs.tsx`
- `admin_dashboard_main/AdminDashboardMain.tsx`
- `admin_dashboard_main/AdminDashboardSkeleton.tsx`
- `admin_dashboard_revenue_trend/AdminDashboardRevenueTrend.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_dashboard_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

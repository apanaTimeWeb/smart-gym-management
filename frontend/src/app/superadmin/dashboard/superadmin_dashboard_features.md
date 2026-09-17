# Superadmin Dashboard — Feature Map

## Module Purpose
This Superadmin feature owns the `dashboard` route and its feature-specific UI, client logic, API boundary, types, schemas, constants, mocks, tests, and documentation. It is intended to be operable by the Superadmin role without importing sibling Superadmin business modules. The feature exposes only the controls represented by the current route and code in this folder. Backend authorization remains outside the frontend audit scope.

## Directory Structure

| Folder | Responsibility | Key files |
|---|---|---|
| `__tests__/` | Owns the feature responsibility represented by this folder. | `superadmin_dashboard_basic.test.tsx` |
| `dashboard_api/` | Owns the feature responsibility represented by this folder. | `superadmin_dashboard_api.ts` |
| `dashboard_components/` | Owns the feature responsibility represented by this folder. | `SuperadminDashboardDateFilterConstants.ts`, `SuperadminDashboardDateFilterDropdown.tsx`, `useSuperadminDashboardDateFilter.test.ts`, `useSuperadminDashboardDateFilter.ts`, `SuperadminDashboardCharts.tsx`, `SuperadminDashboardHeader.tsx`, `SuperadminDashboardKpiGrid.tsx`, `SuperadminDashboardRecentOnboards.tsx` |
| `dashboard_mocks/` | Owns the feature responsibility represented by this folder. | `SuperadminDashboardMockFixtures.ts`, `SuperadminDashboardMockHandlers.ts` |
| `dashboard_utils/` | Owns the feature responsibility represented by this folder. | `SuperadminDashboardConstants.ts` |
| `superadmin_dashboard_types/` | Owns the feature responsibility represented by this folder. | `superadmin_dashboard_types.ts` |

## Feature Inventory

| Feature | Route | User action | Key API/client owner | Status |
|---|---|---|---|---|
| `dashboard` | `/superadmin/dashboard` | Use the route's controls to perform the operations implemented by the current client UI. | `dashboard/dashboard_api/superadmin_dashboard_api.ts` | Implemented in source; runtime integration **NOT VERIFIED** without installing project dependencies. |

## User Flows & Interactions

### Flow 1: Open Feature
1. User navigates to the route shown above.
2. Next.js renders the route `page.tsx` and its client view.
3. The feature-owned client layer loads the data needed by the visible UI.
4. Loading, empty, error, or populated state is rendered according to the current implementation.

### Flow 2: Execute an Available Action
1. User activates an action exposed by the current feature UI.
2. The feature client/hook invokes the feature-owned API function.
3. The API boundary validates response data using the feature schema when a schema is supplied.
4. The UI updates local/query state and shows the resulting feedback.

## Data and State Architecture
- **Server state:** TanStack Query where the feature currently uses async queries.
- **UI state:** local `useState` or a feature-scoped Zustand store where present.
- **URL state:** `useSuperadminUrlState` only where the feature currently uses query-string filters/pagination.
- **Sibling business dependencies:** must remain zero; shared transport/UI primitives are infrastructure exceptions only.

## API Contract

| Function | Method | Endpoint expression | API file |
|---|---|---|---|
| `fetchDashboardMetrics()` | `GET` | `${DashboardUrlConfig.BACKEND_API.BASE}/metrics` | `dashboard/dashboard_api/superadmin_dashboard_api.ts` |

## UI Data Requirements

Observed schema/type fields in this feature are listed below. Any UI field not represented by a schema/type is **NOT VERIFIED** and must be checked by the coding agent.

| Field | Source location |
|---|---|
| `id` | Feature-owned schema/type file |
| `name` | Feature-owned schema/type file |
| `ownerName` | Feature-owned schema/type file |
| `adminEmail` | Feature-owned schema/type file |
| `phone` | Feature-owned schema/type file |
| `status` | Feature-owned schema/type file |
| `plan` | Feature-owned schema/type file |
| `createdAt` | Feature-owned schema/type file |
| `memberCount` | Feature-owned schema/type file |
| `monthlyRevenue` | Feature-owned schema/type file |
| `databaseVersion` | Feature-owned schema/type file |
| `city` | Feature-owned schema/type file |
| `state` | Feature-owned schema/type file |
| `country` | Feature-owned schema/type file |
| `gstin` | Feature-owned schema/type file |
| `trialEndsAt` | Feature-owned schema/type file |
| `lastLoginAt` | Feature-owned schema/type file |
| `lastActiveAt` | Feature-owned schema/type file |
| `staffCount` | Feature-owned schema/type file |
| `totalGyms` | Feature-owned schema/type file |
| `activeGyms` | Feature-owned schema/type file |
| `suspendedGyms` | Feature-owned schema/type file |
| `trialGyms` | Feature-owned schema/type file |
| `totalEndUsers` | Feature-owned schema/type file |
| `monthlyRecurringRevenue` | Feature-owned schema/type file |
| `mrrDeltaPercent` | Feature-owned schema/type file |
| `arrDeltaPercent` | Feature-owned schema/type file |
| `arpu` | Feature-owned schema/type file |
| `revenueByTier` | Feature-owned schema/type file |
| `amount` | Feature-owned schema/type file |
| `region` | Feature-owned schema/type file |
| `revenue` | Feature-owned schema/type file |
| `totalTenants` | Feature-owned schema/type file |
| `activeUsers` | Feature-owned schema/type file |
| `systemHealth` | Feature-owned schema/type file |
| `stats` | Feature-owned schema/type file |
| `isLoading` | Feature-owned schema/type file |
| `isError` | Feature-owned schema/type file |
| `error` | Feature-owned schema/type file |
| `timeRange` | Feature-owned schema/type file |

## Permissions and Security
- **Role:** `SUPERADMIN` UI.
- **Frontend boundary:** route and feature UI are under `/superadmin`.
- **Destructive actions:** must use the Superadmin confirmation infrastructure where the feature exposes destructive controls.
- **Backend authorization:** not evaluated here and must not be inferred from frontend checks.

## Loading, Empty, and Error States
- **Route loading:** use the feature `loading.tsx` when present.
- **Route error:** use the feature `error.tsx` when present.
- **Feature empty/error:** use the feature-specific empty/error UI already present in the source.
- Any runtime transition behavior not statically provable is **NOT VERIFIED**.

## Edge Cases and AI Warnings
- **No sibling business imports:** do not reintroduce imports from another Superadmin business feature.
- **No fake production data:** server-like records belong in feature mocks/fixtures, never fallback constants inside production UI.
- **No hardcoded URLs:** feature-owned routes belong in the single feature URL config.
- **No async state in Zustand:** use TanStack Query for server state.
- **Preserve destructive confirmation:** do not bypass the Superadmin confirmation flow.

## Component Responsibility Map

| File | Responsibility |
|---|---|
| `__tests__/superadmin_dashboard_basic.test.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `error.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `loading.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `page.tsx` | Owns the UI responsibility represented by its filename and current JSX. |

## Rule Compliance Checklist
- [x] Feature has a route-level `page.tsx` or the route does not require one.
- [x] Feature has module-owned documentation file.
- [x] Feature URL configuration is feature-owned when routes/API calls exist.
- [x] Sibling Superadmin business imports are not allowed.
- [x] API responses must use Zod validation at the boundary.
- [x] Server state is owned by TanStack Query where async data is used.
- [x] UI state remains local or feature-scoped.
- [ ] Full typecheck/lint/test/build/E2E verification — **NOT VERIFIED** in this working environment because project dependencies are not installed.
- [ ] Full visual comparison against `web_global_design.md` — **NOT VERIFIED** without browser execution.

## Documentation Consistency
This feature map is generated from the current repository structure. Where the code does not expose enough static evidence to state an exact runtime fact, the documentation deliberately uses **NOT VERIFIED** rather than inventing a result.


## Module-Owned MSW Fixtures

Feature-specific mock fixtures and MSW handlers are owned by this feature directory. API responses consumed by UI must remain complete for all documented table fields, KPIs, charts, filters, detail views and mutation messages. Global MSW bootstrap is registration infrastructure only.

## V1 Repair Notes

Nullable display fields use the canonical `displayValue()` formatter. Search input state remains separate from the 300ms debounced value used by server-backed query parameters/query keys.

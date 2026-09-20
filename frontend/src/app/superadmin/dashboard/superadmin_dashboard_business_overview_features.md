# Superadmin Dashboard Business Overview â€” Feature Map

## Module Purpose
The dashboard_business_overview module is responsible for the Superadmin business workflow managing Dashboard_business_overview. It enables superadmins to view, monitor, and control the lifecycle and configurations of Dashboard_business_overview across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `dashboard_api/` | Feature-owned responsibility for dashboard api. | `SuperadminDashboardApi.ts`, `SuperadminDashboardBusinessOverviewApi.ts` |
| `dashboard_mocks/` | Feature-owned responsibility for dashboard mocks. | `(directory present; no direct files)` |
| `dashboard_tests/` | Feature-owned responsibility for dashboard tests. | `SuperadminDashboardBasic.test.tsx`, `SuperadminDashboardBusinessOverview.test.ts` |
| `dashboard_types/` | Feature-owned responsibility for dashboard types. | `SuperadminDashboardTypes.ts`, `SuperadminDashboardV1Types.ts` |
| `dashboard_utils/` | Feature-owned responsibility for dashboard utils. | `SuperadminDashboardConstants.ts`, `useSuperadminDashboardV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Dashboard Business Overview | `/superadmin/dashboard` | custom date change; preset change | `SuperadminDashboardBusinessOverviewApi.ts`, `SuperadminDashboardApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/dashboard_business_overview route to load the Dashboard_business_overview data context securely via TanStack Query.
2. Interact with the Dashboard_business_overview dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Dashboard_business_overview status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `dashboard`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `dashboard_utils/useSuperadminDashboardV1.ts`, `dashboard_components/SuperadminDashboardDateFilterDropdown/useSuperadminDashboardDateFilter.ts`, `dashboard_components/SuperadminDashboardView/useSuperadminDashboardView.ts`, `dashboard_components/SuperadminDashboardView/useSuperadminDashboardDateRangeSuffix.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'dashboard_business_overview']`, `['superadmin', 'dashboard', timeRange, startDate, endDate]`

## API Contract

- **API files:** `dashboard_api/SuperadminDashboardApi.ts`, `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Detected API symbols:** `fetchDashboard` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardMetrics` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardBusinessOverview` — `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx`, `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx`, `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx`, `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** No direct TanStack Query `useMutation` usage detected.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardView. |
| `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx` | Renders the Superadmin dashboard V1 Why monthly income changed, Top & at-risk gyms, Critical platform alerts view. |
| `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx` | Renders the Superadmin dashboard V1 DashboardRetentionSummary summary cards. |
| `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx` | Renders the Superadmin dashboard V1 DashboardBusinessOverviewHeader. |
| `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx` | Pure View component for the Dashboard date filter dropdown, consuming its local hook. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx` | Renders the recent tenant onboarding records and navigates to the tenant detail page. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx` | Pure View component for the Dashboard. Renders KPI cards, charts, and recent onboards by consuming useSuperadminDashboardView. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx` | Renders the Dashboard revenue, growth, plan, and geography ApexCharts. No data fetching. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx` | Renders the Dashboard KPI cards. No API calls. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx` | Renders the Dashboard header with the local date filter. No API calls. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into dashboard_business_overview.
- **Destructive Actions**: Any deletion or modification of dashboard_business_overview records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for dashboard_business_overview do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


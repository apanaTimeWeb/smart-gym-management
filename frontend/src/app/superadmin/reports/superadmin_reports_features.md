# Superadmin Reports â€” Feature Map

## Module Purpose
The reports module is responsible for the Superadmin business workflow managing Reports. It enables superadmins to view, monitor, and control the lifecycle and configurations of Reports across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `reports_api/` | Feature-owned responsibility for reports api. | `SuperadminReportsApi.ts`, `SuperadminReportsComparisonApi.ts` |
| `reports_mocks/` | Feature-owned responsibility for reports mocks. | `(directory present; no direct files)` |
| `reports_tests/` | Feature-owned responsibility for reports tests. | `SuperadminReportsBasic.test.tsx`, `SuperadminReportsComparison.test.ts` |
| `reports_types/` | Feature-owned responsibility for reports types. | `SuperadminReportsConstants.ts`, `SuperadminReportsDatePresetDropdownTypes.ts`, `SuperadminReportsExportButtonTypes.ts`, `SuperadminReportsTabTypes.ts`, `SuperadminReportsTypes.ts`, `SuperadminReportsV1ComparisonTypes.ts`, `SuperadminReportsV1Types.ts` |
| `reports_utils/` | Feature-owned responsibility for reports utils. | `SuperadminReportsConstants.ts`, `SuperadminReportsV1ComparisonUtils.ts`, `useSuperadminReportsPage.ts`, `useSuperadminReportsV1.ts` |

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
| Superadmin Reports | `/superadmin/reports` | date change; export; export c s v; preset change | `SuperadminReportsComparisonApi.ts`, `SuperadminReportsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/reports route to load the Reports data context securely via TanStack Query.
2. Interact with the Reports dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Reports status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `reports`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `reports_utils/useSuperadminReportsPage.ts`, `reports_utils/useSuperadminReportsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'reports', 'revenue', queryParams]`, `['superadmin', 'reports', 'cancellations', queryParams]`, `['superadmin', 'reports', 'health', queryParams]`, `['superadmin', 'reports_comparison', params]`

## API Contract

- **API files:** `reports_api/SuperadminReportsComparisonApi.ts`, `reports_api/SuperadminReportsApi.ts`
- **Detected API symbols:** `fetchReportsComparison` — `reports_api/SuperadminReportsComparisonApi.ts`; `fetchRevenueData` — `reports_api/SuperadminReportsApi.ts`; `fetchCancellationsData` — `reports_api/SuperadminReportsApi.ts`; `fetchHealthData` — `reports_api/SuperadminReportsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `reports_components/SuperadminReportsV1ComparisonControls.tsx`, `reports_components/SuperadminReportsClient.tsx`, `reports_components/SuperadminReportsExportButton.tsx`, `reports_components/SuperadminReportsSummaryCards.tsx`, `reports_components/SuperadminReportsDatePresetDropdown.tsx`, `reports_components/SuperadminReportsV1PlanAndRegionComparison.tsx`, `reports_components/SuperadminReportsHealthTab.tsx`, `reports_components/SuperadminReportsCancellationsTab.tsx`, `reports_components/SuperadminReportsV1ComparisonSummary.tsx`, `reports_components/SuperadminReportsRevenueTab.tsx`
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
| `page.tsx` | Renders the page component and its associated UI logic. |
| `reports_components/SuperadminReportsV1ComparisonControls.tsx` | Renders report period/segment controls from server-provided definitions and exports the selected comparison dataset. |
| `reports_components/SuperadminReportsClient.tsx` | Renders Reports from hook-owned server state and URL-owned filters. No direct API calls occur in this component. |
| `reports_components/SuperadminReportsExportButton.tsx` | Renders the Reports Export Button component and its associated UI logic. |
| `reports_components/SuperadminReportsSummaryCards.tsx` | Renders the Reports Summary Cards component and its associated UI logic. |
| `reports_components/SuperadminReportsDatePresetDropdown.tsx` | Renders the Reports date preset selector and emits the selected preset plus calculated range to its parent. |
| `reports_components/SuperadminReportsV1PlanAndRegionComparison.tsx` | Renders the Superadmin reports V1 Plan comparison, Region comparison view. |
| `reports_components/SuperadminReportsHealthTab.tsx` | Renders the Reports Health Tab component and its associated UI logic. |
| `reports_components/SuperadminReportsCancellationsTab.tsx` | Renders the Reports Cancellations Tab component and its associated UI logic. |
| `reports_components/SuperadminReportsV1ComparisonSummary.tsx` | Renders the Superadmin reports V1 ReportsComparisonSummary. |
| `reports_components/SuperadminReportsRevenueTab.tsx` | Renders the Reports Revenue Tab component and its associated UI logic. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into reports.
- **Destructive Actions**: Any deletion or modification of reports records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for reports do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


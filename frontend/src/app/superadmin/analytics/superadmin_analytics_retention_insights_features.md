# Superadmin Analytics Retention Insights â€” Feature Map

## Module Purpose
The analytics_retention_insights module is responsible for the Superadmin business workflow managing Analytics_retention_insights. It enables superadmins to view, monitor, and control the lifecycle and configurations of Analytics_retention_insights across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `analytics_api/` | Feature-owned responsibility for analytics api. | `SuperadminAnalyticsApi.ts`, `SuperadminAnalyticsRetentionInsightsApi.ts` |
| `analytics_mocks/` | Feature-owned responsibility for analytics mocks. | `(directory present; no direct files)` |
| `analytics_tests/` | Feature-owned responsibility for analytics tests. | `SuperadminAnalyticsBasic.test.tsx`, `SuperadminAnalyticsRetentionInsights.test.ts` |
| `analytics_types/` | Feature-owned responsibility for analytics types. | `SuperadminAnalyticsTypes.ts`, `SuperadminAnalyticsV1Types.ts` |
| `analytics_utils/` | Feature-owned responsibility for analytics utils. | `useSuperadminAnalyticsPage.ts`, `useSuperadminAnalyticsV1.ts` |

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
| Superadmin Analytics Retention Insights | `/superadmin/analytics` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminAnalyticsRetentionInsightsApi.ts`, `SuperadminAnalyticsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/analytics_retention_insights route to load the Analytics_retention_insights data context securely via TanStack Query.
2. Interact with the Analytics_retention_insights dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Analytics_retention_insights status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `analytics`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `analytics_utils/useSuperadminAnalyticsPage.ts`, `analytics_utils/useSuperadminAnalyticsV1.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'analytics', timeRange, customStart, customEnd]`, `['superadmin', 'analytics_retention_insights']`

## API Contract

- **API files:** `analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`, `analytics_api/SuperadminAnalyticsApi.ts`
- **Detected API symbols:** `fetchAnalyticsRetentionInsights` — `analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`; `fetchRevenueMetrics` — `analytics_api/SuperadminAnalyticsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx`, `analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx`, `analytics_components/SuperadminAnalyticsClient.tsx`, `analytics_components/SuperadminAnalyticsDateFilterDropdown.tsx`, `analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx`, `analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx`
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
| `page.tsx` | Renders the page component. |
| `analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx` | Renders the Superadmin analytics V1 Cohort retention view. |
| `analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx` | Renders the Superadmin analytics V1 AnalyticsRetentionSummary summary cards. |
| `analytics_components/SuperadminAnalyticsClient.tsx` | Renders the Revenue Analytics dashboard â€” KPI cards + ApexCharts area/bar charts. |
| `analytics_components/SuperadminAnalyticsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx` | Renders the Superadmin analytics V1 Feature adoption, Acquisition source comparison view. |
| `analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx` | Renders the Superadmin analytics V1 Income movement, Revenue share concentration view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into analytics_retention_insights.
- **Destructive Actions**: Any deletion or modification of analytics_retention_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for analytics_retention_insights do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


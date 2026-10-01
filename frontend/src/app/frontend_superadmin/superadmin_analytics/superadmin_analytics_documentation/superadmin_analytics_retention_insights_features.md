# Superadmin Analytics Retention Insights — Feature Map

## Module Purpose
The analytics_retention_insights module is responsible for the Superadmin business workflow managing Analytics_retention_insights. It enables superadmins to view, monitor, and control the lifecycle and configurations of Analytics_retention_insights across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_analytics_api/` | Feature-owned responsibility for analytics api. | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` |
| `superadmin_analytics_mocks/` | Feature-owned responsibility for analytics mocks. | `(directory present; no direct files)` |
| `superadmin_analytics_tests/` | Feature-owned responsibility for analytics tests. | `superadmin_analytics_tests/SuperadminAnalyticsBasic.test.tsx`, `superadmin_analytics_tests/SuperadminAnalyticsRetentionInsights.test.ts` |
| `superadmin_analytics_types/` | Feature-owned responsibility for analytics types. | `superadmin_analytics_types/SuperadminAnalyticsTypes.ts`, `superadmin_analytics_types/SuperadminAnalyticsV1Types.ts` |
| `superadmin_analytics_utils/` | Feature-owned responsibility for analytics utils. | `superadmin_analytics_utils/useSuperadminAnalyticsPage.ts`, `superadmin_analytics_utils/useSuperadminAnalyticsV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui` — role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` — only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Analytics Retention Insights | `/superadmin/analytics` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
1. Open the owning `/superadmin/analytics` route and load the retention-insights surface through the module-owned TanStack Query path.
2. Use the documented analytics date/filter controls that affect the parent analytics query.
3. Review the returned retention summary/cohort data; this sub-feature has a read-only fetch contract in the supplied API surface.
4. Recover from query failure through the feature retry path; no retention-insights mutation is claimed where the supplied API does not define one.

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
- **Custom hooks:** `superadmin_analytics_utils/useSuperadminAnalyticsPage.ts`, `superadmin_analytics_utils/useSuperadminAnalyticsV1.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'analytics', timeRange, customStart, customEnd]`, `['superadmin', 'analytics_retention_insights']`

## API Contract

- **API files:** `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsApi.ts`
- **Detected API symbols:** `fetchAnalyticsRetentionInsights` — `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`; `fetchRevenueMetrics` — `superadmin_analytics_api/SuperadminAnalyticsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `superadmin_analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx`, `superadmin_analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx`, `superadmin_analytics_components/SuperadminAnalyticsMain.tsx`, `superadmin_analytics_components/SuperadminAnalyticsDateFilterDropdown.tsx`, `superadmin_analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx`, `superadmin_analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx`
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
| `superadmin_analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx` | Renders the Superadmin analytics V1 Cohort retention view. |
| `superadmin_analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx` | Renders the Superadmin analytics V1 AnalyticsRetentionSummary summary cards. |
| `superadmin_analytics_components/SuperadminAnalyticsMain.tsx` | Renders the Revenue Analytics dashboard — KPI cards + ApexCharts area/bar charts. |
| `superadmin_analytics_components/SuperadminAnalyticsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `superadmin_analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx` | Renders the Superadmin analytics V1 Feature adoption, Acquisition source comparison view. |
| `superadmin_analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx` | Renders the Superadmin analytics V1 Income movement, Revenue share concentration view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into analytics_retention_insights.
- **Destructive Actions**: Any deletion or modification of analytics_retention_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for analytics_retention_insights do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_analytics_api/`
- `superadmin_analytics_components/`
- `superadmin_analytics_constants/`
- `superadmin_analytics_locales/`
- `superadmin_analytics_mocks/`
- `superadmin_analytics_query_keys/`
- `superadmin_analytics_schemas/`
- `superadmin_analytics_tests/`
- `superadmin_analytics_types/`
- `superadmin_analytics_url_config.ts`
- `superadmin_analytics_utils/`

### Current root files
- `error.tsx`
- `loading.tsx`
- `page.tsx`
- `superadmin_analytics_features.md`
- `superadmin_analytics_forbidden.md`
- `superadmin_analytics_repair_map.md`
- `superadmin_analytics_retention_insights_features.md`
- `superadmin_analytics_retention_insights_forbidden.md`
- `superadmin_analytics_retention_insights_repair_map.md`
- `superadmin_analytics_retention_insights_theme_contract.md`
- `superadmin_analytics_theme_contract.md`


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.



## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

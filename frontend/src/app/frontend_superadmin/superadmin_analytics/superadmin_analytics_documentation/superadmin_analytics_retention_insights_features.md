# Superadmin Analytics Retention Insights — Feature Map

## Module Purpose
superadmin_analytics_retention_insights_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/analytics``. Authenticated Superadmin users can view the module surface; use the documented filters and controls; open supported detail/edit surfaces. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``../superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`, `../superadmin_analytics_api/SuperadminAnalyticsApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchAnalyticsRetentionInsights`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_analytics`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_analytics_features.md, superadmin_analytics_forbidden.md, superadmin_analytics_theme_contract.md, superadmin_analytics_url_config.ts` |
| `superadmin_analytics_api/` | Owns module-scoped api artifacts. | `SuperadminAnalyticsApi.ts, SuperadminAnalyticsRetentionInsightsApi.ts` |
| `superadmin_analytics_components/` | Owns module-scoped components artifacts. | `SuperadminAnalyticsDateFilterDropdown.tsx, SuperadminAnalyticsKpiGrid.tsx, SuperadminAnalyticsMain.tsx, SuperadminAnalyticsMainErrorState.tsx, SuperadminAnalyticsMainLoadingState.tsx` (+7 more) |
| `superadmin_analytics_constants/` | Owns module-scoped constants artifacts. | `SuperadminAnalyticsDateFilterConstants.test.ts, SuperadminAnalyticsDateFilterConstants.ts, SuperadminAnalyticsDateRangeConstants.ts, SuperadminAnalyticsKpiConstants.ts, SuperadminAnalyticsQueryKeys.ts` |
| `superadmin_analytics_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_analytics_repair_map.md, superadmin_analytics_retention_insights_features.md, superadmin_analytics_retention_insights_forbidden.md, superadmin_analytics_retention_insights_repair_map.md, superadmin_analytics_retention_insights_theme_contract.md` |
| `superadmin_analytics_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminAnalyticsChartViewModel.test.ts, useSuperadminAnalyticsChartViewModel.ts, useSuperadminAnalyticsDashboardViewModel.test.ts, useSuperadminAnalyticsDashboardViewModel.ts, useSuperadminAnalyticsDateRangeSuffix.test.ts` (+7 more) |
| `superadmin_analytics_locales/` | Owns module-scoped locales artifacts. | `superadmin_analytics_en.json, superadmin_analytics_hi.json` |
| `superadmin_analytics_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_analytics_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminAnalyticsTypesSchemas.ts, SuperadminAnalyticsV1ResponseSchema.ts, SuperadminAnalyticsV1Schema.ts` |
| `superadmin_analytics_tests/` | Owns module-scoped tests artifacts. | `SuperadminAnalyticsBasic.test.tsx, SuperadminAnalyticsRetentionInsights.test.ts` |
| `superadmin_analytics_types/` | Owns module-scoped types artifacts. | `SuperadminAnalyticsDashboardViewModelTypes.ts, SuperadminAnalyticsDateFilterTypes.ts, SuperadminAnalyticsKpiGridTypes.ts, SuperadminAnalyticsKpiViewModelTypes.ts, SuperadminAnalyticsMainErrorStateTypes.ts` (+5 more) |
| `superadmin_analytics_utils/` | Owns module-scoped utils artifacts. | `SuperadminAnalyticsDateRangeUtils.test.ts, SuperadminAnalyticsDateRangeUtils.ts, SuperadminAnalyticsFormatCurrency.test.ts, SuperadminAnalyticsFormatCurrency.ts, SuperadminAnalyticsFormatters.test.ts` (+1 more) |

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
| Superadmin Analytics Retention Insights | `/superadmin/analytics` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `../superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`, `../superadmin_analytics_api/SuperadminAnalyticsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
1. Open the owning `/superadmin/analytics` route and load the retention-insights surface through the module-owned TanStack Query path.
2. Use the documented analytics date/filter controls that affect the parent analytics query.
3. Review the returned retention summary/cohort data; this sub-feature has a read-only fetch contract in the supplied API surface.
4. Recover from query failure through the feature retry path; no retention-insights mutation is claimed where the supplied API does not define one.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `../page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_analytics`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `../superadmin_analytics_hooks/useSuperadminAnalyticsPage.ts`, `../superadmin_analytics_hooks/useSuperadminAnalyticsV1.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `superadmin_analytics_constants/SuperadminAnalyticsQueryKeys.ts`

## API Contract

- **API files:** `../superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`, `../superadmin_analytics_api/SuperadminAnalyticsApi.ts`
- **Detected API symbols:** `fetchAnalyticsRetentionInsights` — `../superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts`; `fetchRevenueMetrics` — `../superadmin_analytics_api/SuperadminAnalyticsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx` | `adoption`, `sources`, `metrics` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx` | `cohort` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx` | `movement`, `metrics`, `concentration` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx` | `metrics` | `superadmin_analytics_api/SuperadminAnalyticsApi.ts`, `superadmin_analytics_api/SuperadminAnalyticsRetentionInsightsApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** No direct TanStack Query `useMutation` usage detected.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`../loading.tsx`:** `../loading.tsx`
- **`../error.tsx`:** `../error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `../page.tsx` | Renders the page component. |
| `../superadmin_analytics_components/SuperadminAnalyticsV1CohortRetentionTable.tsx` | Renders the Superadmin analytics V1 Cohort retention view. |
| `../superadmin_analytics_components/SuperadminAnalyticsV1RetentionSummaryCards.tsx` | Renders the Superadmin analytics V1 AnalyticsRetentionSummary summary cards. |
| `../superadmin_analytics_components/SuperadminAnalyticsMain.tsx` | Renders the Revenue Analytics dashboard — KPI cards + ApexCharts area/bar charts. |
| `../superadmin_analytics_components/SuperadminAnalyticsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `../superadmin_analytics_components/SuperadminAnalyticsV1AdoptionAndAcquisitionSection.tsx` | Renders the Superadmin analytics V1 Feature adoption, Acquisition source comparison view. |
| `../superadmin_analytics_components/SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection.tsx` | Renders the Superadmin analytics V1 Income movement, Revenue share concentration view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into analytics_retention_insights.
- **Destructive Actions**: Any deletion or modification of analytics_retention_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for analytics_retention_insights do not expose cross-tenant sensitive data.

- **Module API boundary:** All `analytics` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `analytics` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `analytics` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `analytics` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `analytics` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Canonical Current Source Structure (v13-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_analytics_api/`
- `superadmin_analytics_components/`
- `superadmin_analytics_constants/`
- `superadmin_analytics_locales/`
- `superadmin_analytics_mocks/`
- `superadmin_analytics_constants/`
- `superadmin_analytics_schemas/`
- `superadmin_analytics_tests/`
- `superadmin_analytics_types/`
- `../superadmin_analytics_url_config.ts`
- `superadmin_analytics_utils/`

### Current root files
- `../error.tsx`
- `../loading.tsx`
- `../page.tsx`
- `../superadmin_analytics_features.md`
- `../superadmin_analytics_forbidden.md`
- `superadmin_analytics_repair_map.md`
- `superadmin_analytics_retention_insights_features.md`
- `superadmin_analytics_retention_insights_forbidden.md`
- `superadmin_analytics_retention_insights_repair_map.md`
- `superadmin_analytics_retention_insights_theme_contract.md`
- `../superadmin_analytics_theme_contract.md`

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

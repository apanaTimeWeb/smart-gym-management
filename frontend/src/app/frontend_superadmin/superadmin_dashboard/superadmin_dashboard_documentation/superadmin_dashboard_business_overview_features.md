# Superadmin Dashboard Business Overview — Feature Map

## Module Purpose
superadmin_dashboard_business_overview_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/dashboard``. Authenticated Superadmin users can custom date change; preset change. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``../superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`, `../superadmin_dashboard_api/SuperadminDashboardApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchDashboardBusinessOverview`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_dashboard`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_dashboard_features.md, superadmin_dashboard_forbidden.md, superadmin_dashboard_theme_contract.md, superadmin_dashboard_url_config.ts` |
| `superadmin_dashboard_api/` | Owns module-scoped api artifacts. | `SuperadminDashboardApi.ts, SuperadminDashboardBusinessOverviewApi.ts` |
| `superadmin_dashboard_constants/` | Owns module-scoped constants artifacts. | `SuperadminDashboardConstants.test.ts, SuperadminDashboardConstants.ts, SuperadminDashboardDateFilterConstants.ts, SuperadminDashboardDateRangeConstants.ts, SuperadminDashboardQueryKeys.ts` |
| `superadmin_dashboard_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_dashboard_business_overview_features.md, superadmin_dashboard_business_overview_forbidden.md, superadmin_dashboard_business_overview_repair_map.md, superadmin_dashboard_business_overview_theme_contract.md, superadmin_dashboard_repair_map.md` |
| `superadmin_dashboard_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminDashboardDateFilter.test.ts, useSuperadminDashboardDateFilter.ts, useSuperadminDashboardDateRangeSuffix.test.ts, useSuperadminDashboardDateRangeSuffix.ts, useSuperadminDashboardMain.test.ts` (+3 more) |
| `superadmin_dashboard_locales/` | Owns module-scoped locales artifacts. | `superadmin_dashboard_en.json, superadmin_dashboard_hi.json` |
| `superadmin_dashboard_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_dashboard_tests/` | Owns module-scoped tests artifacts. | `SuperadminDashboardBasic.test.tsx, SuperadminDashboardBusinessOverview.test.ts` |
| `superadmin_dashboard_utils/` | Owns module-scoped utils artifacts. | `SuperadminDashboardDateRangeUtils.test.ts, SuperadminDashboardDateRangeUtils.ts, SuperadminDashboardFormatCurrency.test.ts, SuperadminDashboardFormatCurrency.ts, SuperadminDashboardFormatters.test.ts` (+1 more) |

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
| Superadmin Dashboard Business Overview | `/superadmin/dashboard` | custom date change; preset change | `../superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`, `../superadmin_dashboard_api/SuperadminDashboardApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
1. Open the owning `/superadmin/dashboard` route and load the Business Overview surface through the module-owned TanStack Query path.
2. Change the documented date range to change the dashboard request and dependent view models.
3. Review the read-only business-overview metrics/charts; the supplied API surface exposes fetch operations rather than CRUD mutation operations for this sub-feature.
4. Recover from query failure through the feature retry path.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `../page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_dashboard`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `superadmin_dashboard_constants/SuperadminDashboardQueryKeys.ts`

## API Contract

- **API files:** `../superadmin_dashboard_api/SuperadminDashboardApi.ts`, `../superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Detected API symbols:** `fetchDashboard` — `../superadmin_dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardMetrics` — `../superadmin_dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardBusinessOverview` — `../superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardCharts.tsx` | `currency`, `revenueByTier`, `toUpperCase`, `revenueByGeography`, `arrDeltaPercent` | `superadmin_dashboard_api/SuperadminDashboardApi.ts`, `superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardKpiGrid.tsx` | `platformHealthScore`, `monthlyRecurringRevenue`, `currency`, `mrrDeltaPercent`, `totalGyms`, `activeGyms`, `totalEndUsers`, `arpu` | `superadmin_dashboard_api/SuperadminDashboardApi.ts`, `superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardMain.tsx` | `recentOnboards` | `superadmin_dashboard_api/SuperadminDashboardApi.ts`, `superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardRecentOnboards.tsx` | `plan`, `id`, `name`, `ownerName`, `createdAt` | `superadmin_dashboard_api/SuperadminDashboardApi.ts`, `superadmin_dashboard_api/SuperadminDashboardBusinessOverviewApi.ts` | Module-owned fixture/handler |

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
| `../page.tsx` | Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardMain. |
| `../superadmin_dashboard_components/superadmin_dashboard_date_filter_dropdown/SuperadminDashboardDateFilterDropdown.tsx` | Pure View component for the Dashboard date filter dropdown, consuming its local hook. |
| `../superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardRecentOnboards.tsx` | Renders the recent tenant onboarding records and navigates to the tenant detail page. |
| `../superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardMain.tsx` | Pure View component for the Dashboard. Renders KPI cards, charts, and recent onboards by consuming useSuperadminDashboardMain. |
| `../superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardCharts.tsx` | Renders the Dashboard revenue, growth, plan, and geography ApexCharts. No data fetching. |
| `../superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardKpiGrid.tsx` | Renders the Dashboard KPI cards. No API calls. |
| `../superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardHeader.tsx` | Renders the Dashboard header with the local date filter. No API calls. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into dashboard_business_overview.
- **Destructive Actions**: Any deletion or modification of dashboard_business_overview records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for dashboard_business_overview do not expose cross-tenant sensitive data.

- **Module API boundary:** All `dashboard` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `dashboard` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `dashboard` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `dashboard` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `dashboard` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Canonical Current Source Structure (v13-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_dashboard_api/`
- `superadmin_dashboard_components/`
- `superadmin_dashboard_constants/`
- `superadmin_dashboard_locales/`
- `superadmin_dashboard_mocks/`
- `superadmin_dashboard_constants/`
- `superadmin_dashboard_schemas/`
- `superadmin_dashboard_tests/`
- `superadmin_dashboard_types/`
- `../superadmin_dashboard_url_config.ts`
- `superadmin_dashboard_utils/`

### Current root files
- `../error.tsx`
- `../loading.tsx`
- `../page.tsx`
- `superadmin_dashboard_business_overview_features.md`
- `superadmin_dashboard_business_overview_forbidden.md`
- `superadmin_dashboard_business_overview_repair_map.md`
- `superadmin_dashboard_business_overview_theme_contract.md`
- `../superadmin_dashboard_features.md`
- `../superadmin_dashboard_forbidden.md`
- `superadmin_dashboard_repair_map.md`
- `../superadmin_dashboard_theme_contract.md`

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

## V15 Repair Supersession

The business-overview V1 implementation was an orphaned, unmounted stack in the supplied role package and was removed during the V15 repair. This document is retained as historical evidence only and is not an active route/component/API contract.

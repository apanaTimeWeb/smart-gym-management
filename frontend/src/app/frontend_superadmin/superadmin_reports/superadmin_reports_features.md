# Superadmin Reports â€” Feature Map

## Module Purpose
superadmin_reports_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/reports``. Authenticated Superadmin users can date change; export; export c s v; preset change. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsApi.ts``.


## Routes

- Primary feature route: `/superadmin/reports`
- Route ownership remains inside `superadmin_reports`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminReportsCancellationsTab.tsx`, `SuperadminReportsDatePresetDropdown.tsx`, `SuperadminReportsExportButton.tsx`, `SuperadminReportsHealthTab.tsx`, `SuperadminReportsMain.tsx`, `SuperadminReportsProgressBar.tsx`, `SuperadminReportsRevenueTab.tsx`, `SuperadminReportsSummaryCards.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `fetchCancellationsData`, `fetchHealthData`, `fetchRevenueData`, `requestExport`.
- URL paths remain centralized in `superadmin_reports_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_reports_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_reports_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- Lucide React
- MSW
- Next.js
- Next.js dynamic import
- React
- TanStack Query
- Vitest
- Zod
- next-intl
- sonner

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchCancellationsData`, `fetchHealthData`, `fetchReportsComparison`, `fetchRevenueData`, `requestExport`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_reports`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_reports_features.md, superadmin_reports_forbidden.md, superadmin_reports_theme_contract.md, superadmin_reports_url_config.ts` |
| `superadmin_reports_api/` | Owns module-scoped api artifacts. | `SuperadminReportsApi.ts, SuperadminReportsComparisonApi.ts, SuperadminReportsExportApi.ts` |
| `superadmin_reports_components/` | Owns module-scoped components artifacts. | `SuperadminReportsCancellationsTab.tsx, SuperadminReportsDatePresetDropdown.tsx, SuperadminReportsExportButton.tsx, SuperadminReportsHealthTab.tsx, SuperadminReportsMain.tsx` (+4 more) |
| `superadmin_reports_constants/` | Owns module-scoped constants artifacts. | `SuperadminReportsConstants.test.ts, SuperadminReportsConstants.ts, SuperadminReportsQueryKeys.ts` |
| `superadmin_reports_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_reports_comparison_features.md, superadmin_reports_comparison_forbidden.md, superadmin_reports_comparison_theme_contract.md` |
| `superadmin_reports_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminReportsExportMutation.test.ts, useSuperadminReportsExportMutation.ts, useSuperadminReportsMain.test.ts, useSuperadminReportsMain.ts, useSuperadminReportsPage.test.tsx` (+3 more) |
| `superadmin_reports_locales/` | Owns module-scoped locales artifacts. | `superadmin_reports_en.json, superadmin_reports_hi.json` |
| `superadmin_reports_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_reports_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminReportsContractSchemas.ts, SuperadminReportsExportResponseSchema.ts, SuperadminReportsV1ContractSchemas.ts` |
| `superadmin_reports_tests/` | Owns module-scoped tests artifacts. | `SuperadminReportsBasic.test.tsx, SuperadminReportsComparison.test.ts` |
| `superadmin_reports_types/` | Owns module-scoped types artifacts. | `SuperadminReportsDatePresetDropdownTypes.ts, SuperadminReportsExportButtonTypes.ts, SuperadminReportsProgressBarTypes.ts, SuperadminReportsTabTypes.ts, SuperadminReportsTypes.ts` (+2 more) |
| `superadmin_reports_utils/` | Owns module-scoped utils artifacts. | `SuperadminReportsDateRangeUtils.test.ts, SuperadminReportsDateRangeUtils.ts, SuperadminReportsFormatCurrency.test.ts, SuperadminReportsFormatCurrency.ts, SuperadminReportsV1ComparisonUtils.test.ts` (+1 more) |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/ChartConstants`
- `@/components/ui/SearchableDropdown`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/formatters`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Reports | `/superadmin/reports` | date change; export; export c s v; preset change | `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary reports view
1. Enter `/superadmin/reports`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminReportsMain.tsx`.
2. `useSuperadminReportsPage.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported server mutation
1. Submit the supported action through `useSuperadminReportsExportMutation.test.ts` (not directly through an API client from JSX).
2. The feature API sends the same idempotency key for retries of one user intent and surfaces the backend response message through the approved toast path.
3. Mutation success reconciles the affected module query keys before the UI presents the resulting authoritative state; failure preserves the retryable path and does not fabricate a success state.

### Flow 4 — Recover from a failed request
1. A rejected request enters the feature's error boundary/state instead of rendering stale success data.
2. The visible Retry/reload affordance reuses the owning query hook or refetch callback, preserving the module's current UI state where documented.
3. The success path is reached only after a new authoritative response arrives; stale cached data is reconciled through the module query-key contract.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_reports`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_reports_hooks/useSuperadminReportsPage.ts`, `superadmin_reports_hooks/useSuperadminReportsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_reports_constants/SuperadminReportsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsApi.ts`
- **Detected API symbols:** `fetchReportsComparison` — `superadmin_reports_api/SuperadminReportsComparisonApi.ts`; `fetchRevenueData` — `superadmin_reports_api/SuperadminReportsApi.ts`; `fetchCancellationsData` — `superadmin_reports_api/SuperadminReportsApi.ts`; `fetchHealthData` — `superadmin_reports_api/SuperadminReportsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_reports_components/SuperadminReportsCancellationsTab.tsx` | `reason`, `id`, `gymName`, `ownerName`, `plan`, `cancelledAt`, `mrr`, `daysActive` | `superadmin_reports_api/SuperadminReportsApi.ts`, `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsExportApi.ts` | Module-owned fixture/handler |
| `superadmin_reports_components/SuperadminReportsHealthTab.tsx` | `id`, `gymName`, `plan`, `score`, `grade`, `memberCount`, `lastLogin`, `paymentHealth` | `superadmin_reports_api/SuperadminReportsApi.ts`, `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsExportApi.ts` | Module-owned fixture/handler |
| `superadmin_reports_components/SuperadminReportsMain.tsx` | `isPending`, `isError`, `retryAll`, `handleExportCSV`, `handleExportPDF`, `isExporting`, `totalMRR`, `totalCancelledRevenue` | `superadmin_reports_api/SuperadminReportsApi.ts`, `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsExportApi.ts` | Module-owned fixture/handler |
| `superadmin_reports_components/SuperadminReportsRevenueTab.tsx` | `month`, `mrr`, `newRevenue`, `cancelledRevenue`, `netRevenue`, `tenantCount` | `superadmin_reports_api/SuperadminReportsApi.ts`, `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsExportApi.ts` | Module-owned fixture/handler |

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
| `superadmin_reports_components/SuperadminReportsV1ComparisonControls.tsx` | Renders report period/segment controls from server-provided definitions and exports the selected comparison dataset. |
| `superadmin_reports_components/SuperadminReportsMain.tsx` | Renders Reports from hook-owned server state and URL-owned filters. No direct API calls occur in this component. |
| `superadmin_reports_components/SuperadminReportsExportButton.tsx` | Renders the Reports Export Button component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsSummaryCards.tsx` | Renders the Reports Summary Cards component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsDatePresetDropdown.tsx` | Renders the Reports date preset selector and emits the selected preset plus calculated range to its parent. |
| `superadmin_reports_components/SuperadminReportsV1PlanAndRegionComparison.tsx` | Renders the Superadmin reports V1 Plan comparison, Region comparison view. |
| `superadmin_reports_components/SuperadminReportsHealthTab.tsx` | Renders the Reports Health Tab component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsCancellationsTab.tsx` | Renders the Reports Cancellations Tab component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsV1ComparisonSummary.tsx` | Renders the Superadmin reports V1 ReportsComparisonSummary. |
| `superadmin_reports_components/SuperadminReportsRevenueTab.tsx` | Renders the Reports Revenue Tab component and its associated UI logic. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into reports.
- **Destructive Actions**: Any deletion or modification of reports records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for reports do not expose cross-tenant sensitive data.

- **Module API boundary:** All `reports` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `reports` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `reports` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `reports` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `reports` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

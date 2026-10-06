# Superadmin Reports Comparison â€” Feature Map

## Module Purpose
superadmin_reports_comparison_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/reports``. Authenticated Superadmin users can date change; export; export c s v; preset change. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchReportsComparison`
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
| `superadmin_reports_tests/` | Owns module-scoped tests artifacts. | `SuperadminReportsBasic.test.tsx, SuperadminReportsComparison.test.ts` |
| `superadmin_reports_types/` | Owns module-scoped types artifacts. | `SuperadminReportsDatePresetDropdownTypes.ts, SuperadminReportsExportButtonTypes.ts, SuperadminReportsProgressBarTypes.ts, SuperadminReportsTabTypes.ts, SuperadminReportsTypes.ts` (+2 more) |

## Approved External Dependencies

### Application Infrastructure
- `@/app/frontend_superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Reports Comparison | `/superadmin/reports` | date change; export; export c s v; preset change | `superadmin_reports_api/SuperadminReportsComparisonApi.ts`, `superadmin_reports_api/SuperadminReportsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/reports_comparison route to load the Reports_comparison data context securely via TanStack Query.
2. Interact with the Reports_comparison dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Reports_comparison status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

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
| `superadmin_reports_components/SuperadminReportsMain.tsx` | Renders Reports from hook-owned server state and URL-owned filters. No direct API calls occur in this component. |
| `superadmin_reports_components/SuperadminReportsExportButton.tsx` | Renders the Reports Export Button component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsSummaryCards.tsx` | Renders the Reports Summary Cards component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsDatePresetDropdown.tsx` | Renders the Reports date preset selector and emits the selected preset plus calculated range to its parent. |
| `superadmin_reports_components/SuperadminReportsHealthTab.tsx` | Renders the Reports Health Tab component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsCancellationsTab.tsx` | Renders the Reports Cancellations Tab component and its associated UI logic. |
| `superadmin_reports_components/SuperadminReportsRevenueTab.tsx` | Renders the Reports Revenue Tab component and its associated UI logic. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into superadmin_reports_comparison.
- **Destructive Actions**: Any deletion or modification of superadmin_reports_comparison records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for superadmin_reports_comparison do not expose cross-tenant sensitive data.

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

## V15 Repair Supersession

The dedicated comparison contract test tied to the orphan V1 stack was removed. The live reports comparison API used by the active reports flow remains the canonical implementation.

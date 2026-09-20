# Superadmin Jobs Queue Health â€” Feature Map

## Module Purpose
The jobs_queue_health module is responsible for the Superadmin business workflow managing Jobs_queue_health. It enables superadmins to view, monitor, and control the lifecycle and configurations of Jobs_queue_health across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `jobs_api/` | Feature-owned responsibility for jobs api. | `SuperadminJobsApi.ts`, `SuperadminJobsQueueHealthApi.ts` |
| `jobs_mocks/` | Feature-owned responsibility for jobs mocks. | `(directory present; no direct files)` |
| `jobs_tests/` | Feature-owned responsibility for jobs tests. | `SuperadminJobsBasic.test.tsx`, `SuperadminJobsQueueHealth.test.ts` |
| `jobs_types/` | Feature-owned responsibility for jobs types. | `SuperadminJobInspectModalTypes.ts`, `SuperadminJobsEmptyStateTypes.ts`, `SuperadminJobsHeaderTypes.ts`, `SuperadminJobsMutationTypes.ts`, `SuperadminJobsPageTypes.ts`, `SuperadminJobsStatsBarTypes.ts`, `SuperadminJobsTableTypes.ts`, `SuperadminJobsTypes.ts`, `SuperadminJobsV1Types.ts` |
| `jobs_utils/` | Feature-owned responsibility for jobs utils. | `useSuperadminJobsMutations.ts`, `useSuperadminJobsPage.test.ts`, `useSuperadminJobsPage.ts`, `useSuperadminJobsSelection.ts`, `useSuperadminJobsV1.ts` |

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
| Superadmin Jobs Queue Health | `/superadmin/system-ops/jobs` | bulk delete; bulk retry; cancel job; clear completed; delete job; retry all; retry job | `SuperadminJobsApi.ts`, `SuperadminJobsQueueHealthApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/jobs_queue_health route to load the Jobs_queue_health data context securely via TanStack Query.
2. Interact with the Jobs_queue_health dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Jobs_queue_health status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/jobs`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `jobs_utils/useSuperadminJobsSelection.ts`, `jobs_utils/useSuperadminJobsPage.ts`, `jobs_utils/useSuperadminJobsMutations.ts`, `jobs_utils/useSuperadminJobsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'jobs', queryParams]`, `['superadmin', 'jobs']`, `['superadmin', 'jobs_queue_health']`

## API Contract

- **API files:** `jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs_api/SuperadminJobsApi.ts`
- **Detected API symbols:** `fetchJobsQueueHealth` — `jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs_api/SuperadminJobsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs_components/SuperadminJobsView.tsx`, `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | page.tsx acts as a Server Component entry point. |
| `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx` | Renders the Superadmin jobs V1 JobsQueueSummary summary cards. |
| `jobs_components/SuperadminJobsV1QueueHealthTable.tsx` | Renders the Superadmin jobs V1 Queue health view. |
| `jobs_components/SuperadminJobsView.tsx` | SuperadminJobsView.tsx — orchestrator for the Background Jobs page. |
| `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx` | Renders the Superadmin jobs V1 Recent job failures view. |
| `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx` | Renders the empty state for the jobs table. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into jobs_queue_health.
- **Destructive Actions**: Any deletion or modification of jobs_queue_health records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for jobs_queue_health do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


# Superadmin Jobs — Feature Map

## Module Purpose
The jobs module is responsible for the Superadmin business workflow managing Jobs. It enables superadmins to view, monitor, and control the lifecycle and configurations of Jobs across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_system_ops_jobs_api/` | Feature-owned responsibility for jobs api. | `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`, `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts` |
| `superadmin_system_ops_jobs_mocks/` | Feature-owned responsibility for jobs mocks. | `(directory present; no direct files)` |
| `superadmin_system_ops_jobs_tests/` | Feature-owned responsibility for jobs tests. | `superadmin_system_ops_jobs_tests/SuperadminSystemOpsJobsBasic.test.tsx`, `superadmin_system_ops_jobs_tests/SuperadminSystemOpsJobsQueueHealth.test.ts` |
| `superadmin_system_ops_jobs_types/` | Feature-owned responsibility for jobs types. | `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsJobInspectModalTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsEmptyStateTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsHeaderTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsMutationTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsPageTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsStatsBarTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTableTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes.ts`, `superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsV1Types.ts` |
| `superadmin_system_ops_jobs_utils/` | Feature-owned responsibility for jobs utils. | `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsMutations.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsPage.test.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsPage.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsSelection.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsV1.ts` |

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
| Superadmin Jobs | `/superadmin/system-ops/jobs` | bulk delete; bulk retry; cancel job; clear completed; delete job; retry all; retry job | `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`, `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/jobs route to load the Jobs data context securely via TanStack Query.
2. Interact with the Jobs dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Jobs status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `HOST ROUTE WRAPPER (outside supplied bundle)`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/jobs`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsSelection.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsPage.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsMutations.ts`, `superadmin_system_ops_jobs_utils/useSuperadminSystemOpsJobsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'jobs', queryParams]`, `['superadmin', 'jobs']`, `['superadmin', 'jobs_queue_health']`

## API Contract

- **API files:** `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts`, `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`
- **Detected API symbols:** `fetchJobsQueueHealth` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts`; `fetchJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `retryAllJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `retryJob` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `cancelJob` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `deleteJob` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `clearCompletedJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `bulkRetryJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `bulkDeleteJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `HOST ROUTE WRAPPER (outside supplied bundle)`, `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1QueueSummaryCards.tsx`, `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1QueueHealthTable.tsx`, `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsView.tsx`, `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1RecentFailuresPanel.tsx`, `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_stats_bar/SuperadminSystemOpsJobsStatsBar.tsx`, `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_table/SuperadminSystemOpsJobsTable.tsx`, `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_header/SuperadminSystemOpsJobsHeader.tsx`, `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_inspect_modal/SuperadminSystemOpsJobsJobInspectModal.tsx`, `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_empty_state/SuperadminSystemOpsJobsEmptyState.tsx`
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

- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **Empty-state components:** `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_empty_state/SuperadminSystemOpsJobsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `HOST ROUTE WRAPPER (outside supplied bundle)` | page.tsx acts as a Server Component entry point. |
| `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1QueueSummaryCards.tsx` | Renders the Superadmin jobs V1 JobsQueueSummary summary cards. |
| `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1QueueHealthTable.tsx` | Renders the Superadmin jobs V1 Queue health view. |
| `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsView.tsx` | SuperadminSystemOpsJobsView.tsx — orchestrator for the Background Jobs page. |
| `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1RecentFailuresPanel.tsx` | Renders the Superadmin jobs V1 Recent job failures view. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_stats_bar/SuperadminSystemOpsJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_table/SuperadminSystemOpsJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_header/SuperadminSystemOpsJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_inspect_modal/SuperadminSystemOpsJobsJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_empty_state/SuperadminSystemOpsJobsEmptyState.tsx` | Renders the empty state for the jobs table. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into jobs.
- **Destructive Actions**: Any deletion or modification of jobs records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for jobs do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_system_ops_jobs_api/`
- `superadmin_system_ops_jobs_components/`
- `superadmin_system_ops_jobs_constants/`
- `superadmin_system_ops_jobs_locales/`
- `superadmin_system_ops_jobs_mocks/`
- `superadmin_system_ops_jobs_query_keys/`
- `superadmin_system_ops_jobs_schemas/`
- `superadmin_system_ops_jobs_tests/`
- `superadmin_system_ops_jobs_types/`
- `superadmin_system_ops_jobs_url_config.ts`
- `superadmin_system_ops_jobs_utils/`

### Current root files
- `superadmin_jobs_features.md`
- `superadmin_jobs_forbidden.md`
- `superadmin_jobs_queue_health_features.md`
- `superadmin_jobs_queue_health_forbidden.md`
- `superadmin_jobs_queue_health_repair_map.md`
- `superadmin_jobs_queue_health_theme_contract.md`
- `superadmin_jobs_repair_map.md`
- `superadmin_jobs_theme_contract.md`


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

# Superadmin Jobs Queue Health — Feature Map

## Module Purpose
superadmin_system_ops_jobs_queue_health_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/system-ops/jobs``. Authenticated Superadmin users can bulk delete; bulk retry; cancel job; clear completed; delete job; retry all; retry job. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`, `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** None identified in the owned API surface.
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.
- **API Ownership:** No dedicated API facade matching this documentation node was found under the owning feature API folder; behavior is delegated/documented at the parent feature boundary where applicable.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_system_ops`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_system_ops_features.md, superadmin_system_ops_forbidden.md, superadmin_system_ops_theme_contract.md, superadmin_system_ops_url_config.ts` |
| `superadmin_system_ops_api/` | Owns module-scoped api artifacts. | `SuperadminSystemOpsApi.ts` |
| `superadmin_system_ops_backups/` | Owns module-scoped backups artifacts. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_system_ops_backups_features.md` (+6 more) |
| `superadmin_system_ops_components/` | Owns module-scoped components artifacts. | `SuperadminSystemOpsDashboardSkeleton.tsx, SuperadminSystemOpsMain.tsx` |
| `superadmin_system_ops_constants/` | Owns module-scoped constants artifacts. | `SuperadminSystemOpsDashboardConstants.ts, SuperadminSystemOpsQueryKeys.ts` |
| `superadmin_system_ops_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_system_ops_repair_map.md` |
| `superadmin_system_ops_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminSystemOpsSummary.test.tsx, useSuperadminSystemOpsSummary.ts` |
| `superadmin_system_ops_infrastructure/` | Owns module-scoped infrastructure artifacts. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_system_ops_infrastructure_api_health_features.md` (+6 more) |
| `superadmin_system_ops_jobs/` | Owns module-scoped jobs artifacts. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_system_ops_jobs_features.md` (+6 more) |
| `superadmin_system_ops_locales/` | Owns module-scoped locales artifacts. | `superadmin_system_ops_en.json, superadmin_system_ops_hi.json` |
| `superadmin_system_ops_migrations/` | Owns module-scoped migrations artifacts. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_system_ops_migrations_features.md` (+3 more) |
| `superadmin_system_ops_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_system_ops_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminSystemOpsTypesSchemas.ts` |
| `superadmin_system_ops_tests/` | Owns module-scoped tests artifacts. | `SuperadminSystemOpsContract.test.ts` |
| `superadmin_system_ops_types/` | Owns module-scoped types artifacts. | `SuperadminSystemOpsCardTypes.ts, SuperadminSystemOpsDashboardTypes.ts, SuperadminSystemOpsTypes.ts` |
| `superadmin_system_ops_utils/` | Owns module-scoped utils artifacts. | `SuperadminSystemOpsSystemOpsFormatDateTime.test.ts, SuperadminSystemOpsSystemOpsFormatDateTime.ts` |

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
| Superadmin Jobs Queue Health | `/superadmin/system-ops/jobs` | bulk delete; bulk retry; cancel job; clear completed; delete job; retry all; retry job | `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`, `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/jobs_queue_health route to load the Jobs_queue_health data context securely via TanStack Query.
2. Interact with the Jobs_queue_health dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Jobs_queue_health status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `HOST ROUTE WRAPPER (outside supplied bundle)`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_system_ops/superadmin_system_ops_jobs`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts`, `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`
- **Detected API symbols:** `fetchJobsQueueHealth` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsQueueHealthApi.ts`; `fetchJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `retryAllJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `retryJob` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `cancelJob` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `deleteJob` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `clearCompletedJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `bulkRetryJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`; `bulkDeleteJobs` — `superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsView.tsx` | `data`, `openScheduleModal`, `openTriggerModal`, `isTriggering`, `search`, `setSearch`, `statusFilter`, `setStatusFilter` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_components/SuperadminSystemOpsMain.tsx` | `data` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureFlushTenantModal.tsx` | `name`, `id` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureView.tsx` | `isPendingNodes`, `nodes`, `isErrorNodes`, `t`, `refetchNodes`, `statusFilter`, `statusOptions`, `isFetchingNodes` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_jobs/superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_stats_bar/SuperadminSystemOpsJobsStatsBar.tsx` | `activeJobs`, `completed24h`, `failed24h`, `delayed` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_migrations/superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsView.tsx` | `isPending`, `isError`, `t`, `refetch`, `versionInput`, `setVersionInput`, `validationMessage`, `handleRollout` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |

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
| `superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsView.tsx` | SuperadminSystemOpsJobsView.tsx — orchestrator for the Background Jobs page. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_stats_bar/SuperadminSystemOpsJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_table/SuperadminSystemOpsJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_header/SuperadminSystemOpsJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_inspect_modal/SuperadminSystemOpsJobsJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_empty_state/SuperadminSystemOpsJobsEmptyState.tsx` | Renders the empty state for the jobs table. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into jobs_queue_health.
- **Destructive Actions**: Any deletion or modification of jobs_queue_health records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for jobs_queue_health do not expose cross-tenant sensitive data.

- **Module API boundary:** All `system ops` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `system ops` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `system ops` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `system ops` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `system ops` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Canonical Current Source Structure (v13-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_system_ops_jobs_api/`
- `superadmin_system_ops_jobs_components/`
- `superadmin_system_ops_jobs_constants/`
- `superadmin_system_ops_jobs_locales/`
- `superadmin_system_ops_jobs_mocks/`
- `superadmin_system_ops_jobs_constants/`
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

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

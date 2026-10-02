# Superadmin Backups Health — Feature Map

## Module Purpose
superadmin_system_ops_backups_health_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/system-ops/backups``. Authenticated Superadmin users can create backup; download; restore click; save; submit. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts``.

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
| Superadmin Backups Health | `/superadmin/system-ops/backups` | create backup; download; restore click; save; submit | `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/backups_health route to load the Backups_health data context securely via TanStack Query.
2. Interact with the Backups_health dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Backups_health status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `HOST ROUTE WRAPPER (outside supplied bundle)`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_system_ops/superadmin_system_ops_backups`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsSchedule.ts`, `superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsActions.ts`, `superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsData.ts`, `superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`
- **Detected API symbols:** `fetchBackupsHealth` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`; `fetchBackups` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `createBackupSnapshot` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `restoreBackupSnapshot` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `fetchBackupDownloadUrl` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `fetchBackupSchedule` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`; `updateBackupSchedule` — `superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1GymHealthTable.tsx` | `tenants` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1HealthSummaryCards.tsx` | `summary` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1RestoreTestHistoryPanel.tsx` | `restoreHistory` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsView.tsx` | `data`, `openScheduleModal`, `openTriggerModal`, `isTriggering`, `search`, `setSearch`, `statusFilter`, `setStatusFilter` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_components/SuperadminSystemOpsMain.tsx` | `data` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureFlushTenantModal.tsx` | `name`, `id` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1EndpointHealthTable.tsx` | `endpoints` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1RecentIncidentsPanel.tsx` | `incidents` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1ServiceHealthSummaryCards.tsx` | `summary` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureView.tsx` | `isPendingNodes`, `nodes`, `isErrorNodes`, `t`, `refetchNodes`, `statusFilter`, `statusOptions`, `isFetchingNodes` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_jobs/superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1QueueHealthTable.tsx` | `queues` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_jobs/superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1QueueSummaryCards.tsx` | `summary` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_jobs/superadmin_system_ops_jobs_components/SuperadminSystemOpsJobsV1RecentFailuresPanel.tsx` | `recentFailures` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_jobs/superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_stats_bar/SuperadminSystemOpsJobsStatsBar.tsx` | `activeJobs`, `completed24h`, `failed24h`, `delayed` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |
| `superadmin_system_ops_migrations/superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsView.tsx` | `isPending`, `isError`, `t`, `refetch`, `versionInput`, `setVersionInput`, `validationMessage`, `handleRollout` | `superadmin_system_ops_api/SuperadminSystemOpsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsHealthApi.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **Empty-state components:** `superadmin_system_ops_backups_components/superadmin_system_ops_backups_empty_state/SuperadminSystemOpsBackupsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `HOST ROUTE WRAPPER (outside supplied bundle)` | Pure Server Component for the backups page. Renders the interactive client component. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminSystemOpsBackupsSchedule. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsView.tsx` | SuperadminSystemOpsBackupsView.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminSystemOpsBackupsData and rendered from query state. |
| `superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `superadmin_system_ops_backups_components/superadmin_system_ops_backups_empty_state/SuperadminSystemOpsBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into backups_health.
- **Destructive Actions**: Any deletion or modification of backups_health records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for backups_health do not expose cross-tenant sensitive data.

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
- `superadmin_system_ops_backups_api/`
- `superadmin_system_ops_backups_components/`
- `superadmin_system_ops_backups_constants/`
- `superadmin_system_ops_backups_locales/`
- `superadmin_system_ops_backups_mocks/`
- `superadmin_system_ops_backups_constants/`
- `superadmin_system_ops_backups_schemas/`
- `superadmin_system_ops_backups_tests/`
- `superadmin_system_ops_backups_types/`
- `superadmin_system_ops_backups_url_config.ts`
- `superadmin_system_ops_backups_utils/`

### Current root files
- `superadmin_backups_features.md`
- `superadmin_backups_forbidden.md`
- `superadmin_backups_health_features.md`
- `superadmin_backups_health_forbidden.md`
- `superadmin_backups_health_repair_map.md`
- `superadmin_backups_health_theme_contract.md`
- `superadmin_backups_repair_map.md`
- `superadmin_backups_theme_contract.md`

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

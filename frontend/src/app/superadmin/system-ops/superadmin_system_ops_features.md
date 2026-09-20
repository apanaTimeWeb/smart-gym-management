# Superadmin System Ops — Feature Map

## Module Purpose
The System Ops summary module gives the Superadmin a single operational entry surface for infrastructure, background jobs, database backups, and schema rollouts. It is a feature-local summary view, not an implementation of the underlying operational domains. The page reads one server-state summary contract and routes the user into the owning detail modules. It must never invent operational health values in JSX.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `system-ops_components/` | Renders the route UI, skeleton, and interactive links to operational detail modules. | `SuperadminSystemOpsDashboardClient.tsx`, `SuperadminSystemOpsDashboardSkeleton.tsx` |
| `system-ops_api/` | Performs the System Ops summary request through the global API transport. | `SuperadminSystemOpsApi.ts` |
| `system-ops_types/` | Runtime-validated summary schema and inferred types. | `SuperadminSystemOpsTypes.ts` |
| `system-ops_constants/` and `system-ops_utils/` | TanStack Query hook and presentation-only card definitions. | `SuperadminSystemOpsDashboardConstants.ts`, `useSuperadminSystemOpsSummary.ts` |
| `system-ops_mocks/fixtures/` | Holds realistic server data for the summary. | `SuperadminSystemOpsMockFixtures.ts` |
| `system-ops_mocks/handlers/` | Provides MSW response behavior and resettable state. | `SuperadminSystemOpsMockHandlers.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global API transport only.
- `@/lib/formatters` — global formatting infrastructure only.
- `@/app/superadmin/system-ops/*_url_config.ts` — owning detail-module navigation contracts only.
### Business Feature Dependencies
- None.
### Role-Level Business Dependencies
- None.

## Feature Inventory
| Feature | Route | What the User Can Do | API | Status |
|---|---|---|---|---|
| System Ops Summary | `/superadmin/system-ops` | Review summary state and open Infrastructure, Jobs, Backups, or Migrations | `GET /api/superadmin/system-ops/summary` | Implemented with MSW |

## Rule Compliance Checklist
- [x] No fake operational status literals remain in the component.
- [x] Server state uses TanStack Query.
- [x] API boundary validates response data with Zod.
- [x] Module-owned MSW fixture/handler exists.
- [x] Route loading and error boundaries exist.
- [x] No sibling business imports.

## User Flows & Interactions
### Flow 1: Review System Status
1. User opens `/superadmin/system-ops`.
2. `SuperadminSystemOpsDashboardClient` loads the TanStack Query summary.
3. Loading renders the route skeleton; success renders API-provided operational cards.
4. User selects Infrastructure, Jobs, Backups, or Migrations.
5. Navigation uses the corresponding module URL contract.

### Flow 2: Recover From Summary Failure
1. Summary request fails.
2. `error.tsx` presents module-specific recovery UI.
3. User activates Retry.
4. The route retries the query and either renders fresh summary data or presents the failure state again.

## Edge Cases and AI Warnings
1. Never hardcode operational health values in JSX; all operational status values must come from the module API/mock contract.
2. Do not import infrastructure/jobs/backups business logic into the summary module; link to the owning feature routes instead.
3. A failed detail feature is a downstream dependency issue; do not redesign that module while repairing the summary page.
4. Keep query keys stable and namespaced; do not move server summary data into Zustand or Context.
5. Retry must actually rerun the failed request and restore the summary UI when the mock/backend succeeds.
6. Do not expose raw backend stack traces, request payloads, tokens, or internal error objects in the summary UI.

## Data and State Architecture

- **Actual feature root:** `system-ops`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `system-ops_utils/useSuperadminSystemOpsSummary.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureUptime.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureData.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureTenants.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureV1.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureActions.ts`, `jobs/jobs_utils/useSuperadminJobsSelection.ts`, `jobs/jobs_utils/useSuperadminJobsPage.ts`, `jobs/jobs_utils/useSuperadminJobsMutations.ts`, `jobs/jobs_utils/useSuperadminJobsV1.ts`, `backups/backups_utils/useSuperadminBackupsSchedule.ts`, `backups/backups_utils/useSuperadminBackupsActions.ts`, `backups/backups_utils/useSuperadminBackupsData.ts`, `backups/backups_utils/useSuperadminBackupsV1.ts`, `migrations/migrations_utils/useSuperadminMigrationsPage.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'infrastructure', 'uptime-history']`, `['superadmin', 'infrastructure', 'nodes', normalizedParams]`, `['superadmin', 'infrastructure', 'redis']`, `['superadmin', 'infrastructure', 'tenants']`, `['superadmin', 'infrastructure_api_health']`, `['superadmin', 'infrastructure']`, `['superadmin', 'jobs', queryParams]`, `['superadmin', 'jobs']`, `['superadmin', 'jobs_queue_health']`, `['superadmin', 'backups']`, `['superadmin', 'backups', params]`, `['superadmin', 'backups_health']`

## API Contract

- **API files:** `system-ops_api/SuperadminSystemOpsApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`, `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs/jobs_api/SuperadminJobsApi.ts`, `backups/backups_api/SuperadminBackupsHealthApi.ts`, `backups/backups_api/SuperadminBackupsApi.ts`, `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchSuperadminSystemOpsSummary` — `system-ops_api/SuperadminSystemOpsApi.ts`; `fetchInfrastructureNodes` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`; `fetchJobsQueueHealth` — `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `fetchBackupsHealth` — `backups/backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups/backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchMigrations` — `migrations/migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `migrations/page.tsx`, `backups/page.tsx`, `jobs/page.tsx`, `infrastructure/page.tsx`, `system-ops_components/SuperadminSystemOpsDashboardClient.tsx`, `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs/jobs_components/SuperadminJobsView.tsx`, `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsTriggerModal.tsx`, `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups/backups_components/SuperadminBackupsTable.tsx`, `backups/backups_components/SuperadminBackupsScheduleModal.tsx`, `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups/backups_components/SuperadminBackupsClient.tsx`, `backups/backups_components/SuperadminBackupsRestoreModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`, `migrations/loading.tsx`, `backups/loading.tsx`, `jobs/loading.tsx`, `infrastructure/loading.tsx`
- **`error.tsx`:** `error.tsx`, `migrations/error.tsx`, `backups/error.tsx`, `jobs/error.tsx`, `infrastructure/error.tsx`
- **Empty-state components:** `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`, `migrations/migrations_components/SuperadminMigrationsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for system-ops. |
| `migrations/page.tsx` | Server component entry point for the Superadmin Migrations module. |
| `backups/page.tsx` | Pure Server Component for the backups page. Renders the interactive client component. |
| `jobs/page.tsx` | page.tsx acts as a Server Component entry point. |
| `infrastructure/page.tsx` | Pure Server Component for the infrastructure page. Renders the interactive client component. |
| `system-ops_components/SuperadminSystemOpsDashboardClient.tsx` | Renders System Ops summary cards from TanStack Query server data and links to the owning detail features. No API calls. |
| `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx` | Renders the route-level structural skeleton for the System Operations dashboard. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx` | Renders the Superadmin infrastructure V1 Recent incidents view. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx` | Renders the Superadmin infrastructure V1 Service endpoint health view. |
| `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx` | Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx` | Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx` | Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards. |
| `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx` | Renders the historical uptime chart from Infrastructure API data; no generated business values are created in the component. |
| `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx` | Renders the Superadmin jobs V1 JobsQueueSummary summary cards. |
| `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx` | Renders the Superadmin jobs V1 Queue health view. |
| `jobs/jobs_components/SuperadminJobsView.tsx` | SuperadminJobsView.tsx — orchestrator for the Background Jobs page. |
| `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx` | Renders the Superadmin jobs V1 Recent job failures view. |
| `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx` | Renders the empty state for the jobs table. |
| `backups/backups_components/SuperadminBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `backups/backups_components/SuperadminBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `backups/backups_components/SuperadminBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminBackupsSchedule. |
| `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `backups/backups_components/SuperadminBackupsClient.tsx` | SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminBackupsData and rendered from query state. |
| `backups/backups_components/SuperadminBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |
| `migrations/migrations_components/SuperadminMigrationStatusBadge.tsx` | Renders one semantic migration status badge with its status-specific icon. |
| `migrations/migrations_components/SuperadminMigrationsEmptyState.tsx` | Renders the empty state for the Superadmin migration history table. |
| `migrations/migrations_components/SuperadminMigrationsClient.tsx` | Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


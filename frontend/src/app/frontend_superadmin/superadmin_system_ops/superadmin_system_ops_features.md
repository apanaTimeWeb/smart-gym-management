# superadmin_system_ops — Feature Map

## Module Purpose
System Ops is the Superadmin operational control surface for infrastructure health, background jobs, backups, uptime, cache controls, and database migrations. It combines read-heavy telemetry with carefully guarded destructive or operational actions such as cache flush, job retry/delete, backup restore, and migration deployment. Each child area retains its own API, types, query keys, mocks, tests, and URL configuration so future AI repairs remain feature-isolated. The supplied ZIP does not contain wrapper `page.tsx` files for the child detail routes; those host-route boundaries remain explicitly scope-blocked.


## Routes

- Primary feature route: `/superadmin/system-ops`
- Route ownership remains inside `superadmin_system_ops`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminSystemOpsDashboardSkeleton.tsx`, `SuperadminSystemOpsMain.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: No dedicated module API methods detected in the owning `_api/` folder..
- URL paths remain centralized in `superadmin_system_ops_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_system_ops_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_system_ops_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest
- Next.js App Router route/page boundary as supplied.
- React + TypeScript.
- TanStack Query for server state and module query-key registries.
- Zod at form/API boundaries where the module contract defines schemas.
- next-intl with active `en` and `hi` module-local catalogs.
- React Hook Form for form workflows present in this module.
- MSW fixtures/handlers for frontend contract testing.
- Approved application infrastructure imported from `frontend_superadmin/superadmin_layout` and dumb UI primitives only.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchSuperadminSystemOpsSummary`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

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
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/MetricCard`
- `@/components/ui/Pagination`
- `@/components/ui/Panel`
- `@/components/ui/ProgressBar`
- `@/components/ui/SearchableDropdown`
- `@/components/ui/Tooltip`
- `@/hooks/useDebouncedValue`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes`

## Feature Inventory
| Feature | Route Ownership | What the User Can Do | Main API/Query Surface | Status |
|---|---|---|---|---|
| Root page | `frontend_superadmin/superadmin_system_ops` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1
Open System Ops → load summary cards and route into Infrastructure, Jobs, Backups, or Migrations using centralized URL config.
### Flow 2
Infrastructure → inspect node/Redis/API health → select tenant(s) for cache flush → confirm → submit with a stable idempotency key → invalidate affected telemetry.
### Flow 3
Jobs → filter/paginate → inspect a job → retry/cancel/delete/clear-completed as permitted → reconcile list/detail caches.
### Flow 4
Backups → inspect health/list → schedule/trigger/restore with explicit confirmation → preserve recovery messaging and idempotency.
### Flow 5
Migrations → inspect current migration state → enter a version/target → validate → confirm deployment → refresh migration data.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## Data and State Architecture

- **Server state:** TanStack Query for API-backed async data where present.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** `useUrlState` detected for shareable list/filter state.
- **Query-key registries:** `superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsQueryKeys.ts`, `superadmin_system_ops_constants/SuperadminSystemOpsQueryKeys.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureQueryKeys.ts`, `superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsQueryKeys.ts`, `superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsQueryKeys.ts`
- **MSW handlers:** `superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_handlers/SuperadminSystemOpsBackupsMockHandlers.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_handlers/SuperadminSystemOpsBackupsV1MockHandlers.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_handlers/SuperadminSystemOpsInfrastructureMockHandlers.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_handlers/SuperadminSystemOpsInfrastructureV1MockHandlers.ts`, `superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_handlers/SuperadminSystemOpsJobsMockHandlers.ts`, `superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_handlers/SuperadminSystemOpsJobsV1MockHandlers.ts`, `superadmin_system_ops_migrations/superadmin_system_ops_migrations_mocks/superadmin_system_ops_migrations_mocks_handlers/SuperadminSystemOpsMigrationsMockHandlers.ts`, `superadmin_system_ops_mocks/superadmin_system_ops_mocks_handlers/SuperadminSystemOpsMockHandlers.ts`
- **MSW fixtures:** `superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_fixtures/SuperadminSystemOpsBackupsMockFixtures.ts`, `superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_fixtures/SuperadminSystemOpsBackupsV1MockFixtures.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockData.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureMockFixtures.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureUptimeMockFixtures.ts`, `superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureV1MockFixtures.ts`, `superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_fixtures/SuperadminSystemOpsJobsMockData.ts`, `superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_fixtures/SuperadminSystemOpsJobsV1MockFixtures.ts`, `superadmin_system_ops_migrations/superadmin_system_ops_migrations_mocks/superadmin_system_ops_migrations_mocks_fixtures/SuperadminSystemOpsMigrationsMockData.ts`, `superadmin_system_ops_mocks/superadmin_system_ops_mocks_fixtures/SuperadminSystemOpsMockFixtures.ts`

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `createBackupSnapshot`
- `fetchBackupDownloadUrl`
- `fetchBackupSchedule`
- `fetchBackups`
- `fetchBackupsHealth`
- `fetchInfrastructureApiHealth`
- `fetchJobsQueueHealth`
- `fetchSuperadminSystemOpsSummary`
- `infrastructureApi`
- `jobsApi`
- `migrationsApi`
- `restoreBackupSnapshot`
- `updateBackupSchedule`

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

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases and AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

- **Module API boundary:** All `system ops` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `system ops` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `system ops` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `system ops` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `system ops` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Component Responsibility Map
- Main/page composition components: render the page and assemble child views.
- Feature hooks/view-models: perform query/mutation orchestration and derived-state calculations.
- API files: define transport calls and response schemas.
- Types/schemas/constants: define contracts, validation, and static configuration only.
- Mocks/tests: encode the same frontend contract and recoverable interaction flows.

## Rule Compliance Checklist
- [x] Feature-prefixed folder hierarchy retained.
- [x] Query-key registry present.
- [x] URL configuration present.
- [x] API response schemas supplied at transport boundary where contracts exist.
- [x] No relative imports in production feature code.
- [x] No raw runtime exception text rendered to end users.
- [x] All intrinsic interactive controls carry `data-testid`, explicit button type, visible focus, and minimum touch sizing in AST audit.
- [x] Custom hook JSDoc coverage completed.
- [x] Active `en` and `hi` locales are module-local.
- [x] MSW handlers/fixtures remain module-owned.
- [ ] Host-wide CI/build/ESLint/Prettier/CODEOWNERS enforcement: `BLOCKED BY SUPPLIED SCOPE` because repository host configuration is not present in the supplied ZIP.
- [ ] Global token definition/Tailwind mapping verification: `BLOCKED BY SUPPLIED SCOPE` because the global theme/CSS host files are not present in the supplied ZIP.

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

## V13 Repair Freshness

Current repair baseline: `frontend-superadmin-v13-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.

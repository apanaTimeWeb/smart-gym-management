# superadmin_system_ops — Feature Map

## Module Purpose
System Ops is the Superadmin operational control surface for infrastructure health, background jobs, backups, uptime, cache controls, and database migrations. It combines read-heavy telemetry with carefully guarded destructive or operational actions such as cache flush, job retry/delete, backup restore, and migration deployment. Each child area retains its own API, types, query keys, mocks, tests, and URL configuration so future AI repairs remain feature-isolated. The supplied ZIP does not contain wrapper `page.tsx` files for the child detail routes; those host-route boundaries remain explicitly scope-blocked.

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
Create: operational create actions include backup snapshots, migration deployments, and some job/retry workflows. Read: summary, infrastructure nodes/telemetry/uptime, jobs/queue health, backups/health/schedule, and migrations. Update: backup schedule and ticket-like job state transitions where supplied. Delete: job deletion and operational cleanup where supplied. Restore/flush are explicit operational actions, not generic CRUD.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_system_ops_api/` | feature-owned implementation boundary | SuperadminSystemOpsApi.ts |
| `superadmin_system_ops_backups/` | feature-owned implementation boundary | superadmin_backups_features.md, superadmin_backups_forbidden.md, superadmin_backups_health_features.md, superadmin_backups_health_forbidden.md, superadmin_backups_health_repair_map.md, superadmin_backups_health_theme_contract.md, superadmin_backups_repair_map.md, superadmin_backups_theme_contract.md |
| `superadmin_system_ops_components/` | feature-owned implementation boundary | SuperadminSystemOpsDashboardSkeleton.tsx, SuperadminSystemOpsMain.tsx |
| `superadmin_system_ops_constants/` | feature-owned implementation boundary | SuperadminSystemOpsConstants.ts, SuperadminSystemOpsDashboardConstants.ts |
| `superadmin_system_ops_infrastructure/` | feature-owned implementation boundary | superadmin_infrastructure_api_health_features.md, superadmin_infrastructure_api_health_forbidden.md, superadmin_infrastructure_api_health_repair_map.md, superadmin_infrastructure_api_health_theme_contract.md, superadmin_infrastructure_features.md, superadmin_infrastructure_forbidden.md, superadmin_infrastructure_repair_map.md, superadmin_infrastructure_theme_contract.md |
| `superadmin_system_ops_jobs/` | feature-owned implementation boundary | superadmin_jobs_features.md, superadmin_jobs_forbidden.md, superadmin_jobs_queue_health_features.md, superadmin_jobs_queue_health_forbidden.md, superadmin_jobs_queue_health_repair_map.md, superadmin_jobs_queue_health_theme_contract.md, superadmin_jobs_repair_map.md, superadmin_jobs_theme_contract.md |
| `superadmin_system_ops_locales/` | feature-owned implementation boundary | en.json, hi.json |
| `superadmin_system_ops_migrations/` | feature-owned implementation boundary | superadmin_migrations_features.md, superadmin_migrations_forbidden.md, superadmin_migrations_repair_map.md, superadmin_migrations_theme_contract.md |
| `superadmin_system_ops_mocks/` | feature-owned implementation boundary | directory-specific files |
| `superadmin_system_ops_query_keys/` | feature-owned implementation boundary | SuperadminSystemOpsQueryKeys.ts |
| `superadmin_system_ops_schemas/` | feature-owned implementation boundary | SuperadminSystemOpsSchema.ts |
| `superadmin_system_ops_tests/` | feature-owned implementation boundary | SuperadminSystemOpsContract.test.ts |
| `superadmin_system_ops_types/` | feature-owned implementation boundary | SuperadminSystemOpsCardTypes.ts, SuperadminSystemOpsDashboardTypes.ts, SuperadminSystemOpsTypes.ts |
| `superadmin_system_ops_url_config.ts` | feature-owned implementation boundary | superadmin_system_ops_url_config.ts |
| `superadmin_system_ops_utils/` | feature-owned implementation boundary | useSuperadminSystemOpsSummary.test.ts, useSuperadminSystemOpsSummary.ts |

## Approved External Dependencies
### Application Infrastructure
- `frontend_superadmin/superadmin_layout` — API transport, global error boundary/theme/socket infrastructure already supplied by the role bundle.
- `@/components/ui/*` — zero-business-logic UI primitives.
- `@/lib/*` — formatting/logger/API primitives where imported by the module.
### Business Feature Dependencies
- None.
### Role-Level Business Dependencies
- None outside the explicitly approved `superadmin_layout` infrastructure.

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
- Loading: module page/loading states and component-level pending states are explicit.
- Empty: module-specific empty copy is translated and has a recovery/CTA when an action is supported.
- Error: user-facing runtime errors use safe translated messages and retry actions; raw exception text is not rendered.
- Permission/security: backend authorization remains authoritative; frontend action visibility/disabled state must follow the supplied permission contract rather than inventing new roles.
- Responsive: authenticated shell geometry and mobile table/card treatments follow the global UI/UX source.

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases / AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

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


## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.


## V5 Repair Freshness

Current repair baseline: `frontend-superadmin-v5-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.

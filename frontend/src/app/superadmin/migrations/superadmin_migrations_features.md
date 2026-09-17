# Superadmin Migrations — Feature Map

## Module Purpose
The Superadmin Migrations feature provides a controlled platform-level view of schema rollout history and a guarded action for starting a new schema deployment. Superadmins can review migration version, description, tenant target, status, and applied date, and can submit a target schema version for a rollout. The view uses TanStack Query for server state and a feature-owned API client with Zod response validation. Backend authorization and the actual database migration engine remain outside frontend scope.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `migrations_components/` | Route UI, empty state, and visual migration status rendering. | `SuperadminMigrationsClient.tsx`, `SuperadminMigrationsEmptyState.tsx` |
| `migrations_utils/` | Query/mutation orchestration and migration-specific static configuration. | `useSuperadminMigrationsPage.ts`, `SuperadminMigrationsConstants.ts` |
| `migrations_mocks/handlers/` | Frontend-first GET/PATCH/POST network scenarios for migration history and rollout. | `SuperadminMigrationsMockHandlers.ts` |
| `superadmin_migrations_api/` | Typed API boundary and Zod validation. | `superadmin_migrations_api.ts` |
| `superadmin_migrations_types/` | Migration domain types and runtime schemas. | `superadmin_migrations_types.ts` |
| `__tests__/` | Feature-level contract tests. | `superadmin_migrations_basic.test.tsx` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Migration history | `/superadmin/migrations` | Inspect schema rollout version, description, tenant target, status, error information, and applied date. | `SuperadminMigrationsClient`, `SuperadminMigrationsEmptyState` | `GET /superadmin/migrations` | Implemented; runtime integration NOT VERIFIED without project dependencies. |
| Schema rollout trigger | `/superadmin/migrations` | Enter a target schema version, pass Superadmin confirmation, submit the rollout, and refresh migration history from Query cache. | `SuperadminMigrationsClient`, `useSuperadminMigrationsPage`, Superadmin confirmation provider | `POST /superadmin/migrations/trigger` | Implemented in feature API + MSW; runtime integration NOT VERIFIED. |

## User Flows & Interactions

### Flow 1: Review Migration History
1. User opens `/superadmin/migrations`.
2. `useSuperadminMigrationsPage` requests `GET /superadmin/migrations` through the feature API client.
3. API response data is validated against `MigrationLogSchema` before the UI consumes it.
4. The page renders the loading skeleton while pending, an inline retry state on query failure, the dedicated empty state for zero records, or the migration table for populated results.

### Flow 2: Trigger Schema Rollout
1. User enters a target schema version.
2. `SuperadminMigrationsClient` performs immediate client validation for the required value.
3. `useSuperadminMigrationsPage.requestDeployment` opens the Superadmin confirmation dialog.
4. On confirmation, `triggerMigration(targetVersion)` sends the version through the feature API boundary.
5. On success, the backend `message` is displayed, the input is cleared, and `['superadmin', 'migrations', 'list']` is invalidated so the authoritative migration history is refreshed.
6. On failure, the API error message is surfaced and the entered version remains available for another attempt.

## Data and State Architecture
- **Server state:** TanStack Query in `useSuperadminMigrationsPage.ts`.
- **Query key:** `['superadmin', 'migrations', 'list']`.
- **UI state:** `versionInput` and client validation message are private to `SuperadminMigrationsClient.tsx`.
- **Mutation state:** TanStack Query mutation state (`isDeploying`) is the only deployment network-state source.
- **Zustand:** None required.
- **Context:** Uses the approved Superadmin confirmation provider only for stable cross-tree confirmation infrastructure.
- **MSW handlers:** `migrations_mocks/handlers/SuperadminMigrationsMockHandlers.ts`.
- **Fixtures:** `migrations_utils/SuperadminMigrationsConstants.ts`.

## API Contract

| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchMigrations(params?)` | GET | `/superadmin/migrations` | Optional string query parameters | `MigrationLog[]` |
| `triggerMigration(targetVersion)` | POST | `/superadmin/migrations/trigger` | `{ targetVersion: string }` | `{ id: string; version: string; status: string }` |

## UI Data Requirements

| UI Element | Required Field | Endpoint | Nullable? | Mocked? |
|---|---|---|---|---|
| Version cell | `version` | GET migration history | No | Yes |
| Description cell | `description` | GET migration history | No | Yes |
| Error detail | `errorLog` | GET migration history | Yes | Yes |
| Tenant target cell | `targetTenants` | GET migration history | Yes | Yes |
| Status badge | `status` | GET migration history | No | Yes |
| Applied date | `appliedAt` | GET migration history | Yes | Yes |
| Rollout request version | `targetVersion` | POST rollout | No | Yes |
| Rollout backend message | `message` | POST rollout | No | Yes |

## Permissions and Security
- **Required role:** `SUPERADMIN` UI role.
- **Protected action:** Schema rollout trigger is guarded by `useSuperadminConfirm()` before the mutation executes.
- **Sensitive operation warning:** The confirmation explicitly states that the rollout targets all active tenant databases.
- **Frontend scope:** This guard is a UI safety measure; backend authorization remains authoritative.
- **Cross-role isolation:** No imports from Admin, Manager, or Trainer business modules.

## Loading, Empty, and Error States
- `SuperadminMigrationsClient.tsx` renders a table-shaped skeleton while the history query is pending.
- `SuperadminMigrationsEmptyState.tsx` renders contextual guidance when the successful query contains zero rows.
- The same client renders a retry action when the migration-history request fails.
- Deployment errors preserve the entered version and surface the API error message; successful deployment clears the input after the mutation resolves.

## Edge Cases and AI Warnings
- **Never call the trigger endpoint without a target version:** Client validation must reject an empty version before confirmation.
- **Do not replace authoritative migration history with optimistic form data:** The successful mutation invalidates the TanStack Query migration list and relies on the backend response/history.
- **Keep confirmation before deployment:** Schema rollout affects multiple tenant databases and must not execute on a single click.
- **Keep status mappings centralized:** Add new migration statuses to the migration constants/types instead of introducing inline color mappings.
- **Do not silently convert API failures into generic success:** Backend `message` and API error messages must remain visible to the user.
- **Do not bypass the feature API client:** MSW fixtures are test transport only; production/client code must use `migrationsApi`.

## Component Responsibility Map

| Component | Responsibility |
|---|---|
| `SuperadminMigrationsClient.tsx` | View layer for migration history, target-version input, loading/error/empty rendering, and deployment controls. |
| `SuperadminMigrationsEmptyState.tsx` | Empty-state presentation for a successful zero-result migration history query. |
| `SuperadminMigrationStatusBadge` | Presentational mapping from typed migration status to semantic status token and icon. |
| `useSuperadminMigrationsPage.ts` | Query, mutation, confirmation, backend-message toast, and cache invalidation orchestration. |

## Rule Compliance Checklist
- [x] Module-owned route/API/types/schema/constants/mocks/test/documentation structure exists.
- [x] Server state is owned by TanStack Query.
- [x] Rollout mutation requires Superadmin confirmation.
- [x] API response contracts are validated with Zod.
- [x] Feature URLs are centralized in `superadmin_migrations_url_config.ts`.
- [x] Loading, empty, and query-error states are explicitly rendered.
- [x] Migration records are not hardcoded inside the production component.
- [x] No Admin/Manager/Trainer business imports.
- [x] No direct browser storage, `any`, TS-ignore, raw `<img>`, or arbitrary Tailwind values in production source.
- [ ] Full TypeScript/lint/Vitest/Playwright/build/security execution — NOT VERIFIED until project dependencies are installed and commands run successfully.

## External Dependencies
- Global `@/lib/api` transport and canonical `ApiResponse<T>` envelope.
- Global Superadmin confirmation infrastructure in `superadmin_components/SuperadminFeedback/`.
- Global React Query provider.
- Global MSW bootstrap registration.

## V1 Repair Notes

Nullable display fields use the canonical `displayValue()` formatter. Search input state remains separate from the 300ms debounced value used by server-backed query parameters/query keys.

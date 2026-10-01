# Superadmin Migrations — Feature Map

## Module Purpose
The migrations module is responsible for the Superadmin business workflow managing Migrations. It enables superadmins to view, monitor, and control the lifecycle and configurations of Migrations across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_system_ops_migrations_api/` | Feature-owned responsibility for migrations api. | `superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi.ts`, `superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi.test.ts` |
| `superadmin_system_ops_migrations_components/` | Feature-owned responsibility for migrations components. | `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsMigrationStatusBadge.tsx`, `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsMain.tsx`, `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsEmptyState.tsx` |
| `superadmin_system_ops_migrations_mocks/` | Feature-owned responsibility for migrations mocks. | `(directory present; no direct files)` |
| `superadmin_system_ops_migrations_tests/` | Feature-owned responsibility for migrations tests. | `superadmin_system_ops_migrations_tests/SuperadminSystemOpsMigrationsBasic.test.tsx` |
| `superadmin_system_ops_migrations_types/` | Feature-owned responsibility for migrations types. | `superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsMigrationStatusBadgeTypes.ts`, `superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes.ts` |
| `superadmin_system_ops_migrations_utils/` | Feature-owned responsibility for migrations utils. | `superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsConstants.ts`, `superadmin_system_ops_migrations_utils/useSuperadminSystemOpsMigrationsPage.ts` |

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
| Superadmin Migrations | `/superadmin/system-ops/migrations` | rollout | `superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/migrations route to load the Migrations data context securely via TanStack Query.
2. Interact with the Migrations dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Migrations status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `HOST ROUTE WRAPPER (outside supplied bundle)`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/migrations`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_system_ops_migrations_utils/useSuperadminSystemOpsMigrationsPage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** No query key detected statically.

## API Contract

- **API files:** `superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi.ts`
- **Detected API symbols:** `fetchMigrations` — `superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi.ts`; `startMigration` — `superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `HOST ROUTE WRAPPER (outside supplied bundle)`, `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsMigrationStatusBadge.tsx`, `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsEmptyState.tsx`, `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsMain.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
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
- **Empty-state components:** `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `HOST ROUTE WRAPPER (outside supplied bundle)` | Server component entry point for the Superadmin Migrations module. |
| `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsMigrationStatusBadge.tsx` | Renders one semantic migration status badge with its status-specific icon. |
| `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsEmptyState.tsx` | Renders the empty state for the Superadmin migration history table. |
| `superadmin_system_ops_migrations_components/SuperadminSystemOpsMigrationsMain.tsx` | Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into migrations.
- **Destructive Actions**: Any deletion or modification of migrations records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for migrations do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_system_ops_migrations_api/`
- `superadmin_system_ops_migrations_components/`
- `superadmin_system_ops_migrations_constants/`
- `superadmin_system_ops_migrations_locales/`
- `superadmin_system_ops_migrations_mocks/`
- `superadmin_system_ops_migrations_query_keys/`
- `superadmin_system_ops_migrations_schemas/`
- `superadmin_system_ops_migrations_tests/`
- `superadmin_system_ops_migrations_types/`
- `superadmin_system_ops_migrations_url_config.ts`
- `superadmin_system_ops_migrations_utils/`

### Current root files
- `superadmin_migrations_features.md`
- `superadmin_migrations_forbidden.md`
- `superadmin_migrations_repair_map.md`
- `superadmin_migrations_theme_contract.md`


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

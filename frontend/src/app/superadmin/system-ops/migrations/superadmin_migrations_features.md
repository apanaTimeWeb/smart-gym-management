# Superadmin Migrations â€” Feature Map

## Module Purpose
The migrations module is responsible for the Superadmin business workflow managing Migrations. It enables superadmins to view, monitor, and control the lifecycle and configurations of Migrations across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `migrations_api/` | Feature-owned responsibility for migrations api. | `SuperadminMigrationsApi.ts`, `migrations_\1.test.ts` |
| `migrations_components/` | Feature-owned responsibility for migrations components. | `SuperadminMigrationStatusBadge.tsx`, `SuperadminMigrationsClient.tsx`, `SuperadminMigrationsEmptyState.tsx` |
| `migrations_mocks/` | Feature-owned responsibility for migrations mocks. | `(directory present; no direct files)` |
| `migrations_tests/` | Feature-owned responsibility for migrations tests. | `SuperadminMigrationsBasic.test.tsx` |
| `migrations_types/` | Feature-owned responsibility for migrations types. | `SuperadminMigrationStatusBadgeTypes.ts`, `SuperadminMigrationsTypes.ts` |
| `migrations_utils/` | Feature-owned responsibility for migrations utils. | `SuperadminMigrationsConstants.ts`, `useSuperadminMigrationsPage.ts` |

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
| Superadmin Migrations | `/superadmin/system-ops/migrations` | rollout | `SuperadminMigrationsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/migrations route to load the Migrations data context securely via TanStack Query.
2. Interact with the Migrations dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Migrations status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/migrations`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `migrations_utils/useSuperadminMigrationsPage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** No query key detected statically.

## API Contract

- **API files:** `migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchMigrations` — `migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `migrations_components/SuperadminMigrationStatusBadge.tsx`, `migrations_components/SuperadminMigrationsEmptyState.tsx`, `migrations_components/SuperadminMigrationsClient.tsx`
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

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `migrations_components/SuperadminMigrationsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server component entry point for the Superadmin Migrations module. |
| `migrations_components/SuperadminMigrationStatusBadge.tsx` | Renders one semantic migration status badge with its status-specific icon. |
| `migrations_components/SuperadminMigrationsEmptyState.tsx` | Renders the empty state for the Superadmin migration history table. |
| `migrations_components/SuperadminMigrationsClient.tsx` | Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into migrations.
- **Destructive Actions**: Any deletion or modification of migrations records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for migrations do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


# Superadmin Gyms â€” Feature Map

## Module Purpose
The gyms module is responsible for the Superadmin business workflow managing Gyms. It enables superadmins to view, monitor, and control the lifecycle and configurations of Gyms across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `[id]/` | Feature-owned responsibility for [id]. | `error.tsx`, `loading.tsx`, `not-found.tsx`, `page.tsx` |
| `add/` | Feature-owned responsibility for add. | `error.tsx`, `loading.tsx`, `page.tsx` |
| `gyms_api/` | Feature-owned responsibility for gyms api. | `SuperadminGymDetailBusinessOverviewApi.ts`, `SuperadminGymsApi.ts`, `SuperadminGymsBusinessControlsApi.ts` |
| `gyms_mocks/` | Feature-owned responsibility for gyms mocks. | `(directory present; no direct files)` |
| `gyms_store/` | Feature-owned responsibility for gyms store. | `useSuperadminGymGhostLoginStore.ts`, `useSuperadminGymsStore.ts` |
| `gyms_tests/` | Feature-owned responsibility for gyms tests. | `SuperadminGymDetailBusinessOverview.test.ts`, `SuperadminGymsBasic.test.tsx`, `SuperadminGymsBusinessControls.test.ts` |
| `gyms_types/` | Feature-owned responsibility for gyms types. | `SuperadminGymDetailClientTypes.ts`, `SuperadminGymDetailPageTypes.ts`, `SuperadminGymDetailTypes.ts`, `SuperadminGymsPlanTypes.ts`, `SuperadminGymsSchema.ts`, `SuperadminGymsTableSortIconTypes.ts`, `SuperadminGymsTableTypes.ts`, `SuperadminGymsTypes.ts`, `SuperadminGymsV1Types.ts` |
| `gyms_utils/` | Feature-owned responsibility for gyms utils. | `SuperadminGymsConstants.ts`, `SuperadminGymsSchemas.ts`, `SuperadminGymsV1Constants.ts`, `SuperadminGymsValidationSchemas.ts`, `useSuperadminGymDetail.ts`, `useSuperadminGymDetail.test.tsx`, `useSuperadminGymDetail.ts`, `useSuperadminGymsV1.ts` |

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
| Superadmin Gyms | `/superadmin/gyms` | bulk action; confirm delete; export gyms; row click; row key down; search change; sort; submit | `SuperadminGymDetailBusinessOverviewApi.ts`, `SuperadminGymsApi.ts`, `SuperadminGymsBusinessControlsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/gyms route to load the Gyms data context securely via TanStack Query.
2. Interact with the Gyms dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Gyms status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Edge Cases / AI Warnings
- **Strict Isolation**: Never import admin or manager components into gyms.
- **Destructive Actions**: Any deletion or modification of gyms records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for gyms do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


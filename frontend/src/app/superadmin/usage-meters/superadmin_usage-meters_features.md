# Superadmin Usage Meters â€” Feature Map

## Module Purpose
The usage-meters module is responsible for the Superadmin business workflow managing Usage Meters. It enables superadmins to view, monitor, and control the lifecycle and configurations of Usage Meters across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `usage-meters_api/` | Feature-owned responsibility for usage-meters api. | `SuperadminUsageMetersApi.ts` |
| `usage-meters_components/` | Feature-owned responsibility for usage-meters components. | `SuperadminUsageMetersClient.tsx` |
| `usage-meters_mocks/` | Feature-owned responsibility for usage-meters mocks. | `(directory present; no direct files)` |
| `usage-meters_tests/` | Feature-owned responsibility for usage-meters tests. | `SuperadminUsage-metersBasic.test.tsx` |
| `usage-meters_types/` | Feature-owned responsibility for usage-meters types. | `SuperadminUsageMetersTypes.ts` |
| `usage-meters_utils/` | Feature-owned responsibility for usage-meters utils. | `SuperadminUsageMetersConstants.ts`, `SuperadminUsageMetersUtils.ts`, `useSuperadminUsageMetersPage.ts` |

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
| Superadmin Usage Meters | `/superadmin/usage-meters` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminUsageMetersApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/usage-meters route to load the Usage Meters data context securely via TanStack Query.
2. Interact with the Usage Meters dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Usage Meters status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Edge Cases / AI Warnings
- **Strict Isolation**: Never import admin or manager components into usage-meters.
- **Destructive Actions**: Any deletion or modification of usage-meters records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for usage-meters do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


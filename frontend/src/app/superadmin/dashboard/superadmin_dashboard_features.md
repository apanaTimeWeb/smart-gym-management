# Superadmin Dashboard â€” Feature Map

## Module Purpose
The dashboard module is responsible for the Superadmin business workflow managing Dashboard. It enables superadmins to view, monitor, and control the lifecycle and configurations of Dashboard across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `dashboard_api/` | Feature-owned responsibility for dashboard api. | `SuperadminDashboardApi.ts`, `SuperadminDashboardBusinessOverviewApi.ts` |
| `dashboard_mocks/` | Feature-owned responsibility for dashboard mocks. | `(directory present; no direct files)` |
| `dashboard_tests/` | Feature-owned responsibility for dashboard tests. | `SuperadminDashboardBasic.test.tsx`, `SuperadminDashboardBusinessOverview.test.ts` |
| `dashboard_types/` | Feature-owned responsibility for dashboard types. | `SuperadminDashboardTypes.ts`, `SuperadminDashboardV1Types.ts` |
| `dashboard_utils/` | Feature-owned responsibility for dashboard utils. | `SuperadminDashboardConstants.ts`, `useSuperadminDashboardV1.ts` |

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
| Superadmin Dashboard | `/superadmin/dashboard` | custom date change; preset change | `SuperadminDashboardBusinessOverviewApi.ts`, `SuperadminDashboardApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/dashboard route to load the Dashboard data context securely via TanStack Query.
2. Interact with the Dashboard dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Dashboard status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Edge Cases / AI Warnings
- **Strict Isolation**: Never import admin or manager components into dashboard.
- **Destructive Actions**: Any deletion or modification of dashboard records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for dashboard do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


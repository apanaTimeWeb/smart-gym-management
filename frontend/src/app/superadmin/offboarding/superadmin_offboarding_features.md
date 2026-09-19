# Superadmin Offboarding — Feature Map

## Module Purpose
This feature owns the Superadmin business workflow implemented under `offboarding/`. The active route is `/superadmin/offboarding`. Business behavior, API contracts, validation, server-state hooks, fixtures, MSW handlers, and tests are kept within this feature boundary. Cross-feature business logic is outside this module.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `offboarding_api/` | Feature-owned responsibility for offboarding api. | `SuperadminOffboardingApi.ts` |
| `offboarding_components/` | Feature-owned responsibility for offboarding components. | `SuperadminOffboardingClient.tsx`, `SuperadminOffboardingPageHeader.tsx`, `SuperadminOffboardingPolicyAndSafetyPanel.tsx`, `SuperadminOffboardingQueueEmptyState.tsx`, `SuperadminOffboardingQueuePanel.tsx`, `SuperadminOffboardingRequestsEmptyState.tsx`, `SuperadminOffboardingRequestsPanel.tsx`, `SuperadminOffboardingSummaryCards.tsx` |
| `offboarding_mocks/` | Feature-owned responsibility for offboarding mocks. | `(directory present; no direct files)` |
| `offboarding_tests/` | Feature-owned responsibility for offboarding tests. | `SuperadminOffboardingBasic.test.tsx` |
| `offboarding_types/` | Feature-owned responsibility for offboarding types. | `SuperadminOffboardingTypes.ts`, `SuperadminRouteErrorTypes.ts` |
| `offboarding_utils/` | Feature-owned responsibility for offboarding utils. | `SuperadminOffboardingConstants.ts`, `SuperadminOffboardingStatusBadgeConfig.ts`, `useSuperadminOffboardingPage.test.tsx`, `useSuperadminOffboardingPage.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` — role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` — only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Offboarding | `/superadmin/offboarding` | export | `SuperadminOffboardingApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the active route and load the feature-owned query/API boundary.
2. Apply the available search, filter, sort, pagination, form, or row actions exposed by the current client surface.
3. Mutations go through feature-owned API contracts and, in MSW mode, feature-owned handlers/fixtures.
4. Success/error state is reconciled back into the same feature surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.

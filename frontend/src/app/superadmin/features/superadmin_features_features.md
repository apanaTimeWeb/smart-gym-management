# Superadmin Features â€” Feature Map

## Module Purpose
The features module is responsible for the Superadmin business workflow managing Features. It enables superadmins to view, monitor, and control the lifecycle and configurations of Features across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `features_api/` | Feature-owned responsibility for features api. | `SuperadminFeaturesApi.ts`, `SuperadminFeaturesRolloutInsightsApi.ts` |
| `features_mocks/` | Feature-owned responsibility for features mocks. | `(directory present; no direct files)` |
| `features_tests/` | Feature-owned responsibility for features tests. | `SuperadminFeaturesBasic.test.tsx`, `SuperadminFeaturesRolloutInsights.test.ts` |
| `features_types/` | Feature-owned responsibility for features types. | `SuperadminFeatureHistoryModalTypes.ts`, `SuperadminFeaturesMutationTypes.ts`, `SuperadminFeaturesTypes.ts`, `SuperadminFeaturesUiTypes.ts`, `SuperadminFeaturesV1Types.ts` |
| `features_utils/` | Feature-owned responsibility for features utils. | `useSuperadminFeatureHistory.ts`, `useSuperadminFeatureRolloutData.ts`, `useSuperadminFeaturesData.ts`, `useSuperadminFeaturesV1.ts` |

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
| Superadmin Features | `/superadmin/features` | save; save rollout; show flags tab; show notes tab; submit; toggle | `SuperadminFeaturesApi.ts`, `SuperadminFeaturesRolloutInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/features route to load the Features data context securely via TanStack Query.
2. Interact with the Features dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Features status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Edge Cases / AI Warnings
- **Strict Isolation**: Never import admin or manager components into features.
- **Destructive Actions**: Any deletion or modification of features records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for features do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


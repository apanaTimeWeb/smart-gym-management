# Superadmin Onboarding â€” Feature Map

## Module Purpose
The onboarding module is responsible for the Superadmin business workflow managing Onboarding. It enables superadmins to view, monitor, and control the lifecycle and configurations of Onboarding across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `onboarding_api/` | Feature-owned responsibility for onboarding api. | `SuperadminOnboardingActivationInsightsApi.ts`, `SuperadminOnboardingApi.ts` |
| `onboarding_mocks/` | Feature-owned responsibility for onboarding mocks. | `(directory present; no direct files)` |
| `onboarding_tests/` | Feature-owned responsibility for onboarding tests. | `SuperadminOnboardingActivationInsights.test.ts`, `SuperadminOnboardingBasic.test.tsx` |
| `onboarding_types/` | Feature-owned responsibility for onboarding types. | `SuperadminConversionFunnelTypes.ts`, `SuperadminOnboardingConstants.ts`, `SuperadminOnboardingModalsTypes.ts`, `SuperadminOnboardingMutationTypes.ts`, `SuperadminOnboardingStatsBarTypes.ts`, `SuperadminOnboardingTableTypes.ts`, `SuperadminOnboardingTypes.ts`, `SuperadminOnboardingV1Types.ts` |
| `onboarding_utils/` | Feature-owned responsibility for onboarding utils. | `useSuperadminOnboardingPage.ts`, `useSuperadminOnboardingV1.ts` |

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
| Superadmin Onboarding | `/superadmin/onboarding` | convert to paid confirmed; extend trial; mark verified; resend verification | `SuperadminOnboardingActivationInsightsApi.ts`, `SuperadminOnboardingApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/onboarding route to load the Onboarding data context securely via TanStack Query.
2. Interact with the Onboarding dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Onboarding status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Edge Cases / AI Warnings
- **Strict Isolation**: Never import admin or manager components into onboarding.
- **Destructive Actions**: Any deletion or modification of onboarding records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for onboarding do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


# Superadmin Coupons — Feature Map

## Module Purpose
This feature owns the Superadmin business workflow implemented under `coupons/`. The active route is `/superadmin/coupons`. Business behavior, API contracts, validation, server-state hooks, fixtures, MSW handlers, and tests are kept within this feature boundary. Cross-feature business logic is outside this module.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `coupons_api/` | Feature-owned responsibility for coupons api. | `SuperadminCouponsApi.ts` |
| `coupons_components/` | Feature-owned responsibility for coupons components. | `SuperadminCouponEditModal.tsx`, `SuperadminCouponModal.tsx`, `SuperadminCouponsClient.tsx`, `SuperadminCouponsRedemptionDrawer.tsx` |
| `coupons_mocks/` | Feature-owned responsibility for coupons mocks. | `(directory present; no direct files)` |
| `coupons_tests/` | Feature-owned responsibility for coupons tests. | `SuperadminCouponsBasic.test.tsx` |
| `coupons_types/` | Feature-owned responsibility for coupons types. | `SuperadminCouponEditModalTypes.ts`, `SuperadminCouponModalTypes.ts`, `SuperadminCouponsEmptyStateTypes.ts`, `SuperadminCouponsHeaderTypes.ts`, `SuperadminCouponsRedemptionDrawerTypes.ts`, `SuperadminCouponsStatsBarTypes.ts`, `SuperadminCouponsStatusBadgeTypes.ts`, `SuperadminCouponsTableRowTypes.ts`, `SuperadminCouponsTableTypes.ts`, `SuperadminCouponsTypes.ts` |
| `coupons_utils/` | Feature-owned responsibility for coupons utils. | `SuperadminCouponsConstants.ts`, `SuperadminCouponsDateUtils.ts`, `useSuperadminCouponRedemptions.ts`, `useSuperadminCoupons.test.ts`, `useSuperadminCoupons.ts`, `useSuperadminCouponsMutation.ts`, `useSuperadminCouponsMutations.ts` |

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
| Superadmin Coupons | `/superadmin/coupons` | create coupon; delete coupon; open history; share whats app; submit; toggle restore; toggle status; update coupon | `SuperadminCouponsApi.ts` | Source-verified; host runtime pending |

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

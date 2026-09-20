# Superadmin Coupons â€” Feature Map

## Module Purpose
The coupons module is responsible for the Superadmin business workflow managing Coupons. It enables superadmins to view, monitor, and control the lifecycle and configurations of Coupons across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

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
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Coupons | `/superadmin/saas-billing/coupons` | create coupon; delete coupon; open history; share whats app; submit; toggle restore; toggle status; update coupon | `SuperadminCouponsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/saas-billing/coupons route to load the Coupons data context securely via TanStack Query.
2. Interact with the Coupons dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Coupons status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `saas-billing/coupons`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `coupons_utils/useSuperadminCouponsMutation.ts`, `coupons_utils/useSuperadminCouponsMutations.ts`, `coupons_utils/useSuperadminCouponRedemptions.ts`, `coupons_utils/useSuperadminCoupons.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'coupons', 'redemptions', couponId]`

## API Contract

- **API files:** `coupons_api/SuperadminCouponsApi.ts`
- **Detected API symbols:** `fetchCoupons` — `coupons_api/SuperadminCouponsApi.ts`; `createCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `updateCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `deleteCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `restoreCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `updateCouponStatus` — `coupons_api/SuperadminCouponsApi.ts`; `fetchRedemptions` — `coupons_api/SuperadminCouponsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `coupons_components/SuperadminCouponModal.tsx`, `coupons_components/SuperadminCouponEditModal.tsx`, `coupons_components/SuperadminCouponsRedemptionDrawer.tsx`, `coupons_components/SuperadminCouponsDateFilterDropdown.tsx`, `coupons_components/SuperadminCouponsClient.tsx`, `coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx`, `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx`, `coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx`, `coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the coupons page. Renders the interactive client component. |
| `coupons_components/SuperadminCouponModal.tsx` | Renders the Create Coupon modal form. Receives form state via props from useCouponsPage. No API calls. |
| `coupons_components/SuperadminCouponEditModal.tsx` | Renders the Edit Coupon modal form. Manages its own local form state via React Hook Form. No API calls — delegates save to onSubmit prop. |
| `coupons_components/SuperadminCouponsRedemptionDrawer.tsx` | Renders the coupon redemption history drawer using the feature-owned redemption query. |
| `coupons_components/SuperadminCouponsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `coupons_components/SuperadminCouponsClient.tsx` | Root orchestrator for the Coupons page. Composes isolated sub-components and passes state from useSuperadminCoupons. No business logic here. |
| `coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx` | Renders the KPI stat cards (Active Coupons, Total Redeemed) for the Coupons page. Purely presentational â€” receives data via props. |
| `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx` | Renders the empty state UI for the Coupons table when no coupons exist. Shows icon, message, and CTA to create first coupon. |
| `coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx` | Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors. |
| `coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx` | Renders the page title, search input, and "Create Coupon" CTA button for the Coupons page. Receives all state via props â€” no API calls. |
| `coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx` | Renders a single row in the Coupons data table. Handles row-level action buttons with stopPropagation. Purely presentational. |
| `coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx` | Renders the Coupons data table shell (header row + rows). Delegates each row to CouponsTableRow. No API calls. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into coupons.
- **Destructive Actions**: Any deletion or modification of coupons records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for coupons do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


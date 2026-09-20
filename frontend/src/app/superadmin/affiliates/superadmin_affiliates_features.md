# Superadmin Affiliates â€” Feature Map

## Module Purpose
The affiliates module is responsible for the Superadmin business workflow managing Affiliates. It enables superadmins to view, monitor, and control the lifecycle and configurations of Affiliates across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `affiliates_api/` | Feature-owned responsibility for affiliates api. | `SuperadminAffiliatesApi.ts` |
| `affiliates_components/` | Feature-owned responsibility for affiliates components. | `SuperadminAffiliateModal.tsx`, `SuperadminAffiliatesClient.tsx` |
| `affiliates_mocks/` | Feature-owned responsibility for affiliates mocks. | `(directory present; no direct files)` |
| `affiliates_tests/` | Feature-owned responsibility for affiliates tests. | `SuperadminAffiliatesBasic.test.tsx` |
| `affiliates_types/` | Feature-owned responsibility for affiliates types. | `SuperadminAffiliateModalTypes.ts`, `SuperadminAffiliateStatusBadgeTypes.ts`, `SuperadminAffiliatesClientTypes.ts`, `SuperadminAffiliatesEmptyStateTypes.ts`, `SuperadminAffiliatesHeaderTypes.ts`, `SuperadminAffiliatesStatsBarTypes.ts`, `SuperadminAffiliatesTableRowTypes.ts`, `SuperadminAffiliatesTableTypes.ts`, `SuperadminAffiliatesTypes.ts` |
| `affiliates_utils/` | Feature-owned responsibility for affiliates utils. | `SuperadminAffiliatesQueryUtils.ts`, `useSuperadminAffiliatesMutation.ts`, `useSuperadminAffiliatesMutations.ts`, `useSuperadminAffiliatesPage.test.ts`, `useSuperadminAffiliatesPage.ts` |

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
| Superadmin Affiliates | `/superadmin/affiliates` | add affiliate; delete affiliate; edit affiliate; pay commission; submit; toggle affiliate status | `SuperadminAffiliatesApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/affiliates route to load the Affiliates data context securely via TanStack Query.
2. Interact with the Affiliates dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Affiliates status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `affiliates`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `affiliates_utils/useSuperadminAffiliatesPage.ts`, `affiliates_utils/useSuperadminAffiliatesMutation.ts`, `affiliates_utils/useSuperadminAffiliatesMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'affiliates', 'payout-history']`

## API Contract

- **API files:** `affiliates_api/SuperadminAffiliatesApi.ts`
- **Detected API symbols:** `fetchAffiliates` — `affiliates_api/SuperadminAffiliatesApi.ts`; `createAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `updateAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `updateAffiliateStatus` — `affiliates_api/SuperadminAffiliatesApi.ts`; `deleteAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `payAffiliateCommission` — `affiliates_api/SuperadminAffiliatesApi.ts`; `fetchPayoutHistory` — `affiliates_api/SuperadminAffiliatesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `affiliates_components/SuperadminAffiliatesClient.tsx`, `affiliates_components/SuperadminAffiliateModal.tsx`, `affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx`, `affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx`, `affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx`, `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx`, `affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the affiliates page. Renders the interactive client component. |
| `affiliates_components/SuperadminAffiliatesClient.tsx` | Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesPage. No business logic here. |
| `affiliates_components/SuperadminAffiliateModal.tsx` | Renders the Create/Edit Affiliate modal form. Receives form state via props from useSuperadminAffiliatesPage. No API calls. |
| `affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx` | Renders the page title, search, status filter, date-range filter, and Add CTA for the Affiliates page. |
| `affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx` | Renders server-backed affiliate payout history passed from the feature page query. |
| `affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx` | Renders the status badge pill for a single affiliate. Purely presentational — maps AffiliateStatus to design system colors. |
| `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx` | Renders a single row in the Affiliates data table. Handles row-level action buttons with stopPropagation. Purely presentational. |
| `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx` | Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls. |
| `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx` | Renders the empty state UI for the Affiliates table when no affiliates exist. Shows icon, message, and CTA to add first affiliate. |
| `affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx` | Renders the KPI stat cards (Total Affiliates, Total Commission Paid) for the Affiliates page. Purely presentational — receives data via props. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into affiliates.
- **Destructive Actions**: Any deletion or modification of affiliates records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for affiliates do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


# Superadmin Gyms Business Controls â€” Feature Map

## Module Purpose
The gyms_business_controls module is responsible for the Superadmin business workflow managing Gyms_business_controls. It enables superadmins to view, monitor, and control the lifecycle and configurations of Gyms_business_controls across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

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
| Superadmin Gyms Business Controls | `/superadmin/gyms` | bulk action; confirm delete; export gyms; row click; row key down; search change; sort; submit | `SuperadminGymDetailBusinessOverviewApi.ts`, `SuperadminGymsApi.ts`, `SuperadminGymsBusinessControlsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/gyms_business_controls route to load the Gyms_business_controls data context securely via TanStack Query.
2. Interact with the Gyms_business_controls dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Gyms_business_controls status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `gyms`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `gyms_store/useSuperadminGymsStore.ts`, `gyms_store/useSuperadminGymGhostLoginStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `gyms_store/useSuperadminGymsStore.ts`, `gyms_store/useSuperadminGymGhostLoginStore.ts`, `gyms_utils/useSuperadminGymDetail.ts`, `gyms_utils/useSuperadminGymsV1.ts`, `gyms_utils/useSuperadminGymDetailActions.ts`, `gyms_components/SuperadminGymWhatsappModal/useSuperadminGymWhatsappModal.ts`, `gyms_components/SuperadminAddGymForm/useSuperadminAddGymForm.ts`, `gyms_components/SuperadminAddGymForm/useSuperadminAddGymFormSubmit.ts`, `gyms_components/SuperadminGymEditModal/useSuperadminGymEditModal.ts`, `gyms_components/SuperadminGymDeleteModal/useSuperadminGymDeleteModal.ts`, `gyms_components/SuperadminGymsTable/useSuperadminGymsTable.ts`, `gyms_components/SuperadminGymsTable/useSuperadminGymMutations.ts`, `gyms_components/SuperadminGymsToolbar/useSuperadminGymsToolbar.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'gym', 'detail-business-overview', gymId]`, `['superadmin', 'gyms_business_controls', queryParams]`, `['superadmin', 'gyms_business_controls']`, `['superadmin', 'gyms', 'subscription-plans']`, `['superadmin', 'gyms']`, `['superadmin', 'gyms', queryParams]`

## API Contract

- **API files:** `gyms_api/SuperadminGymsApi.ts`, `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`, `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Detected API symbols:** `fetchGyms` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymById` — `gyms_api/SuperadminGymsApi.ts`; `fetchSubscriptionPlans` — `gyms_api/SuperadminGymsApi.ts`; `createGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGym` — `gyms_api/SuperadminGymsApi.ts`; `updateGymStatus` — `gyms_api/SuperadminGymsApi.ts`; `impersonateTenant` — `gyms_api/SuperadminGymsApi.ts`; `deleteGym` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymStats` — `gyms_api/SuperadminGymsApi.ts`; `emailGymOwner` — `gyms_api/SuperadminGymsApi.ts`; `exportGymsReport` — `gyms_api/SuperadminGymsApi.ts`; `provisionGym` — `gyms_api/SuperadminGymsApi.ts`; `exitGhostLogin` — `gyms_api/SuperadminGymsApi.ts`; `setGhostLoginCookie` — `gyms_api/SuperadminGymsApi.ts`; `fetchGymDetailBusinessOverview` — `gyms_api/SuperadminGymDetailBusinessOverviewApi.ts`; `fetchGymsBusinessControls` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`; `updateGymsBulkAction` — `gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `add/page.tsx`, `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx`, `gyms_components/SuperadminGymsClient.tsx`, `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx`, `[id]/page.tsx`, `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx`, `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`, `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx`, `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx`, `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx`, `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx`, `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx`, `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx`, `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx`, `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** `date-fns`/`dayjs` usage detected.
- **Forms detected:** 3

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`, `add/loading.tsx`, `[id]/loading.tsx`
- **`error.tsx`:** `error.tsx`, `add/error.tsx`, `[id]/error.tsx`
- **Empty-state components:** `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server Component that acts as the entry point for the Tenants (Gyms) list page. |
| `add/page.tsx` | Server Component that acts as the entry point for the Add Gym page. |
| `gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx` | Renders executable tenant filters, saved views, tenant selection, and bulk actions for the V1 controls feature. |
| `gyms_components/SuperadminGymsClient.tsx` | Root orchestrator for the Gyms page. Renders the layout, toolbar, and table. |
| `gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx` | Renders the current filtered tenant dataset and exposes row selection for bulk operations. |
| `[id]/page.tsx` | Server entry for the Superadmin gym detail route; passes the route gym ID to client views. |
| `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx` | Renders the modal UI for sending a WhatsApp message to a Gym owner. Purely a view component. |
| `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx` | Renders the empty state UI for the Gyms table when no gyms match the current search. Shows icon, message, and search adjustment hint. |
| `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx` | Renders the form UI for onboarding a new gym tenant. Receives logic from useSuperadminAddGymForm hook. |
| `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailRow.tsx` | Renders one labeled value row inside a Superadmin gym detail section. |
| `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailSkeleton.tsx` | Renders the route-level structural skeleton for the Gym Detail screen. |
| `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx` | Renders the Superadmin Gym 360 detail workspace from query-owned data and feature-owned action hooks. No direct API calls. |
| `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx` | Renders the modal UI for editing Gym details. Purely a view component. |
| `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx` | Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE". |
| `gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon.tsx` | Renders the semantic sort indicator for a gym table column. |
| `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx` | Renders the table view of Gym tenants. Purely a view component that consumes useSuperadminGymsTable hook. |
| `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx` | Renders the search toolbar for the Gyms table. |
| `gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx` | Renders the feature-owned tenant impersonation session banner for the Superadmin shell. |
| `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx` | Renders the subscription renewal calendar view for Gym tenants. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into gyms_business_controls.
- **Destructive Actions**: Any deletion or modification of gyms_business_controls records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for gyms_business_controls do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


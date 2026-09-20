# Superadmin Plans Business Controls â€” Feature Map

## Module Purpose
The plans_business_controls module is responsible for the Superadmin business workflow managing Plans_business_controls. It enables superadmins to view, monitor, and control the lifecycle and configurations of Plans_business_controls across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `plans_api/` | Feature-owned responsibility for plans api. | `SuperadminPlansApi.ts`, `SuperadminPlansBusinessControlsApi.ts` |
| `plans_mocks/` | Feature-owned responsibility for plans mocks. | `(directory present; no direct files)` |
| `plans_store/` | Feature-owned responsibility for plans store. | `useSuperadminPlansStore.ts` |
| `plans_tests/` | Feature-owned responsibility for plans tests. | `SuperadminPlansBasic.test.tsx`, `SuperadminPlansBusinessControls.test.ts` |
| `plans_types/` | Feature-owned responsibility for plans types. | `SuperadminPlansFormTypes.ts`, `SuperadminPlansListMutationTypes.ts`, `SuperadminPlansSchema.ts`, `SuperadminPlansTypes.ts`, `SuperadminPlansUiTypes.ts`, `SuperadminPlansV1Types.ts` |
| `plans_utils/` | Feature-owned responsibility for plans utils. | `SuperadminPlansSchemas.ts`, `useSuperadminPlanMutations.ts`, `useSuperadminPlansV1.ts` |

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
| Superadmin Plans Business Controls | `/superadmin/saas-billing/plans` | close; submit | `SuperadminPlansBusinessControlsApi.ts`, `SuperadminPlansApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/saas-billing/plans_business_controls route to load the Plans_business_controls data context securely via TanStack Query.
2. Interact with the Plans_business_controls dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Plans_business_controls status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `saas-billing/plans`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `plans_store/useSuperadminPlansStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `plans_components/useSuperadminPlansList.ts`, `plans_store/useSuperadminPlansStore.ts`, `plans_utils/useSuperadminPlansV1.ts`, `plans_utils/useSuperadminPlanMutations.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'plans']`, `['superadmin', 'plans_business_controls']`

## API Contract

- **API files:** `plans_api/SuperadminPlansBusinessControlsApi.ts`, `plans_api/SuperadminPlansApi.ts`
- **Detected API symbols:** `fetchPlansBusinessControls` — `plans_api/SuperadminPlansBusinessControlsApi.ts`; `fetchPlans` — `plans_api/SuperadminPlansApi.ts`; `fetchPlanById` — `plans_api/SuperadminPlansApi.ts`; `createPlan` — `plans_api/SuperadminPlansApi.ts`; `updatePlan` — `plans_api/SuperadminPlansApi.ts`; `deletePlan` — `plans_api/SuperadminPlansApi.ts`; `archivePlan` — `plans_api/SuperadminPlansApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `plans_components/SuperadminPlansList.tsx`, `plans_components/SuperadminPlanCreateModal.tsx`, `plans_components/SuperadminPlansClient.tsx`, `plans_components/SuperadminPlanEditModal.tsx`, `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx`, `plans_components/SuperadminPlansV1ComparisonPanel.tsx`
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
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the plans page. Renders the interactive client component. |
| `plans_components/SuperadminPlansList.tsx` | Renders the grid of subscription plan cards using TanStack Query. |
| `plans_components/SuperadminPlanCreateModal.tsx` | Renders the modal form for creating a new subscription plan. Reads/writes via useSuperadminPlansStore. |
| `plans_components/SuperadminPlansClient.tsx` | SuperadminPlansClient.tsx is the root client entry for the Plans page. Initialises the Zustand store on mount. |
| `plans_components/SuperadminPlanEditModal.tsx` | Renders the modal form for editing an existing subscription plan. Reads/writes via useSuperadminPlansStore. |
| `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx` | Renders the Superadmin plans V1 Price history, Add-ons, Plan move preview view. |
| `plans_components/SuperadminPlansV1ComparisonPanel.tsx` | Renders the Superadmin plans V1 Plan comparison view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into plans_business_controls.
- **Destructive Actions**: Any deletion or modification of plans_business_controls records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for plans_business_controls do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.


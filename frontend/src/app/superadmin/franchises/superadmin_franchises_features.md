# Superadmin Franchises — Feature Map

## Module Purpose
This Superadmin feature owns the `franchises` route and its feature-specific UI, client logic, API boundary, types, schemas, constants, mocks, tests, and documentation. It is intended to be operable by the Superadmin role without importing sibling Superadmin business modules. The feature exposes only the controls represented by the current route and code in this folder. Backend authorization remains outside the frontend audit scope.

## Directory Structure

| Folder | Responsibility | Key files |
|---|---|---|
| `__tests__/` | Owns the feature responsibility represented by this folder. | `superadmin_franchises_basic.test.tsx` |
| `franchises_components/` | Owns the feature responsibility represented by this folder. | `SuperadminFranchiseModal.tsx`, `SuperadminFranchisesClient.tsx` |
| `franchises_mocks/` | Owns the feature responsibility represented by this folder. | `SuperadminFranchisesMockHandlers.ts` |
| `franchises_types/` | Owns the feature responsibility represented by this folder. | `superadmin_franchises_types.ts` |
| `franchises_utils/` | Owns the feature responsibility represented by this folder. | `SuperadminFranchisesConstants.ts`, `SuperadminFranchisesSchemas.ts`, `useSuperadminFranchisesPage.test.ts`, `useSuperadminFranchisesPage.ts` |
| `superadmin_franchises_api/` | Owns the feature responsibility represented by this folder. | `superadmin_franchises_api.ts` |

## Feature Inventory

| Feature | Route | User action | Key API/client owner | Status |
|---|---|---|---|---|
| `franchises` | `/superadmin/franchises` | Use the route's controls to perform the operations implemented by the current client UI. | `feature-local API files` | Implemented in source; runtime integration **NOT VERIFIED** without installing project dependencies. |

## User Flows & Interactions

### Flow 1: Open Feature
1. User navigates to the route shown above.
2. Next.js renders the route `page.tsx` and its client view.
3. The feature-owned client layer loads the data needed by the visible UI.
4. Loading, empty, error, or populated state is rendered according to the current implementation.

### Flow 2: Execute an Available Action
1. User activates an action exposed by the current feature UI.
2. The feature client/hook invokes the feature-owned API function.
3. The API boundary validates response data using the feature schema when a schema is supplied.
4. The UI updates local/query state and shows the resulting feedback.

## Data and State Architecture
- **Server state:** TanStack Query where the feature currently uses async queries.
- **UI state:** local `useState` or a feature-scoped Zustand store where present.
- **URL state:** `useSuperadminUrlState` only where the feature currently uses query-string filters/pagination.
- **Sibling business dependencies:** must remain zero; shared transport/UI primitives are infrastructure exceptions only.

## API Contract

| Function | Method | Endpoint expression | API file |
|---|---|---|---|
| No feature API functions detected | — | — | No API service file detected by static scan |

## UI Data Requirements

Observed schema/type fields in this feature are listed below. Any UI field not represented by a schema/type is **NOT VERIFIED** and must be checked by the coding agent.

| Field | Source location |
|---|---|
| `id` | Feature-owned schema/type file |
| `franchiseName` | Feature-owned schema/type file |
| `ownerName` | Feature-owned schema/type file |
| `ownerEmail` | Feature-owned schema/type file |
| `phone` | Feature-owned schema/type file |
| `status` | Feature-owned schema/type file |
| `branchCount` | Feature-owned schema/type file |
| `totalMembers` | Feature-owned schema/type file |
| `totalStaff` | Feature-owned schema/type file |
| `totalMonthlyRevenue` | Feature-owned schema/type file |
| `plan` | Feature-owned schema/type file |
| `city` | Feature-owned schema/type file |
| `state` | Feature-owned schema/type file |
| `gstin` | Feature-owned schema/type file |
| `registrationNumber` | Feature-owned schema/type file |
| `contractStartDate` | Feature-owned schema/type file |
| `createdAt` | Feature-owned schema/type file |

## Permissions and Security
- **Role:** `SUPERADMIN` UI.
- **Frontend boundary:** route and feature UI are under `/superadmin`.
- **Destructive actions:** must use the Superadmin confirmation infrastructure where the feature exposes destructive controls.
- **Backend authorization:** not evaluated here and must not be inferred from frontend checks.

## Loading, Empty, and Error States
- **Route loading:** use the feature `loading.tsx` when present.
- **Route error:** use the feature `error.tsx` when present.
- **Feature empty/error:** use the feature-specific empty/error UI already present in the source.
- Any runtime transition behavior not statically provable is **NOT VERIFIED**.

## Edge Cases and AI Warnings
- **No sibling business imports:** do not reintroduce imports from another Superadmin business feature.
- **No fake production data:** server-like records belong in feature mocks/fixtures, never fallback constants inside production UI.
- **No hardcoded URLs:** feature-owned routes belong in the single feature URL config.
- **No async state in Zustand:** use TanStack Query for server state.
- **Preserve destructive confirmation:** do not bypass the Superadmin confirmation flow.

## Component Responsibility Map

| File | Responsibility |
|---|---|
| `__tests__/superadmin_franchises_basic.test.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `error.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `franchises_components/SuperadminFranchiseModal/SuperadminFranchiseModal.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `franchises_components/SuperadminFranchisesClient.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `loading.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `page.tsx` | Owns the UI responsibility represented by its filename and current JSX. |

## Rule Compliance Checklist
- [x] Feature has a route-level `page.tsx` or the route does not require one.
- [x] Feature has module-owned documentation file.
- [x] Feature URL configuration is feature-owned when routes/API calls exist.
- [x] Sibling Superadmin business imports are not allowed.
- [x] API responses must use Zod validation at the boundary.
- [x] Server state is owned by TanStack Query where async data is used.
- [x] UI state remains local or feature-scoped.
- [ ] Full typecheck/lint/test/build/E2E verification — **NOT VERIFIED** in this working environment because project dependencies are not installed.
- [ ] Full visual comparison against `web_global_design.md` — **NOT VERIFIED** without browser execution.

## Documentation Consistency
This feature map is generated from the current repository structure. Where the code does not expose enough static evidence to state an exact runtime fact, the documentation deliberately uses **NOT VERIFIED** rather than inventing a result.


## Module-Owned MSW Fixtures

Feature-specific mock fixtures and MSW handlers are owned by this feature directory. API responses consumed by UI must remain complete for all documented table fields, KPIs, charts, filters, detail views and mutation messages. Global MSW bootstrap is registration infrastructure only.

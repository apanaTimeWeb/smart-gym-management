# Superadmin Gyms — Feature Map

## Module Purpose
This Superadmin feature owns the `gyms` route and its feature-specific UI, client logic, API boundary, types, schemas, constants, mocks, tests, and documentation. It is intended to be operable by the Superadmin role without importing sibling Superadmin business modules. The feature exposes only the controls represented by the current route and code in this folder. Backend authorization remains outside the frontend audit scope.

## Directory Structure

| Folder | Responsibility | Key files |
|---|---|---|
| `[id]/` | Owns the feature responsibility represented by this folder. | `error.tsx`, `loading.tsx`, `not-found.tsx`, `page.tsx` |
| `__tests__/` | Owns the feature responsibility represented by this folder. | `superadmin_gyms_basic.test.tsx` |
| `add/` | Owns the feature responsibility represented by this folder. | `page.tsx` |
| `gyms_components/` | Owns the feature responsibility represented by this folder. | `SuperadminAddGymForm.tsx`, `useSuperadminAddGymForm.test.ts`, `useSuperadminAddGymForm.ts`, `useSuperadminAddGymFormSubmit.ts`, `SuperadminGymDeleteModal.tsx`, `useSuperadminGymDeleteModal.test.ts`, `useSuperadminGymDeleteModal.ts`, `SuperadminGymDetailClient.tsx` |
| `gyms_mocks/` | Owns the feature responsibility represented by this folder. | `SuperadminGymsMockFixtures.ts`, `SuperadminGymsMockHandlers.ts` |
| `gyms_store/` | Owns the feature responsibility represented by this folder. | `useSuperadminGymsStore.test.ts`, `useSuperadminGymsStore.ts` |
| `gyms_utils/` | Owns the feature responsibility represented by this folder. | `SuperadminGymsConstants.ts`, `SuperadminGymsSchemas.ts`, `SuperadminGymsValidationSchemas.ts` |
| `superadmin_gyms_api/` | Owns the feature responsibility represented by this folder. | `superadmin_gyms_api.ts` |
| `superadmin_gyms_types/` | Owns the feature responsibility represented by this folder. | `superadmin_gyms_plan_types.ts`, `superadmin_gyms_schema.ts`, `superadmin_gyms_types.ts` |

## Feature Inventory

| Feature | Route | User action | Key API/client owner | Status |
|---|---|---|---|---|
| `gyms` | `/superadmin/gyms` | Search, filter, sort, paginate, add, edit, suspend/restore, delete, open tenant detail, and use the tenant-contact action from the Gym registry. | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` | Implemented in source; runtime integration **NOT VERIFIED** without installing project dependencies. |

## User Flows & Interactions

### Flow 1: Browse and filter tenants
1. User opens `/superadmin/gyms`.
2. Search/filter/sort state is synchronized to the URL and query key.
3. The feature API sends the current parameters.
4. The module-owned MSW handler applies the same parameters to fixture data.
5. The result list, pagination metadata, and empty/error states update visibly.

### Flow 2: Tenant lifecycle action
1. User selects a Gym row and opens the tenant detail/edit flow.
2. User edits allowed tenant fields or selects a status action.
3. The form/hook calls the feature API.
4. The API response is validated at the boundary.
5. On success, TanStack Query is reconciled/invalidated and the visible tenant/list state reflects the response.
6. Destructive actions require the Superadmin confirmation flow.

## Data and State Architecture
- **Server state:** TanStack Query where the feature currently uses async queries.
- **UI state:** local `useState` or a feature-scoped Zustand store where present.
- **URL state:** `useSuperadminUrlState` only where the feature currently uses query-string filters/pagination.
- **Sibling business dependencies:** must remain zero; shared transport/UI primitives are infrastructure exceptions only.

## API Contract

| Function | Method | Endpoint expression | API file |
|---|---|---|---|
| `fetchGymById()` | `GET` | `${GymsUrlConfig.BACKEND_API.BASE}/${id}` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |
| `updateGym()` | `PATCH` | `${GymsUrlConfig.BACKEND_API.BASE}/${id}` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |
| `changeGymStatus()` | `PATCH` | `${GymsUrlConfig.BACKEND_API.BASE}/${id}/status` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |
| `impersonateTenant()` | `POST` | `${GymsUrlConfig.BACKEND_API.IMPERSONATE}/${id}/impersonate` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |
| `deleteGym()` | `DELETE` | `${GymsUrlConfig.BACKEND_API.BASE}/${id}` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |
| `fetchGymStats()` | `GET` | `${GymsUrlConfig.BACKEND_API.BASE}/stats` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |
| `emailGymOwner()` | `POST` | `${GymsUrlConfig.BACKEND_API.BASE}/${id}/email` | `gyms/superadmin_gyms_api/superadmin_gyms_api.ts` |

## UI Data Requirements

Observed schema/type fields in this feature are listed below. Any UI field not represented by a schema/type is **NOT VERIFIED** and must be checked by the coding agent.

| Field | Source location |
|---|---|
| `id` | Feature-owned schema/type file |
| `name` | Feature-owned schema/type file |
| `priceMonthly` | Feature-owned schema/type file |
| `currency` | Feature-owned schema/type file |
| `planName` | Feature-owned schema/type file |
| `startDate` | Feature-owned schema/type file |
| `endDate` | Feature-owned schema/type file |
| `status` | Feature-owned schema/type file |
| `amount` | Feature-owned schema/type file |
| `storageUsedMb` | Feature-owned schema/type file |
| `apiCallsMonthly` | Feature-owned schema/type file |
| `activeMembers` | Feature-owned schema/type file |
| `ownerName` | Feature-owned schema/type file |
| `adminEmail` | Feature-owned schema/type file |
| `phone` | Feature-owned schema/type file |
| `plan` | Feature-owned schema/type file |
| `createdAt` | Feature-owned schema/type file |
| `memberCount` | Feature-owned schema/type file |
| `monthlyRevenue` | Feature-owned schema/type file |
| `databaseVersion` | Feature-owned schema/type file |
| `city` | Feature-owned schema/type file |
| `state` | Feature-owned schema/type file |
| `country` | Feature-owned schema/type file |
| `gstin` | Feature-owned schema/type file |
| `trialEndsAt` | Feature-owned schema/type file |
| `lastLoginAt` | Feature-owned schema/type file |
| `lastActiveAt` | Feature-owned schema/type file |
| `staffCount` | Feature-owned schema/type file |
| `subscriptionHistory` | Feature-owned schema/type file |
| `usageStats` | Feature-owned schema/type file |
| `totalActive` | Feature-owned schema/type file |
| `totalSuspended` | Feature-owned schema/type file |
| `mrrContribution` | Feature-owned schema/type file |

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
| `[id]/error.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `[id]/loading.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `[id]/not-found.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `[id]/page.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `__tests__/superadmin_gyms_basic.test.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `add/page.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `error.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymsClient.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
| `gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx` | Owns the UI responsibility represented by its filename and current JSX. |
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

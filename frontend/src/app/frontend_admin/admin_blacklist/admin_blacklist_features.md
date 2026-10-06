# Admin Blacklist — Feature Map

## Module Purpose
The Admin Blacklist module lets authorized administrators manage members who are blocked from gym access according to the supplied blacklist contract. Users can review blacklist records and KPIs, add a member to the blacklist, remove or toggle blacklist state, and propagate a blacklist action across supported branches. The module also exposes a cross-branch view and keeps its mutation confirmation and UI state inside the feature boundary. It does not manage the underlying member profile or unrelated subscription/payment data.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/blacklist` | ``frontend_admin/admin_blacklist/page.tsx`` | ``frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_main/AdminBlacklistMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- React Hook Form 7.x
- Zod 3.x
- @hookform/resolvers 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_blacklist/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_blacklist_api/` | Typed API transport boundary. | AdminBlacklistApi.ts |
| `admin_blacklist_components/` | Feature component root. | (empty) |
| `admin_blacklist_constants/` | Static business configuration and query-key registries. | AdminBlacklistConstants.ts, AdminBlacklistQueryKeys.ts |
| `admin_blacklist_hooks/` | Feature data-flow and interaction hooks. | useAdminBlacklistLogic.test.tsx, useAdminBlacklistLogic.ts, useAdminBlacklistMutations.test.tsx, useAdminBlacklistMutations.ts, useAdminBlacklistUnsavedChangesGuard.test.ts, useAdminBlacklistUnsavedChangesGuard.ts |
| `admin_blacklist_locales/` | Module-owned localized resources. | admin_blacklist_en.json, admin_blacklist_hi.json |
| `admin_blacklist_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_blacklist_schemas/` | Zod validation/runtime contracts. | AdminBlacklistSchemas.ts |
| `admin_blacklist_store/` | Module-scoped UI state only. | useAdminBlacklistStore.test.ts, useAdminBlacklistStore.ts |
| `admin_blacklist_types/` | Domain, DTO, state, and prop type contracts. | AdminBlacklistErrorPropsTypes.ts, AdminBlacklistMockHandlerTypes.ts, AdminBlacklistStoreTypes.ts, AdminBlacklistTypes.ts |
| `admin_blacklist_utils/` | Feature-local deterministic utilities and formatters. | (empty) |
| `admin_blacklist_components/admin_blacklist_cross_gym_empty_state/` | Feature-owned implementation boundary. | AdminBlacklistCrossGymEmptyState.tsx |
| `admin_blacklist_components/admin_blacklist_cross_gym_view/` | Feature-owned implementation boundary. | AdminBlacklistCrossGymView.tsx |
| `admin_blacklist_components/admin_blacklist_empty_state/` | Feature-owned implementation boundary. | AdminBlacklistEmptyState.tsx |
| `admin_blacklist_components/admin_blacklist_kpis/` | Feature-owned implementation boundary. | AdminBlacklistKPIs.tsx |
| `admin_blacklist_components/admin_blacklist_main/` | Feature-owned implementation boundary. | AdminBlacklistMain.tsx |
| `admin_blacklist_components/admin_blacklist_modal/` | Feature-owned implementation boundary. | AdminBlacklistModal.tsx, useAdminBlacklistModalForm.test.ts, useAdminBlacklistModalForm.ts |
| `admin_blacklist_components/admin_blacklist_table/` | Feature-owned implementation boundary. | AdminBlacklistTable.tsx |
| `admin_blacklist_components/admin_blacklist_tabs/` | Feature-owned implementation boundary. | AdminBlacklistTabs.tsx |
| `admin_blacklist_components/admin_blacklist_toolbar/` | Feature-owned implementation boundary. | AdminBlacklistToolbar.tsx |
| `admin_blacklist_mocks/admin_blacklist_fixtures/` | Module-owned mock API datasets. | AdminBlacklistMockFixtures.ts, AdminBlacklistMockState.test.ts, AdminBlacklistMockState.ts |
| `admin_blacklist_mocks/admin_blacklist_handlers/` | Module-owned MSW request handlers. | AdminBlacklistMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Present in supplied API client.
- **Delete:** Present in supplied API client.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMaskSensitiveData`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminBlacklistCrossGymEmptyState.tsx` | `Renders the empty state for cross-gym blacklist records.` |
| `AdminBlacklistCrossGymView.tsx` | `Consolidated cross-branch view of gym-specific blacklist entries.` |
| `AdminBlacklistEmptyState.tsx` | `Empty state for the Blacklist table.` |
| `AdminBlacklistKPIs.tsx` | `KPI cards for the Blacklist module.` |
| `AdminBlacklistMain.tsx` | `Main entry point for the Blacklist module.` |
| `AdminBlacklistModal.tsx` | `Modal for adding a member to the blacklist.` |
| `AdminBlacklistTable.tsx` | `Table showing blacklisted members with toggle and remove actions.` |
| `AdminBlacklistTabs.tsx` | `Tab switcher between "All Entries" and "Cross-Branch View" for the Blacklist module.` |
| `AdminBlacklistToolbar.tsx` | `Search + filter toolbar for the Blacklist module.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: addToBlacklist
addToBlacklist: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: removeFromBlacklist
removeFromBlacklist: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 4: toggleBlacklist
toggleBlacklist: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 5: propagateToAllBranches
propagateToAllBranches: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminBlacklistLogic.ts`, `useAdminBlacklistMutations.ts`
- **Stores:** `useAdminBlacklistStore.ts`
- **Query-key registry:** `admin`, `blacklist`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminBlacklistApi.ts` | `fetchBlacklist` | `GET` | `params?: AdminBlacklistQueryParams` | `ApiResponse<BlacklistedMember[]` |
| `AdminBlacklistApi.ts` | `fetchKPIs` | `GET` | `—` | `ApiResponse<BlacklistKPIData` |
| `AdminBlacklistApi.ts` | `addToBlacklist` | `POST` | `payload: BlacklistFormValues, idempotencyKey: string` | `ApiResponse<BlacklistedMember` |
| `AdminBlacklistApi.ts` | `removeFromBlacklist` | `DELETE` | `id: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminBlacklistApi.ts` | `toggleBlacklist` | `PATCH` | `id: string, idempotencyKey: string` | `ApiResponse<BlacklistedMember` |
| `AdminBlacklistApi.ts` | `propagateToAllBranches` | `PATCH` | `id: string, idempotencyKey: string` | `ApiResponse<BlacklistedMember` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_blacklist_url_config.ts` | `detail: (id: string) => `/admin/blacklist/${encodeURIComponent(id)}`` |
| `admin_blacklist_url_config.ts` | `remove: (id: string) => `/admin/blacklist/${encodeURIComponent(id)}/remove`` |
| `admin_blacklist_url_config.ts` | `propagate: (id: string) => `/admin/blacklist/${encodeURIComponent(id)}/propagate`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminBlacklistCrossGymEmptyState.tsx` | Renders the empty state for cross-gym blacklist records. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistCrossGymView.tsx` | Consolidated cross-branch view of gym-specific blacklist entries. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistEmptyState.tsx` | Empty state for the Blacklist table. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistKPIs.tsx` | KPI cards for the Blacklist module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistMain.tsx` | Main entry point for the Blacklist module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistModal.tsx` | Modal for adding a member to the blacklist. | 13 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistTable.tsx` | Table showing blacklisted members with toggle and remove actions. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistTabs.tsx` | Tab switcher between "All Entries" and "Cross-Branch View" for the Blacklist module. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBlacklistToolbar.tsx` | Search + filter toolbar for the Blacklist module. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.


## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.


## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminBlacklistCrossGymEmptyState.tsx` | Renders the empty state for cross-gym blacklist records. | 1 |
| `AdminBlacklistCrossGymView.tsx` | Consolidated cross-branch view of gym-specific blacklist entries. | 4 |
| `AdminBlacklistEmptyState.tsx` | Empty state for the Blacklist table. | 1 |
| `AdminBlacklistKPIs.tsx` | KPI cards for the Blacklist module. | 0 |
| `AdminBlacklistMain.tsx` | Main entry point for the Blacklist module. | 0 |
| `AdminBlacklistModal.tsx` | Modal for adding a member to the blacklist. | 13 |
| `AdminBlacklistTable.tsx` | Table showing blacklisted members with toggle and remove actions. | 4 |
| `AdminBlacklistTabs.tsx` | Tab switcher between "All Entries" and "Cross-Branch View" for the Blacklist module. | 2 |
| `AdminBlacklistToolbar.tsx` | Search + filter toolbar for the Blacklist module. | 4 |


## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.


## Component Tree

`admin_blacklist_components/`
- `admin_blacklist_cross_gym_empty_state/AdminBlacklistCrossGymEmptyState.tsx`
- `admin_blacklist_cross_gym_view/AdminBlacklistCrossGymView.tsx`
- `admin_blacklist_empty_state/AdminBlacklistEmptyState.tsx`
- `admin_blacklist_kpis/AdminBlacklistKPIs.tsx`
- `admin_blacklist_main/AdminBlacklistMain.tsx`
- `admin_blacklist_modal/AdminBlacklistModal.tsx`
- `admin_blacklist_modal/useAdminBlacklistModalForm.test.ts`
- `admin_blacklist_modal/useAdminBlacklistModalForm.ts`
- `admin_blacklist_table/AdminBlacklistTable.tsx`
- `admin_blacklist_tabs/AdminBlacklistTabs.tsx`
- `admin_blacklist_toolbar/AdminBlacklistToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_blacklist_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

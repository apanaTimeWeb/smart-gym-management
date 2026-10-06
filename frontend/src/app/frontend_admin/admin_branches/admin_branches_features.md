# Admin Branches — Feature Map

## Module Purpose
The Admin Branches module gives administrators an operational view of branch-level gym performance and branch identity selection. Users can search/filter branches, choose a time range, inspect branch cards, select a branch, and open a detail drawer for the selected branch. The supplied frontend is read-oriented and owns its branch-detail rendering and view state. It does not create or edit branch records because no such frontend API contract is supplied in this module.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/branches` | ``frontend_admin/admin_branches/page.tsx`` | ``frontend_admin/admin_branches/admin_branches_components/admin_branches_main/AdminBranchesMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_branches/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_branches_api/` | Typed API transport boundary. | AdminBranchesApi.ts |
| `admin_branches_components/` | Feature component root. | (empty) |
| `admin_branches_constants/` | Static business configuration and query-key registries. | AdminBranchesConstants.ts, AdminBranchesQueryKeys.ts |
| `admin_branches_hooks/` | Feature data-flow and interaction hooks. | useAdminBranchesHeaderSelector.test.ts, useAdminBranchesHeaderSelector.ts, useAdminBranchesLogic.test.ts, useAdminBranchesLogic.ts, useAdminBranchesQueries.test.ts, useAdminBranchesQueries.ts |
| `admin_branches_locales/` | Module-owned localized resources. | admin_branches_en.json, admin_branches_hi.json |
| `admin_branches_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_branches_schemas/` | Zod validation/runtime contracts. | AdminBranchesSchemas.ts |
| `admin_branches_store/` | Module-scoped UI state only. | useAdminBranchesStore.test.ts, useAdminBranchesStore.ts |
| `admin_branches_types/` | Domain, DTO, state, and prop type contracts. | AdminBranchesDetailContentPropsTypes.ts, AdminBranchesDetailEmptyPropsTypes.ts, AdminBranchesEmptyStatePropsTypes.ts, AdminBranchesErrorPropsTypes.ts, AdminBranchesStoreTypes.ts, AdminBranchesTimeRangeTypes.ts, AdminBranchesTypes.ts, AdminBranchesUiTypes.ts |
| `admin_branches_utils/` | Feature-local deterministic utilities and formatters. | AdminBranchesFormatCurrency.test.ts, AdminBranchesFormatCurrency.ts |
| `admin_branches_components/admin_branches_card/` | Feature-owned implementation boundary. | AdminBranchesCard.tsx, AdminBranchesCardSkeleton.tsx |
| `admin_branches_components/admin_branches_detail_content/` | Feature-owned implementation boundary. | AdminBranchesDetailContent.tsx |
| `admin_branches_components/admin_branches_detail_drawer/` | Feature-owned implementation boundary. | AdminBranchesDetailDrawer.tsx, useAdminBranchesDetailDrawerKeyboard.test.ts, useAdminBranchesDetailDrawerKeyboard.ts |
| `admin_branches_components/admin_branches_detail_empty/` | Feature-owned implementation boundary. | AdminBranchesDetailEmpty.tsx |
| `admin_branches_components/admin_branches_detail_loading/` | Feature-owned implementation boundary. | AdminBranchesDetailLoading.tsx |
| `admin_branches_components/admin_branches_empty_state/` | Feature-owned implementation boundary. | AdminBranchesEmptyState.tsx |
| `admin_branches_components/admin_branches_header_selector/` | Feature-owned implementation boundary. | AdminBranchesHeaderSelector.tsx |
| `admin_branches_components/admin_branches_main/` | Feature-owned implementation boundary. | AdminBranchesMain.tsx |
| `admin_branches_components/admin_branches_toolbar/` | Feature-owned implementation boundary. | AdminBranchesToolbar.tsx |
| `admin_branches_mocks/admin_branches_fixtures/` | Module-owned mock API datasets. | AdminBranchesMockConstants.ts, AdminBranchesMockFixtures.ts |
| `admin_branches_mocks/admin_branches_handlers/` | Module-owned MSW request handlers. | AdminBranchesMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminBranchesCard.tsx` | `Renders filtered branch records as KPI cards and opens the module-owned detail drawer for the selected view.` |
| `AdminBranchesCardSkeleton.tsx` | `Renders the structural loading skeleton for the branch card grid.` |
| `AdminBranchesDetailContent.tsx` | `Renders the selected branch's feature-owned detail content for the requested detail view.` |
| `AdminBranchesDetailDrawer.tsx` | `Renders the selected branch detail drawer from TanStack Query server state, including loading, empty, error, retry, and view-specific states.` |
| `AdminBranchesDetailEmpty.tsx` | `Renders the feature-owned empty terminal state inside the branch detail drawer.` |
| `AdminBranchesDetailLoading.tsx` | `Renders the loading skeleton for the selected Admin branch detail section.` |
| `AdminBranchesEmptyState.tsx` | `Renders the feature-owned empty state when branch filters produce no visible records.` |
| `AdminBranchesHeaderSelector.tsx` | `Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook.` |
| `AdminBranchesMain.tsx` | `Client orchestrator for the branches module.` |
| `AdminBranchesToolbar.tsx` | `Owns search, branch-status filtering, and analytics date-range controls for the Admin Branches list.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminBranchesHeaderSelector.ts`, `useAdminBranchesLogic.ts`, `useAdminBranchesQueries.ts`
- **Stores:** `useAdminBranchesStore.ts`
- **Query-key registry:** `admin`, `branches`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminBranchesApi.ts` | `fetchBranches` | `GET` | `params?: { range?: string; startDate?: string; endDate?: string }` | `ApiResponse<Branch[]` |
| `AdminBranchesApi.ts` | `fetchBranchDetail` | `GET` | `branchId: string` | `ApiResponse<Branch` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_branches_url_config.ts` | `detail: (branchId: string) => `/admin/branches/${encodeURIComponent(branchId)}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminBranchesCard.tsx` | Renders filtered branch records as KPI cards and opens the module-owned detail drawer for the selected view. | 5 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesDetailContent.tsx` | Renders the selected branch's feature-owned detail content for the requested detail view. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesDetailDrawer.tsx` | Renders the selected branch detail drawer from TanStack Query server state, including loading, empty, error, retry, and view-specific states. | 5 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesDetailEmpty.tsx` | Renders the feature-owned empty terminal state inside the branch detail drawer. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesDetailLoading.tsx` | Renders the loading skeleton for the selected Admin branch detail section. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesEmptyState.tsx` | Renders the feature-owned empty state when branch filters produce no visible records. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesHeaderSelector.tsx` | Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesMain.tsx` | Client orchestrator for the branches module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminBranchesToolbar.tsx` | Owns search, branch-status filtering, and analytics date-range controls for the Admin Branches list. | 5 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminBranchesCard.tsx` | Renders filtered branch records as KPI cards and opens the module-owned detail drawer for the selected view. | 5 |
| `AdminBranchesCardSkeleton.tsx` | Renders the structural loading skeleton for the branch card grid. | 0 |
| `AdminBranchesDetailContent.tsx` | Renders the selected branch's feature-owned detail content for the requested detail view. | 2 |
| `AdminBranchesDetailDrawer.tsx` | Renders the selected branch detail drawer from TanStack Query server state, including loading, empty, error, retry, and view-specific states. | 5 |
| `AdminBranchesDetailEmpty.tsx` | Renders the feature-owned empty terminal state inside the branch detail drawer. | 0 |
| `AdminBranchesDetailLoading.tsx` | Renders the loading skeleton for the selected Admin branch detail section. | 1 |
| `AdminBranchesEmptyState.tsx` | Renders the feature-owned empty state when branch filters produce no visible records. | 1 |
| `AdminBranchesHeaderSelector.tsx` | Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook. | 1 |
| `AdminBranchesMain.tsx` | Client orchestrator for the branches module. | 0 |
| `AdminBranchesToolbar.tsx` | Owns search, branch-status filtering, and analytics date-range controls for the Admin Branches list. | 5 |


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

`admin_branches_components/`
- `admin_branches_card/AdminBranchesCard.tsx`
- `admin_branches_card/AdminBranchesCardSkeleton.tsx`
- `admin_branches_detail_content/AdminBranchesDetailContent.tsx`
- `admin_branches_detail_drawer/AdminBranchesDetailDrawer.tsx`
- `admin_branches_detail_drawer/useAdminBranchesDetailDrawerKeyboard.test.ts`
- `admin_branches_detail_drawer/useAdminBranchesDetailDrawerKeyboard.ts`
- `admin_branches_detail_empty/AdminBranchesDetailEmpty.tsx`
- `admin_branches_detail_loading/AdminBranchesDetailLoading.tsx`
- `admin_branches_empty_state/AdminBranchesEmptyState.tsx`
- `admin_branches_header_selector/AdminBranchesHeaderSelector.tsx`
- `admin_branches_main/AdminBranchesMain.tsx`
- `admin_branches_toolbar/AdminBranchesToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_branches_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

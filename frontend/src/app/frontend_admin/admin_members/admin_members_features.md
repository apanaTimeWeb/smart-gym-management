# Admin Members — Feature Map

## Module Purpose
The Admin Members module provides the primary administrative workspace for searching, filtering, paging, exporting, and inspecting gym member records. Users can combine member filters, navigate result pages, open a member profile drawer, and export member data through the supplied API contract. The module owns member-specific types, schemas, formatting, query/store state, and localized UI. It does not own branch, billing, HR, or subscription business logic merely because those domains may appear in a member profile.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/members` | ``frontend_admin/admin_members/page.tsx`` | ``frontend_admin/admin_members/admin_members_components/admin_members_main/AdminMembersMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_members/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_members_api/` | Typed API transport boundary. | AdminMembersApi.test.ts, AdminMembersApi.ts, AdminMembersBranchReferenceApi.ts, module URL config.test.ts |
| `admin_members_components/` | Feature component root. | (empty) |
| `admin_members_constants/` | Static business configuration and query-key registries. | AdminMembersConstants.ts, AdminMembersQueryKeys.ts |
| `admin_members_hooks/` | Feature data-flow and interaction hooks. | useAdminMembersBranchReference.test.ts, useAdminMembersBranchReference.ts, useAdminMembersDebounce.test.ts, useAdminMembersDebounce.ts, useAdminMembersLogic.test.ts, useAdminMembersLogic.ts |
| `admin_members_locales/` | Module-owned localized resources. | admin_members_en.json, admin_members_hi.json |
| `admin_members_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_members_schemas/` | Zod validation/runtime contracts. | AdminMembersSchemas.ts |
| `admin_members_store/` | Module-scoped UI state only. | useAdminMembersStore.test.ts, useAdminMembersStore.ts |
| `admin_members_types/` | Domain, DTO, state, and prop type contracts. | AdminMembersApiQueryTypes.ts, AdminMembersBranchReferenceTypes.ts, AdminMembersEmptyStatePropsTypes.ts, AdminMembersErrorPropsTypes.ts, AdminMembersProfileDrawerTypes.ts, AdminMembersStoreStateTypes.ts, AdminMembersToolbarPropsTypes.ts, AdminMembersTypes.ts, AdminMembersUiTypes.ts |
| `admin_members_utils/` | Feature-local deterministic utilities and formatters. | AdminMembersCreateExportCsv.test.ts, AdminMembersCreateExportCsv.ts, AdminMembersFormatCurrency.test.ts, AdminMembersFormatCurrency.ts, AdminMembersFormatters.test.ts, AdminMembersFormatters.ts |
| `admin_members_components/admin_members_empty_state/` | Feature-owned implementation boundary. | AdminMembersEmptyState.tsx |
| `admin_members_components/admin_members_header_search/` | Feature-owned implementation boundary. | AdminMembersHeaderSearch.tsx, useAdminMembersHeaderSearch.test.ts, useAdminMembersHeaderSearch.ts |
| `admin_members_components/admin_members_kpis/` | Feature-owned implementation boundary. | AdminMembersKPIs.tsx |
| `admin_members_components/admin_members_main/` | Feature-owned implementation boundary. | AdminMembersMain.tsx |
| `admin_members_components/admin_members_profile_drawer/` | Feature-owned implementation boundary. | AdminMembersProfileDrawer.tsx |
| `admin_members_components/admin_members_table/` | Feature-owned implementation boundary. | AdminMembersTable.tsx |
| `admin_members_components/admin_members_toolbar/` | Feature-owned implementation boundary. | AdminMembersToolbar.tsx |
| `admin_members_mocks/admin_members_fixtures/` | Module-owned mock API datasets. | AdminMembersBranchReferenceMockFixtures.ts, AdminMembersMockFixtures.ts |
| `admin_members_mocks/admin_members_handlers/` | Module-owned MSW request handlers. | AdminMembersBranchReferenceMockHandlers.ts, AdminMembersMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue`
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
| `AdminMembersEmptyState.tsx` | `Renders the empty state for Admin Members when no results match filters.` |
| `AdminMembersHeaderSearch.tsx` | `Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.` |
| `AdminMembersKPIs.tsx` | `Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding).` |
| `AdminMembersMain.tsx` | `Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.` |
| `AdminMembersProfileDrawer.tsx` | `Renders the slide-in profile drawer for a selected member showing full details.` |
| `AdminMembersTable.tsx` | `Renders the paginated members table with clickable rows, status badges, and branch info.` |
| `AdminMembersToolbar.tsx` | `Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminMembersBranchReference.ts`, `useAdminMembersLogic.ts`
- **Stores:** `useAdminMembersStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `members`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminMembersApi.ts` | `fetchMembers` | `GET/implicit` | `params: FetchMembersParams` | `ApiResponse<AdminMember[]` |
| `AdminMembersApi.ts` | `fetchSummary` | `GET/implicit` | `—` | `ApiResponse<AdminMembersSummary` |
| `AdminMembersApi.ts` | `fetchMemberById` | `GET/implicit` | `memberId: string` | `ApiResponse<AdminMember` |
| `AdminMembersApi.ts` | `exportMembers` | `GET/implicit` | `params: Omit<FetchMembersParams, 'page' | 'limit'>` | `ApiResponse<string` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_members_url_config.ts` | `detail: (memberId: string) => `/admin/members?memberId=${encodeURIComponent(memberId)}`` |
| `admin_members_url_config.ts` | `detail: (memberId: string) => `/admin/members/${encodeURIComponent(memberId)}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminMembersEmptyState.tsx` | Renders the empty state for Admin Members when no results match filters. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersHeaderSearch.tsx` | Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersKPIs.tsx` | Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding). | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersMain.tsx` | Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersProfileDrawer.tsx` | Renders the slide-in profile drawer for a selected member showing full details. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersTable.tsx` | Renders the paginated members table with clickable rows, status badges, and branch info. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersToolbar.tsx` | Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members. | 6 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminMembersEmptyState.tsx` | Renders the empty state for Admin Members when no results match filters. | 1 |
| `AdminMembersHeaderSearch.tsx` | Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 4 |
| `AdminMembersKPIs.tsx` | Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding). | 0 |
| `AdminMembersMain.tsx` | Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer. | 0 |
| `AdminMembersProfileDrawer.tsx` | Renders the slide-in profile drawer for a selected member showing full details. | 3 |
| `AdminMembersTable.tsx` | Renders the paginated members table with clickable rows, status badges, and branch info. | 1 |
| `AdminMembersToolbar.tsx` | Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members. | 6 |


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

`admin_members_components/`
- `admin_members_empty_state/AdminMembersEmptyState.tsx`
- `admin_members_header_search/AdminMembersHeaderSearch.tsx`
- `admin_members_header_search/useAdminMembersHeaderSearch.test.ts`
- `admin_members_header_search/useAdminMembersHeaderSearch.ts`
- `admin_members_kpis/AdminMembersKPIs.tsx`
- `admin_members_main/AdminMembersMain.tsx`
- `admin_members_profile_drawer/AdminMembersProfileDrawer.tsx`
- `admin_members_table/AdminMembersTable.tsx`
- `admin_members_toolbar/AdminMembersToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_members_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

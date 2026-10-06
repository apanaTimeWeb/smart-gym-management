# Admin Announcements — Feature Map

## Module Purpose
The Admin Announcements module lets authorized gym administrators publish and maintain member-facing announcements from the admin console. Users can review the announcement list and KPIs, create and edit announcements, delete obsolete announcements, and pin important announcements for visibility. The module owns the complete announcement UI state, validation, API contract, mocks, and localized presentation for those workflows. It does not own member records, billing, branch administration, or unrelated notification infrastructure.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/announcements` | ``frontend_admin/admin_announcements/page.tsx`` | ``frontend_admin/admin_announcements/admin_announcements_components/admin_announcements_main/AdminAnnouncementsMain.tsx`` |

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

Canonical module root: `admin_announcements/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_announcements_api/` | Typed API transport boundary. | AdminAnnouncementsApi.ts |
| `admin_announcements_components/` | Feature component root. | (empty) |
| `admin_announcements_constants/` | Static business configuration and query-key registries. | AdminAnnouncementsConstants.ts, AdminAnnouncementsQueryKeys.ts |
| `admin_announcements_hooks/` | Feature data-flow and interaction hooks. | useAdminAnnouncementsLogic.test.ts, useAdminAnnouncementsLogic.ts, useAdminAnnouncementsMutations.test.tsx, useAdminAnnouncementsMutations.ts, useAdminAnnouncementsUnsavedChangesGuard.test.ts, useAdminAnnouncementsUnsavedChangesGuard.ts |
| `admin_announcements_locales/` | Module-owned localized resources. | admin_announcements_en.json, admin_announcements_hi.json |
| `admin_announcements_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_announcements_schemas/` | Zod validation/runtime contracts. | AdminAnnouncementsSchemas.ts |
| `admin_announcements_store/` | Module-scoped UI state only. | useAdminAnnouncementsStore.test.ts, useAdminAnnouncementsStore.ts |
| `admin_announcements_types/` | Domain, DTO, state, and prop type contracts. | AdminAnnouncementsErrorPropsTypes.ts, AdminAnnouncementsMockHandlerTypes.ts, AdminAnnouncementsStoreTypes.ts, AdminAnnouncementsTypes.ts |
| `admin_announcements_utils/` | Feature-local deterministic utilities and formatters. | AdminAnnouncementsFormatters.test.ts, AdminAnnouncementsFormatters.ts |
| `admin_announcements_components/admin_announcements_empty_state/` | Feature-owned implementation boundary. | AdminAnnouncementsEmptyState.tsx |
| `admin_announcements_components/admin_announcements_kpis/` | Feature-owned implementation boundary. | AdminAnnouncementsKPIs.tsx |
| `admin_announcements_components/admin_announcements_main/` | Feature-owned implementation boundary. | AdminAnnouncementsMain.tsx |
| `admin_announcements_components/admin_announcements_modal/` | Feature-owned implementation boundary. | AdminAnnouncementsModal.tsx, useAdminAnnouncementsModalForm.test.ts, useAdminAnnouncementsModalForm.ts |
| `admin_announcements_components/admin_announcements_table/` | Feature-owned implementation boundary. | AdminAnnouncementsTable.tsx |
| `admin_announcements_mocks/admin_announcements_fixtures/` | Module-owned mock API datasets. | AdminAnnouncementsMockFixtures.ts, AdminAnnouncementsMockState.ts |
| `admin_announcements_mocks/admin_announcements_handlers/` | Module-owned MSW request handlers. | AdminAnnouncementsMockHandlers.ts |

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
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
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
| `AdminAnnouncementsEmptyState.tsx` | `Renders the empty state for the Admin announcements list and starts announcement creation.` |
| `AdminAnnouncementsKPIs.tsx` | `KPI stat cards for the Announcements module.` |
| `AdminAnnouncementsMain.tsx` | `Main orchestrator for the Admin Announcements module.` |
| `AdminAnnouncementsModal.tsx` | `Create / Edit modal for Announcements — RHF + Zod validation.` |
| `AdminAnnouncementsTable.tsx` | `Announcements table with search/filter toolbar, status badges, pin/edit/delete row actions.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: createAnnouncement
createAnnouncement: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: updateAnnouncement
updateAnnouncement: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 4: deleteAnnouncement
deleteAnnouncement: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 5: togglePin
togglePin: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminAnnouncementsLogic.ts`, `useAdminAnnouncementsMutations.ts`
- **Stores:** `useAdminAnnouncementsStore.ts`
- **Query-key registry:** `admin`, `announcements`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminAnnouncementsApi.ts` | `fetchAnnouncements` | `GET` | `params: AdminAnnouncementsQueryParams` | `ApiResponse<Announcement[]` |
| `AdminAnnouncementsApi.ts` | `fetchKPIs` | `GET` | `—` | `ApiResponse<AnnouncementKPIData` |
| `AdminAnnouncementsApi.ts` | `createAnnouncement` | `POST` | `payload: AnnouncementFormValues, idempotencyKey: string` | `ApiResponse<Announcement` |
| `AdminAnnouncementsApi.ts` | `updateAnnouncement` | `PATCH` | `id: string, payload: AnnouncementFormValues, idempotencyKey: string` | `ApiResponse<Announcement` |
| `AdminAnnouncementsApi.ts` | `deleteAnnouncement` | `DELETE` | `id: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminAnnouncementsApi.ts` | `togglePin` | `PATCH` | `id: string, idempotencyKey: string` | `ApiResponse<Announcement` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_announcements_url_config.ts` | `detail: (id: string) => `/admin/announcements/${encodeURIComponent(id)}`` |
| `admin_announcements_url_config.ts` | `pin: (id: string) => `/admin/announcements/${encodeURIComponent(id)}/pin`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminAnnouncementsEmptyState.tsx` | Renders the empty state for the Admin announcements list and starts announcement creation. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAnnouncementsKPIs.tsx` | KPI stat cards for the Announcements module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAnnouncementsMain.tsx` | Main orchestrator for the Admin Announcements module. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAnnouncementsModal.tsx` | Create / Edit modal for Announcements — RHF + Zod validation. | 14 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAnnouncementsTable.tsx` | Announcements table with search/filter toolbar, status badges, pin/edit/delete row actions. | 13 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminAnnouncementsEmptyState.tsx` | Renders the empty state for the Admin announcements list and starts announcement creation. | 1 |
| `AdminAnnouncementsKPIs.tsx` | KPI stat cards for the Announcements module. | 0 |
| `AdminAnnouncementsMain.tsx` | Main orchestrator for the Admin Announcements module. | 1 |
| `AdminAnnouncementsModal.tsx` | Create / Edit modal for Announcements — RHF + Zod validation. | 14 |
| `AdminAnnouncementsTable.tsx` | Announcements table with search/filter toolbar, status badges, pin/edit/delete row actions. | 13 |


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

`admin_announcements_components/`
- `admin_announcements_empty_state/AdminAnnouncementsEmptyState.tsx`
- `admin_announcements_kpis/AdminAnnouncementsKPIs.tsx`
- `admin_announcements_main/AdminAnnouncementsMain.tsx`
- `admin_announcements_modal/AdminAnnouncementsModal.tsx`
- `admin_announcements_modal/useAdminAnnouncementsModalForm.test.ts`
- `admin_announcements_modal/useAdminAnnouncementsModalForm.ts`
- `admin_announcements_table/AdminAnnouncementsTable.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_announcements_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

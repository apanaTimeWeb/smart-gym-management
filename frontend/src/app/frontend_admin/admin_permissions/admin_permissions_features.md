# Admin Permissions — Feature Map

## Module Purpose
The Admin Permissions module provides administrative visibility and controlled staff-level permission overrides for the supplied role-permission model. Users can inspect role permissions, search staff overrides, edit a staff member's permission override, and reset that override to defaults. The module owns only permission UI state and server contracts; permission enforcement remains authoritative outside the UI. It does not contain unrelated role navigation or cross-feature business registries.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/permissions` | ``frontend_admin/admin_permissions/page.tsx`` | ``frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_main/AdminPermissionsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_permissions/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_permissions_api/` | Typed API transport boundary. | AdminPermissionsApi.ts |
| `admin_permissions_components/` | Feature component root. | (empty) |
| `admin_permissions_constants/` | Static business configuration and query-key registries. | AdminPermissionsConstants.ts, AdminPermissionsQueryKeys.ts |
| `admin_permissions_hooks/` | Feature data-flow and interaction hooks. | useAdminPermissionsLogic.test.ts, useAdminPermissionsLogic.ts, useAdminPermissionsMutations.test.tsx, useAdminPermissionsMutations.ts |
| `admin_permissions_locales/` | Module-owned localized resources. | admin_permissions_en.json, admin_permissions_hi.json |
| `admin_permissions_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_permissions_schemas/` | Zod validation/runtime contracts. | AdminPermissionsSchemas.ts |
| `admin_permissions_store/` | Module-scoped UI state only. | useAdminPermissionsStore.test.ts, useAdminPermissionsStore.ts |
| `admin_permissions_types/` | Domain, DTO, state, and prop type contracts. | AdminPermissionsErrorPropsTypes.ts, AdminPermissionsRoleCardPropsTypes.ts, AdminPermissionsStoreTypes.ts, AdminPermissionsTypes.ts |
| `admin_permissions_utils/` | Feature-local deterministic utilities and formatters. | (empty) |
| `admin_permissions_components/admin_permissions_empty_state/` | Feature-owned implementation boundary. | AdminPermissionsEmptyState.tsx |
| `admin_permissions_components/admin_permissions_main/` | Feature-owned implementation boundary. | AdminPermissionsMain.tsx, AdminPermissionsSkeleton.tsx |
| `admin_permissions_components/admin_permissions_matrix/` | Feature-owned implementation boundary. | AdminPermissionsMatrix.module.css, AdminPermissionsMatrix.tsx |
| `admin_permissions_components/admin_permissions_role_card/` | Feature-owned implementation boundary. | AdminPermissionsRoleCard.tsx |
| `admin_permissions_components/admin_permissions_staff_overrides/` | Feature-owned implementation boundary. | AdminPermissionsStaffOverrides.tsx |
| `admin_permissions_components/admin_permissions_toolbar/` | Feature-owned implementation boundary. | AdminPermissionsToolbar.tsx |
| `admin_permissions_mocks/admin_permissions_fixtures/` | Module-owned mock API datasets. | AdminPermissionsMockFixtures.ts |
| `admin_permissions_mocks/admin_permissions_handlers/` | Module-owned MSW request handlers. | AdminPermissionsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Present in supplied API client.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminPermissionsEmptyState.tsx` | `Renders the module-owned empty state for an empty permission matrix.` |
| `AdminPermissionsMain.tsx` | `Composes the documented Permissions toolbar, read-only role matrix, and per-staff override editor.` |
| `AdminPermissionsSkeleton.tsx` | `Renders the structural loading skeleton for the Admin Permissions route.` |
| `AdminPermissionsMatrix.tsx` | `Displays role-default permission definitions. Per-staff editing is intentionally owned by the override panel because the documented mutation contract requires staffId.` |
| `AdminPermissionsRoleCard.tsx` | `Renders a summary card for one role using the role-default permission response only.` |
| `AdminPermissionsStaffOverrides.tsx` | `Displays per-staff permission overrides and owns the toggle/reset interaction surface defined by the Permissions feature map.` |
| `AdminPermissionsToolbar.tsx` | `Owns the Permissions role filter and staff search controls.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: updateStaffPermission
updateStaffPermission: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: resetToDefaults
resetToDefaults: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminPermissionsLogic.ts`, `useAdminPermissionsMutations.ts`
- **Stores:** `useAdminPermissionsStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `permissions`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminPermissionsApi.ts` | `fetchPermissions` | `GET` | `—` | `ApiResponse<RolePermissions[]` |
| `AdminPermissionsApi.ts` | `fetchOverrides` | `GET` | `—` | `ApiResponse<StaffOverride[]` |
| `AdminPermissionsApi.ts` | `updateStaffPermission` | `PATCH` | `staffId: string, payload: UpdateStaffPermissionPayload, idempotencyKey: string` | `ApiResponse<StaffOverride` |
| `AdminPermissionsApi.ts` | `resetToDefaults` | `POST` | `staffId: string, idempotencyKey: string` | `ApiResponse<null` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_permissions_url_config.ts` | `staff: (staffId: string) => `/admin/permissions/${staffId}`` |
| `admin_permissions_url_config.ts` | `reset: (staffId: string) => `/admin/permissions/${staffId}/reset`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminPermissionsEmptyState.tsx` | Renders the module-owned empty state for an empty permission matrix. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPermissionsMain.tsx` | Composes the documented Permissions toolbar, read-only role matrix, and per-staff override editor. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPermissionsMatrix.tsx` | Displays role-default permission definitions. Per-staff editing is intentionally owned by the override panel because the documented mutation contract requires staffId. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPermissionsStaffOverrides.tsx` | Displays per-staff permission overrides and owns the toggle/reset interaction surface defined by the Permissions feature map. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminPermissionsToolbar.tsx` | Owns the Permissions role filter and staff search controls. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminPermissionsEmptyState.tsx` | Renders the module-owned empty state for an empty permission matrix. | 1 |
| `AdminPermissionsMain.tsx` | Composes the documented Permissions toolbar, read-only role matrix, and per-staff override editor. | 0 |
| `AdminPermissionsSkeleton.tsx` | Renders the structural loading skeleton for the Admin Permissions route. | 0 |
| `AdminPermissionsMatrix.tsx` | Displays role-default permission definitions. Per-staff editing is intentionally owned by the override panel because the documented mutation contract requires staffId. | 1 |
| `AdminPermissionsRoleCard.tsx` | Renders a summary card for one role using the role-default permission response only. | 0 |
| `AdminPermissionsStaffOverrides.tsx` | Displays per-staff permission overrides and owns the toggle/reset interaction surface defined by the Permissions feature map. | 2 |
| `AdminPermissionsToolbar.tsx` | Owns the Permissions role filter and staff search controls. | 4 |


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

`admin_permissions_components/`
- `admin_permissions_empty_state/AdminPermissionsEmptyState.tsx`
- `admin_permissions_main/AdminPermissionsMain.tsx`
- `admin_permissions_main/AdminPermissionsSkeleton.tsx`
- `admin_permissions_matrix/AdminPermissionsMatrix.tsx`
- `admin_permissions_role_card/AdminPermissionsRoleCard.tsx`
- `admin_permissions_staff_overrides/AdminPermissionsStaffOverrides.tsx`
- `admin_permissions_toolbar/AdminPermissionsToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_permissions_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

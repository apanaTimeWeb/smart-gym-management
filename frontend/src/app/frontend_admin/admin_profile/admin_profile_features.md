# Admin Profile — Feature Map

## Module Purpose
The Admin Profile module lets the authenticated administrator view and update their own profile information and password. Users can edit profile details, submit a password change, use password-visibility controls, and recover from validation or server errors while preserving form input when appropriate. The module owns its profile query/mutation flow, validation, unsaved-change guard, and localized presentation. It does not manage other users' profiles or global identity/session infrastructure.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/profile` | ``frontend_admin/admin_profile/page.tsx`` | ``frontend_admin/admin_profile/admin_profile_components/admin_profile_main/AdminProfileMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- React Hook Form 7.x
- @hookform/resolvers 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_profile/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_profile_api/` | Typed API transport boundary. | AdminProfileApi.ts |
| `admin_profile_components/` | Feature component root. | (empty) |
| `admin_profile_constants/` | Static business configuration and query-key registries. | AdminProfileConstants.ts, AdminProfileQueryKeys.ts |
| `admin_profile_hooks/` | Feature data-flow and interaction hooks. | useAdminProfileLogic.test.ts, useAdminProfileLogic.ts, useAdminProfileMutations.test.tsx, useAdminProfileMutations.ts, useAdminProfilePasswordVisibility.test.ts, useAdminProfilePasswordVisibility.ts, useAdminProfileUnsavedChangesGuard.test.ts, useAdminProfileUnsavedChangesGuard.ts |
| `admin_profile_locales/` | Module-owned localized resources. | admin_profile_en.json, admin_profile_hi.json |
| `admin_profile_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_profile_schemas/` | Zod validation/runtime contracts. | AdminProfileSchemas.ts |
| `admin_profile_types/` | Domain, DTO, state, and prop type contracts. | AdminProfileErrorPropsTypes.ts, AdminProfileMockHandlerTypes.ts, AdminProfileTypes.ts |
| `admin_profile_components/admin_profile_main/` | Feature-owned implementation boundary. | AdminProfileMain.tsx |
| `admin_profile_components/admin_profile_password_field/` | Feature-owned implementation boundary. | AdminProfilePasswordField.tsx |
| `admin_profile_mocks/admin_profile_fixtures/` | Module-owned mock API datasets. | AdminProfileMockFixtures.ts |
| `admin_profile_mocks/admin_profile_handlers/` | Module-owned MSW request handlers. | AdminProfileMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue`
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
| `AdminProfileMain.tsx` | `Renders the Admin profile summary, personal-information form, and password form without owning API or validation logic.` |
| `AdminProfilePasswordField.tsx` | `Renders one password input with visibility toggle and React Hook Form validation feedback.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: updateProfile
updateProfile: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: updatePassword
updatePassword: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminProfileLogic.ts`, `useAdminProfileMutations.ts`, `useAdminProfilePasswordVisibility.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `detail`, `list`, `profile`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminProfileApi.ts` | `fetchProfile` | `GET` | `—` | `ApiResponse<z.infer<typeof adminProfileDataSchema` |
| `AdminProfileApi.ts` | `updateProfile` | `POST` | `body: UpdateAdminProfilePayload, idempotencyKey: string` | `ApiResponse<z.infer<typeof adminProfileDataSchema` |
| `AdminProfileApi.ts` | `updatePassword` | `POST` | `body: UpdateAdminPasswordPayload, idempotencyKey: string` | `ApiResponse<z.infer<typeof adminProfileDataSchema` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminProfileMain.tsx` | Renders the Admin profile summary, personal-information form, and password form without owning API or validation logic. | 12 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminProfilePasswordField.tsx` | Renders one password input with visibility toggle and React Hook Form validation feedback. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminProfileMain.tsx` | Renders the Admin profile summary, personal-information form, and password form without owning API or validation logic. | 12 |
| `AdminProfilePasswordField.tsx` | Renders one password input with visibility toggle and React Hook Form validation feedback. | 2 |


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

`admin_profile_components/`
- `admin_profile_main/AdminProfileMain.tsx`
- `admin_profile_password_field/AdminProfilePasswordField.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_profile_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

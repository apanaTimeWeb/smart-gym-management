# Manager Profile — Feature Map

## Module Purpose
Manager Profile is the authenticated manager’s own profile and credentials workspace. It lets the manager view/update profile details and change the account password. This module is not a general staff administration surface. Profile and password data are server state handled only through the module API and approved authentication infrastructure.

Module root: `frontend_manager/manager_profile/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Not exposed | No module API client uses POST in the supplied snapshot. |
| Read | Exposed | ManagerProfileApi: fetchProfile. |
| Update | Exposed | ManagerProfileApi |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_profile_api/` | Owns feature API clients and request/response transport contracts. | `ManagerProfileApi.ts` |
| `manager_profile_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_profile_components/manager_profile_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerProfileMain.tsx` |
| `manager_profile_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerProfileConstants.ts`, `ManagerProfileQueryKeys.ts`, `ManagerProfileTabConstants.ts` |
| `manager_profile_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerProfileForms.test.ts`, `useManagerProfileForms.ts`, `useManagerProfileLogic.test.ts`, `useManagerProfileLogic.ts`, `useManagerProfileMutations.test.ts`, `useManagerProfileMutations.ts`, `useManagerProfileQueries.test.ts`, `useManagerProfileQueries.ts` |
| `manager_profile_locales/` | Owns module English and Hindi translation catalogs. | `manager_profile_en.json`, `manager_profile_hi.json` |
| `manager_profile_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_profile_mocks/manager_profile_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerProfileMockData.ts` |
| `manager_profile_mocks/manager_profile_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerProfileMockHandlers.ts` |
| `manager_profile_schemas/` | Owns feature Zod validation and response schemas. | `ManagerProfileFormSchemas.ts`, `ManagerProfileSchema.ts` |
| `manager_profile_tests/` | Owns module behavior and utility tests. | `ManagerProfileBehavior.test.tsx` |
| `manager_profile_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerProfileFormTypes.ts`, `ManagerProfileTypes.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_profile_features.md`
- `manager_profile_forbidden.md`
- `manager_profile_theme_contract.md`
- `manager_profile_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchProfile | `/manager/profile` | Uses the fetchProfile workflow with typed request/response handling. | `GET /manager/profile` | ✅ Implemented |
| updateProfile | `/manager/profile` | Uses the updateProfile workflow with typed request/response handling. | `PATCH /manager/profile` | ✅ Implemented |
| updatePassword | `/manager/profile` | Uses the updatePassword workflow with typed request/response handling. | `PATCH /manager/profile/password` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Update profile
1. Manager loads the profile record from the module API.
2. RHF + Zod validates editable profile fields.
3. updateProfile() submits changes and the authoritative response updates the view.
### Flow 2: Change password
1. Manager enters the current/new password fields and uses the visibility toggles.
2. The password form validates locally with Zod while the backend remains authoritative.
3. updatePassword() submits through the secure API boundary; raw errors/secrets are never rendered.

## Component Tree

- Route: `manager_profile/page.tsx`
  - `<ManagerProfileMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** No URL-backed list state was detected; this module must add URL state before introducing a searchable/filterable/paginated list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'profile', 'current']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_profile/manager_profile_mocks/manager_profile_mocks_handlers/` and `manager_profile/manager_profile_mocks/manager_profile_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchProfile` | `GET` | `/api/v1/manager/profile` | `—` | `ManagerProfileData` |
| `updateProfile` | `PATCH` | `/api/v1/manager/profile` | `UpdateManagerProfilePayload` | `ManagerProfileData` |
| `updatePassword` | `PATCH` | `/api/v1/manager/profile/password` | `UpdateManagerPasswordPayload` | `Record<string, unknown>` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Profile: Name | `name` | `/api/v1/manager/profile` | `data.name` | No | Yes |
| Profile: Email | `email` | `/api/v1/manager/profile` | `data.email` | No | Yes |
| Profile: Phone | `phone` | `/api/v1/manager/profile` | `data.phone` | Yes | Yes |
| Password form: current password | `currentPassword` | `client form + PATCH /profile/password` | `request.currentPassword` | No | Yes |
| Password form: new password | `newPassword` | `client form + PATCH /profile/password` | `request.newPassword` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_profile_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Never expose password values in logs or user-facing error text:** Never expose password values in logs or user-facing error text.
- **Password fields must include a lucide-react visibility toggle:** Password fields must include a lucide-react visibility toggle.
- **Profile save must not optimistically overwrite server data with the submitted DTO:** Profile save must not optimistically overwrite server data with the submitted DTO.
- **Phone/profile optional fields must use deliberate empty-value rendering:** Phone/profile optional fields must use deliberate empty-value rendering.
- **Authentication/redirect behavior belongs to the approved global auth infrastructure:** Authentication/redirect behavior belongs to the approved global auth infrastructure.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_profile/manager_profile_components/manager_profile_main/ManagerProfileMain.tsx` | Renders the Manager profile and password forms using RHF + Zod while consuming server profile state through TanStack Query. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_PROFILE`
- Active locales: `en`, `hi`
- English catalog: `manager_profile/manager_profile_locales/manager_profile_en.json`
- Hindi catalog: `manager_profile/manager_profile_locales/manager_profile_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerProfileMain.tsx`
- Primary query-key registry: `ManagerProfileQueryKeys.ts`
- Primary module constants registry: `ManagerProfileConstants.ts`
- Canonical schema file: `ManagerProfileSchema.ts` in `manager_profile_schemas/`
- Module theme contract: `manager_profile_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_profile_components/manager_profile_main/ManagerProfileMain.tsx` | YES |
| API client | `ManagerProfileApi.ts` | YES |
| Schema file | `ManagerProfileSchema.ts` | YES |
| Query-key registry | `ManagerProfileQueryKeys.ts` | YES |
| Constants registry | `ManagerProfileConstants.ts` | YES |
| URL config | `manager_profile_url_config.ts` | YES |
| Behavior test | `ManagerProfileBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_profile_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_profile/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_profile/manager_profile_mocks/manager_profile_mocks_fixtures/` and `manager_profile/manager_profile_mocks/manager_profile_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.

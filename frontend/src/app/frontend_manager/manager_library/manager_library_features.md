# Manager Library — Feature Map

## Module Purpose
Manager Library is the branch content library for reusable diet plans and exercises. Managers can search and page through exercises and diet plans, create/update/delete library entries, and use those records from member workflows. The module owns all library fixtures and MSW handlers. Backend-driven diet-plan and exercise data must never be duplicated as component constants.

Module root: `frontend_manager/manager_library/`

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
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | query |
| Read | Exposed | ManagerLibraryApi: fetchExercises, fetchDietPlans. |
| Update | Exposed | ManagerLibraryApi |
| Delete | Exposed | ManagerLibraryApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_library_api/` | Owns feature API clients and request/response transport contracts. | `ManagerLibraryApi.ts` |
| `manager_library_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_library_components/manager_library_diet_grid/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryDietGrid.tsx` |
| `manager_library_components/manager_library_diet_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryDietModal.tsx` |
| `manager_library_components/manager_library_empty_state/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryEmptyState.tsx` |
| `manager_library_components/manager_library_exercise_grid/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryExerciseGrid.tsx` |
| `manager_library_components/manager_library_exercise_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryExerciseModal.tsx` |
| `manager_library_components/manager_library_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryMain.tsx` |
| `manager_library_components/manager_library_main/manager_library_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryContent.tsx` |
| `manager_library_components/manager_library_tabs/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryTabs.tsx` |
| `manager_library_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerLibraryConstants.ts`, `ManagerLibraryExerciseConstants.test.ts`, `ManagerLibraryExerciseConstants.ts`, `ManagerLibraryQueryKeys.ts`, `ManagerLibrarySharedConstants.test.ts`, `ManagerLibrarySharedConstants.ts` |
| `manager_library_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerLibraryDietForm.test.ts`, `useManagerLibraryDietForm.ts`, `useManagerLibraryExerciseForm.test.ts`, `useManagerLibraryExerciseForm.ts`, `useManagerLibraryLogic.test.ts`, `useManagerLibraryLogic.ts`, `useManagerLibraryMutations.test.ts`, `useManagerLibraryMutations.ts` (+2 more) |
| `manager_library_locales/` | Owns module English and Hindi translation catalogs. | `manager_library_en.json`, `manager_library_hi.json` |
| `manager_library_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_library_mocks/manager_library_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryDietMockData.ts`, `ManagerLibraryMockData.ts` |
| `manager_library_mocks/manager_library_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerLibraryMockHandlers.ts` |
| `manager_library_schemas/` | Owns feature Zod validation and response schemas. | `ManagerLibraryDietFormSchema.ts`, `ManagerLibraryExerciseFormSchema.ts`, `ManagerLibrarySchema.ts` |
| `manager_library_store/` | Owns module-scoped Zustand UI state only. | `useManagerLibraryUiStore.test.ts`, `useManagerLibraryUiStore.ts` |
| `manager_library_tests/` | Owns module behavior and utility tests. | `ManagerLibraryBehavior.test.tsx` |
| `manager_library_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerLibraryDietFormTypes.ts`, `ManagerLibraryEmptyStateTypes.ts`, `ManagerLibraryExerciseFormTypes.ts`, `ManagerLibraryTypes.ts` |
| `manager_library_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerLibraryFormatters.test.ts`, `ManagerLibraryFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_library_features.md`
- `manager_library_forbidden.md`
- `manager_library_theme_contract.md`
- `manager_library_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
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
- `@testing-library/user-event`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchExercises | `/manager/library` | Uses the fetchExercises workflow with typed request/response handling. | `GET /manager/library/exercises` | ✅ Implemented |
| createExercise | `/manager/library` | Uses the createExercise workflow with typed request/response handling. | `POST /manager/library/exercises` | ✅ Implemented |
| updateExercise | `/manager/library` | Uses the updateExercise workflow with typed request/response handling. | `PATCH /manager/library/exercises/:id` | ✅ Implemented |
| deleteExercise | `/manager/library` | Uses the deleteExercise workflow with typed request/response handling. | `DELETE /manager/library/exercises/:id` | ✅ Implemented |
| fetchDietPlans | `/manager/library` | Uses the fetchDietPlans workflow with typed request/response handling. | `GET /manager/library/diet-plans` | ✅ Implemented |
| createDietPlan | `/manager/library` | Uses the createDietPlan workflow with typed request/response handling. | `POST /manager/library/diet-plans` | ✅ Implemented |
| updateDietPlan | `/manager/library` | Uses the updateDietPlan workflow with typed request/response handling. | `PATCH /manager/library/diet-plans/:id` | ✅ Implemented |
| deleteDietPlan | `/manager/library` | Uses the deleteDietPlan workflow with typed request/response handling. | `DELETE /manager/library/diet-plans/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage diet plans
1. Manager switches to diet plans and searches the library.
2. fetchDietPlans(params) sends server-side search and pagination.
3. MSW filters the diet-plan fixtures and returns the total.
4. The diet grid renders the page and the edit/delete actions reconcile the query cache.
### Flow 2: Manage exercises
1. Manager searches the exercise library.
2. fetchExercises(params) loads the server-backed list.
3. Create/update/delete actions use the module API and Zod schemas.
4. The response becomes the new Query cache source of truth.

## Component Tree

- Route: `manager_library/page.tsx`
  - `<ManagerLibraryMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_library_store/useManagerLibraryUiStore.ts`, `manager_library_store/useManagerLibraryUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_library/manager_library_mocks/manager_library_mocks_handlers/` and `manager_library/manager_library_mocks/manager_library_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchExercises` | `GET` | `/api/v1/manager/library/exercises` | `{ page?, limit?, search?, category?, difficulty? }` | `{ exercises: Exercise[]; total: number }` |
| `createExercise` | `POST` | `/api/v1/manager/library/exercises` | `Partial<Exercise>` | `Exercise` |
| `updateExercise` | `PATCH` | `/api/v1/manager/library/exercises/:id` | `{ id: string; body: Partial<Exercise> }` | `Exercise` |
| `deleteExercise` | `DELETE` | `/api/v1/manager/library/exercises/:id` | `{ id: string }` | `{ id: string }` |
| `fetchDietPlans` | `GET` | `/api/v1/manager/library/diet-plans` | `{ page?, limit?, search?, goal? }` | `{ dietPlans: DietPlan[]; total: number }` |
| `createDietPlan` | `POST` | `/api/v1/manager/library/diet-plans` | `Partial<DietPlan>` | `DietPlan` |
| `updateDietPlan` | `PATCH` | `/api/v1/manager/library/diet-plans/:id` | `{ id: string; body: Partial<DietPlan> }` | `DietPlan` |
| `deleteDietPlan` | `DELETE` | `/api/v1/manager/library/diet-plans/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Diet table/grid: Name | `name` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].name` | No | Yes |
| Diet: Goal | `goal` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].goal` | No | Yes |
| Diet: Calories | `calories` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].calories` | Yes | Yes |
| Diet: Protein | `protein` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].protein` | Yes | Yes |
| Diet: Carbs | `carbs` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].carbs` | Yes | Yes |
| Diet: Fats | `fats` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].fats` | Yes | Yes |
| Diet: Active | `isActive` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].isActive` | No | Yes |
| Diet: Meals | `meals[]` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].meals[]` | No | Yes |
| Exercise: Name | `name` | `/api/v1/manager/library/exercises` | `data.exercises[].name` | No | Yes |
| Exercise: Category | `category` | `/api/v1/manager/library/exercises` | `data.exercises[].category` | No | Yes |
| Exercise: Muscle group | `muscleGroup` | `/api/v1/manager/library/exercises` | `data.exercises[].muscleGroup` | Yes | Yes |
| Exercise: Difficulty | `difficulty` | `/api/v1/manager/library/exercises` | `data.exercises[].difficulty` | No | Yes |
| Exercise: Active | `isActive` | `/api/v1/manager/library/exercises` | `data.exercises[].isActive` | No | Yes |

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
**Forbidden-pattern contract:** See `manager_library_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Diet plans must come from the `/diet-plans` endpoint; do not silently reuse member diet-plan snapshots:** Diet plans must come from the `/diet-plans` endpoint; do not silently reuse member diet-plan snapshots.
- **Pagination total must be the filtered server total:** Pagination total must be the filtered server total.
- **Optional nutrition values require explicit nullable display behavior:** Optional nutrition values require explicit nullable display behavior.
- **Exercise and diet-plan delete actions are destructive and need confirmation:** Exercise and diet-plan delete actions are destructive and need confirmation.
- **Do not put diet/exercise server records into shared UI constants:** Do not put diet/exercise server records into shared UI constants.
- **When the backend changes a library record, reconcile the Query cache with the response object:** When the backend changes a library record, reconcile the Query cache with the response object.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_library/manager_library_components/manager_library_diet_grid/ManagerLibraryDietGrid.tsx` | Renders the diet plan cards grid with macronutrient info and action buttons. |
| `manager_library/manager_library_components/manager_library_diet_modal/ManagerLibraryDietModal.tsx` | Form modal for creating or editing a diet plan in the Diet Library module. |
| `manager_library/manager_library_components/manager_library_main/ManagerLibraryMain.tsx` | Framework entry component for the Diet Library module; delegates feature behavior and UI composition to `ManagerLibraryContent`. |
| `manager_library/manager_library_components/manager_library_tabs/ManagerLibraryTabs.tsx` | Renders the tabbed view switching between Diet Plans and Exercises in the Diet Library. |
| `manager_library/manager_library_hooks/useManagerLibraryLogic.ts` | Provides UI orchestration state to the Diet Library module hierarchy. Async data is managed in useManagerLibraryLogic. |
| `manager_library_components/manager_library_empty_state/ManagerLibraryEmptyState.tsx` | Renders the Library contextual empty state and the documented permitted recovery or create action. |
| `manager_library_components/manager_library_exercise_grid/ManagerLibraryExerciseGrid.tsx` | Renders the Library Exercise Grid visual collection using module-owned records and responsive layout rules. |
| `manager_library_components/manager_library_exercise_modal/ManagerLibraryExerciseModal.tsx` | Renders the Library Exercise Modal interaction surface and delegates validation and mutation state to module-owned form/logic hooks. |
| `manager_library_components/manager_library_main/manager_library_content/ManagerLibraryContent.tsx` | Composes the Library Content content sections while keeping data/state orchestration outside the view layer. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_LIBRARY`
- Active locales: `en`, `hi`
- English catalog: `manager_library/manager_library_locales/manager_library_en.json`
- Hindi catalog: `manager_library/manager_library_locales/manager_library_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerLibraryMain.tsx`
- Primary query-key registry: `ManagerLibraryQueryKeys.ts`
- Primary module constants registry: `ManagerLibraryConstants.ts`
- Canonical schema file: `ManagerLibrarySchema.ts` in `manager_library_schemas/`
- Module theme contract: `manager_library_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_library_components/manager_library_main/ManagerLibraryMain.tsx` | YES |
| API client | `ManagerLibraryApi.ts` | YES |
| Schema file | `ManagerLibrarySchema.ts` | YES |
| Query-key registry | `ManagerLibraryQueryKeys.ts` | YES |
| Constants registry | `ManagerLibraryConstants.ts` | YES |
| URL config | `manager_library_url_config.ts` | YES |
| Behavior test | `ManagerLibraryBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_library_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_library/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_library/manager_library_mocks/manager_library_mocks_fixtures/` and `manager_library/manager_library_mocks/manager_library_mocks_handlers/`.
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

# Manager Workout — Feature Map

## Module Purpose
Manager Workout is the branch workout-plan and exercise-library workspace. Managers can browse and maintain workout plans, manage exercise records, and review assigned workout plans. All workout/exercise/assignment data is server state owned by this module and delivered through its API and MSW fixtures.

Module root: `frontend_manager/manager_workout/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
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
| Read | Exposed | ManagerWorkoutApi: fetchWorkouts, fetchExercises, fetchAssignments. |
| Update | Exposed | ManagerWorkoutApi |
| Delete | Exposed | ManagerWorkoutApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_workout_api/` | Owns feature API clients and request/response transport contracts. | `ManagerWorkoutApi.ts` |
| `manager_workout_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_workout_components/manager_workout_banner/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutBanner.tsx` |
| `manager_workout_components/manager_workout_exercise_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutExerciseModal.tsx` |
| `manager_workout_components/manager_workout_exercise_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutExerciseTable.tsx` |
| `manager_workout_components/manager_workout_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutMain.tsx` |
| `manager_workout_components/manager_workout_main/manager_workout_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutContent.tsx` |
| `manager_workout_components/manager_workout_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutModal.tsx` |
| `manager_workout_components/manager_workout_plans_grid/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutPlansEmptyState.tsx`, `ManagerWorkoutPlansGrid.tsx` |
| `manager_workout_components/manager_workout_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutToolbar.tsx` |
| `manager_workout_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerWorkoutConstants.ts`, `ManagerWorkoutFormConstants.ts`, `ManagerWorkoutQueryKeys.ts`, `ManagerWorkoutSharedConstants.test.ts`, `ManagerWorkoutSharedConstants.ts` |
| `manager_workout_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerWorkoutExerciseForm.test.ts`, `useManagerWorkoutExerciseForm.ts`, `useManagerWorkoutForm.test.ts`, `useManagerWorkoutForm.ts`, `useManagerWorkoutLogic.test.ts`, `useManagerWorkoutLogic.ts`, `useManagerWorkoutMutations.test.ts`, `useManagerWorkoutMutations.ts` (+2 more) |
| `manager_workout_locales/` | Owns module English and Hindi translation catalogs. | `manager_workout_en.json`, `manager_workout_hi.json` |
| `manager_workout_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_workout_mocks/manager_workout_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutAssignmentMockData.ts`, `ManagerWorkoutMockData.ts` |
| `manager_workout_mocks/manager_workout_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerWorkoutMockHandlers.ts` |
| `manager_workout_schemas/` | Owns feature Zod validation and response schemas. | `ManagerWorkoutFormSchemas.ts`, `ManagerWorkoutSchema.ts` |
| `manager_workout_store/` | Owns module-scoped Zustand UI state only. | `useManagerWorkoutUiStore.test.ts`, `useManagerWorkoutUiStore.ts` |
| `manager_workout_tests/` | Owns module behavior and utility tests. | `ManagerWorkoutBehavior.test.tsx` |
| `manager_workout_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerWorkoutAssignmentTypes.ts`, `ManagerWorkoutFormTypes.ts`, `ManagerWorkoutSnapshotTypes.ts`, `ManagerWorkoutTypes.ts`, `ManagerWorkoutViewModelTypes.ts` |
| `manager_workout_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerWorkoutFormatters.test.ts`, `ManagerWorkoutFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_workout_features.md`
- `manager_workout_forbidden.md`
- `manager_workout_theme_contract.md`
- `manager_workout_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
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
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchWorkouts | `/manager/workout` | Uses the fetchWorkouts workflow with typed request/response handling. | `GET /manager/workouts` | ✅ Implemented |
| createWorkout | `/manager/workout` | Uses the createWorkout workflow with typed request/response handling. | `POST /manager/workouts` | ✅ Implemented |
| updateWorkout | `/manager/workout` | Uses the updateWorkout workflow with typed request/response handling. | `PATCH /manager/workouts/:id` | ✅ Implemented |
| deleteWorkout | `/manager/workout` | Uses the deleteWorkout workflow with typed request/response handling. | `DELETE /manager/workouts/:id` | ✅ Implemented |
| fetchExercises | `/manager/workout` | Uses the fetchExercises workflow with typed request/response handling. | `GET /manager/workouts/exercises` | ✅ Implemented |
| createExercise | `/manager/workout` | Uses the createExercise workflow with typed request/response handling. | `POST /manager/workouts/exercises` | ✅ Implemented |
| updateExercise | `/manager/workout` | Uses the updateExercise workflow with typed request/response handling. | `PATCH /manager/workouts/exercises/:id` | ✅ Implemented |
| fetchAssignments | `/manager/workout` | Uses the fetchAssignments workflow with typed request/response handling. | `GET /manager/workout/assignments` | ✅ Implemented |
| deleteExercise | `/manager/workout` | Uses the deleteExercise workflow with typed request/response handling. | `DELETE /manager/workouts/exercises/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage workout plans
1. Manager searches/filters workout plans and pages the server dataset.
2. fetchWorkouts(params) retrieves the current page.
3. Create/update/delete mutations use the workout API and reconcile Query state.
### Flow 2: Manage exercises
1. Manager opens Exercise Library and searches the exercise dataset.
2. fetchExercises(params) returns the server-filtered page.
3. Create/update/delete exercise mutations use the typed API response.

## Component Tree

- Route: `manager_workout/page.tsx`
  - `<ManagerWorkoutMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_workout_store/useManagerWorkoutUiStore.ts`, `manager_workout_store/useManagerWorkoutUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'workout', 'plans', params]`; `['manager', 'workout', 'exercises', params]`; `['manager', 'workout', 'assignments']`; `['manager', 'workout', 'plans']`; `['manager', 'workout', 'exercises']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_workout/manager_workout_mocks/manager_workout_mocks_handlers/` and `manager_workout/manager_workout_mocks/manager_workout_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchWorkouts` | `GET` | `/api/v1/manager/workouts` | `{ page?, limit?, search?, level? }` | `{ workouts: Workout[]; total: number }` |
| `createWorkout` | `POST` | `/api/v1/manager/workouts` | `Partial<Workout>` | `Workout` |
| `updateWorkout` | `PATCH` | `/api/v1/manager/workouts/:id` | `{ id: string; body: Partial<Workout> }` | `Workout` |
| `deleteWorkout` | `DELETE` | `/api/v1/manager/workouts/:id` | `{ id: string }` | `{ id: string }` |
| `fetchExercises` | `GET` | `/api/v1/manager/workouts/exercises` | `{ page?, limit?, search?, difficulty? }` | `{ exercises: ExerciseSnapshot[]; total: number }` |
| `createExercise` | `POST` | `/api/v1/manager/workouts/exercises` | `Partial<ExerciseSnapshot>` | `ExerciseSnapshot` |
| `updateExercise` | `PATCH` | `/api/v1/manager/workouts/exercises/:id` | `{ id: string; body: Partial<ExerciseSnapshot> }` | `ExerciseSnapshot` |
| `fetchAssignments` | `GET` | `/api/v1/manager/workout/assignments` | `—` | `ManagerWorkoutAssignment[]` |
| `deleteExercise` | `DELETE` | `/api/v1/manager/workouts/exercises/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Workout: Name | `name` | `/api/v1/manager/workouts` | `data.workouts[].name` | No | Yes |
| Workout: Level | `level` | `/api/v1/manager/workouts` | `data.workouts[].level` | No | Yes |
| Workout: Days | `days` | `/api/v1/manager/workouts` | `data.workouts[].days` | No | Yes |
| Workout: Exercise count | `exercises` | `/api/v1/manager/workouts` | `data.workouts[].exercises` | No | Yes |
| Workout: Focus | `focus` | `/api/v1/manager/workouts` | `data.workouts[].focus` | No | Yes |
| Workout: Duration | `duration` | `/api/v1/manager/workouts` | `data.workouts[].duration` | No | Yes |
| Workout: Tags | `tags[]` | `/api/v1/manager/workouts` | `data.workouts[].tags[]` | No | Yes |
| Exercise: Name | `name` | `/api/v1/manager/workouts/exercises` | `data.exercises[].name` | No | Yes |
| Exercise: Muscle group | `muscleGroup[]` | `/api/v1/manager/workouts/exercises` | `data.exercises[].muscleGroup[]` | No | Yes |
| Exercise: Category | `category` | `/api/v1/manager/workouts/exercises` | `data.exercises[].category` | Yes | Yes |
| Exercise: Equipment | `equipment` | `/api/v1/manager/workouts/exercises` | `data.exercises[].equipment` | No | Yes |
| Exercise: Difficulty | `difficulty` | `/api/v1/manager/workouts/exercises` | `data.exercises[].difficulty` | No | Yes |
| Assignment: Member | `memberName` | `/api/v1/manager/workout/assignments` | `data[].memberName` | No | Yes |
| Assignment: Plan | `planName` | `/api/v1/manager/workout/assignments` | `data[].planName` | No | Yes |
| Assignment: Assigned by | `assignedBy` | `/api/v1/manager/workout/assignments` | `data[].assignedBy` | No | Yes |
| Assignment: Start date | `startDate` | `/api/v1/manager/workout/assignments` | `data[].startDate` | No | Yes |

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
**Forbidden-pattern contract:** See `manager_workout_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Do not confuse `/manager/workouts` with `/manager/workout/assignments`; they are distinct contracts.**
- **Workout/exercise deletes are destructive and require confirmation.**
- **Exercise category is optional and must use `displayValue()` when blank.**
- **Assignment records must come from their dedicated endpoint and fixture, not workout-plan constants.**
- **Workout tags/exercise groups must be rendered from response arrays rather than hardcoded UI samples.**

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_workout/manager_workout_components/manager_workout_banner/ManagerWorkoutBanner.tsx` | Renders the top banner/hero section with module title and CTA for the Workout Library. |
| `manager_workout/manager_workout_components/manager_workout_exercise_modal/ManagerWorkoutExerciseModal.tsx` | Form modal for creating or editing a single exercise entry in the Workout Library module. |
| `manager_workout/manager_workout_components/manager_workout_exercise_table/ManagerWorkoutExerciseTable.tsx` | Renders the exercises data table with muscle group, category, and inline edit/delete actions. |
| `manager_workout/manager_workout_components/manager_workout_main/ManagerWorkoutMain.tsx` | Framework entry component for the Workout module; delegates the interactive surface to `ManagerWorkoutContent`. |
| `manager_workout/manager_workout_components/manager_workout_modal/ManagerWorkoutModal.tsx` | Form modal for creating or editing a workout plan in the Workout Library module. |
| `manager_workout/manager_workout_components/manager_workout_plans_grid/ManagerWorkoutPlansGrid.tsx` | Renders the grid of workout plan cards with exercises count and action buttons. |
| `manager_workout/manager_workout_components/manager_workout_toolbar/ManagerWorkoutToolbar.tsx` | Renders the search input, muscle group filter, and Add Plan CTA for the Workout Library. |
| `manager_workout/manager_workout_hooks/useManagerWorkoutLogic.ts` | Provides UI orchestration state to the Workout Library module hierarchy using URL parameters for filtering. |
| `manager_workout_components/manager_workout_main/manager_workout_content/ManagerWorkoutContent.tsx` | Composes the Workout Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_workout_components/manager_workout_plans_grid/ManagerWorkoutPlansEmptyState.tsx` | Renders the Workout Plans contextual empty state and the documented permitted recovery or create action. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_WORKOUT`
- Active locales: `en`, `hi`
- English catalog: `manager_workout/manager_workout_locales/manager_workout_en.json`
- Hindi catalog: `manager_workout/manager_workout_locales/manager_workout_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerWorkoutMain.tsx`
- Primary query-key registry: `ManagerWorkoutQueryKeys.ts`
- Primary module constants registry: `ManagerWorkoutConstants.ts`
- Canonical schema file: `ManagerWorkoutSchema.ts` in `manager_workout_schemas/`
- Module theme contract: `manager_workout_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_workout_components/manager_workout_main/ManagerWorkoutMain.tsx` | YES |
| API client | `ManagerWorkoutApi.ts` | YES |
| Schema file | `ManagerWorkoutSchema.ts` | YES |
| Query-key registry | `ManagerWorkoutQueryKeys.ts` | YES |
| Constants registry | `ManagerWorkoutConstants.ts` | YES |
| URL config | `manager_workout_url_config.ts` | YES |
| Behavior test | `ManagerWorkoutBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_workout_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_workout/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_workout/manager_workout_mocks/manager_workout_mocks_fixtures/` and `manager_workout/manager_workout_mocks/manager_workout_mocks_handlers/`.
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

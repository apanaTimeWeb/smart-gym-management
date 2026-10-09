# trainer_workout — Feature Map (v8-fix)

## Module Purpose
The Workout module gives trainers a focused workspace for managing their workout plans and exercises. Users can search, filter, sort, paginate, create, edit, inspect, and delete the records exposed by the Trainer API contract. Server data stays in TanStack Query while UI-only selection/modal state remains module-scoped. Cross-role workout administration or unrelated business abstractions are outside the feature boundary.

## Mock State Reset Contract
The Workout MSW collections are mutable during an active flow. Tests that reuse the handler module must call `resetTrainerWorkoutMockData()` from `trainer_workout_mocks/trainer_workout_handlers/TrainerWorkoutMockHandlers.ts` before each isolated case.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_workout_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, http-status-codes, lucide-react, msw, next, next-intl, react, react-hook-form, vitest, zod, zustand.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/workout`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_workout/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_workout_api/
├──   TrainerWorkoutApi.ts
├──   TrainerWorkoutApiBehavior.test.ts
├── trainer_workout_components/
├──   trainer_workout_banner/
├──     TrainerWorkoutBanner.tsx
├──   trainer_workout_empty_state/
├──     TrainerWorkoutEmptyState.tsx
├──   trainer_workout_exercise_modal/
├──     TrainerWorkoutExerciseModal.tsx
├──   trainer_workout_exercise_table/
├──     TrainerWorkoutExerciseTable.tsx
├──   trainer_workout_loading_skeleton/
├──     TrainerWorkoutLoadingSkeleton.tsx
├──   trainer_workout_main/
├──     TrainerWorkoutMain.tsx
├──     TrainerWorkoutMainBehavior.test.tsx
├──   trainer_workout_modal/
├──     TrainerWorkoutExerciseFields.tsx
├──     TrainerWorkoutModal.tsx
├──   trainer_workout_not_found_view/
├──     TrainerWorkoutNotFoundView.tsx
├──   trainer_workout_plan_card/
├──     TrainerWorkoutPlanCard.tsx
├──   trainer_workout_plans_grid/
├──     TrainerWorkoutPlansGrid.tsx
├──   trainer_workout_toolbar/
├──     TrainerWorkoutToolbar.tsx
├── trainer_workout_constants/
├──   TrainerWorkoutConstants.test.ts
├──   TrainerWorkoutConstants.ts
├──   TrainerWorkoutQueryKeys.ts
├── trainer_workout_features.md
├── trainer_workout_forbidden.md
├── trainer_workout_hooks/
├──   useTrainerWorkoutFilters.test.ts
├──   useTrainerWorkoutFilters.ts
├──   useTrainerWorkoutMutations.test.ts
├──   useTrainerWorkoutMutations.ts
├──   useTrainerWorkoutQuery.test.ts
├──   useTrainerWorkoutQuery.ts
├── trainer_workout_locales/
├──   trainer_workout_en.json
├──   trainer_workout_hi.json
├── trainer_workout_mocks/
├──   trainer_workout_fixtures/
├──     TrainerWorkoutMockData.ts
├──   trainer_workout_handlers/
├──     TrainerWorkoutMockHandlers.ts
├── trainer_workout_schemas/
├──   TrainerWorkoutDomainSchemas.ts
├── trainer_workout_store/
├──   TrainerWorkoutStoreTypes.ts
├──   useTrainerWorkoutStore.test.ts
├──   useTrainerWorkoutStore.ts
├── trainer_workout_tests/
├──   TrainerWorkoutRouteStates.test.tsx
├── trainer_workout_theme_contract.md
├── trainer_workout_types/
├──   TrainerWorkoutEmptyStateProps.ts
├──   TrainerWorkoutExerciseFieldsProps.ts
├──   TrainerWorkoutMutationTypes.ts
├──   TrainerWorkoutPlanCardProps.ts
├──   TrainerWorkoutQueryTypes.ts
├──   TrainerWorkoutSortTypes.ts
├──   TrainerWorkoutTypes.ts
├── trainer_workout_url_config.ts
├── trainer_workout_utils/
├──   TrainerWorkoutDisplayFormatters.test.ts
├──   TrainerWorkoutDisplayFormatters.ts
├──   TrainerWorkoutFormConstants.test.ts
├──   TrainerWorkoutFormConstants.ts
├──   TrainerWorkoutSortConstants.test.ts
└──   TrainerWorkoutSortConstants.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Plan list | Search/category filter/pagination. |
| Create plan | RHF + Zod → POST → refreshed list. |
| Edit plan | RHF + Zod → PATCH → updated plan visible. |
| Delete plan | Confirm → DELETE → plan removed from mock/list. |
| Exercise management | Search/list/create/edit/delete using feature API/mocks. |
| Detail | Drawer/detail state for selected plan. |

## User Flows & Interactions
List → search/filter/page → create/edit/delete → server/mock mutation → visible list update. Destructive delete uses `useConfirm()`.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchWorkouts` | GET | `TRAINER_WORKOUT_URLS.API.WORKOUTS` | search/category/page/limit | workout list + pagination |
| `createWorkout` | POST | `TRAINER_WORKOUT_URLS.API.WORKOUTS` | workout form payload | created workout |
| `updateWorkout` | PATCH | `TRAINER_WORKOUT_URLS.API.WORKOUTS/:id` | partial workout payload | updated workout |
| `deleteWorkout` | DELETE | `TRAINER_WORKOUT_URLS.API.WORKOUTS/:id` | workout ID | mutation result |
| exercise CRUD | GET/POST/PATCH/DELETE | `TRAINER_WORKOUT_URLS.API.EXERCISES` | exercise/search/filter payloads | exercise records |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Workout plan card | `id`, name, focus/category/tags, exercise metadata rendered by card | workout response |
| Search/category controls | search/category values | URL/query/API |
| Exercise table | `id`, name, category/difficulty/metadata rendered by rows | exercise response |
| Create/edit forms | workout/exercise fields defined by Zod schemas | RHF + Zod + API |
| Pagination | total/page/limit | API/mock response |

## Permissions and Security
- Required capability: `trainer.view`.
- Trainer can manage only Trainer-owned workout/exercise workflows represented by this module.
- Delete actions use confirmation before mutation.
- Backend remains final authorization authority.

## Loading, Empty, and Error States
- `loading.tsx` uses workout-shaped skeletons.
- Plan/exercise lists expose empty states.
- Async save/delete buttons disable during mutation and retain width.
- Route errors provide Retry.
- Mutation/API errors are sanitized before presentation.

## Edge Cases and AI Warnings
- **Delete must change mock-visible state:** do not implement toast-only success.
- **Search/category/page must affect the request and returned result set.**
- **Exercise rows must keep stable IDs:** no `key={index}` for editable/reorderable fields.
- **Form edits use RHF/Zod:** do not move validation back into JSX handlers.
- **Do not import another role's workout fixtures or business helpers to avoid duplication.**

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerWorkoutMain` | Workout route composition and tab orchestration. |
| `TrainerWorkoutToolbar` | Search/category/tab/add controls. |
| `TrainerWorkoutPlansGrid` | Plan card list and actions. |
| `TrainerWorkoutModal` | Workout-plan form. |
| `TrainerWorkoutExerciseTable` | Exercise table and row actions. |
| `TrainerWorkoutExerciseModal` | Exercise form. |
| `TrainerWorkoutExerciseFields` | Repeatable RHF exercise field rows. |

## Current v9-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerWorkoutQueryKeys.ts, useTrainerWorkoutMutations.test.ts, useTrainerWorkoutMutations.ts, useTrainerWorkoutQuery.test.ts, useTrainerWorkoutQuery.ts.
- Hook files: useTrainerWorkoutFilters.test.ts, useTrainerWorkoutFilters.ts.
- Constants: TrainerWorkoutConstants.test.ts, TrainerWorkoutConstants.ts.
- Schemas: TrainerWorkoutDomainSchemas.ts.
- Types: TrainerWorkoutEmptyStateProps.ts, TrainerWorkoutExerciseFieldsProps.ts, TrainerWorkoutMutationTypes.ts, TrainerWorkoutPlanCardProps.ts, TrainerWorkoutQueryTypes.ts, TrainerWorkoutSortTypes.ts, TrainerWorkoutTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerWorkoutDisplayFormatters.ts, TrainerWorkoutFormConstants.test.ts, TrainerWorkoutFormConstants.ts, TrainerWorkoutSortConstants.test.ts, TrainerWorkoutSortConstants.ts.
- Store: TrainerWorkoutStoreTypes.ts, useTrainerWorkoutStore.ts, useTrainerWorkoutStore.test.ts.
- Module-owned tests: 12 files (source inventory as packaged).
- Mock/fixture files: 2 files.

## Rule Compliance Checklist
- [x] Canonical feature module retained as single source of business implementation.
- [x] Route files physically owned by this module.
- [x] Prefixed snake_case internal folders.
- [x] Role+module filename contract for module-owned artifacts.
- [x] Component/hook/store/schema/API size ceilings.
- [x] No global business formatter dependency.
- [x] Feature-owned localization, mocks, schemas, query keys, and tests.
- [x] No raw theme colors/arbitrary Tailwind values in feature JSX.
- [x] No fake/no-op controls found in static source checks.
- [ ] Host build/CI/runtime/browser verification — NOT VERIFIED; host application configuration was not supplied.
- [x] URL configuration placement follows the documented feature-root URL configuration exception; no source conflict remains.

## Routes
- `/trainer/workout` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_workout/
  page.tsx
  trainer_workout_components/
    trainer_workout_banner/
      TrainerWorkoutBanner.tsx
    trainer_workout_empty_state/
      TrainerWorkoutEmptyState.tsx
    trainer_workout_exercise_modal/
      TrainerWorkoutExerciseModal.tsx
    trainer_workout_exercise_table/
      TrainerWorkoutExerciseTable.tsx
    trainer_workout_loading_skeleton/
      TrainerWorkoutLoadingSkeleton.tsx
    trainer_workout_main/
      TrainerWorkoutMain.tsx
    trainer_workout_modal/
      TrainerWorkoutExerciseFields.tsx
    trainer_workout_not_found_view/
      TrainerWorkoutNotFoundView.tsx
    trainer_workout_plan_card/
      TrainerWorkoutPlanCard.tsx
    trainer_workout_plans_grid/
      TrainerWorkoutPlansGrid.tsx
    trainer_workout_toolbar/
      TrainerWorkoutToolbar.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_WORKOUT_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_WORKOUT_PAGE_LIST = '/trainer/workout' as const;`
- `export const TRAINER_WORKOUT_API_BASE = '/trainer/workout' as const;`
- `export const TRAINER_WORKOUT_API_WORKOUTS = '/trainer/trainer_workout/workouts' as const;`
- `export const TRAINER_WORKOUT_API_WORKOUT = (id: string) => `/trainer/trainer_workout/workouts/${id}` as const;`
- `export const TRAINER_WORKOUT_API_EXERCISES = '/trainer/trainer_workout/exercises' as const;`
- `export const TRAINER_WORKOUT_API_EXERCISE = (id: string) => `/trainer/trainer_workout/exercises/${id}` as const;`

## State Map
- Server/API state: TanStack Query.
- Shared UI state: module-scoped Zustand where required.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_workout`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.

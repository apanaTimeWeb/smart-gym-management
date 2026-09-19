# Trainer Workout — Feature Map

## Module Purpose
Trainer ka workout-plan/exercise library. Trainer own scoped plans ko browse, search/filter, create, edit, delete, detail-view aur assigned-member workflow ke through manage karta hai.

## Directory Structure
- `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` — route states.
- `workout_components/` — toolbar, plan grid, forms, exercise table/modal, banner, and main composition.
- `workout_queries/` — TanStack Query reads and mutation hooks.
- `workout_store/` — UI-only modal/drawer/selection state with types in `TrainerWorkoutStoreTypes.ts`.
- `workout_api/TrainerWorkout_api.ts` — API boundary.
- `workout_types/TrainerWorkout.schema.ts` — Zod/domain contracts.
- `workout_utils/` — static form/filter configuration.
- `workout_fixtures/` / `workout_mocks/` — feature-owned mutable demo server state and handlers.
- `workout_url_config.ts` — Workout page/API contract.
- `workout_tests/` — API/main/route behavior tests.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Plan list | Search/category filter/pagination. |
| Create plan | RHF + Zod → POST → refreshed list. |
| Edit plan | RHF + Zod → PATCH → updated plan visible. |
| Delete plan | Confirm → DELETE → plan removed from mock/list. |
| Exercise management | Search/list/create/edit/delete using feature API/mocks. |
| Detail | Drawer/detail state for selected plan. |

## Data and State Architecture
- TanStack Query owns plans/exercises server state.
- Zustand owns only modal/drawer/selection UI state.
- No Workout React Context owns API data.
- Mock handlers honor search/category/page and mutations update mutable in-memory state.

## User Flows
List → search/filter/page → create/edit/delete → server/mock mutation → visible list update. Destructive delete uses `useConfirm()`.

## Architecture Notes
No React Context is required for Workout server state. UI controls route/query state through feature hooks.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, React Hook Form/Zod, approved Trainer feedback/UI primitives.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchWorkouts` | GET | `WorkoutUrlConfig.BACKEND_API.WORKOUTS` | search/category/page/limit | workout list + pagination |
| `createWorkout` | POST | `WorkoutUrlConfig.BACKEND_API.WORKOUTS` | workout form payload | created workout |
| `updateWorkout` | PATCH | `WorkoutUrlConfig.BACKEND_API.WORKOUTS/:id` | partial workout payload | updated workout |
| `deleteWorkout` | DELETE | `WorkoutUrlConfig.BACKEND_API.WORKOUTS/:id` | workout ID | mutation result |
| exercise CRUD | GET/POST/PATCH/DELETE | `WorkoutUrlConfig.BACKEND_API.EXERCISES` | exercise/search/filter payloads | exercise records |

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

## Rule Compliance Checklist
- [x] Feature-owned workout/exercise mocks
- [x] Search/category/pagination contract
- [x] Mutable CRUD mock state
- [x] RHF + Zod forms
- [x] Destructive confirmation
- [x] No cross-feature business imports
- [x] Semantic theme usage
- [ ] Parent-app runtime/tooling verification — NOT VERIFIED

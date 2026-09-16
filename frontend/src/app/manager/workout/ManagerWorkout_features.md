# Manager Workout — Feature Map

## Module Purpose
Manager Workout provides branch-level workout-plan and exercise-library administration plus visibility into assigned plans. Workout data and mutations use the Manager API and module-owned MSW fixtures.
## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `workout_components/` | Plans, exercises, and assignment presentation |
| `workout_context/ManagerWorkoutContext.tsx` | URL/UI state orchestration |
| `workout_api/ManagerWorkoutApi.ts` | API boundary with Zod response validation |
| `workout_api/ManagerUseManagerWorkoutQueries.ts` | Query hooks including assignments |
| `workout_api/ManagerUseManagerWorkoutMutations.ts` | CRUD mutations |
| `workout_types/` | Domain DTOs, assignments, and Zod schemas |
| `workout_fixtures/` | MSW-only workout and assignment fixtures |

## Feature Inventory
| Feature | API |
|---|---|
| Workout Plans | `GET/POST/PATCH/DELETE /manager/workouts` |
| Exercise Library | `GET/POST/PATCH/DELETE /manager/workouts/exercises` |
| Assigned Workout Plans | `GET /manager/workout/assignments` |

## Data and State Architecture
TanStack Query owns plans, exercises, and assignment responses. Forms use RHF + Zod. URL state owns list/search/filter pagination. Mock data is consumed only through the module MSW handlers.

## Edge Cases / AI Warnings
- Workout IDs come from the backend/MSW response; do not generate frontend IDs.
- Delete actions require `useConfirm()` and reconcile TanStack Query cache.
- The API paths use the centralized plural workout/exercise URL contract matching the MSW handlers.


## User Flows & Interactions
1. Open the `workout` route and load the feature Query state.
2. Use the visible filters/tabs or action controls to choose a workflow.
3. Submit through the owning Manager form/query/mutation layer.
4. On success, consume the backend response message and reconcile the relevant TanStack Query cache; on failure, preserve user-entered data and show the backend error message.


## API Contract
| API file | Functions | Endpoints |
|---|---|---|
| `ManagerUseManagerWorkoutMutations.ts` | API declarations | See URL config expressions |
| `ManagerWorkoutApi.ts` | `createExercise`, `createWorkout`, `getAssignments`, `getExercises`, `getWorkouts`, `removeExercise`, `removeWorkout`, `updateExercise`, `updateWorkout` | See URL config expressions |
| `ManagerUseManagerWorkoutQueries.ts` | API declarations | See URL config expressions |


## UI Data Requirements
| UI/API field | Source |
|---|---|
| `assignedBy` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `category` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `currentPage` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `day` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `difficulty` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `equipment` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `exercises` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `focus` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `id` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `isRest` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `levelFilter` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `memberName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `muscleGroup` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `name` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `planName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `reps` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `saving` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `search` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `setCurrentPage` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `setLevelFilter` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `setSearch` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `setTab` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sets` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `startDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `tab` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `toast` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalExercises` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalWorkouts` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `workouts` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |


## Permissions and Security
- **Required role:** `MANAGER` for `/manager/workout`.
- **UI boundary:** `ManagerPermissionGate` enforces the Manager workspace capability before rendering the module shell.
- **Cross-role isolation:** feature code must not import business artifacts from Admin, Superadmin, Trainer, or another Manager feature; module infrastructure is the documented exception.
- **Sensitive mutations:** destructive/financial actions use the Manager confirmation flow before mutation.


## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `workout_components/ManagerWorkoutBanner/ManagerWorkoutBanner.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `workout_components/ManagerWorkoutExerciseModal/ManagerWorkoutExerciseModal.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `workout_components/ManagerWorkoutExerciseTable/ManagerWorkoutExerciseTable.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `workout_components/ManagerWorkoutMain/ManagerWorkoutMain.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `workout_components/ManagerWorkoutModal/ManagerWorkoutModal.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `workout_components/ManagerWorkoutPlansGrid/ManagerWorkoutPlansGrid.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `workout_components/ManagerWorkoutToolbar/ManagerWorkoutToolbar.tsx` | Renders the `workout`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |

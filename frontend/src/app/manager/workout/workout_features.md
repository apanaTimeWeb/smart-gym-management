# Manager Workout — Feature Map

## Module Purpose
Manager Workout is the branch workout-plan and exercise-library workspace. Managers can browse and maintain workout plans, manage exercise records, and review assigned workout plans. All workout/exercise/assignment data is server state owned by this module and delivered through its API and MSW fixtures.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `workout_api/` | Feature-owned responsibility for the workout module. | `ManagerUseManagerWorkoutMutations.ts; ManagerUseManagerWorkoutQueries.ts; ManagerWorkoutApi.ts` |
| `workout_components/` | Feature-owned responsibility for the workout module. | `—` |
| `workout_hooks/` | Feature-owned responsibility for the workout module. | `ManagerUseManagerWorkoutLogic.ts` |
| `workout_fixtures/` | Feature-owned responsibility for the workout module. | `ManagerWorkoutAssignmentMockData.ts; ManagerWorkoutMockData.ts` |
| `workout_mocks/` | Feature-owned responsibility for the workout module. | `—` |
| `workout_types/` | Feature-owned responsibility for the workout module. | `ManagerWorkoutAssignmentTypes.ts; ManagerWorkoutSchema.ts; ManagerWorkoutSnapshotTypes.ts; ManagerWorkoutTypes.ts` |
| `workout_utils/` | Feature-owned responsibility for the workout module. | `ManagerWorkoutSharedConstants.ts` |

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

## Data and State Architecture
TanStack Query owns workout server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
- **Do not confuse `/manager/workouts` with `/manager/workout/assignments`; they are distinct contracts:** Do not confuse `/manager/workouts` with `/manager/workout/assignments`; they are distinct contracts.
- **Workout/exercise deletes are destructive and require confirmation:** Workout/exercise deletes are destructive and require confirmation.
- **Exercise category is optional and must use displayValue() when blank:** Exercise category is optional and must use displayValue() when blank.
- **Assignment records must come from their dedicated endpoint and fixture, not workout-plan constants:** Assignment records must come from their dedicated endpoint and fixture, not workout-plan constants.
- **Workout tags/exercise groups must be rendered from response arrays rather than hardcoded UI samples:** Workout tags/exercise groups must be rendered from response arrays rather than hardcoded UI samples.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `workout/workout_components/ManagerWorkoutBanner/ManagerWorkoutBanner.tsx` | Renders the top banner/hero section with module title and CTA for the Workout Library. |
| `workout/workout_components/ManagerWorkoutExerciseModal/ManagerWorkoutExerciseModal.tsx` | Form modal for creating or editing a single exercise entry in the Workout Library module. |
| `workout/workout_components/ManagerWorkoutExerciseTable/ManagerWorkoutExerciseTable.tsx` | Renders the exercises data table with muscle group, category, and inline edit/delete actions. |
| `workout/workout_components/ManagerWorkoutMain/ManagerWorkoutMain.tsx` | Framework entry component for the Workout module; delegates the interactive surface to `ManagerWorkoutContent`. |
| `workout/workout_components/ManagerWorkoutModal/ManagerWorkoutModal.tsx` | Form modal for creating or editing a workout plan in the Workout Library module. |
| `workout/workout_components/ManagerWorkoutPlansGrid/ManagerWorkoutPlansGrid.tsx` | Renders the grid of workout plan cards with exercises count and action buttons. |
| `workout/workout_components/ManagerWorkoutToolbar/ManagerWorkoutToolbar.tsx` | Renders the search input, muscle group filter, and Add Plan CTA for the Workout Library. |
| `workout/workout_hooks/ManagerUseManagerWorkoutLogic.ts` | Provides UI orchestration state to the Workout Library module hierarchy using URL parameters for filtering. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

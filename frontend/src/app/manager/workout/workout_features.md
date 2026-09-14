# Manager Workout — Feature Map

## Module Purpose
The Manager Workout module is responsible for managing Workout Plans and the central Exercise Library. It uses URL parameters for managing current tab and search states, centralizes state via a context provider, and routes all API calls through MSW during development/testing.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — main entry point |
| `loading.tsx` | Layout skeleton |
| `error.tsx` | Route-level error boundary |
| `not-found.tsx` | 404 fallback |
| `workout_components/` | All UI components for plans and exercises |
| `workout_context/ManagerWorkoutContext.tsx` | Context provider, URL-sync, form state |
| `workout_api/ManagerWorkoutApi.ts` | HTTP client using `apiFetch` with Zod schemas |
| `workout_api/useManagerWorkoutQueries.ts` | TanStack Query fetchers |
| `workout_api/useManagerWorkoutMutations.ts` | TanStack Query mutation wrappers |
| `workout_types/ManagerWorkoutTypes.ts` | Domain types (Workout, WorkoutDay, Exercise alias) |
| `workout_types/ManagerWorkoutSnapshotTypes.ts` | `ExerciseSnapshot` DTO |
| `workout_types/ManagerWorkoutSchema.ts` | Zod schemas for API boundary validation |
| `workout_utils/` | Constants, form schemas, and shared helpers |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Workout Plans Grid | `/manager/workout` | Display, create, edit, delete workout plans | `GET /manager/workouts`, `POST /manager/workout/plans`, `PATCH`, `DELETE` | ✅ Live |
| Exercise Library Table | `/manager/workout?tab=Exercises` | Display, create, edit, delete individual exercises | `GET /manager/workouts/exercises`, `POST /manager/workout/exercises`, `PATCH`, `DELETE` | ✅ Live |

## Data and State Architecture
- **Server-state:** Managed exclusively via TanStack Query (`useWorkoutPlansQuery`, `useExercisesQuery`).
- **Client-state (Sync):** URL parameters (`?tab=`, `?search=`, `?level=`, `?page=`).
- **Context providers:** `WorkoutProvider` serves UI states (modal visibility, form state) and synchronizes with URL.
- **Forms:** React Hook Form + Zod used in `ManagerWorkoutModal` and `ManagerWorkoutExerciseModal` with `useUnsavedChangesGuard`.

## MSW Mock Layer
- **Handler file**: `src/mocks/handlers/manager-workout.handlers.ts`
- All workout plan and exercise CRUD endpoints intercepted by MSW.
- `ManagerWorkoutApi.ts` uses `apiFetch` exclusively — **no direct mock data imports**.
- Mock data lives only in `workout_api/ManagerWorkoutMockData.ts` and is referenced only by MSW handlers.

## Query Keys
- `['manager', 'workout', 'plans', params]`: Workout plans list with pagination/search.
- `['manager', 'workout', 'exercises', params]`: Exercise library with pagination/search.

## Type System Notes
- `ExerciseSnapshot.muscleGroup` is `string[]` (array), not `string`.
- When editing an exercise, `muscleGroup` is joined with `', '` for the text input and re-split via `.split(',').map(s => s.trim())` on save.
- `Exercise` is a type alias for `ExerciseSnapshot` (single source of truth in `ManagerWorkoutTypes.ts`).
- `WorkoutSnapshot.days` is now a strongly-typed array of `{ day, focus, exercises[] }` (no longer `unknown[]`).

## Loading, Empty, Error States
- **Loading:** `Loader2` spinner in `ManagerWorkoutBanner`, `ManagerWorkoutPlansGrid`, and `ManagerWorkoutExerciseTable` via `isLoading` from TanStack Query.
- **Empty:** Inline empty states in grid and table components.
- **Error:** Route-level `error.tsx`. Mutation errors displayed via `react-hot-toast`.

## Edge Cases / AI Warnings
- **URL Synchronization:** Changing tabs or searches must be synced to the URL using context helper functions (`setTab`, `setSearch`).
- **No `any` Types:** All types are strictly typed. Use `ExerciseSnapshot` from `ManagerWorkoutSnapshotTypes.ts`.
- **muscleGroup is string[]:** Never assign a `string` directly to `muscleGroup`. Always use an array.
- **No Frontend ID Generation:** Exercise and workout IDs come from the backend. Never use `Date.now()` on the frontend.
- **Formatting:** All currency/number representations must use `@/lib/formatters`.
- **Styling:** Inline CSS variables are forbidden; use semantic Tailwind tokens from `workout_theme_contract.md`.

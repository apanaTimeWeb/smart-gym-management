# Manager Workout — Feature Map

## Module Purpose
The Manager Workout module is responsible for managing Workout Plans and the central Exercise Library. It uses URL parameters for managing current tab and search states and centralizes state management via a context provider. Forms are managed through React Hook Form with Zod validation.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — main entry point |
| `loading.tsx` | Layout skeleton |
| `error.tsx` | Route-level error boundary |
| `not-found.tsx` | 404 fallback |
| `workout_components/` | All UI components for plans and exercises |
| `workout_context/` | State and query providers (e.g., `ManagerWorkoutContext.tsx`) |
| `workout_api/` | API calls and React Query hooks |
| `workout_types/` | Specific TypeScript definitions |
| `workout_utils/` | Constants, schemas, and helpers |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Workout Plans Grid | `/manager/workout` | Display, create, edit, delete workout plans | `GET /manager/workout/plans`, `POST /manager/workout/plans`, `PUT`, `DELETE` | ✅ Live |
| Exercise Library Table | `/manager/workout?tab=Exercises` | Display, create, edit, delete individual exercises | `GET /manager/workout/exercises`, `POST /manager/workout/exercises`, `PUT`, `DELETE` | ✅ Live |

## Data and State Architecture
- **Server-state:** TanStack Query is integrated via `useManagerWorkoutQueries.ts` and `useManagerWorkoutMutations.ts`. 
- **Client-state (Sync):** URL parameters (`?tab=`, `?search=`, `?level=`, `?page=`). 
- **Context providers:** `WorkoutProvider` serves UI states (e.g., modal visibility) and synchronizes with URL parameters.
- **Forms:** React Hook Form + Zod used in `ManagerWorkoutModal` and `ManagerWorkoutExerciseModal` with `useUnsavedChangesGuard`.

## Edge Cases / AI Warnings
- **URL Synchronization:** Changing tabs or searches must be synced to the URL using the `ManagerWorkoutContext` helper functions (`setTab`, `setSearch`).
- **No `any` Types:** All types are strictly typed (no `as any`).
- **Formatting:** All currency/number representations (if applicable) must use `@/lib/formatters`.
- **Styling:** Inline CSS variables (`var(--workout-highlight)`) are forbidden; use semantic Tailwind classes (`bg-primary`).

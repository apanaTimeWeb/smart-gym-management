# Trainer Workout — Feature Map

## Module Purpose
The Trainer Workout module is the primary tool for trainers to create, manage, and assign
workout plans to their assigned members. Trainers own the full CRUD lifecycle of workout
plans within their scope — they cannot access or modify workout plans belonging to other
trainers or branches. This module is the single source of truth for exercise programming
at the trainer level.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard, passes no props |
| `loading.tsx` | Grid skeleton — 6 plan card placeholders |
| `error.tsx` | Error boundary with retry |
| `workout_components/TrainerWorkoutMain.tsx` | Root Client Component — layout + provider mount |
| `workout_components/TrainerWorkoutGrid.tsx` | Card grid of all workout plans owned by trainer |
| `workout_components/TrainerWorkoutPlanCard.tsx` | Single plan card — name, difficulty, exercise count, actions |
| `workout_components/TrainerWorkoutCreateModal.tsx` | Create new workout plan form |
| `workout_components/TrainerWorkoutEditModal.tsx` | Edit existing plan — pre-filled form |
| `workout_components/TrainerWorkoutDetailDrawer.tsx` | Slide-in drawer — full exercise list for a plan |
| `workout_components/TrainerWorkoutAssignModal.tsx` | Assign plan to one or more assigned members |
| `workout_components/TrainerWorkoutExerciseRow.tsx` | Single exercise row inside detail drawer |
| `workout_context/WorkoutProvider.tsx` | Fetches plan list, exposes via context |
| `workout_types/TrainerWorkoutTypes.ts` | `WorkoutPlan`, `Exercise`, `CreateWorkoutPlanDto`, `AssignWorkoutDto` |
| `workout_api/TrainerWorkoutApi.ts` | API wrappers for all endpoints |
| `workout_utils/TrainerWorkoutUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Workout Plan Grid | `/trainer/workout` | View all plans owned by trainer | `GET /trainer/workout/plans` | ✅ Live |
| Create Plan | `/trainer/workout` | Create new workout plan with exercises | `POST /trainer/workout/plans` | ✅ Live |
| Edit Plan | `/trainer/workout` | Update plan name, difficulty, exercises | `PATCH /trainer/workout/plans/:id` | ✅ Live |
| Delete Plan | `/trainer/workout` | Remove plan — requires `useConfirm()` | `DELETE /trainer/workout/plans/:id` | ✅ Live |
| View Plan Detail | `/trainer/workout` | Drawer showing full exercise list | `GET /trainer/workout/plans/:id` | ✅ Live |
| Assign to Member | `/trainer/workout` | Link plan to assigned member(s) | `PATCH /trainer/members/:id/workout` | ✅ Live |

## Data and State Architecture
- Server-state: `WorkoutProvider` — plan list, selected plan detail
- Zustand stores: `useTrainerWorkoutStore` — modal/drawer open state, active plan ID
- Context providers: `WorkoutProvider`
- Local-storage keys: None

## User Flows
1. Trainer opens `/trainer/workout` → `WorkoutProvider` fetches `GET /trainer/workout/plans` → grid renders
2. Trainer clicks "New Plan" → `TrainerWorkoutCreateModal` → RHF + Zod form → `POST` → optimistic add to grid
3. Trainer clicks plan card "Edit" → `TrainerWorkoutEditModal` pre-filled → `PATCH` on submit
4. Trainer clicks "Delete" → `useConfirm()` confirmation → `DELETE` → plan removed from grid
5. Trainer clicks plan card title → `TrainerWorkoutDetailDrawer` slides in → exercise list renders
6. Trainer clicks "Assign" → `TrainerWorkoutAssignModal` → member multi-select (assigned members only) → `PATCH`

## Component Responsibility Map
- `TrainerWorkoutMain` — layout + provider mount. MUST NOT contain fetch logic or form state.
- `TrainerWorkoutGrid` — renders plan cards. MUST NOT contain modal state.
- `TrainerWorkoutPlanCard` — display only. MUST NOT call API directly.
- `TrainerWorkoutCreateModal` — form only. MUST NOT manage plan list state.
- `TrainerWorkoutAssignModal` — member list MUST be scoped to trainer's assigned members only, never full branch list.
- `WorkoutProvider` — fetch + state only. MUST NOT render any JSX.

## Permissions and Security
| Action | Required Role |
|---|---|
| View own workout plans | `TRAINER` |
| Create workout plan | `TRAINER` |
| Edit own workout plan | `TRAINER` |
| Delete own workout plan | `TRAINER` |
| Assign plan to member | `TRAINER` |
| ❌ View other trainers' plans | Forbidden |
| ❌ Access financial data | Forbidden |
| ❌ Modify branch-level plans | Manager only |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 plan card skeletons matching grid layout
- **Empty:** "No workout plans yet — create your first plan" with CTA button
- **Error:** `error.tsx` with retry button

## Edge Cases / AI Warnings
- **Assign modal member list** — MUST only show members assigned to the authenticated trainer. Never query full branch member list.
- **Delete confirmation** — MUST use `useConfirm()` hook, never a native `window.confirm()`.
- **Exercise ordering** — exercises within a plan have a `sortOrder` field; drag-to-reorder must update all affected `sortOrder` values in a single `PATCH`.
- **Plan ownership** — API enforces trainer-scoped access; frontend must not show edit/delete on plans not owned by the authenticated trainer.
- **Difficulty badge** — use `statusBadgeConfig.ts` for `BEGINNER` / `INTERMEDIATE` / `ADVANCED` color mapping.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — assigned members only in assign modal, no cross-trainer access
- [x] Rule 6: Logic/UI Separation — fetch in context, forms in modals
- [x] Rule 7: Type isolation — all types in `TrainerWorkoutTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 20: Member search uses `SearchableDropdown` scoped to assigned members
- [x] Rule 26: Delete uses `useConfirm()` — no `window.confirm()`
- [x] Rule 40: `_forbidden.md` present in module directory
- [x] Rule 55: No `key={index}` — stable plan IDs used
- [x] Rule 63: Zero cross-module imports

# Manager Workout — Feature Map

## Module Purpose
The Manager Workout module manages the branch workout plan library. Managers can create,
view, edit, and assign workout plans to members. Workout plans contain exercise schedules,
sets/reps, rest periods, and difficulty levels. Assignment links a plan to a specific member
profile. This module mirrors the Library (diet) module in structure.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Grid skeleton |
| `error.tsx` | Error boundary |
| `workout_components/ManagerWorkoutMain.tsx` | Root Client Component |
| `workout_components/ManagerWorkoutGrid.tsx` | Card grid of all workout plans |
| `workout_components/ManagerWorkoutPlanCard.tsx` | Single workout plan card |
| `workout_components/ManagerWorkoutAddModal.tsx` | Create new workout plan form |
| `workout_components/ManagerWorkoutEditModal.tsx` | Edit workout plan form |
| `workout_components/ManagerWorkoutAssignModal.tsx` | Assign plan to member |
| `workout_context/WorkoutProvider.tsx` | Fetch state, plan list |
| `workout_types/ManagerWorkoutTypes.ts` | `WorkoutPlan`, `CreateWorkoutPlanDto`, `AssignPlanDto` types |
| `workout_api/ManagerWorkoutApi.ts` | API wrappers |
| `workout_utils/ManagerWorkoutUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Workout Plan Grid | `/manager/workout` | View all workout plans | `GET /manager/workout/plans` | ✅ Live |
| Add Plan | `/manager/workout` | Create new workout plan | `POST /manager/workout/plans` | ✅ Live |
| Edit Plan | `/manager/workout` | Update plan details | `PATCH /manager/workout/plans/:id` | ✅ Live |
| Delete Plan | `/manager/workout` | Remove workout plan | `DELETE /manager/workout/plans/:id` | ✅ Live |
| Assign to Member | `/manager/workout` | Link plan to member | `PATCH /manager/members/:id/workout` | ✅ Live |

## Data and State Architecture
- Server-state: `WorkoutProvider` — plan list
- Zustand stores: `useManagerWorkoutStore` — modal open/close, selected plan
- Context providers: `WorkoutProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/workout` → plan card grid loads
2. Manager clicks "Add Plan" → `ManagerWorkoutAddModal` → submit → `POST` → grid refreshes
3. Manager clicks a plan card → `ManagerWorkoutEditModal` opens with pre-filled data
4. Manager clicks "Assign" → `ManagerWorkoutAssignModal` → member search → submit → `PATCH`
5. Manager deletes plan → `useConfirm()` → `DELETE` → grid refreshes

## Component Responsibility Map
- `ManagerWorkoutMain` — layout + provider. MUST NOT contain form logic.
- `ManagerWorkoutGrid` — renders plan cards from context. MUST NOT fetch directly.
- `ManagerWorkoutAssignModal` — member search uses `SearchableDropdown` (Rule 20).

## Permissions and Security
| Action | Required Role |
|---|---|
| View / Create / Edit plans | `MANAGER` |
| Delete plan | `MANAGER` — requires `useConfirm()` |
| Assign to member | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 plan card skeletons in a grid
- **Empty:** "No workout plans yet" with "Add Plan" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Member search in assign modal** — must use `SearchableDropdown`, not a native `<select>`.
- **Delete blocked if assigned** — API returns `400` with descriptive `message`. Surface via toast from `response.message`.
- **Do not use Dumbbell icon for plan cards** — use `Dumbbell` only for equipment-specific items. Use `ClipboardList` for workout plan cards.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 20: Member search uses `SearchableDropdown`
- [x] Rule 71: Delete uses `useConfirm()` double-verification

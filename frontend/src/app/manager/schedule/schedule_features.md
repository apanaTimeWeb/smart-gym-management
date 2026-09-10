# Manager Schedule Module — Feature Map

## Module Purpose
The Manager Schedule module provides gym managers with a complete interface to oversee trainer availability, shifts, and weekly rosters. It empowers managers to ensure adequate floor coverage, assign specific trainers to peak hours, and manage time-off requests. Crucially, this module allows managers to view the schedule from a high-level operational perspective, and any changes made here are instantly reflected in the trainers' individual apps. It is strictly isolated from Admin and Trainer roles.

## Directory Structure

| Folder / File | Responsibility |
|---|---|
| `schedule_components/ManagerScheduleMain.tsx` | Root Client Component; wraps the providers and layout |
| `schedule_components/ManagerScheduleWeeklyGrid.tsx` | Main calendar grid view for visualizing shifts across the week |
| `schedule_components/ManagerScheduleShiftModal.tsx` | Form modal to create or edit a trainer's shift |
| `schedule_api/ManagerScheduleApi.ts` | API wrappers for fetching and updating schedule data |
| `schedule_types/ManagerScheduleTypes.ts` | Types for `Shift`, `ScheduleFilters`, etc. |
| `schedule_utils/ManagerScheduleUrlConfig.ts` | Centralized URL constants for schedule endpoints |

## Feature Inventory

| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| View Weekly Roster | `/manager/schedule` | See all trainer shifts for the week | `GET /manager/schedule/shifts` | ✅ Live |
| Create Shift | `/manager/schedule` (Modal) | Assign a shift to a trainer | `POST /manager/schedule/shifts` | ✅ Live |
| Edit Shift | `/manager/schedule` (Modal) | Modify shift timings or reassign | `PATCH /manager/schedule/shifts/:id` | ✅ Live |
| Delete Shift | `/manager/schedule` (Modal) | Remove a shift | `DELETE /manager/schedule/shifts/:id` | ✅ Live |
| Time-off Approvals | `/manager/schedule/time-off` | Approve or reject trainer leave | `PATCH /manager/schedule/time-off/:id` | 🚧 Planned |

## Data and State Architecture
- Server-state: `TanStack Query` (`useManagerScheduleQueries`, `useManagerScheduleMutations`)
- Zustand stores: `useManagerScheduleStore` — strictly transient UI state (e.g. selected shift IDs, modal visibility)
- Context providers: `ManagerScheduleContext` — coordinates UI interactions
- Local-storage keys: None
- MSW handler: `manager-schedule.handlers.ts`

## Edge Cases / AI Warnings
- **Timezone Handling**: All shifts must be saved and transmitted in UTC, but displayed in the local timezone of the branch.
- **Overlapping Shifts**: The frontend must warn the manager if they attempt to schedule a trainer for overlapping shifts.
- **No cross-module imports**: Do not import types directly from the `/trainer` module. Any shared types (like `Shift`) should be redefined in `schedule_types` per Rule 2 (Total Role Isolation).

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — `ManagerSchedule` prefix on all files
- [x] Rule 5: Smart State Management — Zustand for UI state, TanStack Query for server state
- [x] Rule 7: Type Isolation — `schedule_types/` folders used
- [x] Rule 13: Feature Map — this detailed document

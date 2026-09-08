# Trainer Schedule & Leaves — Feature Map

## Module Purpose
Allows trainers to self-manage their weekly working-hour availability and submit ad-hoc time-off (leave) requests.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `schedule_components/` | All UI components | `TrainerScheduleMain.tsx`, `TrainerWeeklyAvailability.tsx`, `TrainerLeaveRequests.tsx`, `TrainerRequestLeaveModal.tsx` |
| `schedule_api/` | Mock API | `TrainerScheduleApi.ts` |
| `schedule_store/` | Zustand store | `useTrainerScheduleStore.ts` |
| `schedule_context/` | Context provider + logic hook | `TrainerScheduleContext.tsx`, `useTrainerScheduleLogic.ts` |
| `schedule_types/` | TypeScript interfaces | `TrainerScheduleTypes.ts` |
| `schedule_utils/` | URL config | `TrainerScheduleUrlConfig.ts` |

## Feature Inventory

| Feature | Status |
|---|---|
| Weekly Availability — toggle days ON/OFF + set times | [x] Live |
| Save Availability — Zustand + Loader2 + toast | [x] Live |
| Leave Requests Table — with PENDING/APPROVED/REJECTED badges | [x] Live |
| Request Leave Slide-over Modal | [x] Live |
| Toast Feedback (4s auto-dismiss) | [x] Live |
| error.tsx + loading.tsx | [x] Live |

## Edge Cases
- No cross-role imports from /manager /admin /superadmin
- Trainers cannot approve own leave — only create PENDING requests
- No window.confirm or alert() — use TrainerToast

## Rule Compliance
- [x] Rule 1: Micro-modularization
- [x] Rule 2: Zero cross-role imports
- [x] Rule 4: motion-safe: on all transitions
- [x] Rule 8: page.tsx is Server Component
- [x] Rule 9: loading.tsx + error.tsx present
- [x] Rule 19: focus-visible:ring on all buttons
- [x] Rule 71: No alert() or window.confirm()


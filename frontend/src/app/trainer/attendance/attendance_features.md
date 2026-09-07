# Trainer Attendance — Feature Map

## Module Purpose
The Trainer Attendance module tracks the trainer's own daily check-in and check-out records.
It shows personal attendance history in a calendar view and allows manual check-in for the
current day. Trainers cannot view other staff members' attendance — this module is strictly
scoped to the authenticated trainer's own records.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for calendar + history table |
| `error.tsx` | Error boundary |
| `attendance_components/TrainerAttendanceMain.tsx` | Root Client Component |
| `attendance_components/TrainerAttendanceCalendar.tsx` | Monthly calendar with personal attendance |
| `attendance_components/TrainerAttendanceHistory.tsx` | Attendance history table |
| `attendance_components/TrainerAttendanceCheckInButton.tsx` | Check-in / check-out action button |
| `attendance_context/AttendanceProvider.tsx` | Fetch state, selected date, check-in status |
| `attendance_types/TrainerAttendanceTypes.ts` | `AttendanceRecord`, `CheckInStatus` types |
| `attendance_api/TrainerAttendanceApi.ts` | API wrappers |
| `attendance_utils/TrainerAttendanceUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Attendance Calendar | `/trainer/attendance` | Personal monthly attendance view | `GET /trainer/attendance/monthly` | ✅ Live |
| Attendance History | `/trainer/attendance` | Paginated check-in history | `GET /trainer/attendance/history` | ✅ Live |
| Check In / Out | `/trainer/attendance` | Record today's attendance | `POST /trainer/attendance/checkin` | ✅ Live |

## Data and State Architecture
- Server-state: `AttendanceProvider` — monthly data, history, today's check-in status
- Zustand stores: None
- Context providers: `AttendanceProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Trainer opens `/trainer/attendance` → calendar + today's status loads
2. Trainer clicks "Check In" → `POST /checkin` → button state updates to "Checked In"
3. Trainer clicks a calendar day → history table filters to that date

## Component Responsibility Map
- `TrainerAttendanceMain` — layout + provider. MUST NOT contain check-in logic.
- `TrainerAttendanceCalendar` — renders calendar, dispatches date selection to context.
- `TrainerAttendanceCheckInButton` — shows loading spinner during `POST`. Disabled after check-in.

## Permissions and Security
| Action | Required Role |
|---|---|
| View own attendance | `TRAINER` |
| Check in / out | `TRAINER` |
| ❌ View other staff attendance | Strictly forbidden — Trainer role |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — calendar grid skeleton + table skeleton
- **Empty:** "No attendance records yet"
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Own records only** — the API endpoint `/trainer/attendance` is scoped to the authenticated trainer. Never use a branch-wide attendance endpoint.
- **Check-in button state** — button must be disabled after check-in for the day. State comes from `AttendanceProvider`, not local component state.
- **Date is UTC** — all date values sent to the API must use `formatDateForApi()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — own records only, no other staff data
- [x] Rule 6: Logic/UI Separation — check-in logic in context, button is pure display
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 26: Check-in button shows loading state during POST

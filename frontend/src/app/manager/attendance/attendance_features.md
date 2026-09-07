# Manager Attendance — Feature Map

## Module Purpose
The Manager Attendance module tracks daily member check-in and check-out for the branch.
It provides a calendar view of attendance history, daily attendance KPIs, and manual
check-in capability for walk-in members. Attendance records are immutable once created —
no editing or deletion is allowed. The module also shows absentee alerts for members who
haven't checked in for a configurable number of days.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + calendar |
| `error.tsx` | Error boundary |
| `attendance_components/ManagerAttendanceMain.tsx` | Root Client Component |
| `attendance_components/ManagerAttendanceKpiCards.tsx` | Today's count, weekly avg, absentees KPIs |
| `attendance_components/ManagerAttendanceCalendar.tsx` | Monthly calendar with daily attendance counts |
| `attendance_components/ManagerAttendanceDailyTable.tsx` | List of check-ins for selected date |
| `attendance_components/ManagerAttendanceCheckInModal.tsx` | Manual check-in form |
| `attendance_context/AttendanceProvider.tsx` | Fetch state, selected date, daily records |
| `attendance_types/ManagerAttendanceTypes.ts` | `AttendanceRecord`, `AttendanceStat` types |
| `attendance_api/ManagerAttendanceApi.ts` | API wrappers |
| `attendance_utils/ManagerAttendanceUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Attendance KPIs | `/manager/attendance` | Today's stats | `GET /manager/attendance/stats` | ✅ Live |
| Calendar View | `/manager/attendance` | Monthly attendance heatmap | `GET /manager/attendance/monthly` | ✅ Live |
| Daily Records | `/manager/attendance` | Check-ins for selected date | `GET /manager/attendance/daily?date=` | ✅ Live |
| Manual Check-In | `/manager/attendance` | Log walk-in attendance | `POST /manager/attendance/checkin` | ✅ Live |

## Data and State Architecture
- Server-state: `AttendanceProvider` — stats, monthly data, daily records, selected date
- Zustand stores: None
- Context providers: `AttendanceProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/attendance` → KPIs + current month calendar load
2. Manager clicks a calendar day → `AttendanceProvider` fetches daily records for that date → `ManagerAttendanceDailyTable` updates
3. Manager clicks "Manual Check-In" → `ManagerAttendanceCheckInModal` opens → member search → submit → `POST` → daily table refreshes

## Component Responsibility Map
- `ManagerAttendanceMain` — layout. MUST NOT contain date selection state.
- `AttendanceProvider` — owns selected date, all fetch state. MUST NOT render UI.
- `ManagerAttendanceCalendar` — renders calendar, dispatches date selection to context on click.
- `ManagerAttendanceDailyTable` — pure display, receives daily records from context.
- `ManagerAttendanceCheckInModal` — owns form state. Member search uses `SearchableDropdown`.

## Permissions and Security
| Action | Required Role |
|---|---|
| View attendance | `MANAGER` |
| Manual check-in | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 3 KPI shimmer cards + calendar grid skeleton
- **Empty:** Daily table shows "No check-ins recorded for this date"
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Attendance records are immutable** — once a check-in is recorded, it cannot be edited or deleted from the UI. Never add edit/delete actions to `ManagerAttendanceDailyTable`.
- **Date is UTC** — all date values sent to the API must be in UTC ISO format. Use `formatDateForApi()` from `@/lib/formatters`, never raw `new Date().toISOString()` with local timezone.
- **Member search in check-in modal** — must use `SearchableDropdown` component (Rule 20), not a native `<select>`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — date/fetch state in context
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 20: Member search uses `SearchableDropdown`
- [x] Rule 24: Dates sent as UTC ISO strings

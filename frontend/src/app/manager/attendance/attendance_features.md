# Manager Attendance — Feature Map

## Module Purpose
The Manager Attendance module tracks daily member and staff check-in and check-out for the branch.
It provides a calendar view of attendance history, daily attendance KPIs, and manual
check-in capability for walk-in members/staff. The module relies heavily on URL state for active tabs, dates, and search filters.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + calendar |
| `error.tsx` | Error boundary |
| `attendance_components/ManagerAttendanceMain.tsx` | Root Client Component orchestrator |
| `attendance_components/ManagerAttendanceKpiCards.tsx` | Today's count, weekly avg, absentees KPIs |
| `attendance_components/ManagerAttendanceCalendar.tsx` | Monthly calendar with daily attendance |
| `attendance_components/ManagerAttendanceDailyTable.tsx` | List of check-ins for selected date |
| `attendance_components/ManagerAttendanceCheckInModal.tsx` | Manual check-in form |
| `attendance_context/useManagerAttendanceLogic.ts` | Data fetching via TanStack Query and URL sync |
| `attendance_utils/ManagerAttendanceFilterUtils.ts` | Data processing layer for client-side fixture sorting |
| `attendance_api/useManagerAttendanceQueries.ts` | Query keys and TanStack hooks |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Attendance KPIs | `/manager/attendance` | Today's stats | `GET /manager/attendance/stats` | ✅ Live |
| Daily Records | `/manager/attendance` | Check-ins for selected date | `GET /manager/attendance/daily?date=` | ✅ Live |
| Manual Check-In | `/manager/attendance` | Log walk-in attendance | `POST /manager/attendance/checkin` | ✅ Live |

## Data and State Architecture
- **Server-state (Async):** TanStack Query (`useAttendanceListQuery`, `useTodayStatsQuery`). 
- **Query Keys:** `['manager', 'attendance', 'list', params]`
- **Client-state (Sync):** URL query parameters (`?tab=`, `?search=`, `?date=`, `?status=`) for all lists.
- **Context providers:** `AttendanceProvider` distributes logic layer.
- **Zustand stores:** None.

## Component Responsibility Map
- `ManagerAttendanceMain` — layout orchestrator.
- `useManagerAttendanceLogic` — URL sync, query execution, mutation handler.
- `ManagerAttendanceFilterUtils` — extracted processing layer to keep hooks small and isolate fixture-sorting from UI.
- `ManagerAttendanceCalendar` — renders calendar.

## Loading, Empty, Error States
- **Loading:** `loading.tsx` renders structural skeleton matching KPI grid + calendar layout.
- **Empty:** Daily table shows empty state card.
- **Error:** Route-level `error.tsx` catches rendering or boundary errors.

## Edge Cases / AI Warnings
- **No inline sorting/filtering** — do not use `.filter()` inside the UI components or the main logic hook for hardcoded data. Use `ManagerAttendanceFilterUtils.ts`.
- **Date is UTC** — all date values sent to the API must be in UTC ISO format.
- **URL State sync** — any new filters added must be synchronized to the URL.

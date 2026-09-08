# Trainer Attendance — Feature Map

## Module Purpose
The Trainer Attendance module tracks the trainer's own daily check-in/check-out records
and allows managers to record member attendance. It shows personal attendance history in
a calendar view with monthly summary stats, and a paginated table view for both Members
and My Attendance tabs. Trainers cannot view other staff members' attendance.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — renders TrainerAttendanceMain |
| `loading.tsx` | Skeleton: header + 3 KPI cards + table rows |
| `error.tsx` | Error boundary with Retry button |
| `attendance_components/TrainerAttendanceMain/` | Root Client Component — layout + provider mount |
| `attendance_components/TrainerAttendanceKPIs/` | 3 KPI cards: Total, Member, Staff check-ins |
| `attendance_components/TrainerAttendanceSummaryCard/` | Trainer's own monthly summary: Present/Absent/Weekly Off/Rate |
| `attendance_components/TrainerAttendanceToolbar/` | Tabs (Members / My Attendance), view toggle, search, date filter |
| `attendance_components/TrainerAttendanceTable/` | Paginated attendance records table |
| `attendance_components/TrainerMyAttendanceCalendar/` | Monthly calendar with per-day status cells |
| `attendance_components/TrainerAttendanceModal/` | Check-in modal for recording member attendance |
| `attendance_components/TrainerAttendanceEmptyState/` | Empty state for zero records |
| `attendance_context/AttendanceContext.tsx` | Context provider wrapping useAttendanceLogic |
| `attendance_context/useAttendanceLogic.ts` | All fetch, filter, pagination, mark-attendance logic |
| `attendance_types/attendance_types.ts` | `AttendanceContextType`, `AttendanceStatsResponse`, `AttendanceResponse` |
| `attendance_api/attendance_api.ts` | `attendanceApi` — createAttendanceRecord, fetchAttendanceRecords, getTodayStats |
| `attendance_utils/AttendanceSharedConstants.ts` | `ATTENDANCE_TABS`, `ATTENDANCE_TABLE_HEADERS`, `AttendanceSchema`, `EMPTY_ATTENDANCE_FORM`, `formatDate`, `formatTime` |
| `attendance_url_config.ts` | `AttendanceUrlConfig` — PAGES and BACKEND_API constants |

## Feature Inventory
| Feature | Tab | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Today KPI Cards | Both | Total / Member / Staff check-ins today | `GET /trainer/attendance/today-stats` | ✅ Live |
| Monthly Summary Card | My Attendance | Present / Absent / Weekly Off / Rate for current month | Derived from records | ✅ Live |
| Members Table | Members | Paginated member check-in records | `GET /trainer/attendance?type=MEMBER` | ✅ Live |
| My Attendance Calendar | My Attendance | Monthly calendar with per-day status | `GET /trainer/attendance?type=STAFF` | ✅ Live |
| My Attendance Table | My Attendance | List view of own check-in history | `GET /trainer/attendance?type=STAFF` | ✅ Live |
| Record Attendance Modal | Members | Mark member check-in | `POST /trainer/attendance` | ✅ Live |
| Search & Date Filter | Both | Client-side filter by name and date range | — | ✅ Live |
| Pagination | Both | 10 records per page | URL param `page` | ✅ Live |

## Data and State Architecture
- Server-state: `useAttendanceLogic` — records, todayStats, members, fetchState
- URL state: `page`, `search`, `date`, `tab` synced via `useSearchParams` + `router.push`
- Context: `AttendanceContext` wraps `useAttendanceLogic` output
- Zustand stores: None (UI state is URL-driven)
- Local-storage keys: None

## User Flows
1. Trainer opens `/trainer/attendance` → Members tab loads → KPIs + member records table
2. Trainer switches to "My Attendance" → Summary card appears → Calendar view by default
3. Trainer toggles to List View → table of own STAFF records
4. Trainer clicks "Record Attendance" → modal opens → selects member + date + time → POST
5. Trainer navigates calendar months with prev/next arrows

## Component Responsibility Map
- `TrainerAttendanceMain` — mounts provider, renders header, KPIs, summary card (conditional), toolbar, table/calendar, modal, toast
- `TrainerAttendanceKPIs` — reads `todayStats` from context, renders 3 cards
- `TrainerAttendanceSummaryCard` — derives present/absent/weeklyOff/rate from `records` for current month, renders 4 cards
- `TrainerAttendanceToolbar` — tab switching, view mode toggle, search input, date filter select, refresh button
- `TrainerAttendanceTable` — reads `records`, `totalRecords`, `fetchState`, `currentPage` from context
- `TrainerMyAttendanceCalendar` — builds calendar grid from `records`, simulates pattern for demo days without API data
- `TrainerAttendanceModal` — react-hook-form + zod, calls `markAttendance` from context
- `TrainerAttendanceEmptyState` — pure display, `isFiltered` prop for contextual message

## Permissions and Security
| Action | Required Role |
|---|---|
| View own attendance | `TRAINER` |
| View member check-ins | `TRAINER` |
| Record member check-in | `TRAINER` |
| ❌ View other staff attendance | Strictly forbidden |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — header skeleton + 3 KPI skeletons + table skeleton
- **Empty:** `TrainerAttendanceEmptyState` — contextual message based on `isFiltered`
- **Error:** `error.tsx` with retry button calling `reset()`

## Edge Cases / AI Warnings
- **Own records only** — My Attendance tab filters by `staffId === user.id` client-side
- **Summary card** — only shown when `tab === 'My Attendance'`, derived from `records` not a separate API call
- **Modal not in toolbar** — `TrainerAttendanceModal` is mounted in `TrainerAttendanceMain`, not inside toolbar
- **Calendar simulation** — days without API records use `day % 6 !== 0` pattern for demo; real data overrides this
- **Date is local** — `formatDate` uses `en-IN` locale; API dates are ISO strings

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — own records only, no cross-role data
- [x] Rule 6: Logic/UI Separation — all logic in `useAttendanceLogic`, components are pure display
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: `attendance_url_config.ts` present — `AttendanceUrlConfig`
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `attendance_forbidden.md` present
- [x] Rule 26: Modal shows loading spinner during POST (`saving` state)
- [x] Rule 63: Module Boundary Isolation — no cross-module imports except `trainer_types` and `trainer_components`

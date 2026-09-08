# Admin Attendance — Feature Map

## Module Purpose
The Admin Attendance module gives the gym owner (Admin role) a **read-only** daily and weekly attendance overview across all branches. The Admin can see how many members checked in today, identify late arrivals, spot absentee trends, and compare weekly performance — without any ability to manually check in or modify records. Write operations (manual check-in, QR scanning) are strictly the Manager's responsibility. This module was restored after the original deletion was found to be based on a permissions-table bug, not a legitimate role violation.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `attendance_components/AdminAttendanceMain/` | Root client orchestrator — composes all sub-components, shows read-only notice banner | `AdminAttendanceMain.tsx` |
| `attendance_components/AdminAttendanceKPIs/` | 4 stat cards: Today's Check-Ins, Present, Late Arrivals, Weekly Average | `AdminAttendanceKPIs.tsx` |
| `attendance_components/AdminAttendanceTrendChart/` | 7-day bar chart of daily check-in counts using ApexCharts | `AdminAttendanceTrendChart.tsx` |
| `attendance_components/AdminAttendanceToolbar/` | Search + date range + status + branch filters | `AdminAttendanceToolbar.tsx` |
| `attendance_components/AdminAttendanceTable/` | Paginated read-only records table with status badges and duration | `AdminAttendanceTable.tsx` |
| `attendance_components/AdminAttendanceEmptyState/` | Empty state when no records match filters | `AdminAttendanceEmptyState.tsx` |
| `attendance_api/` | Mock API functions — replace with real apiFetch when backend is ready | `attendance_api.ts` |
| `attendance_context/` | Data logic hook — fetches, filters, paginates | `useAdminAttendanceLogic.ts` |
| `attendance_store/` | Zustand store for filter/pagination UI state | `useAdminAttendanceStore.ts` |
| `attendance_types/` | TypeScript interfaces for records, summary, trend | `attendance_types.ts` |
| `attendance_utils/` | Mock data, filter options, table headers, `computeDuration` utility | `AdminAttendanceSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| KPI Overview | `/admin/attendance` | View today's total check-ins, present count, late arrivals, weekly average with trend % | `AdminAttendanceKPIs` | `fetchAttendanceSummary()` | ✅ Live (mock) |
| Weekly Trend Chart | `/admin/attendance` | See a 7-day bar chart of daily check-in volume | `AdminAttendanceTrendChart` | `fetchAttendanceTrend()` | ✅ Live (mock) |
| Attendance Records Table | `/admin/attendance` | Browse paginated check-in records with member name, branch, plan, check-in/out times, duration, status | `AdminAttendanceTable` | `fetchAttendanceRecords()` | ✅ Live (mock) |
| Filters | `/admin/attendance` | Filter by date range (today/yesterday/week/month), status (present/late/absent), branch | `AdminAttendanceToolbar` | — | ✅ Live |
| Search | `/admin/attendance` | Search records by member name or phone (debounced 300ms) | `AdminAttendanceToolbar` | — | ✅ Live |

## User Flows & Interactions

### Flow 1: Daily Attendance Check
1. Admin navigates to `/admin/attendance` — page loads with `today` date range pre-selected
2. KPI cards show today's total, present count, late count, and weekly average
3. Trend chart shows the last 7 days of check-in volume
4. Table below shows all today's records with check-in/out times and duration

### Flow 2: Investigating Late Arrivals
1. Admin clicks the "All Status" dropdown → selects "Late"
2. Table filters to show only late arrivals for the selected date range
3. Admin can see which members arrived late, from which branch, and on which plan

### Flow 3: Branch-Specific View
1. Admin selects a specific branch from the branch dropdown in the toolbar
2. All KPIs, chart, and table update to reflect only that branch's data
3. Admin can also use the global branch selector in the header for the same effect

## Data and State Architecture

- **State pattern:** Zustand for UI filter/pagination state. Direct mock API calls (no TanStack Query yet).
- **Zustand store:** `useAdminAttendanceStore.ts` — holds: `search`, `statusFilter`, `branchFilter`, `dateRange`, `currentPage`
- **Logic hook:** `useAdminAttendanceLogic.ts` — fetches all data on mount, applies client-side filtering + pagination
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through mock functions in `attendance_api.ts`. Replace with `apiFetch` when backend is ready.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAttendanceRecords()` | GET | `/admin/attendance/records` | `{ page, limit, search, status, branchId, dateRange }` | `AdminAttendanceRecord[]` |
| `fetchAttendanceSummary()` | GET | `/admin/attendance/summary` | `{ branchId, dateRange }` | `AdminAttendanceSummary` |
| `fetchAttendanceTrend()` | GET | `/admin/attendance/trend` | `{ branchId }` | `AdminAttendanceTrendPoint[]` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Read-only enforcement:** Zero write operations in this module. No check-in button, no QR scanner, no manual entry form exists anywhere in this module.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`.
- **Sensitive data handling:** Phone numbers masked in table view via inline regex (`98****2310` pattern).

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking 4 KPI cards + chart block + toolbar + 8 table rows | N/A | `error.tsx` — branded error with Retry button calling `reset()` |
| Records table | Inherited from page skeleton | `AdminAttendanceEmptyState.tsx` — CalendarX icon + contextual message based on whether filters are active | Inline error banner with retry link in `AdminAttendanceMain` |

## Edge Cases and AI Warnings

- **Never add a check-in button here:** This module is strictly read-only for the Admin role. Manual check-in belongs exclusively in the Manager's attendance module. Adding any write operation here violates the role permission contract.
- **`computeDuration` handles null checkOut:** If a member has checked in but not yet checked out, `checkOutTime` is `null`. The `computeDuration` utility returns `'—'` in this case. Do not attempt to calculate duration from a null value.
- **ApexCharts does not resolve CSS custom properties:** The trend chart uses hex values (`#FACC15`, `#A1A1AA`) directly in the ApexCharts options object. Do not replace these with `var(--primary)` — ApexCharts cannot resolve CSS variables.
- **Branch filter and global header branch selector both work:** `useAdminAttendanceLogic` reads `selectedBranchId` from `useAdminGlobalStore`. If the global selector is set to a specific branch, it overrides the toolbar's branch filter. This is intentional and consistent with other admin modules.
- **`motion-safe:animate-pulse` on skeletons:** All skeleton loading divs use `motion-safe:animate-pulse` per Design §29. Never use bare `animate-pulse`.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminAttendanceMain.tsx` | Root orchestrator. Renders header, read-only notice banner, error state, KPIs, chart, and table card. No direct API calls. |
| `AdminAttendanceKPIs.tsx` | 4 stat cards. Reads `summary` from `useAdminAttendanceLogic`. Pure display. |
| `AdminAttendanceTrendChart.tsx` | ApexCharts bar chart. Reads `trend` array from logic hook. Dynamic import (no SSR). |
| `AdminAttendanceToolbar.tsx` | Search + 3 dropdowns. Writes to `useAdminAttendanceStore`. No API calls. |
| `AdminAttendanceTable.tsx` | Paginated table. Reads `records` from logic hook. Renders status badges and duration. |
| `AdminAttendanceEmptyState.tsx` | Empty state UI. Receives `hasFilters` prop to show contextual message. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, 300-line ceiling
- [x] Rule 2: Total Role Isolation — zero cross-role imports verified
- [x] Rule 3: Hyper-descriptive naming — role prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX (ApexCharts hex exception documented)
- [x] Rule 5: Smart State Management — Zustand for UI state
- [x] Rule 6: Logic/UI Separation — `useAdminAttendanceLogic` extracts all fetch/filter logic
- [x] Rule 7: Type Isolation — all types in `attendance_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component, `*Main.tsx` = Client
- [x] Rule 9: Loading/error — `loading.tsx` + `error.tsx` present and non-generic
- [x] Rule 11: Centralized URL Config — `attendance_url_config.ts` present, no hardcoded URLs
- [x] Rule 13: Feature Map — this document
- [x] Rule 29: `motion-safe:` prefix on all transitions and animations
- [x] Rule 40: `attendance_forbidden.md` present and specific
- [x] Design §29: motion-safe compliance

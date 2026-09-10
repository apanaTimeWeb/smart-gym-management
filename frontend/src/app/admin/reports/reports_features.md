# Admin Reports — Feature Map

## Module Purpose
The Reports module provides gym admins with financial and operational reports across all
branches. Reports cover revenue summaries, attendance trends, member growth, plan-wise
distribution, payroll summaries, and P&L. All reports can be filtered by date range and
branch. PDF and CSV export is supported. Charts use ApexCharts exclusively. This module
is strictly read-only analytics — no mutations are performed here.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `reports_components/AdminReportsMain/` | Root client orchestrator — renders tab switcher and active report section | `AdminReportsMain.tsx` |
| `reports_components/AdminReportsTabs/` | Tab navigation between report types | `AdminReportsTabs.tsx` |
| `reports_components/AdminReportsKPIs/` | Summary stat cards for the active report | `AdminReportsKPIs.tsx` |
| `reports_components/AdminReportsRevenue/` | Revenue breakdown chart + table by plan and payment mode | `AdminReportsRevenue.tsx` |
| `reports_components/AdminReportsAttendance/` | Daily/weekly attendance trend chart | `AdminReportsAttendance.tsx` |
| `reports_components/AdminReportsMembership/` | New vs churned members over time chart | `AdminReportsMembership.tsx` |
| `reports_components/AdminReportsPayroll/` | Staff payroll summary table | `AdminReportsPayroll.tsx` |
| `reports_components/AdminReportsPnL/` | Branch-level P&L summary | `AdminReportsPnL.tsx` |
| `reports_api/` | API client for all report endpoints | `reports_api.ts` |
| `reports_context/` | Data logic hook — fetches active report data, manages date/branch filters | `useAdminReportsLogic.ts` |
| `reports_store/` | Zustand store — activeTab, dateFrom, dateTo, branchFilter | `useAdminReportsStore.ts` |
| `reports_types/` | TypeScript types for each report shape | `reports_types.ts` |
| `reports_utils/` | Constants: tab options, date presets, export format options | `AdminReportsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Revenue Report | `/admin/reports` | Monthly revenue breakdown by plan and payment mode with chart | `AdminReportsRevenue` | `GET /admin/reports/revenue?from&to&branchId` | ✅ Live |
| Attendance Report | `/admin/reports` | Daily/weekly attendance trends per branch | `AdminReportsAttendance` | `GET /admin/reports/attendance?from&to&branchId` | ✅ Live |
| Membership Report | `/admin/reports` | New vs churned members over time | `AdminReportsMembership` | `GET /admin/reports/members?from&to&branchId` | ✅ Live |
| Payroll Report | `/admin/reports` | Staff payroll summary by role and branch | `AdminReportsPayroll` | `GET /admin/reports/payroll?from&to&branchId` | ✅ Live |
| P&L Report | `/admin/reports` | Branch-level profit and loss summary | `AdminReportsPnL` | `GET /admin/reports/pnl?from&to&branchId` | ✅ Live |
| Export Report | `/admin/reports` | Download active report as PDF or CSV | `AdminReportsMain` toolbar | `GET /admin/reports/export?type&format&from&to` | ✅ Live |

## User Flows & Interactions

### Flow 1: View Revenue Report
1. Admin navigates to `/admin/reports` — Revenue tab active by default
2. Selects date range (preset or custom) and branch filter
3. `useAdminReportsLogic` fetches `GET /admin/reports/revenue` with params
4. Chart and table populate with revenue data

### Flow 2: Export a Report
1. Admin selects desired tab, date range, and branch
2. Clicks "Export" → selects format (PDF or CSV)
3. `exportReport({ type, format, from, to, branchId })` called
4. Browser triggers file download

## Data and State Architecture

- **State pattern:** Zustand for UI state (activeTab, filters) + TanStack Query for server state
- **Zustand store:** `useAdminReportsStore.ts` — holds: `activeTab`, `dateFrom`, `dateTo`, `branchFilter`
- **Query keys:** `['adminReports', activeTab, { dateFrom, dateTo, branchFilter }]`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `reportsApi` in `reports_api/reports_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchRevenueReport(params)` | GET | `/admin/reports/revenue` | `{ from, to, branchId }` | `RevenueReportData` |
| `fetchAttendanceReport(params)` | GET | `/admin/reports/attendance` | `{ from, to, branchId }` | `AttendanceReportData` |
| `fetchMembershipReport(params)` | GET | `/admin/reports/members` | `{ from, to, branchId }` | `MembershipReportData` |
| `fetchPayrollReport(params)` | GET | `/admin/reports/payroll` | `{ from, to, branchId }` | `PayrollReportData` |
| `fetchPnLReport(params)` | GET | `/admin/reports/pnl` | `{ from, to, branchId }` | `PnLReportData` |
| `exportReport(params)` | GET | `/admin/reports/export` | `{ type, format, from, to, branchId }` | `Blob` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Read-only:** Zero write operations. Never add edit/delete/create to this module.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton: tab bar + KPI cards + chart block | N/A | `error.tsx` — module-branded with Retry |
| Active report | Skeleton chart + table rows while query loading | Inline "No data for this period" with date reset CTA | Inline error via TanStack Query `isError` |

## Edge Cases and AI Warnings

- **ApexCharts is mandatory** — never use Recharts or Chart.js in this module.
- **All chart animations must use `motion-safe:` prefix** (Design §29).
- **No mutations** — never add any write operation to this module.
- **Export uses anchor download** — never use `fetch()` to stream file bytes without Blob handling.
- **Date range defaults to current month** — `dateFrom` and `dateTo` initialize to the first and last day of the current month in `useAdminReportsStore`.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminReportsMain.tsx` | Root orchestrator. Renders tab bar, date/branch filters, export button, and active report section. |
| `AdminReportsTabs.tsx` | Tab switcher. Writes `activeTab` to store. |
| `AdminReportsKPIs.tsx` | Summary stat cards for the active report. Reads from logic hook. |
| `AdminReportsRevenue.tsx` | Revenue chart + breakdown table. Reads from logic hook. |
| `AdminReportsAttendance.tsx` | Attendance trend chart. Reads from logic hook. |
| `AdminReportsMembership.tsx` | Member growth chart. Reads from logic hook. |
| `AdminReportsPayroll.tsx` | Payroll summary table. Reads from logic hook. |
| `AdminReportsPnL.tsx` | P&L summary. Reads from logic hook. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded colors in JSX
- [x] Rule 5: Smart State Management — Zustand + TanStack Query
- [x] Rule 6: Logic/UI Separation — `useAdminReportsLogic` extracts all fetch logic
- [x] Rule 7: Type Isolation — all types in `reports_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: `reports_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `reports_forbidden.md` present
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured

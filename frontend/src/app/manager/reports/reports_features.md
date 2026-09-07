# Manager Reports — Feature Map

## Module Purpose
The Manager Reports module provides comprehensive analytics and exportable reports for the
branch: revenue reports, attendance reports, membership churn, and expense summaries. All
reports are filterable by date range. CSV export is available for each report type. This
module is read-only — no mutations originate here.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for report tabs + charts |
| `error.tsx` | Error boundary |
| `reports_components/ManagerReportsMain.tsx` | Root Client Component, tab switcher |
| `reports_components/ManagerReportsRevenue.tsx` | Revenue report tab — chart + table |
| `reports_components/ManagerReportsAttendance.tsx` | Attendance report tab — trend chart |
| `reports_components/ManagerReportsChurn.tsx` | Membership churn report tab |
| `reports_components/ManagerReportsExpenses.tsx` | Expense breakdown report tab |
| `reports_components/ManagerReportsFilters.tsx` | Shared date range filter |
| `reports_context/ReportsProvider.tsx` | Fetch state per active tab |
| `reports_types/ManagerReportsTypes.ts` | `RevenueReport`, `AttendanceReport`, etc. types |
| `reports_api/ManagerReportsApi.ts` | API wrappers |
| `reports_utils/ManagerReportsUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Revenue Report | `/manager/reports` | Monthly revenue breakdown + chart | `GET /manager/reports/revenue` | ✅ Live (mock) |
| Attendance Report | `/manager/reports` | Daily attendance trend | `GET /manager/reports/attendance` | ✅ Live (mock) |
| Churn Report | `/manager/reports` | Membership expiry + cancellations | `GET /manager/reports/churn` | ✅ Live (mock) |
| Expense Report | `/manager/reports` | Expense category breakdown | `GET /manager/reports/expenses` | ✅ Live (mock) |
| CSV Export | `/manager/reports` | Download report as CSV | `GET /manager/reports/:type/export` | ✅ Live (mock) |

## Data and State Architecture
- Server-state: `ReportsProvider` — active tab data, date filters
- Zustand stores: None — read-only module
- Context providers: `ReportsProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/reports` → Revenue tab loads by default
2. Manager switches tab → `ReportsProvider` fetches data for that report type
3. Manager adjusts date range filter → active tab re-fetches
4. Manager clicks "Export CSV" → `GET /export` → browser download triggered

## Component Responsibility Map
- `ManagerReportsMain` — tab switcher + provider. MUST NOT contain chart logic.
- Each report tab component — owns its chart + table display. Receives data from context.
- `ManagerReportsFilters` — shared date range filter, dispatches to context.
- All charts — wrap `react-apexcharts`. MUST NOT use Recharts or Chart.js.

## Permissions and Security
| Action | Required Role |
|---|---|
| View reports | `MANAGER` |
| Export CSV | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — tab skeleton + chart placeholder + table skeleton
- **Empty:** "No data for this period" with date range adjustment suggestion
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **ApexCharts only** — never use Recharts or Chart.js in any report chart.
- **CSV export** — triggers a browser file download, not a navigation. Use `window.open()` or `<a download>` pattern, not `router.push()`.
- **No mutations** — this is a strictly read-only module.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, display in tab components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Design §10: ApexCharts with correct color tokens

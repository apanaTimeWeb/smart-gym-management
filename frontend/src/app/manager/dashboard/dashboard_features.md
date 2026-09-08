# Manager Dashboard — Feature Map

## Module Purpose
The Manager Dashboard is the primary landing page for the Manager role. It displays real-time
branch KPIs: active members, today's attendance, pending payments, revenue this month, and
expiring memberships. All data is read-only. Charts use ApexCharts exclusively. This is the
first page a Manager sees after login — it must load fast with skeleton states.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard, passes branch context |
| `loading.tsx` | Structural skeleton matching KPI grid + chart layout |
| `error.tsx` | Error boundary with retry |
| `dashboard_components/ManagerDashboardMain.tsx` | Root Client Component |
| `dashboard_components/ManagerDashboardKpiCards.tsx` | 5 KPI stat cards |
| `dashboard_components/ManagerDashboardRevenueChart.tsx` | Monthly revenue line chart (ApexCharts) |
| `dashboard_components/ManagerDashboardMembershipChart.tsx` | Plan distribution donut chart |
| `dashboard_components/ManagerDashboardRecentMembers.tsx` | Latest 5 sign-ups table |
| `dashboard_components/ManagerDashboardPendingPayments.tsx` | Top pending payments list |
| `dashboard_context/DashboardProvider.tsx` | Fetches all dashboard data, provides to children |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| KPI Cards | `/manager/dashboard` | Active members, attendance, revenue | `GET /manager/dashboard/stats` | ✅ Live |
| Revenue Chart | `/manager/dashboard` | Monthly revenue trend | `GET /manager/dashboard/revenue` | ✅ Live |
| Membership Chart | `/manager/dashboard` | Plan distribution | `GET /manager/dashboard/membership-dist` | ✅ Live |
| Recent Members | `/manager/dashboard` | Latest sign-ups | `GET /manager/dashboard/recent-members` | ✅ Live |
| Pending Payments | `/manager/dashboard` | Overdue payment list | `GET /manager/dashboard/pending-payments` | ✅ Live |

## Data and State Architecture
- Server-state: `DashboardProvider` — parallel fetch of all 5 endpoints on mount
- Zustand stores: None — dashboard is read-only
- Context providers: `DashboardProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager logs in → redirected to `/manager/dashboard`
2. `loading.tsx` skeleton renders immediately
3. `DashboardProvider` fires parallel API calls → sections populate as data arrives
4. Manager clicks a pending payment row → navigates to `/manager/finance`
5. Manager clicks a recent member row → navigates to `/manager/members/:id`

## Component Responsibility Map
- `ManagerDashboardMain` — layout grid. MUST NOT fetch data directly.
- `DashboardProvider` — owns all fetch state. MUST NOT render any UI.
- `ManagerDashboardKpiCards` — pure display, receives stats as props.
- `ManagerDashboardRevenueChart` — wraps `react-apexcharts`. MUST NOT use Recharts.
- `ManagerDashboardRecentMembers` — read-only table, row click navigates to members module.

## Permissions and Security
| Action | Required Role |
|---|---|
| View dashboard | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 5 KPI shimmer cards + 2 chart placeholders + 2 list skeletons
- **Empty:** KPI cards show `0`; charts show empty state; lists show "No data yet"
- **Error:** `error.tsx` with retry button

## Edge Cases / AI Warnings
- **Parallel fetches mandatory** — all 5 API calls must fire simultaneously via `Promise.all` in `DashboardProvider`. Sequential fetching causes visible waterfall loading.
- **ApexCharts only** — never use Recharts or Chart.js. See `manager_forbidden.md`.
- **No mutations** — this page is 100% read-only. Never add POST/PATCH calls here.
- **Currency formatting** — revenue values arrive as paise integers. Always use `formatCurrency()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed components
- [x] Rule 6: Logic/UI Separation — all fetch in `DashboardProvider`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Design §10: ApexCharts with correct color tokens
- [x] Design §29: `motion-safe:` on chart animations

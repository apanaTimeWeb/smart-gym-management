# Manager Dashboard — Feature Map

## Module Purpose
The Manager Dashboard is the primary landing page for the Manager role. It displays real-time branch KPIs: active members, today's attendance, pending payments, revenue this month, and expiring memberships. All data is read-only. Charts use ApexCharts exclusively. This is the first page a Manager sees after login — it must load fast with skeleton states.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard, passes branch context |
| `loading.tsx` | Structural skeleton matching KPI grid + chart layout |
| `error.tsx` | Error boundary with retry |
| `dashboard_components/ManagerDashboardMain.tsx` | Root Client Component |
| `dashboard_components/ManagerDashboardKPIs.tsx` | Multiple KPI stat cards |
| `dashboard_components/ManagerDashboardRevenueChart.tsx` | Monthly revenue area chart (react-apexcharts) |
| `dashboard_components/ManagerDashboardMemberGrowthChart.tsx` | Member growth bar chart (react-apexcharts) |
| `dashboard_components/ManagerDashboardRecentMembers.tsx` | Latest sign-ups list |
| `dashboard_components/ManagerDashboardPendingPayments.tsx` | Overdue payment list |
| `dashboard_context/useManagerDashboardLogic.ts` | Data fetching via TanStack Query and URL sync |
| `dashboard_api/useManagerDashboardQueries.ts` | Query keys and TanStack hooks |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| KPI Cards | `/manager/dashboard` | Active members, attendance, revenue | `GET /manager/dashboard/stats` | ✅ Live |
| Revenue Chart | `/manager/dashboard` | Monthly revenue trend | `GET /manager/dashboard/stats` | ✅ Live |
| Member Growth Chart | `/manager/dashboard` | New member trend | `GET /manager/dashboard/stats` | ✅ Live |
| Recent Members | `/manager/dashboard` | Latest sign-ups | `GET /manager/dashboard/stats` | ✅ Live |
| Pending Payments | `/manager/dashboard` | Overdue payment list | `GET /manager/dashboard/stats` | ✅ Live |

## Data and State Architecture
- **Server-state (Async):** TanStack Query (`useDashboardStatsQuery`). 
- **Query Keys:** `['manager', 'dashboard', 'stats', range]`
- **Client-state (Sync):** URL query parameters (`?range=`) for the date filter.
- **Context providers:** `DashboardProvider` holds the derived data and fetch status.
- **Zustand stores:** None — dashboard is read-only, URL serves as truth for filters.

## Component Responsibility Map
- `ManagerDashboardMain` — layout grid orchestrator.
- `useManagerDashboardLogic` — hook that extracts URL params and passes them to TanStack Query.
- `ManagerDashboardKPIs` — pure display of formatted KPIs.
- `ManagerDashboardRevenueChart` — wraps `react-apexcharts`.
- `ManagerDashboardMemberGrowthChart` — wraps `react-apexcharts`.

## Loading, Empty, Error States
- **Loading:** `loading.tsx` renders structural skeleton matching KPI grid + chart layout. Chart components also render a `Loader2` while the chunk lazy-loads.
- **Empty:** KPIs display 0 or `—`. Charts and lists show dedicated empty states.
- **Error:** Route-level `error.tsx` catches rendering or boundary errors.

## Edge Cases / AI Warnings
- **ApexCharts only** — never use Recharts or Chart.js.
- **No mutations** — this page is 100% read-only.
- **Currency/Number formatting** — always use `formatCurrency()` and `formatKPI()` from `@/lib/formatters`. Never use `.toLocaleString()` directly in JSX.
- **Theme Contract** — chart colors must use hex values explicitly listed in `manager_dashboard_theme_contract.md`. Tailwind variable references do not reliably work inside canvas elements.

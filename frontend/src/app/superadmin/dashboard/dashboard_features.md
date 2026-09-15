# Superadmin Dashboard — Feature Map

## Module Purpose
The Superadmin Dashboard is the command center for the entire SaaS platform. It surfaces platform-wide KPIs (total gyms, active tenants, MRR, overdue invoices), MRR trend, plan revenue breakdown, and a feed of recently onboarded tenants. This is a read-heavy, analytics-first module — no mutations originate here. All data is fetched via TanStack Query from a single unified API endpoint.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardView. |
| `loading.tsx` | KPI card + chart skeletons |
| `error.tsx` | Error boundary with retry |
| `dashboard_api/superadmin_dashboard_api.ts` | Exposes typed API functions specific to the Dashboard module. |
| `dashboard_utils/SuperadminDashboardUrlConfig.ts` | Single source of truth for Dashboard local routes and API endpoints. |
| `dashboard_utils/SuperadminDashboardConstants.ts` | Centralizes Dashboard UI constants: chart colors, time range labels, plan badge class map. No hooks. |
| `dashboard_components/SuperadminDashboardView/useSuperadminDashboardView.ts` | Custom hook managing the data fetching for the Dashboard view using TanStack Query. |
| `dashboard_components/SuperadminDashboardView/useSuperadminDashboardDateRangeSuffix.ts` | Hook that derives a human-readable date range suffix string from URL search params for KPI card labels. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx` | Pure View component for the Dashboard. Renders KPI cards, charts, and recent onboards by consuming useSuperadminDashboardView. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx` | Renders the Dashboard KPI cards. No API calls. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx` | Renders the Dashboard revenue, growth, plan, and geography ApexCharts. No data fetching. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx` | Renders the recent tenant onboarding records and navigates to the tenant detail page. |
| `dashboard_components/SuperadminDashboardDateFilterDropdown/useSuperadminDashboardDateFilter.ts` | Custom hook managing the URL-backed state for the Dashboard date filter. |
| `superadmin_dashboard_types/superadmin_dashboard_types.ts` | Defines all TypeScript types and interfaces for the Dashboard module. |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Platform KPIs | `/superadmin/dashboard` | Total gyms, MRR, active tenants | `GET /superadmin/dashboard` | ✅ Live |
| MRR Trend Chart | `/superadmin/dashboard` | Area chart of monthly recurring revenue | `GET /superadmin/dashboard` | ✅ Live |
| Gym Growth Chart | `/superadmin/dashboard` | Bar chart of new signups | `GET /superadmin/dashboard` | ✅ Live |
| Revenue by Plan | `/superadmin/dashboard` | Donut chart of revenue by plan tier | `GET /superadmin/dashboard` | ✅ Live |
| Revenue by Geo | `/superadmin/dashboard` | Bar chart of geographical revenue | `GET /superadmin/dashboard` | ✅ Live |
| Recent Onboards | `/superadmin/dashboard` | List of recently registered tenants | `GET /superadmin/dashboard` | ✅ Live |
| Date Filter | `/superadmin/dashboard` | URL-backed date range filter | Local state | ✅ Live |

## User Flows
1. Superadmin navigates to `/superadmin/dashboard`.
2. `useSuperadminDashboardView` reads URL search params (e.g., `range=this_month`) and initiates a TanStack Query fetch.
3. While loading, `loading` state renders skeletons in the View.
4. On success, `SuperadminDashboardView` passes data to `SuperadminDashboardKpiGrid`, `SuperadminDashboardCharts`, and `SuperadminDashboardRecentOnboards`.
5. Superadmin changes the date using `SuperadminDashboardDateFilterDropdown`. URL is updated via `useSuperadminDashboardDateFilter`, which triggers a new fetch.
6. Clicking on a recent onboard navigates to `/superadmin/gyms?id={tenant.id}`.

## Data and State Architecture
- **Hook:** `useSuperadminDashboardView`
- **Query Key:** `['superadmin', 'dashboard', timeRange, startDate, endDate]`
- **API File:** `dashboard_api/superadmin_dashboard_api.ts`
- **Types File:** `superadmin_dashboard_types/superadmin_dashboard_types.ts`
- **URL Config:** `dashboard_utils/SuperadminDashboardUrlConfig.ts`
- **Zustand stores:** None (dashboard is read-only).

## API Contract
`GET /superadmin/dashboard`
- Request params: `range` (string), `startDate` (optional string), `endDate` (optional string).
- Response shape: `{ data: { metrics: SaaSDashboardMetrics, revenue: RevenueChartData[], growth: GrowthChartData[] } }`

## Loading / Empty / Error States
- **Loading:** Derives from TanStack Query via `fetchState === 'loading'`, rendering inline skeletons in `SuperadminDashboardView.tsx`.
- **Empty:** Derived natively in charts. E.g., Donut chart shows "No revenue data by tier" when `revenueByTier` is empty.
- **Error:** Derives from TanStack Query via `fetchState === 'error'`, rendering an inline text error in `SuperadminDashboardView.tsx`.

## Edge Cases / AI Warnings
- **Dashboard is read-only:** Do not add mutations here.
- **Unified Endpoint:** Do not create separate KPI/revenue API calls unless backend contract changes. Data is currently returned unified.
- **State Management:** Do not bypass TanStack Query for server state.
- **Component Data-fetching:** Do not move Dashboard API calls into child UI components (`SuperadminDashboardKpiGrid`, etc.).
- **Hardcoded Routes:** Do not hardcode navigation paths like `/superadmin/cancellations`; use `SuperadminDashboardUrlConfig.PAGES`.
- **Formatting:** Do not use `.toLocaleString()`, `.toFixed()`, or raw `₹` in components. Use `@/lib/formatters`.
- **No hooks in Constants files:** `SuperadminDashboardConstants.ts` is a pure data file. The date range suffix hook lives in `useSuperadminDashboardDateRangeSuffix.ts` inside the View folder.
- **Plan badge colors:** Do not add inline ternary chains for plan badge classes. Add new plans to `DASHBOARD_PLAN_BADGE_CLASSES` in `SuperadminDashboardConstants.ts`.

## Component Responsibility Map
- `SuperadminDashboardView.tsx`: Orchestrates the layout by rendering children and delegating data.
- `SuperadminDashboardKpiGrid.tsx`: Renders the KPI cards only. No data fetching.
- `SuperadminDashboardCharts.tsx`: Renders the ApexCharts only. No data fetching.
- `SuperadminDashboardRecentOnboards.tsx`: Renders the recent tenants only. No data fetching.
- `SuperadminDashboardHeader.tsx`: Renders the title and date filter dropdown. No `"use client"` — consumes only a client child component.
- `useSuperadminDashboardDateRangeSuffix.ts`: Derives a human-readable date range suffix from URL params for KPI labels.
- `SuperadminDashboardDateFilterDropdown.tsx`: Pure View for selecting date ranges, updating URL params via its custom hook.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — each section is its own component
- [x] Rule 3: Module prefix naming — `SuperadminDashboard*` prefix on all components
- [x] Rule 7: Type isolation — all types in `superadmin_dashboard_types.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, correctly synced
- [x] Rule 40: `dashboard_forbidden.md` present
- [x] Rule 55: Stable IDs used, no `key={index}`
- [x] Rule 62: ApexCharts only — loaded with `dynamic()` + `ssr: false`
- [x] Rule 63: Zero cross-module dependencies
- [x] No hooks in utility/constants files — `useSuperadminDashboardDateRangeSuffix` co-located in View folder
- [x] Plan badge mapping in `DASHBOARD_PLAN_BADGE_CLASSES` constant — no inline ternary chains
- [x] `loading.tsx` skeleton matches actual layout (10 KPI cards + 4 chart panels + recent onboards)
- [x] Rule 73: `import type` used for types
- [x] Local URL Config utilized
- [x] Formatters imported from `@/lib/formatters`

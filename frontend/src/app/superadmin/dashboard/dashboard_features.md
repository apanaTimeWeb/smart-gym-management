# Superadmin Dashboard — Feature Map

## Module Purpose
The Superadmin Dashboard is the command center for the entire SaaS platform. It surfaces
platform-wide KPIs (total gyms, active tenants, MRR, churn rate), a live tenant health
feed, recent system alerts, and quick-action shortcuts to the most critical superadmin
workflows. This is a read-heavy, analytics-first module — no mutations originate here.
All data is fetched via TanStack Query (superadmin uses TanStack Query, not Context + Zustand).

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | KPI card + chart skeleton |
| `error.tsx` | Error boundary with retry |
| `dashboard_components/SuperadminDashboardClient.tsx` | Root Client Component — layout orchestrator |
| `dashboard_components/SuperadminDashboardKpiRow.tsx` | Row of 4 KPI stat cards (total gyms, MRR, active tenants, churn) |
| `dashboard_components/SuperadminDashboardKpiCard.tsx` | Single KPI card with gold gradient (Design §5a) |
| `dashboard_components/SuperadminDashboardRevenueChart.tsx` | ApexCharts area chart — MRR trend (last 12 months) |
| `dashboard_components/SuperadminDashboardTenantHealthTable.tsx` | Top 10 tenants by health score |
| `dashboard_components/SuperadminDashboardAlertsFeed.tsx` | Recent system alerts (overdue payments, failed jobs) |
| `dashboard_components/SuperadminDashboardQuickActions.tsx` | Shortcut buttons to gyms, onboarding, tickets |
| `dashboard_types/SuperadminDashboardTypes.ts` | `DashboardKpi`, `TenantHealthRow`, `SystemAlert` types |
| `dashboard_utils/SuperadminDashboardConstants.ts` | `KPI_CARD_GRADIENT`, `ALERT_SEVERITY_STYLES` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Platform KPIs | `/superadmin/dashboard` | Total gyms, MRR, active tenants, churn rate | `GET /superadmin/dashboard/kpis` | ✅ Live |
| MRR Trend Chart | `/superadmin/dashboard` | 12-month area chart of monthly recurring revenue | `GET /superadmin/dashboard/revenue-trend` | ✅ Live |
| Tenant Health Table | `/superadmin/dashboard` | Top 10 tenants ranked by health score | `GET /superadmin/dashboard/tenant-health` | ✅ Live |
| System Alerts Feed | `/superadmin/dashboard` | Recent critical alerts across all tenants | `GET /superadmin/dashboard/alerts` | ✅ Live |
| Quick Actions | `/superadmin/dashboard` | Navigation shortcuts — no API calls | — | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'dashboard', 'kpis']`, `['superadmin', 'dashboard', 'revenue-trend']`, `['superadmin', 'dashboard', 'tenant-health']`, `['superadmin', 'dashboard', 'alerts']`
- Zustand stores: None (dashboard is read-only)
- Context providers: None
- Local-storage keys: None

## User Flows
1. Superadmin navigates to `/superadmin/dashboard` → all 4 queries fire in parallel via `useQuery`
2. KPI cards render with gold gradient once `kpis` query resolves
3. Revenue chart renders via `dynamic()` with `ssr: false` (ApexCharts requirement)
4. Tenant health table renders top 10 sorted by score descending
5. Alerts feed renders with severity color coding from `ALERT_SEVERITY_STYLES`
6. Quick action buttons navigate to respective modules — no API calls

## Component Responsibility Map
- `SuperadminDashboardClient` — layout only. MUST NOT call `useQuery` directly; delegate to child components.
- `SuperadminDashboardKpiCard` — display only. MUST NOT contain data fetching.
- `SuperadminDashboardRevenueChart` — chart only. MUST use `dynamic()` with `ssr: false`. MUST NOT use Recharts or Chart.js.
- `SuperadminDashboardAlertsFeed` — display only. MUST NOT allow mutations from this component.
- `SuperadminDashboardQuickActions` — navigation only. MUST NOT fetch data.

## Permissions and Security
| Action | Required Role |
|---|---|
| View platform KPIs | `SUPERADMIN` |
| View tenant health | `SUPERADMIN` |
| View system alerts | `SUPERADMIN` |
| ❌ Any mutation from dashboard | Forbidden — navigate to respective module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 4 KPI card skeletons + chart area placeholder + table row skeletons
- **Empty alerts:** "No active alerts — platform is healthy" with green checkmark
- **Empty tenant health:** Should never be empty in production; show "No tenant data" fallback
- **Error:** `error.tsx` with retry; individual query errors show inline error states per section

## Edge Cases / AI Warnings
- **Chart SSR** — `SuperadminDashboardRevenueChart` MUST use `dynamic(() => import(...), { ssr: false })`. Rendering ApexCharts on the server will throw.
- **Parallel queries** — all 4 queries should fire simultaneously, not sequentially. Use separate `useQuery` calls, not `useQueries` unless needed.
- **KPI_CARD_GRADIENT** — must live in `SuperadminDashboardConstants.ts`, never inlined in JSX.
- **Alert severity** — `ALERT_SEVERITY_STYLES` maps `critical | warning | info` to Tailwind classes; never inline color strings.
- **Health score sort** — always spread before sort: `[...data].sort(...)` to avoid mutating TanStack Query cache.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — each section is its own component
- [x] Rule 3: Module prefix naming — `SuperadminDashboard*` prefix on all components
- [x] Rule 7: Type isolation — all types in `SuperadminDashboardTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable IDs used
- [x] Rule 62: ApexCharts only — Recharts/Chart.js forbidden
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
- [x] Design §5a: Gold gradient on KPI cards
- [x] Design §10: ApexCharts loaded with `dynamic()` + `ssr: false`

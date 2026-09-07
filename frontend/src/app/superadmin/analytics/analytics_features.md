# Superadmin Analytics — Feature Map

## Module Purpose
The Superadmin Analytics module provides deep cross-tenant business intelligence for the
SaaS platform. It covers growth metrics (new gym signups over time), revenue breakdown by
plan tier, feature adoption rates across tenants, and geographic distribution of gyms.
This is a read-only, chart-heavy module — all data is fetched via TanStack Query and
rendered exclusively with ApexCharts. No mutations occur here.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Tab skeleton + chart area placeholders |
| `error.tsx` | Error boundary with retry |
| `analytics_components/SuperadminAnalyticsClient.tsx` | Root Client Component — tab navigation + layout |
| `analytics_components/SuperadminAnalyticsGrowthTab.tsx` | Gym signup trend — ApexCharts line chart |
| `analytics_components/SuperadminAnalyticsRevenueTab.tsx` | Revenue by plan tier — ApexCharts bar chart |
| `analytics_components/SuperadminAnalyticsAdoptionTab.tsx` | Feature adoption rates — ApexCharts horizontal bar |
| `analytics_components/SuperadminAnalyticsGeoTab.tsx` | Geographic distribution table + summary |
| `analytics_components/SuperadminAnalyticsKpiRow.tsx` | Top-level KPI summary row (total signups, avg MRR, top region) |
| `analytics_components/SuperadminAnalyticsDateFilter.tsx` | Date range picker — from/to query params |
| `analytics_types/SuperadminAnalyticsTypes.ts` | `GrowthDataPoint`, `RevenueTierRow`, `AdoptionRate`, `GeoRow`, `AnalyticsTab` |
| `analytics_utils/SuperadminAnalyticsConstants.ts` | `ANALYTICS_TABS`, `CHART_COLORS`, `KPI_CARD_GRADIENT` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Growth Chart | `/superadmin/analytics` | New gym signups per month | `GET /superadmin/analytics/growth?from=&to=` | ✅ Live |
| Revenue by Tier | `/superadmin/analytics` | MRR breakdown by plan tier | `GET /superadmin/analytics/revenue-by-tier?from=&to=` | ✅ Live |
| Feature Adoption | `/superadmin/analytics` | % of tenants using each feature | `GET /superadmin/analytics/adoption` | ✅ Live |
| Geographic Distribution | `/superadmin/analytics` | Gym count by city/region | `GET /superadmin/analytics/geo` | ✅ Live |
| Date Range Filter | `/superadmin/analytics` | Filters growth + revenue queries | — (query params) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'analytics', 'growth', { from, to }]`, `['superadmin', 'analytics', 'revenue-tier', { from, to }]`, `['superadmin', 'analytics', 'adoption']`, `['superadmin', 'analytics', 'geo']`
- Zustand stores: None
- Context providers: None
- Local-state: `activeTab` (useState), `dateRange` (useState) — local to `SuperadminAnalyticsClient`

## User Flows
1. Superadmin opens `/superadmin/analytics` → default tab "Growth" loads → `growth` query fires
2. Superadmin changes date range → `from`/`to` state updates → growth + revenue queries refetch with new params
3. Superadmin switches to "Revenue" tab → revenue-by-tier query fires (if not cached)
4. Superadmin switches to "Adoption" tab → adoption query fires (no date filter — all-time)
5. Superadmin switches to "Geo" tab → geo query fires (no date filter)

## Component Responsibility Map
- `SuperadminAnalyticsClient` — tab state + date range state. MUST NOT contain chart logic.
- `SuperadminAnalyticsGrowthTab` — chart only. MUST use `dynamic()` with `ssr: false`.
- `SuperadminAnalyticsDateFilter` — emits date range to parent via callback. MUST NOT fetch data.
- All chart components — MUST use ApexCharts only. Recharts and Chart.js are forbidden (Rule 62).

## Permissions and Security
| Action | Required Role |
|---|---|
| View all analytics | `SUPERADMIN` |
| ❌ Any mutation | Forbidden — analytics is read-only |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — KPI row skeleton + tab bar + chart area placeholder (300px height)
- **Empty:** "No data available for selected date range" with date reset CTA
- **Error:** `error.tsx` with retry; per-tab inline error if individual query fails

## Edge Cases / AI Warnings
- **Chart SSR** — all chart tab components MUST use `dynamic(() => import(...), { ssr: false })`.
- **Date range validation** — `from` must be before `to`; validate client-side before firing query.
- **Adoption tab** — no date filter; do not pass `from`/`to` to adoption query even if date state is set.
- **CHART_COLORS** — must live in `SuperadminAnalyticsConstants.ts`, never inlined in chart options.
- **Tab state** — local `useState`, not URL params (analytics tabs are ephemeral session state).

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — each tab is its own component
- [x] Rule 3: Module prefix naming — `SuperadminAnalytics*` on all components
- [x] Rule 7: Type isolation — all types in `SuperadminAnalyticsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable IDs used
- [x] Rule 62: ApexCharts only
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
- [x] Design §10: All charts loaded with `dynamic()` + `ssr: false`

# Admin Dashboard — Feature Map

## Module Purpose
The Admin Dashboard is the top-level analytics overview for the Super Admin role. It displays
global KPIs across all branches: total revenue, active members, new sign-ups, and pending
payments. All data is read-only — no mutations originate from this module. Charts use
ApexCharts exclusively. This module must never import from `/manager`, `/trainer`, or `/superadmin`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — reads auth cookie, redirects unauthenticated users |
| `loading.tsx` | Structural skeleton matching KPI card grid + chart layout |
| `error.tsx` | Error boundary with retry button |
| `dashboard_components/AdminDashboardMain.tsx` | Root Client Component — composes all sections |
| `dashboard_components/AdminDashboardKpiCards.tsx` | Row of 4–5 stat cards (revenue, members, sign-ups, pending) |
| `dashboard_components/AdminDashboardRevenueChart.tsx` | ApexCharts line/bar chart for monthly revenue trend |
| `dashboard_components/AdminDashboardRecentActivity.tsx` | Latest member sign-ups and payment events table |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| KPI Overview | `/admin/dashboard` | Global stats cards | `GET /admin/dashboard/stats` | ✅ Live |
| Revenue Chart | `/admin/dashboard` | Monthly revenue trend | `GET /admin/dashboard/revenue` | ✅ Live |
| Recent Activity | `/admin/dashboard` | Latest events feed | `GET /admin/dashboard/activity` | ✅ Live |

## Data and State Architecture
- Server-state: TanStack Query in `useAdminDashboardLogic` with query key `adminDashboardStats` and URL `range` state
- Zustand stores: None — dashboard is read-only, no UI mutations
- Context providers: None for server-state ownership; `AdminDashboardMain` consumes `useAdminDashboardLogic` directly
- Local-storage keys: None
- MSW handler: `admin/dashboard/dashboard_mocks/handlers/AdminDashboardMockHandlers.ts` (module-owned MSW transport)

## User Flows
1. Admin navigates to `/admin/dashboard` → `page.tsx` validates cookie → renders `loading.tsx` skeleton
2. `AdminDashboardMain` mounts → fires parallel API calls for stats, revenue, activity
3. KPI cards populate with live data; chart animates in with `motion-safe:` guard
4. On API error → `error.tsx` boundary catches, shows retry button

## Component Responsibility Map
- `AdminDashboardMain` — orchestrates layout, owns fetch state. MUST NOT contain chart logic.
- `AdminDashboardKpiCards` — pure display, receives props. MUST NOT fetch data.
- `AdminDashboardRevenueChart` — wraps `react-apexcharts`. MUST NOT use Recharts or Chart.js.
- `AdminDashboardRecentActivity` — read-only table, no row actions, no pagination needed (<10 rows).

## Permissions and Security
| Action | Required Role |
|---|---|
| View dashboard | `SUPERADMIN` (Admin role) |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` skeleton — 4 KPI card shimmer blocks + chart placeholder rectangle
- **Empty:** KPI cards show `0` with muted text; chart shows empty state message
- **Error:** `error.tsx` with "Failed to load dashboard" + retry button

## Edge Cases / AI Warnings
- **ApexCharts only** — never use Recharts or Chart.js in this module. See `admin_forbidden.md`.
- **No mutations** — this page is 100% read-only. Never add POST/PATCH calls here.
- **Parallel fetches** — stats, revenue, and activity must be fetched in parallel (Promise.all), not sequentially, to avoid waterfall loading.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed components
- [x] Rule 3: Hyper-descriptive naming — `AdminDashboard` prefix on all files
- [x] Rule 6: Logic/UI Separation — fetch logic in `AdminDashboardProvider`, not in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server, `AdminDashboardMain` = Client
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 14: Backend-driven messages — error toasts use `response.message`
- [x] Design §10: ApexCharts with correct color tokens
- [x] Design §29: `motion-safe:` on chart animations


## User Flows & Interactions
1. Enter the `/admin/dashboard` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminDashboardApi.ts` + `AdminDashboardServerApi.ts` for server prefetch | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` where present, using skeleton layout rather than full-page generic spinners.
- Route failure: `error.tsx` where present, with module-specific recovery via `reset()`.
- Entity lists: use the feature's dedicated empty-state component; query failures remain inline unless explicitly configured to throw.

## Edge Cases and AI Warnings
- Do not introduce cross-role or cross-business-module imports.
- Do not move server/API data into Zustand or Context.
- Do not bypass the module API client or read fixtures directly from UI code.
- Do not introduce hardcoded business records or hardcoded API URLs.
- Preserve destructive-action confirmation and backend-driven messages.


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/dashboard_mocks/fixtures/AdminDashboardMockFixtures.ts` and `admin/dashboard/dashboard_mocks/handlers/AdminDashboardMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.

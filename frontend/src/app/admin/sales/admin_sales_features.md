# Admin Sales — Feature Map

## Module Purpose
The Admin Sales module provides aggregate membership sales analytics across all branches.
It is a read-only reporting module — no sales transactions are created here. Displays total
memberships sold, revenue by plan type, branch-wise performance, and trend charts. All data
is filterable by date range and branch.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + charts |
| `error.tsx` | Error boundary |
| `sales_components/AdminSalesMain.tsx` | Root Client Component |
| `sales_components/AdminSalesKpiCards.tsx` | Total sales, revenue, avg plan value KPIs |
| `sales_components/AdminSalesByBranchChart.tsx` | ApexCharts bar chart — branch comparison |
| `sales_components/AdminSalesByPlanChart.tsx` | ApexCharts donut — plan type breakdown |
| `sales_components/AdminSalesTable.tsx` | Paginated membership sales table |
| `sales_components/AdminSalesFilters.tsx` | Date range + branch filter |
| `sales_types/AdminSalesTypes.ts` | `SalesStat`, `SalesFilters` types |
| `sales_api/AdminSalesApi.ts` | API wrappers |
| `sales_utils/AdminSalesUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Sales Overview | `/admin/sales` | KPI cards + charts | `GET /admin/sales/stats` | ✅ Live |
| Branch Comparison | `/admin/sales` | Bar chart by branch | `GET /admin/sales/by-branch` | ✅ Live |
| Plan Breakdown | `/admin/sales` | Donut chart by plan type | `GET /admin/sales/by-plan` | ✅ Live |
| Sales Table | `/admin/sales` | Paginated membership list | `GET /admin/sales/transactions` | ✅ Live |

## Data and State Architecture
- Server-state: TanStack Query in `useAdminSalesLogic`; URL state owns tab/search/page/range
- Zustand stores: None — read-only module
- Context providers: `AdminSalesContext` is a compatibility bridge only; TanStack Query remains the server-state owner
- Local-storage keys: None
- MSW handler: `admin/sales/sales_mocks/handlers/AdminSalesMockHandlers.ts` (module-owned MSW transport)

## User Flows
1. Admin opens `/admin/sales` → parallel fetch for KPIs, charts, table
2. Admin applies date/branch filter → all sections re-fetch with updated params
3. Admin clicks table row → navigates to member profile (if applicable)

## Component Responsibility Map
- `AdminSalesMain` — layout orchestrator. MUST NOT contain filter state.
- `AdminSalesFilters` — owns filter state, dispatches to context.
- `AdminSalesByBranchChart` / `AdminSalesByPlanChart` — wrap `react-apexcharts`. MUST NOT use Recharts.
- `AdminSalesTable` — pure display, receives paginated data as props.

## Permissions and Security
| Action | Required Role |
|---|---|
| View sales analytics | `SUPERADMIN` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 3 KPI shimmer cards + 2 chart placeholders + table skeleton
- **Empty:** Charts show empty state message; table shows "No sales in this period"
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **ApexCharts only** — never use Recharts or Chart.js. See `admin_forbidden.md`.
- **No mutations** — this is a read-only analytics module.
- **Parallel fetches** — KPIs, charts, and table must be fetched in parallel, not sequentially.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, display in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 17: Pagination + filtering on sales table
- [x] Design §10: ApexCharts with correct color tokens


## User Flows & Interactions
1. Enter the `/admin/sales` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminSalesApi.ts` + `AdminSalesServerApi.ts` for server prefetch | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

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

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/sales_mocks/fixtures/AdminSalesMockFixtures.ts` and `admin/sales/sales_mocks/handlers/AdminSalesMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.

# Admin Finance — Feature Map

## Module Purpose
The Admin Finance module provides a system-wide view of all payment transactions across all
branches. It is read-only analytics — no payment collection happens here (that is a Manager
responsibility). Displays revenue summaries, payment mode breakdowns, and filterable transaction
history. All monetary values are transmitted as integers (paise) and formatted via `formatters.ts`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + table |
| `error.tsx` | Error boundary |
| `pnl/` | Nested route for the Branch-wise P&L Comparison |
| `finance_components/AdminFinanceMain.tsx` | Root Client Component |
| `finance_components/AdminFinanceKpiCards.tsx` | Total revenue, collections, pending KPIs |
| `finance_components/AdminFinanceTable.tsx` | Paginated, filterable transaction table |
| `finance_components/AdminFinanceFilters.tsx` | Date range, branch, payment mode filters |
| `finance_types/AdminFinanceTypes.ts` | `Transaction`, `FinanceStats`, `FinanceFilters` types |
| `finance_api/AdminFinanceApi.ts` | API wrappers for finance endpoints |
| `finance_utils/AdminFinanceUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Finance Overview | `/admin/finance` | KPI cards + transaction table | `GET /admin/finance/stats` | ✅ Live |
| Transaction Table | `/admin/finance` | Paginated payment history | `GET /admin/finance/transactions` | ✅ Live |
| Filter by Branch/Date | `/admin/finance` | Scoped analytics | Query params on above | ✅ Live |
| Branch P&L Comparison | `/admin/finance/pnl` | Side-by-side branch profitability | `GET /admin/finance/pnl?period={period}` | ✅ Live |

## Data and State Architecture
- Server-state: TanStack Query in `useAdminFinanceLogic` and `useAdminFinancePnlLogic`
- Zustand stores: None — read-only module
- Context providers: None for server-state ownership
- Local-storage keys: None
- MSW handler: `admin/finance/finance_mocks/handlers/AdminFinanceMockHandlers.ts` (module-owned MSW transport)

## User Flows
1. Admin opens `/admin/finance` → skeleton loads → KPI cards + table populate
2. Admin applies branch/date filter → table re-fetches with updated query params
3. Admin clicks table row → navigates to transaction detail (if implemented)

## Component Responsibility Map
- `AdminFinanceMain` — layout orchestrator. MUST NOT contain filter state.
- `AdminFinanceFilters` — owns filter state, calls context to trigger re-fetch.
- `AdminFinanceTable` — pure display, receives paginated data as props. MUST NOT fetch directly.
- `AdminFinanceKpiCards` — pure display. MUST NOT contain formatting logic (use `formatters.ts`).

## Permissions and Security
| Action | Required Role |
|---|---|
| View finance data | `SUPERADMIN` (Admin role) |

## Loading, Empty, Error States
- **Loading:** Skeleton — 3 KPI shimmer cards + 8-row table skeleton
- **Empty:** Table empty state with "No transactions found for this period" + filter reset CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Currency formatting** — all amounts arrive as integers (paise). Always use `formatCurrency()` from `@/lib/formatters`. Never divide by 100 inline in components.
- **No mutations** — this is a read-only analytics module. Never add payment collection here.
- **Branch filter** — uses `useAdminGlobalStore` selected branch as default filter value.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in provider, display in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 17: Pagination + filtering on transaction table
- [x] Rule 21: Currency as integers, formatted via `formatters.ts`


## User Flows & Interactions
1. Enter the `/admin/finance` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminFinanceApi.ts` + `AdminFinanceServerApi.ts` for server prefetch | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

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

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/finance_mocks/fixtures/AdminFinanceMockFixtures.ts` and `admin/finance/finance_mocks/handlers/AdminFinanceMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.

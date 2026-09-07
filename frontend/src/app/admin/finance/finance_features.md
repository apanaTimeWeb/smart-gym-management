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

## Data and State Architecture
- Server-state: Context-based fetch in `AdminFinanceProvider`
- Zustand stores: None — read-only module
- Context providers: `AdminFinanceProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

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

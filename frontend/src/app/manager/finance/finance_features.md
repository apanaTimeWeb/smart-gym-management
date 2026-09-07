# Manager Finance — Feature Map

## Module Purpose
The Manager Finance module is the branch-level payments ledger. It displays all payment
transactions for the branch with summary KPIs (total collected, pending, refunds) and a
revenue vs expense chart. This is a read-only analytics view — payment collection happens
inside the Members module. All monetary values arrive as paise integers and are formatted
via `formatters.ts`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + table |
| `error.tsx` | Error boundary |
| `finance_components/ManagerFinanceMain.tsx` | Root Client Component |
| `finance_components/ManagerFinanceKpiCards.tsx` | Total collected, pending, refunds KPIs |
| `finance_components/ManagerFinanceRevenueChart.tsx` | Revenue vs expense bar chart (ApexCharts) |
| `finance_components/ManagerFinanceTable.tsx` | Paginated, filterable transactions table |
| `finance_components/ManagerFinanceFilters.tsx` | Date range + payment mode filters |
| `finance_types/ManagerFinanceTypes.ts` | `Transaction`, `FinanceStat` types |
| `finance_api/ManagerFinanceApi.ts` | API wrappers |
| `finance_utils/ManagerFinanceUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Finance KPIs | `/manager/finance` | Summary stats | `GET /manager/finance/stats` | ✅ Live |
| Revenue Chart | `/manager/finance` | Revenue vs expense trend | `GET /manager/finance/chart` | ✅ Live |
| Transactions Table | `/manager/finance` | Paginated payment history | `GET /manager/finance/transactions` | ✅ Live |

## Data and State Architecture
- Server-state: `ManagerFinanceContext` — stats, chart data, transactions, filters
- Zustand stores: None — read-only module
- Context providers: `ManagerFinanceProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/finance` → KPIs, chart, and table load in parallel
2. Manager applies date/payment-mode filter → table and KPIs re-fetch
3. Manager clicks a transaction row → detail drawer or navigation (if implemented)

## Component Responsibility Map
- `ManagerFinanceMain` — layout. MUST NOT contain filter state.
- `ManagerFinanceFilters` — owns filter state, dispatches to context.
- `ManagerFinanceRevenueChart` — wraps `react-apexcharts`. MUST NOT use Recharts.
- `ManagerFinanceTable` — pure display, receives paginated data as props.

## Permissions and Security
| Action | Required Role |
|---|---|
| View finance data | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 3 KPI shimmer cards + chart placeholder + 8-row table skeleton
- **Empty:** "No transactions found for this period" with filter reset CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **No mutations** — this is a read-only analytics module. Payment collection is in the Members module.
- **Currency formatting** — all amounts arrive as paise integers. Always use `formatCurrency()` from `@/lib/formatters`. Never divide by 100 inline.
- **ApexCharts only** — never use Recharts or Chart.js.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, display in components
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 17: Pagination + filtering on transactions table
- [x] Rule 21: Currency formatted via `formatters.ts`
- [x] Design §10: ApexCharts with correct color tokens

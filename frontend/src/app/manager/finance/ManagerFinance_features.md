# Manager Finance — Feature Map

## Module Purpose
The Manager Finance module is the branch-level payments ledger. It displays all payment transactions for the branch with summary KPIs (total collected, pending, refunds) and a revenue vs expense chart. This is a read-only analytics view — payment collection happens inside the Members module. All monetary values arrive as paise integers and are formatted via `@/lib/formatters`.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + table |
| `error.tsx` | Error boundary |
| `finance_context/ManagerFinanceContext.tsx` | Bridges TanStack Query with URL-synced UI state (filters, tab, pagination) |
| `finance_api/ManagerUseManagerFinanceQueries.ts` | TanStack Query definitions for API calls |
| `finance_components/ManagerFinanceMain/*` | Feature UI components (Table, Chart, KPIs, Filters, Empty State) |
| `finance_types/ManagerFinanceTypes.ts` | Type definitions for Finance data models |

## Exact Feature Behavior
- **Finance KPIs**: Summary stats dynamically refetched when URL filters change.
- **Revenue Chart**: Revenue vs expense trend chart using ApexCharts. Uses `formatKPI()` for axis labels.
- **Transactions Table**: Paginated payment history. Filters (`search`, `status`, `method`, `page`, `startDate`, `endDate`) strictly mirror the URL via `useRouter`.
- **Exporting**: Mocked CSV generation embedded for payment histories.

## Data and State Architecture
- **Server-state**: TanStack Query (`['manager', 'finance', 'payments', params]`, `['manager', 'finance', 'summary', range]`)
- **Context**: `ManagerFinanceContext` manages URL state parsing (`useSearchParams`) and triggers query invalidation. Local component state is NOT used for primary filters.
- **Zustand stores**: None — read-only module.
- **URL State**: Fully synced. Changing a dropdown updates the URL, which natively triggers the TanStack query to fetch new data.

## Component Responsibility Map
- `ManagerFinanceMain` — orchestrates the tabs, wrapped inside the `FinanceProvider`.
- `ManagerFinanceFilters` — renders filter inputs; state flows directly to the context URL updaters.
- `ManagerFinanceRevenueChart` — wraps `react-apexcharts`. Maps domain styling tokens properly to chart primitives.
- `ManagerFinanceTable` — pure display, receives paginated data as props.

## Feature-Specific AI Warnings
1. **Never use `any`**: Ensure API payloads and component props are strictly typed to the domains in `ManagerFinanceTypes.ts`.
2. **Never inline format currency**: Always import `formatCurrency` or `formatKPI` from `@/lib/formatters`. Do not use `.toLocaleString()`.
3. **Never embed hardcoded colors in UI components**: Follow `ManagerFinance_theme_contract.md`. E.g., `text-success`, not `text-[#22C55E]`. (Hex strings are permitted *only* strictly inside ApexChart configuration blocks).
4. **Never create local-only filter state**: Changes to filters must invoke URL router pushes.
5. **No mutations**: This is a read-only analytics module. Do not build payment creation workflows here; they belong in Members or HR.

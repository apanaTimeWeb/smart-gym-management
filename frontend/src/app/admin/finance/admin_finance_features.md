# Admin Finance — Feature Map

## Module Purpose
The Admin Finance module provides read-only finance analytics across the Admin scope. It exposes payment history, revenue-by-method, finance summary data, expenses, and branch-level P&L comparison. Payment collection itself is outside this module.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server route entry for finance overview. |
| `pnl/` | Nested P&L route. |
| `finance_components/` | Finance KPI, revenue, payment, expense and P&L views. |
| `finance_context/` | URL state + TanStack Query orchestration. |
| `finance_types/` | API/domain/UI types and Zod schemas. |
| `finance_utils/` | Feature constants and formatting/visual mappings. |
| `finance_mocks/` | Module-owned fixtures and MSW handlers. |
| `finance_api/AdminFinanceApi.ts` | Browser API client with Zod validation. |
| `admin_finance_url_config.ts` | Centralized finance routes/API paths. |

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Payment History | `/admin/finance` | Search/filter and paginate payment records | `GET /admin/finance/payments/fetchPayments` | Live/mock-supported |
| Finance Summary | `/admin/finance` | Review aggregate finance metrics | `GET /admin/finance/summary` | Live/mock-supported |
| Revenue by Method | `/admin/finance` | Compare revenue by payment method | Summary-derived finance data | Live/mock-supported |
| Expenses | `/admin/finance` | Review finance expenses | `GET /admin/finance/payments/fetchExpenses` | Live/mock-supported |
| Branch P&L | `/admin/finance/pnl` | Select period/status, sort branches, expand details | `GET /admin/finance/pnl?period&status` | Live/mock-supported |

## Data and State Architecture
- **Server state:** TanStack Query.
- **URL state:** Finance overview search/method/status/page/range are URL-backed; P&L `period` and `status` are URL-synchronized by `useAdminUrlQuerySync`.
- **Zustand:** No finance server data is stored in a module store.
- **Local-storage keys:** None.
- **MSW:** `finance_mocks/handlers/AdminFinanceMockHandlers.ts` + `finance_mocks/fixtures/AdminFinanceMockFixtures.ts`.
- **External infrastructure:** `@/lib/api`, `@/lib/formatters`, shared Admin table/pagination primitives, documented Admin branch shell selection.
- **Business feature dependencies:** None.
- **Role-level business dependencies:** None beyond documented shell branch selection.

## Query Keys
- `['admin', 'finance', 'payments', queryParams]`
- `['admin', 'finance', 'summary', selectedBranchId, range]`
- `['admin', 'finance', 'expenses', selectedBranchId]`
- `['admin', 'finance', 'pnl', { period, status: statusFilter }]`

## User Flows
### Flow 1: Filter Payment History
1. Admin changes search/method/status/page on `/admin/finance`.
2. URL state updates and resets page when a filter changes.
3. `useAdminFinanceLogic` builds request parameters.
4. MSW applies those parameters to module-owned payment fixtures.
5. TanStack Query receives a new query key and updated results.
6. Payment table and pagination update visibly.

### Flow 2: Change P&L Period
1. Admin selects a P&L period.
2. URL `period` changes through `useAdminUrlQuerySync`.
3. P&L query key changes.
4. `fetchBranchPnl(period, status)` sends `period` to `/admin/finance/pnl`.
5. Module-owned MSW selects the corresponding period fixture.
6. The rendered branch values change to reflect the selected period.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchPayments(params)` | GET | `/admin/finance/payments/fetchPayments` | `page`, `limit`, optional `search`, `method`, `status`, `branchId` | `{ payments: Payment[]; total: number }` + pagination metadata |
| `fetchSummary(branchId, range)` | GET | `/admin/finance/summary` | optional `branchId`, `range` | `FinanceSummary` |
| `fetchBranchPnl(period, status?)` | GET | `/admin/finance/pnl` | required `period`, optional `status` | `BranchPnlRecord[]` |
| `fetchExpenses(params)` | GET | `/admin/finance/payments/fetchExpenses` | optional finance filter params | `Expense[]` |

## UI Data Requirements
- Payment table: `invoiceNo`, `member.name`/`memberId`, `amount`, `method`, `status`, `paidAt`.
- Payment pagination: response `meta.total`, `page`, `limit`, `totalPages`, `hasNextPage`, `hasPrevPage`.
- P&L rows: branch identity, revenue, expenses, net profit, margin/status fields consumed by the P&L components.
- Summary/KPI fields: the exact fields declared in `AdminFinanceSchemas.ts` and consumed by `AdminFinanceKPIs.tsx` / revenue components.
- Expense table: exact `Expense` schema fields consumed by `AdminFinanceExpensesTable.tsx`.


## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `AdminFinanceMain.tsx` | Root finance overview orchestrator for tabs and query-driven sections. |
| `AdminFinanceKPIs.tsx` | Renders finance KPI/stat cards from the API response. |
| `AdminFinancePaymentsTable.tsx` | Renders sortable, filterable, paginated payment records with empty/error/loading states. |
| `AdminFinanceExpensesTable.tsx` | Renders branch/category-filtered expenses with pagination and a module-owned empty state. |
| `AdminFinancePnlMain.tsx` | Orchestrates P&L filters, breakdowns, charts, and table presentation. |
| `AdminFinancePnlPeriodSelector.tsx` | Controls URL-backed P&L period selection. |
| `AdminFinancePnlTable.tsx` | Renders sortable branch P&L rows and empty/loading/error states. |
| `AdminFinancePnlCharts.tsx` | Renders period-aware P&L visualization from query data. |
| `AdminFinanceEmptyState.tsx` | Provides the feature-owned empty-state visual for finance tables. |

## Permissions and Security
- Required role: `ADMIN`.
- Finance module is read-only; no payment-collection mutations belong here.
- Monetary values must remain in the documented minor-unit representation and use centralized formatters at the UI boundary.

## Loading, Empty, and Error States
- Route loading: `loading.tsx`.
- Payment table: pending skeleton, empty result, inline error/retry surface.
- Expense table: pending skeleton and empty result.
- P&L table/charts: pending state, dedicated P&L empty state, and query error state.
- Route-level `error.tsx` remains the outer recovery boundary.

## Edge Cases and AI Warnings
- **Period propagation is mandatory:** Never change the P&L period only in local state; it must change the request and mock response.
- **No payment creation here:** Finance is read-only.
- **Do not move finance API data into Context/Zustand:** TanStack Query is the server-state owner.
- **Keep canonical money formatting:** never divide minor units by 100 inline in a view.
- **Do not replace module fixtures with component fallbacks:** mock data belongs inside `finance_mocks`.

## Rule Compliance Checklist
- [x] Finance period and status are URL/query synchronized
- [x] P&L request receives selected period/status
- [x] P&L MSW response changes by period/status
- [x] Payment filters/page are propagated into request/mock
- [x] Pagination metadata is complete
- [x] Module-owned MSW fixtures/handlers
- [x] No feature-to-feature business imports
- [x] Module theme contract maintained
- [ ] Full browser/typecheck/lint/E2E execution — NOT VERIFIED without the consuming application package/configuration

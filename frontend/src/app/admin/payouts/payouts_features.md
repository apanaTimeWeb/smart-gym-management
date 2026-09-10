# Admin Payouts — Feature Map

## Module Purpose
The Payouts module gives gym admins a read-only view of staff salary disbursements and trainer
payout records across all branches. Admins can see payout history per staff member, filter by
month and branch, verify payment status, and view a P&L statement. Write operations (creating
or approving payouts) belong to the Manager role. This module exists so admins can audit
payroll without needing Manager access. All monetary values use `formatCurrency()` — never
raw `.toFixed()`.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `payouts_components/AdminPayoutsMain/` | Root client orchestrator — renders KPIs, tabs, summary table, P&L statement | `AdminPayoutsMain.tsx` |
| `payouts_components/AdminPayoutsTabs/` | Tab switcher between Summary and P&L Statement views | `AdminPayoutsTabs.tsx` |
| `payouts_components/AdminPayoutsKPIs/` | Stat cards: Total Paid, Pending, This Month, Staff Count | `AdminPayoutsKPIs.tsx` |
| `payouts_components/AdminPayoutsSummaryTable/` | Paginated payout records table with status badges | `AdminPayoutsSummaryTable.tsx` |
| `payouts_components/AdminPayoutsPnLStatement/` | Branch-level P&L statement view | `AdminPayoutsPnLStatement.tsx` |
| `payouts_api/` | API client for payout endpoints | `payouts_api.ts` |
| `payouts_context/` | Data logic hook — fetches payouts, KPIs, P&L | `useAdminPayoutsLogic.ts` |
| `payouts_store/` | Zustand store — activeTab, monthFilter, branchFilter, currentPage | `useAdminPayoutsStore.ts` |
| `payouts_types/` | TypeScript types: Payout, PayoutStatus, PayoutKPIData, PnLStatement | `payouts_types.ts` |
| `payouts_utils/` | Constants: status styles, month options | `AdminPayoutsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Payout List | `/admin/payouts` | View all staff payouts with status, amount, and branch filter | `AdminPayoutsSummaryTable` | `GET /admin/payouts?page&limit&month&branchId` | ✅ Live |
| KPI Overview | `/admin/payouts` | See total paid, pending, this month's total, staff count | `AdminPayoutsKPIs` | `GET /admin/payouts/kpis` | ✅ Live |
| P&L Statement | `/admin/payouts` (P&L tab) | View branch-level profit and loss statement | `AdminPayoutsPnLStatement` | `GET /admin/payouts/pnl?month&branchId` | ✅ Live |
| Month Filter | `/admin/payouts` | Filter all views by billing month | `AdminPayoutsMain` toolbar | — (query param) | ✅ Live |

## User Flows & Interactions

### Flow 1: Review Monthly Payouts
1. Admin navigates to `/admin/payouts` — current month pre-selected
2. KPI cards show total paid, pending, and staff count for the month
3. Summary table shows all payout records with status badges
4. Admin can switch to P&L tab to see branch-level profitability

### Flow 2: Filter by Branch and Month
1. Admin selects a branch from the branch dropdown
2. Admin selects a past month from the month picker
3. All KPIs, table, and P&L update to reflect the selected scope

## Data and State Architecture

- **State pattern:** Zustand for UI state + TanStack Query for server state
- **Zustand store:** `useAdminPayoutsStore.ts` — holds: `activeTab`, `monthFilter`, `branchFilter`, `currentPage`
- **Query keys:** `['adminPayouts', { monthFilter, branchFilter, currentPage }]`, `['adminPayoutsKPIs', { monthFilter, branchFilter }]`, `['adminPayoutsPnL', { monthFilter, branchFilter }]`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `payoutsApi` in `payouts_api/payouts_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPayouts(params)` | GET | `/admin/payouts` | `{ page, limit, month, branchId }` | `Payout[]` + `PaginationMeta` |
| `fetchKPIs(params)` | GET | `/admin/payouts/kpis` | `{ month, branchId }` | `PayoutKPIData` |
| `fetchPnL(params)` | GET | `/admin/payouts/pnl` | `{ month, branchId }` | `PnLStatement` |
| `fetchPayoutById(id)` | GET | `/admin/payouts/:id` | — | `Payout` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Read-only:** Zero write operations. No approve/reject/create payout buttons exist anywhere in this module.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`
- **Amount formatting:** All amounts use `formatCurrency()` from `@/lib/formatters` — never raw `.toFixed()`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton: KPI cards + tab bar + table | N/A | `error.tsx` — module-branded with Retry |
| Payout table | Skeleton rows while loading | Inline "No payouts for this period" | Inline via TanStack Query `isError` |
| P&L Statement | Skeleton lines | Inline "No P&L data for this period" | Inline error |

## Edge Cases and AI Warnings

- **Admins are read-only** — never add approve, reject, or create payout buttons. Those operations belong exclusively to the Manager role.
- **Amount formatting is mandatory** — always use `formatCurrency()` from `@/lib/formatters`. Never use `.toFixed(2)` or raw number display in JSX.
- **`PAYOUT_STATUS_STYLES` is the single source of truth** — never inline status badge color ternaries.
- **Month filter defaults to current month** — `monthFilter` initializes to the current month in ISO format (`YYYY-MM`).

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminPayoutsMain.tsx` | Root orchestrator. Renders KPIs, tab switcher, month/branch filters, and active tab content. |
| `AdminPayoutsTabs.tsx` | Tab switcher between Summary and P&L. Writes `activeTab` to store. |
| `AdminPayoutsKPIs.tsx` | 4 read-only stat cards. Reads from logic hook. |
| `AdminPayoutsSummaryTable.tsx` | Paginated payout rows with status badges. Read-only. |
| `AdminPayoutsPnLStatement.tsx` | P&L statement view. Reads from logic hook. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded colors in JSX
- [x] Rule 5: Smart State Management — Zustand + TanStack Query
- [x] Rule 6: Logic/UI Separation — `useAdminPayoutsLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `payouts_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: `payouts_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `payouts_forbidden.md` present
- [x] Rule 80: `formatCurrency()` used — no raw `.toFixed()` in JSX
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured

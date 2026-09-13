# Manager Expenses — Feature Map

## Module Purpose
The Manager Expenses module tracks branch-level operational costs.
It provides a list of expenses, category-wise breakdown chart, and manual entry forms. The module relies heavily on URL state for active search, filters, and pagination.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for layout |
| `error.tsx` | Error boundary |
| `expenses_components/ManagerExpensesMain.tsx` | Root Client Component orchestrator |
| `expenses_components/ManagerExpensesChart.tsx` | Expenses breakdown by category (react-apexcharts) |
| `expenses_components/ManagerExpensesTable.tsx` | Paginated list of expenses |
| `expenses_components/ManagerExpensesModal.tsx` | Expense creation/editing form |
| `expenses_context/ManagerExpensesContext.tsx` | URL manipulation and modal state provider |
| `expenses_api/useManagerExpensesQueries.ts` | Query keys and TanStack hooks |
| `expenses_api/useManagerExpensesMutations.ts` | Mutation hooks for API interaction |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Expenses Chart | `/manager/expenses` | Category breakdown | `GET /manager/expenses?limit=1000` | ✅ Live |
| Expenses Table | `/manager/expenses` | Paginated records | `GET /manager/expenses` | ✅ Live |
| Manage Expense | `/manager/expenses` | Add, Edit, Pay, Delete | `POST/PATCH/DELETE /manager/expenses` | ✅ Live |

## Data and State Architecture
- **Server-state (Async):** TanStack Query (`useExpensesListQuery`). 
- **Query Keys:** `['manager', 'expenses', 'list', params]`
- **Client-state (Sync):** URL query parameters (`?page=`, `?search=`, `?status=`) for the list. Local state for modal visibility.
- **Context providers:** `ExpensesProvider` provides URL manipulation functions and modal UI state.
- **Zustand stores:** None.

## Component Responsibility Map
- `ManagerExpensesContext` — URL sync, UI state (modals), and mutation orchestrator.
- `ManagerExpensesTable` — data grid, fetches its own paginated data using context params.
- `ManagerExpensesChart` — visual breakdown, fetches its own data using TanStack Query.
- `ManagerExpensesModal` — form validation and submission.

## Loading, Empty, Error States
- **Loading:** `loading.tsx` renders structural skeleton matching the layout. Chart and Table handle their own internal `isLoading` states from TanStack Query.
- **Empty:** Table shows empty state card if no records match the filter.
- **Error:** Route-level `error.tsx` catches rendering or boundary errors.

## Edge Cases / AI Warnings
- **ApexCharts only** — never use Recharts or Chart.js.
- **Data fetching** — components fetch their own data using `useExpensesListQuery` hooked up to TanStack Query.
- **URL State sync** — any new filters added must be synchronized to the URL via `ExpensesProvider`.

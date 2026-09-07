# Manager Expenses — Feature Map

## Module Purpose
The Manager Expenses module tracks all operational expenses for the branch — rent, utilities,
equipment, salaries, and miscellaneous costs. It provides full CRUD for expense records and
KPI summaries (total this month, by category). Expense deletion requires `useConfirm()`
double-verification. All amounts are stored and transmitted as paise integers.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for KPI cards + table |
| `error.tsx` | Error boundary |
| `expenses_components/ManagerExpensesMain.tsx` | Root Client Component, wraps `ExpensesProvider` |
| `expenses_components/ManagerExpensesKpiCards.tsx` | Total expenses, by-category breakdown KPIs |
| `expenses_components/ManagerExpensesTable.tsx` | Paginated expense records table |
| `expenses_components/ManagerExpensesAddModal.tsx` | Add new expense form |
| `expenses_components/ManagerExpensesEditModal.tsx` | Edit existing expense form |
| `expenses_context/ExpensesProvider.tsx` | Fetch state, expense list, pagination |
| `expenses_types/ManagerExpensesTypes.ts` | `Expense`, `ExpenseCategory` enum, `CreateExpenseDto` |
| `expenses_api/ManagerExpensesApi.ts` | API wrappers |
| `expenses_utils/ManagerExpensesUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Expense KPIs | `/manager/expenses` | Monthly totals by category | `GET /manager/expenses/stats` | ✅ Live |
| Expense Table | `/manager/expenses` | Paginated expense list | `GET /manager/expenses` | ✅ Live |
| Add Expense | `/manager/expenses` | Create new expense record | `POST /manager/expenses` | ✅ Live |
| Edit Expense | `/manager/expenses` | Update expense details | `PATCH /manager/expenses/:id` | ✅ Live |
| Delete Expense | `/manager/expenses` | Remove expense record | `DELETE /manager/expenses/:id` | ✅ Live |

## Data and State Architecture
- Server-state: `ExpensesProvider` — expense list, pagination, KPI stats
- Zustand stores: `useManagerExpensesStore` — modal open/close, selected expense for edit
- Context providers: `ExpensesProvider` (lives inside `ManagerExpensesMain`, NOT in `page.tsx`)
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/expenses` → KPI cards + table load
2. Manager clicks "Add Expense" → `ManagerExpensesAddModal` opens → submit → `POST` → table refreshes
3. Manager clicks expense row → `ManagerExpensesEditModal` opens with pre-filled data
4. Manager clicks delete icon → `useConfirm()` → on confirm → `DELETE` → row removed

## Component Responsibility Map
- `ManagerExpensesMain` — layout + provider wrapper. MUST NOT contain form logic.
- `ExpensesProvider` — owns all fetch state. MUST NOT render UI.
- `ManagerExpensesTable` — pure display. Row click dispatches to store to open edit modal.
- `ManagerExpensesAddModal` / `ManagerExpensesEditModal` — own React Hook Form + Zod state.

## Permissions and Security
| Action | Required Role |
|---|---|
| View expenses | `MANAGER` |
| Add / Edit expense | `MANAGER` |
| Delete expense | `MANAGER` — requires `useConfirm()` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 2 KPI shimmer cards + 8-row table skeleton
- **Empty:** "No expenses recorded this month" with "Add Expense" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **`ExpensesProvider` placement** — the provider lives inside `ManagerExpensesMain` (Client Component), NOT in `page.tsx` (Server Component). Never move it to `page.tsx`.
- **Category enum** — expense categories must use `ExpenseCategory` enum from `ManagerExpensesTypes.ts`, never raw strings.
- **Currency formatting** — amounts arrive as paise integers. Always use `formatCurrency()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server, provider inside Main
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 21: Currency formatted via `formatters.ts`
- [x] Rule 71: Delete uses `useConfirm()` double-verification

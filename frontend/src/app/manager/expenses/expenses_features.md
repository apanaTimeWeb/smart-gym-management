# Manager Expenses — Feature Map

## Module Purpose
Manager Expenses is the branch expense register and reporting view. Managers can browse, search and filter expense records, inspect expense statistics, create and update expenses, and delete an expense through the protected confirmation workflow. The module owns its expense DTOs, schemas, fixtures, and handlers. Expense records are server state and must never be embedded as UI constants.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `expenses_api/` | Feature-owned responsibility for the expenses module. | `ManagerExpensesApi.ts; ManagerUseManagerExpensesMutations.ts; ManagerUseManagerExpensesQueries.ts` |
| `expenses_components/` | Feature-owned responsibility for the expenses module. | `—` |
| `expenses_context/` | Feature-owned responsibility for the expenses module. | `ManagerExpensesContext.tsx` |
| `expenses_fixtures/` | Feature-owned responsibility for the expenses module. | `ManagerExpensesMockData.ts` |
| `expenses_mocks/` | Feature-owned responsibility for the expenses module. | `—` |
| `expenses_types/` | Feature-owned responsibility for the expenses module. | `ManagerExpensesSchema.ts; ManagerExpensesTypes.ts` |
| `expenses_utils/` | Feature-owned responsibility for the expenses module. | `ManagerExpensesSharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchExpenses | `/manager/expenses` | Uses the fetchExpenses workflow with typed request/response handling. | `GET /manager/expenses` | ✅ Implemented |
| fetchExpenseById | `/manager/expenses` | Uses the fetchExpenseById workflow with typed request/response handling. | `GET /manager/expenses/:id` | ✅ Implemented |
| fetchExpenseStats | `/manager/expenses` | Uses the fetchExpenseStats workflow with typed request/response handling. | `GET /manager/expenses/stats` | ✅ Implemented |
| createExpense | `/manager/expenses` | Uses the createExpense workflow with typed request/response handling. | `POST /manager/expenses` | ✅ Implemented |
| updateExpense | `/manager/expenses` | Uses the updateExpense workflow with typed request/response handling. | `PATCH /manager/expenses/:id` | ✅ Implemented |
| deleteExpense | `/manager/expenses` | Uses the deleteExpense workflow with typed request/response handling. | `DELETE /manager/expenses/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Review expenses
1. Manager opens Expenses and loads the paginated expense query.
2. Search/filter/page state is synchronized to the request parameters.
3. MSW returns the filtered page and total from module fixtures.
4. The table renders amount/date/status with centralized formatting and nullable fallbacks.
### Flow 2: Create or edit expense
1. Manager opens the expense form and edits the required fields.
2. RHF + Zod validates the form; submission is disabled while pending.
3. createExpense() or updateExpense() sends the request.
4. The response message is surfaced and the query cache is reconciled with the authoritative response.

## Data and State Architecture
TanStack Query owns expenses server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchExpenses` | `GET` | `/api/v1/manager/expenses` | `{ page?, limit?, search?, category?, status?, startDate?, endDate? }` | `{ expenses: Expense[]; total: number; page: number; limit: number }` |
| `fetchExpenseById` | `GET` | `/api/v1/manager/expenses/:id` | `{ id: string }` | `Expense` |
| `fetchExpenseStats` | `GET` | `/api/v1/manager/expenses/stats` | `{ startDate?, endDate? }` | `ExpenseStats` |
| `createExpense` | `POST` | `/api/v1/manager/expenses` | `Partial<Expense>` | `Expense` |
| `updateExpense` | `PATCH` | `/api/v1/manager/expenses/:id` | `{ id: string; body: Partial<Expense> }` | `Expense` |
| `deleteExpense` | `DELETE` | `/api/v1/manager/expenses/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total amount | `totalAmount` | `/api/v1/manager/expenses/stats` | `data.totalAmount` | No | Yes |
| KPI: Paid amount | `paidAmount` | `/api/v1/manager/expenses/stats` | `data.paidAmount` | No | Yes |
| KPI: Pending amount | `pendingAmount` | `/api/v1/manager/expenses/stats` | `data.pendingAmount` | No | Yes |
| KPI: This month | `thisMonthAmount` | `/api/v1/manager/expenses/stats` | `data.thisMonthAmount` | No | Yes |
| Table: Expense ID | `id` | `/api/v1/manager/expenses` | `data.expenses[].id` | No | Yes |
| Table: Title | `title` | `/api/v1/manager/expenses` | `data.expenses[].title` | No | Yes |
| Table: Category | `category` | `/api/v1/manager/expenses` | `data.expenses[].category` | No | Yes |
| Table: Amount | `amount` | `/api/v1/manager/expenses` | `data.expenses[].amount` | No | Yes |
| Table: Date | `date` | `/api/v1/manager/expenses` | `data.expenses[].date` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/expenses` | `data.expenses[].status` | No | Yes |
| Table: Payment mode | `paymentMode` | `/api/v1/manager/expenses` | `data.expenses[].paymentMode` | Yes | Yes |
| Table: Vendor | `vendorName` | `/api/v1/manager/expenses` | `data.expenses[].vendorName` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
- **Delete expense is destructive and must use double confirmation:** Delete expense is destructive and must use double confirmation.
- **Receipt/reference URLs are optional and must render a deliberate empty fallback:** Receipt/reference URLs are optional and must render a deliberate empty fallback.
- **Never infer a payment mode or status when the backend returned null/undefined:** Never infer a payment mode or status when the backend returned null/undefined.
- **Expense amounts must use formatCurrency, not raw numeric concatenation:** Expense amounts must use formatCurrency, not raw numeric concatenation.
- **Pagination totals must come from the server response after filters are applied:** Pagination totals must come from the server response after filters are applied.
- **Do not import expense constants or fixtures from Finance or another business module:** Do not import expense constants or fixtures from Finance or another business module.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `expenses/expenses_components/ManagerExpensesKPIs/ManagerExpensesKPIs.tsx` | Renders high-level KPIs for the Expenses module. |
| `expenses/expenses_components/ManagerExpensesMain/ManagerExpensesChart.tsx` | Renders the Manager ExpensesChart presentation layer for the Manager module. |
| `expenses/expenses_components/ManagerExpensesMain/ManagerExpensesMain.tsx` | Main container for the Expenses module. Owns the ExpensesProvider and assembles Header, Toolbar, KPIs, Table, and Modal. |
| `expenses/expenses_components/ManagerExpensesModal/ManagerExpensesModal.tsx` | Renders the modal form for creating or editing an expense. |
| `expenses/expenses_components/ManagerExpensesTable/ManagerExpensesTable.tsx` | Renders the primary tabular list of expenses with actions and pagination. |
| `expenses/expenses_components/ManagerExpensesToolbar/ManagerExpensesToolbar.tsx` | Renders the action bar for Expenses: Search, Filters, and "Add Expense" button. |
| `expenses/expenses_context/ManagerExpensesContext.tsx` | Provides local UI state (filtering, pagination, modal visibility) for the Expenses module. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

# Manager Expenses — Feature Map

## Module Purpose
Manager Expenses is the branch expense register and reporting view. Managers can browse, search and filter expense records, inspect expense statistics, create and update expenses, and delete an expense through the protected confirmation workflow. The module owns its expense DTOs, schemas, fixtures, and handlers. Expense records are server state and must never be embedded as UI constants.

Module root: `frontend_manager/manager_expenses/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-apexcharts`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | query |
| Read | Exposed | ManagerExpensesApi: fetchExpenses, fetchExpenseById, fetchExpenseStats. |
| Update | Exposed | ManagerExpensesApi |
| Delete | Exposed | ManagerExpensesApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_expenses_api/` | Owns feature API clients and request/response transport contracts. | `ManagerExpensesApi.ts` |
| `manager_expenses_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_expenses_components/manager_expenses_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesKPIs.tsx` |
| `manager_expenses_components/manager_expenses_main/` | Owns the named feature-specific responsibility implied by this folder. | ManagerExpensesMain.tsx |
| `manager_expenses_components/manager_expenses_main/manager_expenses_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesContent.tsx` |
| `manager_expenses_components/manager_expenses_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesModal.tsx` |
| `manager_expenses_components/manager_expenses_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesEmptyState.tsx`, `ManagerExpensesTable.tsx` |
| `manager_expenses_components/manager_expenses_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesToolbar.tsx` |
| `manager_expenses_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerExpensesChartConstants.ts`, `ManagerExpensesConstants.ts`, `ManagerExpensesQueryKeys.ts`, `ManagerExpensesSharedConstants.test.ts`, `ManagerExpensesSharedConstants.ts` |
| `manager_expenses_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerExpensesForm.test.ts`, `useManagerExpensesForm.ts`, `useManagerExpensesLogic.test.ts`, `useManagerExpensesLogic.ts`, `useManagerExpensesMutations.test.ts`, `useManagerExpensesMutations.ts`, `useManagerExpensesQueries.test.ts`, `useManagerExpensesQueries.ts` |
| `manager_expenses_locales/` | Owns module English and Hindi translation catalogs. | `manager_expenses_en.json`, `manager_expenses_hi.json` |
| `manager_expenses_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_expenses_mocks/manager_expenses_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesMockData.ts` |
| `manager_expenses_mocks/manager_expenses_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerExpensesMockHandlers.ts` |
| `manager_expenses_schemas/` | Owns feature Zod validation and response schemas. | `ManagerExpensesFormSchema.ts`, `ManagerExpensesSchema.ts` |
| `manager_expenses_store/` | Owns module-scoped Zustand UI state only. | `useManagerExpensesUiStore.test.ts`, `useManagerExpensesUiStore.ts` |
| `manager_expenses_tests/` | Owns module behavior and utility tests. | `ManagerExpensesBehavior.test.tsx` |
| `manager_expenses_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerExpensesFormTypes.ts`, `ManagerExpensesTypes.ts` |
| `manager_expenses_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerExpensesFormatters.test.ts`, `ManagerExpensesFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_expenses_features.md`
- `manager_expenses_forbidden.md`
- `manager_expenses_theme_contract.md`
- `manager_expenses_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_empty_state/ManagerEmptyState`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerMoney`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

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

## Component Tree

- Route: `manager_expenses/page.tsx`
  - `<ManagerExpensesMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_expenses_store/useManagerExpensesUiStore.ts`, `manager_expenses_store/useManagerExpensesUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/` and `manager_expenses/manager_expenses_mocks/manager_expenses_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

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
**Forbidden-pattern contract:** See `manager_expenses_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Delete expense is destructive and must use double confirmation:** Delete expense is destructive and must use double confirmation.
- **Receipt/reference URLs are optional and must render a deliberate empty fallback:** Receipt/reference URLs are optional and must render a deliberate empty fallback.
- **Never infer a payment mode or status when the backend returned null/undefined:** Never infer a payment mode or status when the backend returned null/undefined.
- **Expense amounts must use formatCurrencyFromMinorUnitsFromMinorUnits, not raw numeric concatenation:** Expense amounts must use formatCurrencyFromMinorUnitsFromMinorUnits, not raw numeric concatenation.
- **Pagination totals must come from the server response after filters are applied:** Pagination totals must come from the server response after filters are applied.
- **Do not import expense constants or fixtures from Finance or another business module:** Do not import expense constants or fixtures from Finance or another business module.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_expenses/manager_expenses_components/manager_expenses_kpis/ManagerExpensesKPIs.tsx` | Renders high-level KPIs for the Expenses module. |
| `manager_expenses/manager_expenses_components/manager_expenses_chart/ManagerExpensesChart.tsx` | Renders the Expenses Chart section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_expenses/manager_expenses_components/manager_expenses_main/ManagerExpensesMain.tsx` | Framework entry component for the Expenses module; delegates feature behavior and UI composition to `ManagerExpensesContent`. |
| `manager_expenses/manager_expenses_components/manager_expenses_modal/ManagerExpensesModal.tsx` | Renders the modal form for creating or editing an expense. |
| `manager_expenses/manager_expenses_components/manager_expenses_table/ManagerExpensesTable.tsx` | Renders the primary tabular list of expenses with actions and pagination. |
| `manager_expenses/manager_expenses_components/manager_expenses_toolbar/ManagerExpensesToolbar.tsx` | Renders the action bar for Expenses: Search, Filters, and "Add Expense" button. |
| `manager_expenses/manager_expenses_hooks/useManagerExpensesLogic.ts` | Provides local UI state (filtering, pagination, modal visibility) for the Expenses module. |
| `manager_expenses_components/manager_expenses_main/manager_expenses_content/ManagerExpensesContent.tsx` | Composes the Expenses Content content sections while keeping data/state orchestration outside the view layer. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_EXPENSES`
- Active locales: `en`, `hi`
- English catalog: `manager_expenses/manager_expenses_locales/manager_expenses_en.json`
- Hindi catalog: `manager_expenses/manager_expenses_locales/manager_expenses_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerExpensesMain.tsx`
- Primary query-key registry: `ManagerExpensesQueryKeys.ts`
- Primary module constants registry: `ManagerExpensesConstants.ts`
- Canonical schema file: `ManagerExpensesSchema.ts` in `manager_expenses_schemas/`
- Module theme contract: `manager_expenses_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_expenses_components/manager_expenses_main/ManagerExpensesMain.tsx` | YES |
| API client | `ManagerExpensesApi.ts` | YES |
| Schema file | `ManagerExpensesSchema.ts` | YES |
| Query-key registry | `ManagerExpensesQueryKeys.ts` | YES |
| Constants registry | `ManagerExpensesConstants.ts` | YES |
| URL config | `manager_expenses_url_config.ts` | YES |
| Behavior test | `ManagerExpensesBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_expenses_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_expenses/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_expenses/manager_expenses_mocks/manager_expenses_mocks_fixtures/` and `manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.

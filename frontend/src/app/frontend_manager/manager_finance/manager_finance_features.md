# Manager Finance — Feature Map

## Module Purpose
Manager Finance is the branch payment and revenue workspace. Managers can review payment transactions, filter by member/date, inspect financial summary KPIs and revenue trends, record payments, and export payment reports. Financial data is server state and destructive/financial mutations must never use unsafe optimistic updates. The module owns payment-specific contracts, fixtures, handlers, and UI state.

Module root: `frontend_manager/manager_finance/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
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
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | payload |
| Read | Exposed | ManagerFinanceApi: fetchPayments, fetchPaymentsByMember, fetchFinanceSummary. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_finance_api/` | Owns feature API clients and request/response transport contracts. | `ManagerFinanceApi.ts` |
| `manager_finance_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_finance_components/manager_finance_date_filter_dropdown/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceDateFilterDropdown.tsx` |
| `manager_finance_components/manager_finance_main/` | Owns the named feature-specific responsibility implied by this folder. | ManagerFinanceMain.tsx |
| `manager_finance_components/manager_finance_main/manager_finance_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceContent.tsx` |
| `manager_finance_components/manager_finance_main/manager_finance_kpi_card/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceKpiCard.tsx` |
| `manager_finance_components/manager_finance_main/manager_finance_method_breakdown/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceMethodBreakdown.tsx` |
| `manager_finance_components/manager_finance_main/manager_finance_revenue_expense_chart/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceRevenueExpenseChart.tsx` |
| `manager_finance_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerFinanceConstants.ts`, `ManagerFinanceDateFilterConstants.test.ts`, `ManagerFinanceDateFilterConstants.ts`, `ManagerFinanceQueryKeys.ts`, `ManagerFinanceSharedConstants.test.ts`, `ManagerFinanceSharedConstants.ts` |
| `manager_finance_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerFinanceLogic.test.ts`, `useManagerFinanceLogic.ts`, `useManagerFinanceQueries.test.ts`, `useManagerFinanceQueries.ts` |
| `manager_finance_locales/` | Owns module English and Hindi translation catalogs. | `manager_finance_en.json`, `manager_finance_hi.json` |
| `manager_finance_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_finance_mocks/manager_finance_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceMockData.ts` |
| `manager_finance_mocks/manager_finance_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerFinanceMockHandlers.ts` |
| `manager_finance_schemas/` | Owns feature Zod validation and response schemas. | `ManagerFinanceSchema.ts` |
| `manager_finance_store/` | Owns module-scoped Zustand UI state only. | `useManagerFinanceUiStore.test.ts`, `useManagerFinanceUiStore.ts` |
| `manager_finance_tests/` | Owns module behavior and utility tests. | `ManagerFinanceBehavior.test.tsx` |
| `manager_finance_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerFinanceTypes.ts`, `ManagerFinanceViewModelTypes.ts` |
| `manager_finance_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerFinanceFormatters.test.ts`, `ManagerFinanceFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_finance_features.md`
- `manager_finance_forbidden.md`
- `manager_finance_theme_contract.md`
- `manager_finance_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerMoney`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@tanstack`
- `@testing-library/react`
- `@testing-library/user-event`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchPayments | `/manager/finance` | Uses the fetchPayments workflow with typed request/response handling. | `GET /manager/finance/payments` | ✅ Implemented |
| createPayment | `/manager/finance` | Uses the createPayment workflow with typed request/response handling. | `POST /manager/finance/payments` | ✅ Implemented |
| fetchPaymentsByMember | `/manager/finance` | Uses the fetchPaymentsByMember workflow with typed request/response handling. | `GET /manager/finance/payments/member/:memberId` | ✅ Implemented |
| fetchFinanceSummary | `/manager/finance` | Uses the fetchFinanceSummary workflow with typed request/response handling. | `GET /manager/finance/summary` | ✅ Implemented |
| exportPaymentsReport | `/manager/finance` | Uses the exportPaymentsReport workflow with typed request/response handling. | `GET /manager/finance/export?format=csv|pdf` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Record payment
1. Manager opens the payment modal from the finance workspace.
2. RHF + Zod validates the amount, member and payment method.
3. createPayment() submits the financial mutation.
4. On success the authoritative payment response is reconciled into TanStack Query and the backend message is displayed.
### Flow 2: Export payments
1. Manager selects CSV or PDF.
2. exportPaymentsReport(format) calls the dedicated module export endpoint.
3. The response provides the report URL/file contract; the UI does not fabricate an export payload.

## Component Tree

- Route: `manager_finance/page.tsx`
  - `<ManagerFinanceMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_finance_store/useManagerFinanceUiStore.ts`, `manager_finance_store/useManagerFinanceUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'finance', 'payments']`; `['manager', 'finance', 'summary']`; `['manager', 'finance', 'payments', params]`; `['manager', 'finance', 'summary', range]`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/` and `manager_finance/manager_finance_mocks/manager_finance_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPayments` | `GET` | `/api/v1/manager/finance/payments` | `{ page?, limit?, search?, startDate?, endDate? }` | `{ payments: Payment[]; total: number }` |
| `createPayment` | `POST` | `/api/v1/manager/finance/payments` | `Partial<Payment>` | `Payment` |
| `fetchPaymentsByMember` | `GET` | `/api/v1/manager/finance/payments/member/:memberId` | `{ memberId: string }` | `Payment[]` |
| `fetchFinanceSummary` | `GET` | `/api/v1/manager/finance/summary` | `{ startDate?, endDate? }` | `FinanceSummary` |
| `exportPaymentsReport` | `GET` | `/api/v1/manager/finance/export?format=csv|pdf` | `{ format: csv | pdf }` | `{ url: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total revenue | `totalRevenue` | `/api/v1/manager/finance/summary` | `data.totalRevenue` | No | Yes |
| KPI: Monthly revenue | `monthlyRevenue` | `/api/v1/manager/finance/summary` | `data.monthlyRevenue` | No | Yes |
| KPI: Pending amount | `pendingAmount` | `/api/v1/manager/finance/summary` | `data.pendingAmount` | No | Yes |
| KPI: GST collected | `gstCollected` | `/api/v1/manager/finance/summary` | `data.gstCollected` | No | Yes |
| Chart: Monthly revenue | `monthlyData[].revenue` | `/api/v1/manager/finance/summary` | `data.monthlyData[].revenue` | No | Yes |
| Table: Invoice number | `invoiceNumber` | `/api/v1/manager/finance/payments` | `data.payments[].invoiceNumber` | No | Yes |
| Table: Member name | `member.name` | `/api/v1/manager/finance/payments` | `data.payments[].member.name` | Yes | Yes |
| Table: Member email | `member.email` | `/api/v1/manager/finance/payments` | `data.payments[].member.email` | Yes | Yes |
| Table: Plan | `member.plan.name` | `/api/v1/manager/finance/payments` | `data.payments[].member.plan.name` | Yes | Yes |
| Table: Amount | `amount` | `/api/v1/manager/finance/payments` | `data.payments[].amount` | No | Yes |
| Table: Method | `method` | `/api/v1/manager/finance/payments` | `data.payments[].method` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/finance/payments` | `data.payments[].status` | No | Yes |
| Table: Paid at | `paidAt` | `/api/v1/manager/finance/payments` | `data.payments[].paidAt` | No | Yes |

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
**Forbidden-pattern contract:** See `manager_finance_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Financial mutations must not use optimistic updates:** Financial mutations must not use optimistic updates.
- **Payment amounts, GST, discounts, and refunds must use centralized currency formatting:** Payment amounts, GST, discounts, and refunds must use centralized currency formatting.
- **Export must not use the current paginated rows as the report source:** Export must not use the current paginated rows as the report source.
- **Sensitive member contact data should remain masked in list views:** Sensitive member contact data should remain masked in list views.
- **A payment mutation must reconcile the authoritative response instead of retaining the submitted DTO as server state:** A payment mutation must reconcile the authoritative response instead of retaining the submitted DTO as server state.
- **Financial failure messages must remain available to the module and must not be swallowed by a global interceptor:** Financial failure messages must remain available to the module and must not be swallowed by a global interceptor.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_finance/manager_finance_components/manager_finance_filters/ManagerFinanceFilters.tsx` | Renders the Finance Filters section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_finance/manager_finance_components/manager_finance_kpi_cards/ManagerFinanceKpiCards.tsx` | Renders the Finance KPI Cards section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_finance/manager_finance_components/manager_finance_main/ManagerFinanceMain.tsx` | Framework entry component for the Finance module; delegates feature behavior and UI composition to `ManagerFinanceContent`. |
| `manager_finance/manager_finance_components/manager_finance_revenue_chart/ManagerFinanceRevenueChart.tsx` | Renders the Finance Revenue Chart section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_finance/manager_finance_components/manager_finance_table/ManagerFinanceTable.tsx` | Renders the Finance Table section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_finance/manager_finance_hooks/useManagerFinanceLogic.ts` | module-local state/query layer — bridges TanStack Query with UI state (filters, tab, pagination). |
| `manager_finance_components/manager_finance_date_filter_dropdown/ManagerFinanceDateFilterDropdown.tsx` | Renders the Finance Date Filter Dropdown controls and delegates query/filter/navigation state to the owning module logic. |
| `manager_finance_components/manager_finance_main/manager_finance_content/ManagerFinanceContent.tsx` | Composes the Finance Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_finance_components/manager_finance_empty_state/ManagerFinanceEmptyState.tsx` | Renders the Finance contextual empty state and the documented permitted recovery or create action. |
| `manager_finance_components/manager_finance_main/manager_finance_kpi_card/ManagerFinanceKpiCard.tsx` | Renders the Finance Kpi Card KPI/statistic presentation using module-owned data and locale-aware formatting. |
| `manager_finance_components/manager_finance_main/manager_finance_method_breakdown/ManagerFinanceMethodBreakdown.tsx` | Renders the Finance Method Breakdown module UI responsibility while delegating business data and state ownership to adjacent module logic. |
| `manager_finance_components/manager_finance_main/manager_finance_revenue_expense_chart/ManagerFinanceRevenueExpenseChart.tsx` | Renders the Finance Revenue Expense Chart visualization using module-owned data and semantic chart tokens. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_FINANCE`
- Active locales: `en`, `hi`
- English catalog: `manager_finance/manager_finance_locales/manager_finance_en.json`
- Hindi catalog: `manager_finance/manager_finance_locales/manager_finance_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerFinanceMain.tsx`
- Primary query-key registry: `ManagerFinanceQueryKeys.ts`
- Primary module constants registry: `ManagerFinanceConstants.ts`
- Canonical schema file: `ManagerFinanceSchema.ts` in `manager_finance_schemas/`
- Module theme contract: `manager_finance_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_finance_components/manager_finance_main/ManagerFinanceMain.tsx` | YES |
| API client | `ManagerFinanceApi.ts` | YES |
| Schema file | `ManagerFinanceSchema.ts` | YES |
| Query-key registry | `ManagerFinanceQueryKeys.ts` | YES |
| Constants registry | `ManagerFinanceConstants.ts` | YES |
| URL config | `manager_finance_url_config.ts` | YES |
| Behavior test | `ManagerFinanceBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_finance_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_finance/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_finance/manager_finance_mocks/manager_finance_mocks_fixtures/` and `manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/`.
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

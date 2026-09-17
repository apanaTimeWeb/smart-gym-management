# Manager Finance — Feature Map

## Module Purpose
Manager Finance is the branch payment and revenue workspace. Managers can review payment transactions, filter by member/date, inspect financial summary KPIs and revenue trends, record payments, and export payment reports. Financial data is server state and destructive/financial mutations must never use unsafe optimistic updates. The module owns payment-specific contracts, fixtures, handlers, and UI state.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `finance_api/` | Feature-owned responsibility for the finance module. | `ManagerFinanceApi.ts; ManagerUseManagerFinanceQueries.ts` |
| `finance_components/` | Feature-owned responsibility for the finance module. | `—` |
| `finance_context/` | Feature-owned responsibility for the finance module. | `ManagerFinanceContext.tsx` |
| `finance_fixtures/` | Feature-owned responsibility for the finance module. | `ManagerFinanceMockData.ts` |
| `finance_mocks/` | Feature-owned responsibility for the finance module. | `—` |
| `finance_types/` | Feature-owned responsibility for the finance module. | `ManagerFinanceSchema.ts; ManagerFinanceTypes.ts` |
| `finance_utils/` | Feature-owned responsibility for the finance module. | `ManagerFinanceSharedConstants.ts` |

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

## Data and State Architecture
TanStack Query owns finance server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
- **Financial mutations must not use optimistic updates:** Financial mutations must not use optimistic updates.
- **Payment amounts, GST, discounts, and refunds must use centralized currency formatting:** Payment amounts, GST, discounts, and refunds must use centralized currency formatting.
- **Export must not use the current paginated rows as the report source:** Export must not use the current paginated rows as the report source.
- **Sensitive member contact data should remain masked in list views:** Sensitive member contact data should remain masked in list views.
- **A payment mutation must reconcile the authoritative response instead of retaining the submitted DTO as server state:** A payment mutation must reconcile the authoritative response instead of retaining the submitted DTO as server state.
- **Financial failure messages must remain available to the module and must not be swallowed by a global interceptor:** Financial failure messages must remain available to the module and must not be swallowed by a global interceptor.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `finance/finance_components/ManagerFinanceMain/ManagerFinanceFilters.tsx` | Renders the Manager FinanceFilters presentation layer for the Manager module. |
| `finance/finance_components/ManagerFinanceMain/ManagerFinanceKpiCards.tsx` | Renders the Manager FinanceKpiCards presentation layer for the Manager module. |
| `finance/finance_components/ManagerFinanceMain/ManagerFinanceMain.tsx` | Orchestrator for the Finance module — KPIs, tabbed Payments table + Summary chart. |
| `finance/finance_components/ManagerFinanceMain/ManagerFinanceRevenueChart.tsx` | Renders the Manager FinanceRevenueChart presentation layer for the Manager module. |
| `finance/finance_components/ManagerFinanceMain/ManagerFinanceTable.tsx` | Renders the Manager FinanceTable presentation layer for the Manager module. |
| `finance/finance_context/ManagerFinanceContext.tsx` | React Context — bridges TanStack Query with UI state (filters, tab, pagination). |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

# Manager Sales — Feature Map

## Module Purpose
Manager Sales is the membership-sales and collections reporting workspace. Managers can inspect sales overview revenue trends, membership reports, pending payments, and all memberships, with server-side search/date/page controls where applicable. Sales records are server data owned by this module. Financial values must use centralized formatters and critical collection actions must be guarded.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `sales_api/` | Feature-owned responsibility for the sales module. | `ManagerSalesApi.ts; ManagerSalesServerApi.ts; ManagerUseManagerSalesQueries.ts` |
| `sales_components/` | Feature-owned responsibility for the sales module. | `—` |
| `sales_context/` | Feature-owned responsibility for the sales module. | `ManagerSalesContext.tsx; ManagerUseManagerSalesLogic.ts` |
| `sales_fixtures/` | Feature-owned responsibility for the sales module. | `ManagerSalesMockData.ts` |
| `sales_mocks/` | Feature-owned responsibility for the sales module. | `—` |
| `sales_types/` | Feature-owned responsibility for the sales module. | `ManagerSalesMemberSnapshot.ts; ManagerSalesSchema.ts; ManagerSalesTypes.ts` |
| `sales_utils/` | Feature-owned responsibility for the sales module. | `ManagerSalesSharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchSalesOverview | `/manager/sales` | Uses the fetchSalesOverview workflow with typed request/response handling. | `GET /manager/sales/overview` | ✅ Implemented |
| fetchMembershipReport | `/manager/sales` | Uses the fetchMembershipReport workflow with typed request/response handling. | `GET /manager/sales/membership-report` | ✅ Implemented |
| fetchPendingPayments | `/manager/sales` | Uses the fetchPendingPayments workflow with typed request/response handling. | `GET /manager/sales/pending-payments` | ✅ Implemented |
| fetchAllMemberships | `/manager/sales` | Uses the fetchAllMemberships workflow with typed request/response handling. | `GET /manager/sales/all-memberships` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Review sales
1. Manager selects a sales tab and date/search/page filters.
2. The sales logic propagates those parameters to the corresponding API request.
3. MSW returns filtered/paginated fixture data and totals.
4. The selected tab renders only its response contract.

## Data and State Architecture
TanStack Query owns sales server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchSalesOverview` | `GET` | `/api/v1/manager/sales/overview` | `{ startDate?, endDate? }` | `{ monthlyRevenue: OverviewDataPoint[] }` |
| `fetchMembershipReport` | `GET` | `/api/v1/manager/sales/membership-report` | `{ startDate?, endDate?, page?, limit? }` | `{ report: MembershipReportItem[]; totals: MembershipTotals }` |
| `fetchPendingPayments` | `GET` | `/api/v1/manager/sales/pending-payments` | `{ page?, limit?, search? }` | `{ members: PendingPaymentMember[]; total: number }` |
| `fetchAllMemberships` | `GET` | `/api/v1/manager/sales/all-memberships` | `{ page?, limit?, search? }` | `{ members: SalesMemberSnapshot[]; total: number }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Overview: Month | `month` | `/api/v1/manager/sales/overview` | `data.monthlyRevenue[].month` | No | Yes |
| Overview: Revenue | `revenue` | `/api/v1/manager/sales/overview` | `data.monthlyRevenue[].revenue` | No | Yes |
| Membership report: Plan | `plan` | `/api/v1/manager/sales/membership-report` | `data.report[].plan` | Yes | Yes |
| Membership report: Revenue | `revenue` | `/api/v1/manager/sales/membership-report` | `data.report[].revenue` | Yes | Yes |
| Membership report: Remaining | `remaining` | `/api/v1/manager/sales/membership-report` | `data.report[].remaining` | Yes | Yes |
| Membership report: Refund | `refund` | `/api/v1/manager/sales/membership-report` | `data.report[].refund` | Yes | Yes |
| Pending: Member name | `name` | `/api/v1/manager/sales/pending-payments` | `data.members[].name` | No | Yes |
| Pending: Pending amount | `pendingAmount` | `/api/v1/manager/sales/pending-payments` | `data.members[].pendingAmount` | No | Yes |
| Pending: Expiry date | `expiryDate` | `/api/v1/manager/sales/pending-payments` | `data.members[].expiryDate` | No | Yes |
| All memberships: Name | `name` | `/api/v1/manager/sales/all-memberships` | `data.members[].name` | No | Yes |
| All memberships: Phone | `phone` | `/api/v1/manager/sales/all-memberships` | `data.members[].phone` | No | Yes |
| All memberships: Plan | `plan` | `/api/v1/manager/sales/all-memberships` | `data.members[].plan` | No | Yes |
| All memberships: Pending amount | `pendingAmount` | `/api/v1/manager/sales/all-memberships` | `data.members[].pendingAmount` | No | Yes |
| All memberships: Status | `status` | `/api/v1/manager/sales/all-memberships` | `data.members[].status` | No | Yes |

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
- **Do not perform pagination with array slicing after the server has paginated the dataset:** Do not perform pagination with array slicing after the server has paginated the dataset.
- **Sales and payment amounts must use centralized currency formatting:** Sales and payment amounts must use centralized currency formatting.
- **Pending payment numbers are financial and should not use optimistic destructive updates:** Pending payment numbers are financial and should not use optimistic destructive updates.
- **Sensitive phone data must be masked where the list contract requires it:** Sensitive phone data must be masked where the list contract requires it.
- **The selected sales tab must determine which endpoint/data source is rendered:** The selected sales tab must determine which endpoint/data source is rendered.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `sales/sales_components/ManagerSalesAllMemberships/ManagerSalesAllMemberships.tsx` | Renders the paginated table of all gym memberships with status filter tabs. Receives data via ManagerSalesContext. No API calls. |
| `sales/sales_components/ManagerSalesEmptyState/ManagerSalesEmptyState.tsx` | Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls. |
| `sales/sales_components/ManagerSalesMain/ManagerSalesMain.tsx` | Provides the implementation for ManagerSalesMain.tsx functionality within its module. |
| `sales/sales_components/ManagerSalesMembershipReport/ManagerSalesMembershipReport.tsx` | Provides the implementation for ManagerSalesMembershipReport.tsx functionality within its module. |
| `sales/sales_components/ManagerSalesOverview/ManagerSalesOverview.tsx` | Renders the Manager SalesOverview presentation layer for the Manager module. |
| `sales/sales_components/ManagerSalesPendingPayments/ManagerSalesPendingPayments.tsx` | Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via ManagerSalesContext. |
| `sales/sales_components/ManagerSalesTabs/ManagerSalesTabs.tsx` | Provides the implementation for ManagerSalesTabs.tsx functionality within its module. |
| `sales/sales_components/ManagerSalesToolbar/ManagerSalesToolbar.tsx` | Provides the implementation for ManagerSalesToolbar.tsx functionality within its module. |
| `sales/sales_context/ManagerSalesContext.tsx` | Provides sales module state (revenue data, membership reports, pending payments) to all Sales components via React Context. Sync UI state only — async data must migrate to Zustand (see ManagerUseManagerSalesLogic.ts). |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

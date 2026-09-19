# Admin Sales — Feature Map

## Module Purpose
The Admin Sales module provides branch-scoped and date-range-scoped membership sales visibility for the Admin role. It is read-only with respect to sales records: the module does not create, update, or delete sales transactions. It exposes overview analytics, referral-source revenue, membership receivables, pending-payment reminders, all-membership browsing, and the existing store-sales read surface.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server route entry; renders `AdminSalesMain`. |
| `loading.tsx` | Structural loading shell for Sales analytics. |
| `error.tsx` | Route-segment error boundary and retry surface. |
| `sales_components/` | Sales UI sections, tabs, tables, toolbar, charts and empty states. |
| `sales_context/useAdminSalesLogic.ts` | URL state + TanStack Query orchestration. |
| `sales_store/useAdminSalesStore.ts` | Module UI state only. |
| `sales_api/AdminSalesApi.ts` | Browser API client with Zod response validation. |
| `sales_api/AdminSalesServerApi.ts` | Server-side prefetch client used by the route entry where SSR prefetch is enabled. |
| `sales_types/` | Domain/API/UI types and Zod schemas. |
| `sales_utils/` | Static UI configuration and sales-specific transforms. |
| `sales_mocks/` | Module-owned fixtures and MSW handlers. |
| `admin_sales_url_config.ts` | Centralized Sales page/API/external navigation URLs. |

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Sales Overview | `/admin/sales` | Review revenue/new-member trend data | `GET /admin/sales/overview` | Live/mock-supported |
| Referral Revenue | `/admin/sales` | Review revenue by referral source | `GET /admin/sales/referral-sources` | Live/mock-supported |
| Membership Report | `/admin/sales` | Search, sort, paginate, and review receivable/received/remaining values | `GET /admin/sales/membership-report` | Live/mock-supported |
| Pending Payments | `/admin/sales` | Review overdue members and open a prefilled WhatsApp reminder | `GET /admin/sales/pending-payments` | Live/mock-supported |
| All Memberships | `/admin/sales` | Filter active/expiring/expired memberships and paginate results | `GET /admin/sales/all-memberships` | Live/mock-supported |
| Store Sales | `/admin/sales` | Review the existing read-only store-sales surface | Module-owned query/fixture contract | Existing surface |
| Overview Export | `/admin/sales` | Download the currently loaded overview rows as CSV | Current client-side demo/export path | Live frontend demo |

## Data and State Architecture
- **Server state:** TanStack Query is the sole server-state owner in `useAdminSalesLogic`.
- **URL state:** `tab`, `range`, `search`, and `page` are synchronized to the Sales route URL.
- **Zustand:** `useAdminSalesStore` is UI-only and does not own API response data.
- **Local-storage keys:** None.
- **Module-owned MSW:** `sales_mocks/handlers/AdminSalesMockHandlers.ts` with `sales_mocks/fixtures/AdminSalesMockFixtures.ts`.
- **External infrastructure:** `@/lib/api`, `@/lib/formatters`, `@/lib/whatsapp_formatter`, shared Admin pagination/feedback primitives, and the global Admin branch-selection shell state.
- **Business feature dependencies:** None.
- **Role-level business dependencies:** None beyond the documented Admin shell branch-selection infrastructure.

## Query Keys
- `['admin', 'sales', 'overview', range, selectedBranchId]`
- `['admin', 'sales', 'referrals', range, selectedBranchId]`
- `['admin', 'sales', 'membership-report', queryParams, range, selectedBranchId]`
- `['admin', 'sales', 'pending-payments', queryParams, range, selectedBranchId]`
- `['admin', 'sales', 'all-memberships', queryParams, range, selectedBranchId]`

## User Flows
### Flow 1: Filter Sales Analytics
1. Admin opens `/admin/sales`.
2. `AdminSalesToolbar` updates the URL `range` and `search` state.
3. `useAdminSalesLogic` derives the request parameters from URL state and selected branch.
4. TanStack Query requests the affected Sales endpoints.
5. Module-owned MSW applies the same branch/range/search inputs and returns changed results.
6. UI re-renders with the new dataset.

### Flow 2: Review Membership Report
1. Admin opens the Membership Report tab.
2. Search is debounced before the request is updated.
3. `fetchMembershipReport()` receives branch/range/search parameters.
4. MSW filters the module-owned membership-report fixture.
5. Sorting and pagination remain visible and deterministic in the rendered table.
6. Empty results render `AdminSalesEmptyState`.

### Flow 3: Remind a Pending-Payment Member
1. Admin opens Pending Payments.
2. The member list is returned by the Sales API/mock.
3. Admin clicks `Open Reminder in WhatsApp`.
4. The module formats the reminder and opens the centralized WhatsApp URL from `SalesUrlConfig.EXTERNAL.WHATSAPP_WEB`.
5. The UI does not claim that a message was sent by the application.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchOverview(branchId, range)` | GET | `/admin/sales/overview` | `branchId`, `range` query | `{ monthlyRevenue: OverviewDataPoint[] }` |
| `fetchReferralSources(branchId, range)` | GET | `/admin/sales/referral-sources` | `branchId`, `range` query | `ReferralDataPoint[]` |
| `fetchMembershipReport(branchId, range, search?)` | GET | `/admin/sales/membership-report` | `branchId`, `range`, optional `search` | `{ report: MembershipReportItem[]; totals: MembershipTotals }` |
| `fetchPendingPayments(params)` | GET | `/admin/sales/pending-payments` | `page`, `limit`, `search`, `branchId`, `range` | `{ members: PendingPaymentMember[]; total: number }` |
| `fetchAllMemberships(params)` | GET | `/admin/sales/all-memberships` | `page`, `limit`, `search`, `branchId`, `range` | `{ members: Member[]; total: number }` |

All browser API responses use the canonical `ApiResponse<T>` transport contract and module Zod schemas.

## UI Data Requirements
- Overview chart: `monthlyRevenue[].date`, `monthlyRevenue[].revenue`, `monthlyRevenue[].newMembers`.
- Referral section: `source`, `revenue`.
- Membership report: `plan`/documented display field, `receivable`, `received`, `remaining`, `refund` where provided by the current UI schema; totals use `activeCount`, `revenue`, `totalReceivable`, `totalReceived`, `remaining`, `refunds`.
- Pending payments: `id`, `name`, `phone`, `plan`, `pendingAmount`, `daysOverdue`.
- All memberships: `id`, `name`, `plan.name`, `planId`, `joinDate`, `expiryDate`, `status`, `paidAmount`.

## Permissions and Security
- Required role: `ADMIN`.
- This module does not perform server authorization itself; backend authorization remains authoritative.
- Pending-payment reminders open an external URL and must not claim successful delivery.
- No credentials, tokens, or sensitive secrets are persisted in browser storage.
- Cross-feature business dependencies: None.

## Loading, Empty, and Error States
- Route: `loading.tsx` and `error.tsx`.
- Membership report empty: `AdminSalesEmptyState`.
- Pending-payment empty: `AdminSalesEmptyState`.
- All-memberships empty: `AdminSalesEmptyState`.
- API failures: section-specific error UI or route-level boundary according to query/error configuration.

## Edge Cases and AI Warnings
- **Do not reintroduce fake reminder success:** Opening WhatsApp is not the same as sending a message through the backend.
- **Do not remove URL state:** `range`, `search`, `tab`, and `page` are shareable Sales state.
- **Do not create sibling business dependencies:** Sales must not import Members, Finance, HR, Plans, or other business module implementations.
- **Do not silently revert branch/range propagation:** those values are part of the Sales query contract and must change the mocked response.
- **Do not use a minimal membership-report fixture:** enough variation must remain available to exercise search, sorting, empty results, and pagination where applicable.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `AdminSalesMain.tsx` | Root view orchestrator for the Sales tabs and toolbar. |
| `AdminSalesToolbar.tsx` | URL-backed date/search controls and overview CSV export action. |
| `AdminSalesTabs.tsx` | Tab navigation using URL state. |
| `AdminSalesOverview.tsx` | Overview KPI/chart presentation. |
| `AdminSalesMembershipReport.tsx` | Search-aware, sortable membership-receivable table and pagination. |
| `AdminSalesPendingPayments.tsx` | Pending-payment list and WhatsApp reminder launch. |
| `AdminSalesAllMemberships.tsx` | Membership status KPI filters and paginated membership table. |
| `AdminSalesEmptyState` | Consistent Sales empty-state presentation. |

## Rule Compliance Checklist
- [x] Feature self-containment and dependency firewall
- [x] URL-backed Sales filter/search/page state
- [x] Branch and range parameters propagate into API/mock requests
- [x] Module-owned mock fixtures/handlers
- [x] No UI claim of successful external message delivery
- [x] Dedicated Sales empty state for empty list surfaces
- [x] API client uses Zod schemas
- [x] No cross-feature business imports
- [x] Module theme contract maintained
- [ ] Full browser/typecheck/lint/E2E execution — NOT VERIFIED without the consuming application package/configuration

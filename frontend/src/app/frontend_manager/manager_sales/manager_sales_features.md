# Manager Sales — Feature Map

## Module Purpose
Manager Sales is the membership-sales and collections reporting workspace. Managers can inspect sales overview revenue trends, membership reports, pending payments, and all memberships, with server-side search/date/page controls where applicable. Sales records are server data owned by this module. Financial values must use centralized formatters and critical collection actions must be guarded.

Module root: `frontend_manager/manager_sales/`

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
| Create | Not exposed | No module API client uses POST in the supplied snapshot. |
| Read | Exposed | ManagerSalesApi: fetchSalesOverview, fetchMembershipReport, fetchPendingPayments, fetchAllMemberships. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_sales_api/` | Owns feature API clients and request/response transport contracts. | `ManagerSalesApi.ts` |
| `manager_sales_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_sales_components/manager_sales_all_memberships/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesAllMemberships.tsx` |
| `manager_sales_components/manager_sales_date_filter_dropdown/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesDateFilterDropdown.tsx` |
| `manager_sales_components/manager_sales_empty_state/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesEmptyState.tsx` |
| `manager_sales_components/manager_sales_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesMain.tsx` |
| `manager_sales_components/manager_sales_main/manager_sales_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesContent.tsx` |
| `manager_sales_components/manager_sales_membership_report/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesMembershipReport.tsx`, `ManagerSalesMembershipReportEmptyState.tsx` |
| `manager_sales_components/manager_sales_overview/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesOverview.tsx` |
| `manager_sales_components/manager_sales_pending_payments/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesPendingPayments.tsx` |
| `manager_sales_components/manager_sales_tabs/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesTabs.tsx` |
| `manager_sales_components/manager_sales_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesToolbar.tsx` |
| `manager_sales_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerSalesConstants.ts`, `ManagerSalesDateFilterConstants.test.ts`, `ManagerSalesDateFilterConstants.ts`, `ManagerSalesFilterConstants.ts`, `ManagerSalesQueryKeys.ts`, `ManagerSalesSharedConstants.test.ts`, `ManagerSalesSharedConstants.ts`, `ManagerSalesTableConstants.ts` |
| `manager_sales_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerSalesLogic.test.ts`, `useManagerSalesLogic.ts`, `useManagerSalesQueries.test.ts`, `useManagerSalesQueries.ts` |
| `manager_sales_locales/` | Owns module English and Hindi translation catalogs. | `manager_sales_en.json`, `manager_sales_hi.json` |
| `manager_sales_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_sales_mocks/manager_sales_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesMockData.ts` |
| `manager_sales_mocks/manager_sales_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSalesMockHandlers.ts` |
| `manager_sales_schemas/` | Owns feature Zod validation and response schemas. | `ManagerSalesSchema.ts` |
| `manager_sales_store/` | Owns module-scoped Zustand UI state only. | `useManagerSalesUiStore.test.ts`, `useManagerSalesUiStore.ts` |
| `manager_sales_tests/` | Owns module behavior and utility tests. | `ManagerSalesBehavior.test.tsx` |
| `manager_sales_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerSalesEmptyStateTypes.ts`, `ManagerSalesMemberSnapshotTypes.ts`, `ManagerSalesTypes.ts` |
| `manager_sales_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerSalesFormatters.test.ts`, `ManagerSalesFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_sales_features.md`
- `manager_sales_forbidden.md`
- `manager_sales_theme_contract.md`
- `manager_sales_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`
- `@/lib/whatsapp_formatter`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@tanstack`
- `@testing-library/react`
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

## Component Tree

- Route: `manager_sales/page.tsx`
  - `<ManagerSalesMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_sales_store/useManagerSalesUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_sales/manager_sales_mocks/manager_sales_mocks_handlers/` and `manager_sales/manager_sales_mocks/manager_sales_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

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
**Forbidden-pattern contract:** See `manager_sales_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Do not perform pagination with array slicing after the server has paginated the dataset:** Do not perform pagination with array slicing after the server has paginated the dataset.
- **Sales and payment amounts must use centralized currency formatting:** Sales and payment amounts must use centralized currency formatting.
- **Pending payment numbers are financial and should not use optimistic destructive updates:** Pending payment numbers are financial and should not use optimistic destructive updates.
- **Sensitive phone data must be masked where the list contract requires it:** Sensitive phone data must be masked where the list contract requires it.
- **The selected sales tab must determine which endpoint/data source is rendered:** The selected sales tab must determine which endpoint/data source is rendered.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_sales/manager_sales_components/manager_sales_all_memberships/ManagerSalesAllMemberships.tsx` | Renders the paginated table of all gym memberships with status filter tabs. Receives data via useManagerSalesLogic. No API calls. |
| `manager_sales/manager_sales_components/manager_sales_empty_state/ManagerSalesEmptyState.tsx` | Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls. |
| `manager_sales/manager_sales_components/manager_sales_main/ManagerSalesMain.tsx` | Framework entry component for the Sales module; delegates feature behavior and UI composition to `ManagerSalesContent`. |
| `manager_sales/manager_sales_components/manager_sales_membership_report/ManagerSalesMembershipReport.tsx` | Provides the implementation for ManagerSalesMembershipReport.tsx functionality within its module. |
| `manager_sales/manager_sales_components/manager_sales_overview/ManagerSalesOverview.tsx` | Renders the Sales Overview section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_sales/manager_sales_components/manager_sales_pending_payments/ManagerSalesPendingPayments.tsx` | Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useManagerSalesLogic. |
| `manager_sales/manager_sales_components/manager_sales_tabs/ManagerSalesTabs.tsx` | Provides the implementation for ManagerSalesTabs.tsx functionality within its module. |
| `manager_sales/manager_sales_components/manager_sales_toolbar/ManagerSalesToolbar.tsx` | Provides the implementation for ManagerSalesToolbar.tsx functionality within its module. |
| `manager_sales/manager_sales_hooks/useManagerSalesLogic.ts` | Coordinates TanStack Query server data and module-local UI state for Sales components. Async/server data remains owned by TanStack Query and is never migrated into Zustand. |
| `manager_sales_components/manager_sales_date_filter_dropdown/ManagerSalesDateFilterDropdown.tsx` | Renders the Sales Date Filter Dropdown controls and delegates query/filter/navigation state to the owning module logic. |
| `manager_sales_components/manager_sales_main/manager_sales_content/ManagerSalesContent.tsx` | Composes the Sales Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_sales_components/manager_sales_membership_report/ManagerSalesMembershipReportEmptyState.tsx` | Renders the Sales Membership Report contextual empty state and the documented permitted recovery or create action. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_SALES`
- Active locales: `en`, `hi`
- English catalog: `manager_sales/manager_sales_locales/manager_sales_en.json`
- Hindi catalog: `manager_sales/manager_sales_locales/manager_sales_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerSalesMain.tsx`
- Primary query-key registry: `ManagerSalesQueryKeys.ts`
- Primary module constants registry: `ManagerSalesConstants.ts`
- Canonical schema file: `ManagerSalesSchema.ts` in `manager_sales_schemas/`
- Module theme contract: `manager_sales_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_sales_components/manager_sales_main/ManagerSalesMain.tsx` | YES |
| API client | `ManagerSalesApi.ts` | YES |
| Schema file | `ManagerSalesSchema.ts` | YES |
| Query-key registry | `ManagerSalesQueryKeys.ts` | YES |
| Constants registry | `ManagerSalesConstants.ts` | YES |
| URL config | `manager_sales_url_config.ts` | YES |
| Behavior test | `ManagerSalesBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_sales_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_sales/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_sales/manager_sales_mocks/manager_sales_mocks_fixtures/` and `manager_sales/manager_sales_mocks/manager_sales_mocks_handlers/`.
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

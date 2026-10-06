# Manager Dashboard — Feature Map

## Module Purpose
Manager Dashboard is the branch operating overview. It displays management KPIs, member-growth and revenue charts, recent members, recent payments, pending payments, and expiring memberships for the selected reporting range. It is read-oriented and should consume dashboard data as server state rather than storing API payloads in client state. The module does not own CRUD business records.

Module root: `frontend_manager/manager_dashboard/`

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

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Not exposed | No module API client uses POST in the supplied snapshot. |
| Read | Exposed | ManagerDashboardApi: fetchDashboardStats. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_dashboard_api/` | Owns feature API clients and request/response transport contracts. | `ManagerDashboardApi.ts` |
| `manager_dashboard_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_dashboard_components/manager_dashboard_date_filter_dropdown/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardDateFilterDropdown.tsx` |
| `manager_dashboard_components/manager_dashboard_expiring_memberships/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardExpiringMemberships.tsx` |
| `manager_dashboard_components/manager_dashboard_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardKPIs.tsx` |
| `manager_dashboard_components/manager_dashboard_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardMain.tsx` |
| `manager_dashboard_components/manager_dashboard_main/manager_dashboard_skeleton/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardSkeleton.tsx` |
| `manager_dashboard_components/manager_dashboard_member_growth_chart/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardMemberGrowthChart.tsx` |
| `manager_dashboard_components/manager_dashboard_membership_distribution/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardMembershipDistribution.tsx` |
| `manager_dashboard_components/manager_dashboard_pending_payments/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardPendingPayments.tsx` |
| `manager_dashboard_components/manager_dashboard_promo_card/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardPromoCard.tsx` |
| `manager_dashboard_components/manager_dashboard_recent_members/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardRecentMembers.tsx` |
| `manager_dashboard_components/manager_dashboard_revenue_chart/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardRevenueChart.tsx` |
| `manager_dashboard_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerDashboardConstants.ts`, `ManagerDashboardDateFilterConstants.test.ts`, `ManagerDashboardDateFilterConstants.ts`, `ManagerDashboardQueryKeys.ts`, `ManagerDashboardSharedConstants.test.ts`, `ManagerDashboardSharedConstants.ts` |
| `manager_dashboard_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerDashboardQueries.test.ts`, `useManagerDashboardQueries.ts`, `useManagerDashboardUrlState.test.ts`, `useManagerDashboardUrlState.ts` |
| `manager_dashboard_locales/` | Owns module English and Hindi translation catalogs. | `manager_dashboard_en.json`, `manager_dashboard_hi.json` |
| `manager_dashboard_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_dashboard_mocks/manager_dashboard_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardMockData.ts` |
| `manager_dashboard_mocks/manager_dashboard_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerDashboardMockHandlers.ts` |
| `manager_dashboard_schemas/` | Owns feature Zod validation and response schemas. | `ManagerDashboardSchema.ts` |
| `manager_dashboard_tests/` | Owns module behavior and utility tests. | `ManagerDashboardBehavior.test.tsx` |
| `manager_dashboard_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerDashboardTypes.ts` |
| `manager_dashboard_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerDashboardFormatters.test.ts`, `ManagerDashboardFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_dashboard_features.md`
- `manager_dashboard_forbidden.md`
- `manager_dashboard_theme_contract.md`
- `manager_dashboard_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_stat_card/ManagerStatCard`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
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
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `vitest`
- `zod`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchDashboardStats | `/manager/dashboard` | Uses the fetchDashboardStats workflow with typed request/response handling. | `GET /manager/dashboard/stats` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Review dashboard
1. Manager opens the dashboard and the selected date-range state is loaded from shareable URL/query state.
2. fetchDashboardStats(params) retrieves the complete dashboard snapshot.
3. MSW returns the full dashboard fixture, including KPIs, chart series, and recent lists.
4. TanStack Query exposes the response to KPI/chart/table sections, each with its own loading/error handling.

## Component Tree

- Route: `manager_dashboard/page.tsx`
  - `<ManagerDashboardMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_handlers/` and `manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchDashboardStats` | `GET` | `/api/v1/manager/dashboard/stats` | `{ range?, startDate?, endDate? }` | `DashboardStats` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total members | `totalMembers` | `/api/v1/manager/dashboard/stats` | `data.totalMembers` | No | Yes |
| KPI: Active members | `activeMembers` | `/api/v1/manager/dashboard/stats` | `data.activeMembers` | No | Yes |
| KPI: Total revenue | `totalRevenue` | `/api/v1/manager/dashboard/stats` | `data.totalRevenue` | No | Yes |
| KPI: Pending payments | `pendingPayments` | `/api/v1/manager/dashboard/stats` | `data.pendingPayments` | No | Yes |
| KPI: Staff | `totalStaff/activeStaff` | `/api/v1/manager/dashboard/stats` | `data.totalStaff | data.activeStaff` | No | Yes |
| KPI: Attendance today | `todayAttendance` | `/api/v1/manager/dashboard/stats` | `data.todayAttendance` | No | Yes |
| Chart: Member growth | `memberGrowth[]` | `/api/v1/manager/dashboard/stats` | `data.memberGrowth[]` | No | Yes |
| Chart: Revenue | `revenueChart[]` | `/api/v1/manager/dashboard/stats` | `data.revenueChart[]` | No | Yes |
| Chart: Members by plan | `membersByPlan[]` | `/api/v1/manager/dashboard/stats` | `data.membersByPlan[]` | No | Yes |
| List: Recent member name | `name` | `/api/v1/manager/dashboard/stats` | `data.recentMembers[].name` | No | Yes |
| List: Recent member plan | `plan` | `/api/v1/manager/dashboard/stats` | `data.recentMembers[].plan` | No | Yes |
| List: Recent payment amount | `amount` | `/api/v1/manager/dashboard/stats` | `data.recentPayments[].amount` | No | Yes |
| List: Pending member | `name` | `/api/v1/manager/dashboard/stats` | `data.pendingPaymentsList[].name` | No | Yes |
| List: Expiring member | `name` | `/api/v1/manager/dashboard/stats` | `data.expiringMemberships[].name` | No | Yes |

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
**Forbidden-pattern contract:** See `manager_dashboard_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Dashboard date-range changes must affect the actual API query, not only local labels:** Dashboard date-range changes must affect the actual API query, not only local labels.
- **Keep chart series in MSW fixtures; never hardcode chart points inside ApexCharts configuration:** Keep chart series in MSW fixtures; never hardcode chart points inside ApexCharts configuration.
- **Recent-member display fields are part of the dashboard response and must not be replaced with a second members API call:** Recent-member display fields are part of the dashboard response and must not be replaced with a second members API call.
- **Large numeric values must go through the shared formatting utility:** Large numeric values must go through the shared formatting utility.
- **The dashboard is read-oriented; do not introduce Zustand storage for the API payload itself:** The dashboard is read-oriented; do not introduce Zustand storage for the API payload itself.
- **A chart error should remain isolated to the chart section where possible instead of crashing the entire route:** A chart error should remain isolated to the chart section where possible instead of crashing the entire route.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_dashboard/manager_dashboard_components/manager_dashboard_expiring_memberships/ManagerDashboardExpiringMemberships.tsx` | Renders the expiring memberships list on the dashboard. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_kpis/ManagerDashboardKPIs.tsx` | Renders the two rows of KPI metric stat cards on the dashboard using live data from the dashboard TanStack Query contract. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_main/ManagerDashboardMain.tsx` | Entry component for the Dashboard module; delegates dashboard UI, loading, query and error behavior to module-owned child components. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_member_growth_chart/ManagerDashboardMemberGrowthChart.tsx` | Renders the Dashboard Member Growth Chart section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_membership_distribution/ManagerDashboardMembershipDistribution.tsx` | Renders the distribution of members by plan on the dashboard. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_pending_payments/ManagerDashboardPendingPayments.tsx` | Renders the pending payments list on the dashboard with a local search filter. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_promo_card/ManagerDashboardPromoCard.tsx` | Renders a promotional or informational card for the gym on the dashboard. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_recent_members/ManagerDashboardRecentMembers.tsx` | Renders the recent members table on the dashboard with a local search filter. |
| `manager_dashboard/manager_dashboard_components/manager_dashboard_revenue_chart/ManagerDashboardRevenueChart.tsx` | Renders the Dashboard Revenue Chart section and keeps presentation concerns separate from API/mutation ownership. |
| `manager_dashboard_components/manager_dashboard_date_filter_dropdown/ManagerDashboardDateFilterDropdown.tsx` | Renders the Dashboard Date Filter Dropdown controls and delegates query/filter/navigation state to the owning module logic. |
| `manager_dashboard_components/manager_dashboard_main/manager_dashboard_skeleton/ManagerDashboardSkeleton.tsx` | Renders the structural loading skeleton for Dashboard and preserves final-layout geometry during asynchronous loading. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] Reporting range and custom dates are URL state and are propagated into the dashboard Query key/request.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_DASHBOARD`
- Active locales: `en`, `hi`
- English catalog: `manager_dashboard/manager_dashboard_locales/manager_dashboard_en.json`
- Hindi catalog: `manager_dashboard/manager_dashboard_locales/manager_dashboard_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerDashboardMain.tsx`
- Primary query-key registry: `ManagerDashboardQueryKeys.ts`
- Primary module constants registry: `ManagerDashboardConstants.ts`
- Canonical schema file: `ManagerDashboardSchema.ts` in `manager_dashboard_schemas/`
- Module theme contract: `manager_dashboard_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_dashboard_components/manager_dashboard_main/ManagerDashboardMain.tsx` | YES |
| API client | `ManagerDashboardApi.ts` | YES |
| Schema file | `ManagerDashboardSchema.ts` | YES |
| Query-key registry | `ManagerDashboardQueryKeys.ts` | YES |
| Constants registry | `ManagerDashboardConstants.ts` | YES |
| URL config | `manager_dashboard_url_config.ts` | YES |
| Behavior test | `ManagerDashboardBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_dashboard_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_dashboard/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_fixtures/` and `manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_handlers/`.
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

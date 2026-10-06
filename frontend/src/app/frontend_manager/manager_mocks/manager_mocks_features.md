# Manager Mocks — Feature Map

## Module Purpose
`manager_mocks/` owns the Manager MSW bootstrap and handler aggregation required to demonstrate frontend behavior without a live backend. It registers feature-owned handlers but does not own feature business data or business rules itself.

Module root: `frontend_manager/manager_mocks/`

## Dependency Manifest
- React
- MSW
- TanStack Query test/provider infrastructure
- Vitest

## Feature Lifecycle Contract
- Create: Not applicable — this module owns mock infrastructure, not business data.
- Read: Exposed through MSW bootstrap registration only.
- Update: Not applicable — business mutations are modeled by feature-owned handlers.
- Delete: Not applicable — business deletions are modeled by feature-owned handlers.


## Directory Structure

| Folder | Exact Responsibility | Key Files |
|---|---|---|
| `(module root)` | Owns Manager MSW bootstrap/test-provider infrastructure and documentation; it does not expose a business route or feature URL config. | ManagerMockHandlers.ts, ManagerMswBrowser.ts, ManagerMswBrowserBootstrap.tsx, ManagerMswTestServer.ts, ManagerTestProviders.tsx, manager_mocks_features.md, manager_mocks_forbidden.md, manager_mocks_theme_contract.md |
| `manager_mocks_types/` | Owns Mocks domain, API, form, and view-model TypeScript contracts. | ManagerMswBrowserBootstrapTypes.ts |

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/lib/logger`

### Business Feature Dependencies
- `@/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/ManagerAttendanceMockHandlers`
- `@/app/frontend_manager/manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/ManagerCommunicationsMockHandlers`
- `@/app/frontend_manager/manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_handlers/ManagerDashboardMockHandlers`
- `@/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/ManagerExpensesMockHandlers`
- `@/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/ManagerFinanceMockHandlers`
- `@/app/frontend_manager/manager_grievance/manager_grievance_mocks/manager_grievance_mocks_handlers/ManagerGrievanceMockHandlers`
- `@/app/frontend_manager/manager_hr/manager_hr_mocks/manager_hr_mocks_handlers/ManagerHrMockHandlers`
- `@/app/frontend_manager/manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_handlers/ManagerInquiriesMockHandlers`
- `@/app/frontend_manager/manager_library/manager_library_mocks/manager_library_mocks_handlers/ManagerLibraryMockHandlers`
- `@/app/frontend_manager/manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_handlers/ManagerMaintenanceMockHandlers`
- `@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockHandlers`
- `@/app/frontend_manager/manager_notifications/manager_notifications_mocks/manager_notifications_mocks_handlers/ManagerNotificationsMockHandlers`
- `@/app/frontend_manager/manager_plans/manager_plans_mocks/manager_plans_mocks_handlers/ManagerPlansMockHandlers`
- `@/app/frontend_manager/manager_profile/manager_profile_mocks/manager_profile_mocks_handlers/ManagerMembersProfileMockHandlers`
- `@/app/frontend_manager/manager_pt/manager_pt_mocks/manager_pt_mocks_handlers/ManagerPtMockHandlers`
- `@/app/frontend_manager/manager_referrals/manager_referrals_mocks/manager_referrals_mocks_handlers/ManagerReferralsMockHandlers`
- `@/app/frontend_manager/manager_reports/manager_reports_mocks/manager_reports_mocks_handlers/ManagerReportsMockHandlers`
- `@/app/frontend_manager/manager_sales/manager_sales_mocks/manager_sales_mocks_handlers/ManagerSalesMockHandlers`
- `@/app/frontend_manager/manager_schedule/manager_schedule_mocks/manager_schedule_mocks_handlers/ManagerScheduleMockHandlers`
- `@/app/frontend_manager/manager_settings/manager_settings_mocks/manager_settings_mocks_handlers/ManagerSettingsMockHandlers`
- `@/app/frontend_manager/manager_store/manager_store_mocks/manager_store_mocks_handlers/ManagerStoreMockHandlers`
- `@/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_handlers/ManagerWorkoutMockHandlers`

### Role-Level Business Dependencies
- None.

### Third-Party Dependencies
- `@tanstack`
- `msw`
- `react`
- `vitest`

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `ManagerMswBrowserBootstrap.tsx` | Bootstraps browser MSW registration for frontend development/demo behavior. |
| `ManagerTestProviders.tsx` | Composes deterministic test providers and mock infrastructure for component/feature tests. |

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** No URL-backed list state was detected; this module must add URL state before introducing a searchable/filterable/paginated list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** No module-owned MSW handlers/fixtures; this role-level infrastructure module is not a business feature mock boundary.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Browser MSW bootstrap | Development/test only | Start feature-owned MSW handlers during frontend-first development | None | Implemented |
| Test providers | Test-only | Render feature tests against isolated Query/confirmation providers | None | Implemented |

## User Flows & Interactions
### Flow 1: Browser mock bootstrap
1. `frontend_manager/layout.tsx` mounts `ManagerMswBrowserBootstrap`.
2. The bootstrap starts browser MSW only in the documented non-production environment.
3. Feature-owned handlers intercept the real feature API requests.
4. UI receives the same API response envelope it will consume in production.

### Flow 2: Feature behavior test
1. A co-located feature test mounts `ManagerTestProviders`.
2. TanStack Query is isolated to the test instance.
3. Feature-owned MSW handlers/fixtures provide deterministic server responses.
4. Tests verify user-observable result state rather than only mock invocation.

## API Contract
This module owns no business endpoints. It only registers feature-owned handlers into the approved global MSW bootstrap boundary.

## UI Data Requirements
No business UI data is rendered by the bootstrap itself. Feature-owned handlers remain responsible for the complete UI data contract of their respective modules.

## Permissions and Security
- MSW is frontend-only test/development infrastructure.
- MSW must be disabled in production and must never be treated as a security or authorization layer.
- Feature handlers must not be used to infer backend authorization behavior.

## Loading, Empty, and Error States
This infrastructure does not render business loading/empty/error states. Those states remain owned by each feature and must be reachable through its handler scenarios.

## Edge Cases and AI Warnings
- **Never move feature fixtures into `manager_mocks/`:** fixtures remain inside their owning feature module.
- **Never add business rules to the bootstrap:** the bootstrap may only register/start/stop handlers as infrastructure.
- **Never bypass the feature API client in components:** UI must still call the same API contract intercepted by MSW.
- **Reset mutable mock state per test suite:** avoid test-order dependence.
- **Do not enable browser MSW in production:** production must use real backend transport.

## Rule Compliance Checklist
- [x] Global bootstrap is restricted to MSW infrastructure/registration.
- [x] Feature-specific fixtures and handlers remain under their owning module roots.
- [x] Test providers are deterministic and separate from production feature state.
- [x] Browser MSW does not replace the feature API contract.
- [ ] Host build/runtime environment, production-disable behavior and CI test execution require root-repository verification.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

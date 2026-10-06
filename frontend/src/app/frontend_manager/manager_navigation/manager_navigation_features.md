# Manager Navigation — Feature Map

## Module Purpose
`manager_navigation/` defines Manager role navigation structure and header navigation behavior. It owns which Manager routes are surfaced, their labels, ordering, icon selection, and navigation-only configuration. It must reference feature-owned page URL constants rather than embedding duplicate business route strings.

Module root: `frontend_manager/manager_navigation/`

## Navigation component ownership
Role-shell components that contain no feature business state live under `manager_navigation_components/`. Zero-business visual primitives such as confirmation, toast, pagination, searchable dropdown, tooltip, empty state, stat card, and table skeleton are application-level UI under `components/ui/`.

## Dependency Manifest
- React
- Next.js App Router navigation primitives
- Lucide React

## Feature Lifecycle Contract
- Create: Not applicable — navigation configuration does not create business entities.
- Read: Exposed through role navigation configuration consumed by the Manager shell.
- Update: Configuration changes are source-controlled module updates, not runtime business CRUD.
- Delete: Not applicable — navigation does not delete business records.


## Directory Structure

| Folder | Exact Responsibility | Key Files |
|---|---|---|
| `(module root)` | Owns Manager role navigation configuration and role-shell presentation components. | ManagerHeaderNavigationConfig.ts, ManagerNavigationConfig.ts, `manager_navigation_components/`, manager_navigation_features.md, manager_navigation_forbidden.md, manager_navigation_theme_contract.md |

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/theme_toggle/ThemeToggle` (zero-business visual primitive).

### Business Feature Dependencies
- `@/app/frontend_manager/manager_attendance/manager_attendance_url_config`
- `@/app/frontend_manager/manager_communications/manager_communications_url_config`
- `@/app/frontend_manager/manager_dashboard/manager_dashboard_url_config`
- `@/app/frontend_manager/manager_expenses/manager_expenses_url_config`
- `@/app/frontend_manager/manager_finance/manager_finance_url_config`
- `@/app/frontend_manager/manager_grievance/manager_grievance_url_config`
- `@/app/frontend_manager/manager_hr/manager_hr_url_config`
- `@/app/frontend_manager/manager_inquiries/manager_inquiries_url_config`
- `@/app/frontend_manager/manager_library/manager_library_url_config`
- `@/app/frontend_manager/manager_maintenance/manager_maintenance_url_config`
- `@/app/frontend_manager/manager_members/manager_members_url_config`
- `@/app/frontend_manager/manager_notifications/manager_notifications_url_config`
- `@/app/frontend_manager/manager_plans/manager_plans_url_config`
- `@/app/frontend_manager/manager_profile/manager_profile_url_config`
- `@/app/frontend_manager/manager_pt/manager_pt_url_config`
- `@/app/frontend_manager/manager_referrals/manager_referrals_url_config`
- `@/app/frontend_manager/manager_reports/manager_reports_url_config`
- `@/app/frontend_manager/manager_sales/manager_sales_url_config`
- `@/app/frontend_manager/manager_schedule/manager_schedule_url_config`
- `@/app/frontend_manager/manager_settings/manager_settings_url_config`
- `@/app/frontend_manager/manager_workout/manager_workout_url_config`

### Role-Level Business Dependencies
- None.

### Third-Party Dependencies
- `lucide-react`
- `next-intl`

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
| Manager role navigation | Authenticated Manager routes | Navigate among documented Manager feature routes in the configured groups/order | None | Implemented |
| Command palette | Authenticated Manager shell | Open with Ctrl/Cmd+K or `?`, search documented Manager destinations, navigate, and close with Escape | None | Implemented |
| Header navigation | Authenticated Manager shell | Reach scanner, notifications, profile and settings destinations | None | Implemented |

## User Flows & Interactions
### Flow 1: Sidebar navigation
1. Manager opens the shell.
2. `MANAGER_NAV_GROUPS` supplies the role-specific route list, labels and icons.
3. `ManagerSidebar` renders the entries with active-state treatment.
4. Selecting an entry navigates to the feature-owned URL from that feature's URL config.

### Flow 2: Header destination
1. User chooses scanner, notifications, profile or settings from the header.
2. `MANAGER_HEADER_NAVIGATION` resolves the destination from the owning feature URL config.
3. Next.js navigation loads the destination feature route.

## API Contract
No business API endpoints are owned by navigation. Navigation is configuration-only and references feature URL contracts.

## UI Data Requirements
- Nav group labels are translated through the Manager Components locale namespace.
- Each item references an owning feature route constant; no duplicate literal business route strings are stored here.
- Icon choices use Lucide React and role-specific semantic selection.

## Permissions and Security
- Navigation visibility is role-specific configuration; it is not backend authorization.
- Feature routes must retain their own permission guards and protected actions.
- The navigation module must not expose privileged business actions that bypass a feature's documented guard.

## Loading, Empty, and Error States
Navigation configuration has no asynchronous state of its own. Destination route loading/error/empty states remain owned by the destination feature module.

## Edge Cases and AI Warnings
- **Never hardcode duplicate route strings:** consume the destination feature's `_url_config.ts`.
- **Never move business logic into navigation config:** it should remain declarative.
- **Do not treat sidebar visibility as authorization:** direct route access must still enforce the feature boundary.
- **Keep role order stable unless the product requirement changes:** navigation order is part of the role shell contract.
- **Do not import feature components into navigation config:** use URL and icon metadata only.

## Component Responsibility Map
| Component/File | Responsibility |
|---|---|---|
| `ManagerNavigationConfig.ts` | Defines Manager sidebar groups, ordering, labels and icon selection. |
| `ManagerHeaderNavigationConfig.ts` | Defines Manager header destinations by consuming feature-owned URL contracts. |
| `manager_navigation_components/` | Owns Manager role-shell presentation, sidebar/header behavior, route progress, breadcrumb, and command palette without feature business ownership. |

## Rule Compliance Checklist
- [x] Navigation uses feature URL configuration instead of hardcoded business routes.
- [x] Navigation remains declarative and contains no API/data/business workflows.
- [x] Role-specific route grouping and ordering are isolated from the global design system.
- [x] Feature permission enforcement remains outside navigation configuration.
- [ ] Host route registration and middleware authorization require root-repository verification.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

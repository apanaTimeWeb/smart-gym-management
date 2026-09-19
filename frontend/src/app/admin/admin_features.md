# Admin — Feature Map

## Module Purpose
The Admin module is the platform-level operational workspace for the gym-management application. It is used by the Admin role to monitor organization-wide performance, manage branches, members, plans, staff, settings, financial reporting, operational exceptions, and security/audit information exposed to the Admin role. Users can review business metrics, perform documented Admin-only configuration and CRUD workflows, investigate operational issues, and use supported reports and exports. The module is strictly isolated from Manager, Trainer, and other role-specific business modules; only approved global framework, session, API transport, design-system, and monitoring infrastructure may be imported.

## Directory Structure

| Folder | Responsibility | Key Files / Contents |
|---|---|---|
| `admin_components/AdminLayout/` | Admin shell, navigation, header search, notifications, profile entry, usage alert | `AdminLayout.tsx`, `AdminHeader.tsx`, `AdminSidebar.tsx`, `AdminHeaderSearch.tsx`, `useAdminHeaderMemberSearch.ts` |
| `admin_components/AdminFeedback/` | Confirmation, toast, message, and bulk-message primitives | `AdminConfirmProvider.tsx`, `AdminConfirmModal.tsx`, `AdminToast.tsx`, `AdminMessageModal.tsx` |
| `admin_components/AdminShared/` | Zero-business-logic Admin UI primitives | `AdminPagination.tsx`, `AdminSearchableDropdown.tsx`, `AdminTableSkeleton.tsx`, `AdminStatCard.tsx` |
| `admin_components/AdminQrScanner/` | Admin QR scan workflow UI and client-private scan state | `AdminQrScannerModal.tsx`, `useAdminQrScannerLogic.ts` |
| `admin_utils/` | Admin-owned utility contracts and infrastructure adapters | `useAdminDebounce.ts`, `useAdminUrlQuerySync.ts`, `useAdminUnsavedChangesGuard.ts`, `AdminMonitoring.ts`, `AdminCreateIdempotencyKey.ts`, `AdminIdempotencyIntentStore.ts` |
| `admin_store/` | Admin-wide UI/session-shell state only | `useAdminGlobalStore.ts`, `useAdminImpersonationStore.ts`, `useAdminToastStore.ts` |
| `admin_types/` | Admin-wide type contracts | Admin prop/state/shared type definitions |
| `<module>/<module>_mocks/fixtures/` | Module-owned feature datasets | One fixture file per Admin feature/module |
| `<module>/<module>_mocks/handlers/` | Module-owned feature handlers | One handler file per Admin feature/module |
| `dashboard/` | Organization-wide KPIs, charts, alerts, branch ranking | Dashboard route + module API/types/components/tests/docs |
| `branches/` | Branch registry and branch detail/read-only metrics | Branch route + API/types/components/tests/docs |
| `finance/` | Read-only finance/payment/revenue reporting | Finance route + API/types/components/tests/docs |
| `finance/pnl/` | Branch P&L comparison/reporting | P&L route + charts/table/period controls |
| `sales/` | Sales and membership reporting | Sales route + overview/report tables |
| `hr/` | Staff, payroll, performance, ledger workflows | HR route + staff/payroll/performance subfeatures |
| `plans/` | Membership plan catalog and plan revenue views | Plans route + CRUD form/grid + revenue view |
| `settings/` | Admin configuration and security settings | Settings route + form sections |
| `notifications/` | Admin notification feed and read-state mutations | Notifications route + API/query/list |
| `members/` | Admin member directory, search/filtering and profile workflow | Members route + API/types/query/table/profile |
| `attendance/` | Read-only attendance records, summary and trend | Attendance route + table/KPIs/trend |
| `announcements/` | Admin announcement creation, editing, publication and pinning | Announcements route + form/table/API/MSW |
| `audit_logs/` | Security/audit event investigation | Audit route + filters/table/detail drawer/API/MSW |
| `blacklist/` | Blacklist lifecycle and branch-scope workflows | Blacklist route + table/form/cross-gym view/API/MSW |
| `coupons/` | Coupon CRUD and status workflows | Coupons route + form/table/API/MSW |
| `data-export/` | Export creation and export-job history | Data Export route + RHF/Zod form/history/API/MSW |
| `gym-health-alerts/` | Operational alert monitoring and resolution/dismissal | Health Alerts route + table/KPIs/API/MSW |
| `payouts/` | Read-only payout and P&L summaries | Payout route + query-driven reporting |
| `permissions/` | Admin permission/capability administration UI | Permissions route + API/query/UI |
| `profile/` | Admin profile and password management | Profile route + RHF/Zod + API/query |
| `reports/` | Date-range report aggregation and report views | Reports route + URL-driven range state |
| `subscriptions/` | Subscription/plans/invoice/payment-method administration | Subscription route + API/query/mutations |
| `usage/` | Usage limits, plan usage and upgrade request workflow | Usage route + usage API/UI |

## Route / Feature Inventory

| Feature | Route | User Capability | Main API Areas | State Pattern |
|---|---|---|---|---|
| Dashboard | `/admin/dashboard` | Review platform KPIs, trends, expiring members and alerts | `/admin/dashboard/*` | TanStack Query + URL range |
| Members | `/admin/members` | Search, filter, paginate and inspect Admin member records | `/admin/members/*` | TanStack Query + module Zustand + URL state |
| Attendance | `/admin/attendance` | Review attendance records and trends | `/admin/attendance/*` | TanStack Query + module Zustand + URL state |
| Plans | `/admin/plans` | Review/create/update/delete plans and inspect plan revenue | `/admin/plans/*` | TanStack Query + URL state |
| Sales | `/admin/sales` | Review sales summaries, membership report and pending payments | `/admin/sales/*` | TanStack Query + URL state |
| Finance | `/admin/finance` | Review payments, revenue and expenses; finance view remains reporting-oriented | `/admin/finance/*` | TanStack Query + URL state |
| Branch P&L | `/admin/finance/pnl` | Compare branch profitability across configured periods | `/admin/finance/pnl/*` | TanStack Query + URL period/filter state |
| HR | `/admin/hr` | Manage Admin-visible staff/payroll workflows and inspect performance | `/admin/hr/*` | TanStack Query + UI state + URL state |
| Staff Performance | `/admin/hr/performance` | Review performance metrics by period/search | `/admin/hr/performance` | TanStack Query |
| Branches | `/admin/branches` | Review branch registry and branch detail metrics | `/admin/branches/*` | TanStack Query |
| Payouts | `/admin/payouts` | Review payout and P&L summaries | `/admin/payouts/*` | TanStack Query + URL state |
| Announcements | `/admin/announcements` | Create/edit/delete/pin announcements | `/admin/announcements/*` | TanStack Query + Zustand + URL state |
| Audit Logs | `/admin/audit_logs` | Search/filter/paginate audit events and inspect detail | `/admin/audit_logs/*` | TanStack Query + Zustand + URL state |
| Blacklist | `/admin/blacklist` | Add/remove/toggle/propagate blacklist entries | `/admin/blacklist/*` | TanStack Query + Zustand + URL state |
| Coupons | `/admin/coupons` | Create/update/delete/toggle coupons | `/admin/coupons/*` | TanStack Query + Zustand + URL state |
| Data Export | `/admin/data-export` | Create export jobs and manage export history | `/admin/data-export/*` | TanStack Query + Zustand + RHF/Zod |
| Gym Health Alerts | `/admin/gym-health-alerts` | Review alerts and resolve/dismiss supported alerts | `/admin/gym-health-alerts/*` | TanStack Query + Zustand + URL state |
| Notifications | `/admin/notifications` | Review notifications and mark one/all as read | `/admin/notifications/*` | TanStack Query |
| Permissions | `/admin/permissions` | Review and manage Admin-visible permissions | `/admin/permissions/*` | TanStack Query + UI state |
| Profile | `/admin/profile` | Update profile and change password | `/admin/adminProfile/*` | TanStack Query + RHF/Zod + dirty guard |
| Reports | `/admin/reports` | Review configured reports over shareable date ranges | `/admin/reports/*` | TanStack Query + URL state |
| Settings | `/admin/settings` | Update Admin-configurable system settings | `/admin/settings/*` | TanStack Query + RHF/Zod + dirty guard |
| Subscriptions | `/admin/subscriptions` | Review subscription, plans, invoices and payment methods; execute documented subscription mutations | `/admin/subscriptions/*` | TanStack Query + confirm |
| Usage | `/admin/usage` | Review usage limits and submit supported upgrade request | `/admin/usage/*` | TanStack Query |

## API and State Contract

All server data is owned by TanStack Query. Module Zustand stores contain UI-only state such as active filters, modal state, selected records, tabs, and pagination controls. API responses are validated at the boundary with Zod, and module API calls use centralized URL configuration files. Feature-specific mocked server data lives inside each owning feature under `<module>/<module>_mocks/fixtures/` and `<module>/<module>_mocks/handlers/`. `admin_mocks/handlers/AdminMockHandlers.ts` is registration-only and contains no business data. No Admin business state is owned by React Context or a global Zustand server-data store.

Representative namespaced query keys include `['admin','members','list',queryParams]`, `['admin','finance','payments',queryParams]`, `['admin','sales','pending-payments',queryParams,...]`, `['admin','notifications','list']`, and the corresponding feature-specific detail/KPI keys.

## Shareable List State

Filterable/paginated Admin views use URL query parameters through `useAdminUrlQuerySync.ts` or an equivalent feature-owned URL-state implementation. Search inputs that trigger backend requests use the Admin debounce utility with the documented delay. Query keys contain the active request parameters so cached results cannot collide across filter/page combinations.

## Security / Permissions

The Admin module is intended for the documented Admin role. Frontend permission UI is not treated as a replacement for backend authorization. Restricted/destructive UI actions are hidden or confirmed through the Admin confirmation infrastructure before mutation. Sensitive identifiers are displayed with copy affordances where required, and sensitive personal fields are masked in list views through the approved masking utility. No cross-role business imports are allowed.

## Loading / Empty / Error Contract

Every route has a framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` where applicable. Complex data sections use shape-matched skeletons rather than full-page generic spinners. Entity lists expose dedicated empty-state components. Query failures remain inline unless explicitly configured to enter an Error Boundary; route errors render a module-specific retry action without exposing internal stack traces.

## Edge Cases / AI Warnings

1. Never reintroduce imports from Manager, Trainer, Superadmin, or another role-owned business module.
2. Never place backend responses, API loading state, or API errors in Zustand or Context.
3. Never bypass the module API client by reading MSW fixtures directly from production UI code.
4. Never use client-only list slicing as the source of truth when an endpoint has server-side pagination/filter parameters.
5. Never execute destructive or financial Admin mutations on a single click; use the documented confirmation workflow.
6. Never hardcode backend success/error messages when the mutation response supplies `message`.
7. Never use arbitrary Tailwind colors or direct `text-white`/`text-black` color utilities; use documented semantic tokens.
8. Never use `key={index}` for dynamic/filterable entities.
9. Never remove the Admin dirty-state guard from complex forms or password/profile/settings workflows.
10. Never mark runtime/build/security verification as PASS unless the consuming project actually runs those gates successfully.

## Module-Owned Mock Ownership

Each Admin sub-feature owns its own fixture and handler folders. The root `admin_mocks/handlers/AdminMockHandlers.ts` only aggregates/registers those handlers. Global MSW bootstrap may register this aggregate, but must not contain Admin business records, Admin-specific transformations, or feature logic.

## External Infrastructure Dependencies

Approved external dependencies are limited to framework/application infrastructure such as `@/lib/api`, `@/lib/logger`, global authentication/session/permission infrastructure, the global design token system, Next.js routing, TanStack Query, Zod, React Hook Form, and the application MSW bootstrap. Any unavoidable dependency outside this list requires an update to this feature map.


## Rule Compliance Checklist

- [x] Module isolation: no Admin source import crosses into another business/role module in the static scan.
- [x] Feature ownership: Admin business code, mock fixtures, MSW handlers, tests and module docs are owned by `admin/`.
- [x] File-size ceilings: no component, hook, store, schema/type or API ceiling violation in the final static scan.
- [x] Naming and reserved routes: framework-reserved route filenames are preserved; non-reserved Admin-owned source filenames use the Admin/module naming convention.
- [x] Absolute imports: no relative source imports detected.
- [x] Type safety syntax scan: no explicit `any`, `@ts-ignore`, or `@ts-nocheck` directives detected.
- [x] Server/client boundary markers: files using client-only hooks/browser listeners carry the required client marker; route entry files remain server-oriented.
- [x] API boundary: Admin APIs use centralized URL configuration and Zod response schemas through `apiFetch`.
- [x] URL-shareable list state: Admin list filters/pagination are synchronized through `useAdminUrlQuerySync` where module stores own those values; existing URL-native features retain their own implementations.
- [x] Backend-driven mutation feedback: supported API mutation success messages use the response `message` rather than invented success copy.
- [x] Toast deduplication: every Admin toast call has an explicit stable `id`.
- [x] Theme token scan: no hardcoded color utilities/hex values remain in Admin production TS/TSX; modal/popover/shell surfaces use documented tokens.
- [x] Motion safety: transition/animation utilities in Admin production UI are guarded by `motion-safe:`.
- [x] Mobile hover safety: hover-revealed table actions use the required mobile-visible fallback pattern.
- [x] Loading/error/not-found: every Admin route has the expected framework state files; route errors provide retry behavior.
- [x] Storage/logging safety: no direct browser storage access or `console.log` remains in Admin source.
- [x] Media safety: no raw `<img>` element remains in Admin source.
- [x] Dynamic key safety: Admin entity collections do not rely on `key={index}` patterns in the static scan.
- [x] Destructive confirmations: documented destructive Admin mutations route through the Admin confirmation provider.
- [x] Complex form architecture: Profile and Settings complex forms use React Hook Form + Zod and the Admin unsaved-changes guard.
- [ ] Full dependency-backed TypeScript/lint suite: NOT VERIFIED in this environment because the repository dependency installation could not be completed.
- [ ] Full Vitest/RTL suite: NOT VERIFIED for the same dependency/runtime limitation; test source was statically inspected.
- [ ] Playwright critical journeys: NOT VERIFIED; must be run in the consuming application.
- [ ] Production Next.js build: NOT VERIFIED; must be run after dependency installation.
- [ ] SCA/secret/security CI gates: NOT VERIFIED; must be executed in the consuming repository CI.

The unchecked items are external execution gates, not unverified claims of code correctness. They must remain unchecked until the consuming project actually runs them successfully.

## Critical Action Infrastructure

`AdminCreateIdempotencyKey.ts` and `AdminIdempotencyIntentStore.ts` are zero-business-logic Admin infrastructure utilities. Feature mutation hooks own the intent identifiers and pass the resulting key into their feature-owned API client; these utilities do not contain feature business rules or fixtures.

## Shell Aggregation Exception

`admin_components/AdminLayout/` is the approved Admin application-shell aggregation boundary. `AdminHeaderSearch`, `AdminHeaderNotifications`, `AdminHeaderProfile`, and `AdminUsageAlert` may consume minimal read-only data from Admin feature APIs because they render persistent shell affordances present across routes. This is an explicit Admin-only exception: shell components must not mutate feature state, own feature business rules, import feature fixtures/handlers, or become a substitute for feature-local query logic.

## Branch Reference Isolation

`members`, `attendance`, `hr`, and `reports` intentionally own minimal branch-reference contracts and MSW fixtures because they require branch dropdowns but must not import the Branches business module. Their API calls reuse the backend branch-reference endpoint with a consumer discriminator; their module-local handlers intercept only their own discriminator.

## Settings Permission Reference Isolation

`settings` owns a minimal role-permission reference contract for the Roles view. It does not import the Permissions business module. Its module-local MSW handler serves the Settings consumer discriminator using a settings-owned fixture.

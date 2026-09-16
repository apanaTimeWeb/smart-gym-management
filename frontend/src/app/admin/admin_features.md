# Admin Module — Feature Map

## Module Purpose
The Admin module is the overarching control center for gym operations. It provides full access to manage branches, global settings, staff (HR), global plans, and overall finance/sales metrics. It enforces role isolation from Manager and Trainer modules.

## Directory Structure

| Folder | Responsibility |
|---|---|
| `admin_components/AdminLayout/` | App shell: fixed sidebar, sticky header, collapsible navigation |
| `admin_components/AdminFeedback/` | Shared feedback: toast, confirm modal, message modal, bulk messaging |
| `admin_components/AdminShared/` | Generic primitives: pagination, stat card, searchable dropdown |
| `admin_utils/` | Shared constants: nav items, items-per-page, placeholders |
| `admin_store/` | Global state (Zustand) for branches and selected branch filter |
| `dashboard/` | High-level analytics, revenue trends, global alerts |
| `branches/` | CRUD operations for physical gym locations |
| `finance/` | Global payment tracking, revenue reporting |
| `sales/` | Membership sales reports, aggregate performance |
| `hr/` | Staff management (Managers, Trainers, Admins) |
| `plans/` | Global membership plans and pricing definitions |
| `settings/` | System-wide configuration |
| `notifications/` | Admin-level alerts and global communication |

## Feature Inventory

| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Dashboard | `/admin/dashboard` | KPI overview, global charts | `GET /admin/dashboard/*` | ✅ Live |
| Branches | `/admin/branches` | Manage gym locations | `GET/POST /admin/branches` | ✅ Live |
| Finance | `/admin/finance` | System-wide payments | `GET /admin/finance/*` | ✅ Live |
| Sales | `/admin/sales` | Aggregate membership sales | `GET /admin/sales/*` | ✅ Live |
| HR | `/admin/hr` | Staff directory & roles | `GET/POST /admin/hr` | ✅ Live |
| Plans | `/admin/plans` | Manage membership pricing | `GET/POST /admin/plans` | ✅ Live |
| Settings | `/admin/settings` | Global configuration | `GET/PATCH /admin/settings` | ✅ Live |
| Notifications | `/admin/notifications` | Alerts and messages | `GET/POST /admin/notifications` | ✅ Live |

## Data and State Architecture

- **Server-state query keys:** N/A — this module uses Context + Zustand
- **Zustand stores:** `useAdminGlobalStore` for selected branch, plus module-scoped stores (e.g., `useAdminPlansStore`)
- **Context providers:** Contexts for complex module data flow (e.g., `AdminHrContext`, `AdminPlansContext`, `AdminConfirmProvider`)
- **Local-storage keys:** None — auth token stored in HTTP-only cookie
- **MSW handler file:** `src/mocks/handlers/admin.handlers.ts` intercepts API calls for stub-first development

## API Contract

All API calls go through the centralized `apiFetch` wrapper at `@/lib/api`.

**Response envelope:** `{ success: boolean, message: string, data: T | null, meta?: PaginationMeta }`

## Permissions and Security

- Role: `SUPERADMIN` — all routes under `/admin/*` require authenticated session with Super Admin role
- Auth: JWT stored in `gymsmart_token` HTTP-only cookie; injected by `apiFetch` wrapper
- Destructive actions: Protected by `AdminConfirmProvider` (confirm modal — `useConfirm` hook)
- Cross-role isolation: Zero imports from `/manager` or `/trainer` (enforced in `admin_forbidden.md`)

## Loading, Empty, Error States

- Uses Next.js `loading.tsx` and `error.tsx` patterns in every sub-module.
- Uses skeleton loading states for tables and grid cards.
- Fallback empty states provided when no data exists.

## Edge Cases / AI Warnings

- **Never use `window.confirm()`** for destructive actions — always use `useConfirm()` hook from `AdminConfirmProvider`
- **No cross-module imports** — if you need a type from another module, duplicate it (intentional pattern per Rule 2)
- **Server Components** (`page.tsx`) must never import or render Client-Component providers directly
- **Sidebar active state** uses `bg-primary-subtle` + `border-l-2 border-primary` with glow shadow — NOT solid `bg-primary`
- **Z-index scale**: header = `z-20`, dropdowns = `z-30`, modals = `z-40`, toasts = `z-50`

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, file size ceilings
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — `Admin` prefix on all files
- [x] Rule 3B: Centralized data — status maps in `statusBadgeConfig.ts`, URLs in `admin_url_config.ts`
- [x] Rule 4: Theme Independence — Tailwind tokens via `globals.css`, no hardcoded hex
- [x] Rule 5: Smart State Management — Context/Zustand combination, no server state in Zustand
- [x] Rule 6: Logic/UI Separation — custom hooks extract all useEffect/logic
- [x] Rule 7: Type Isolation — `*_types/` folders, no inline interfaces
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server, `*Main.tsx` = Client
- [x] Rule 9: Loading/error/not-found — `loading.tsx` + `error.tsx` in every module
- [x] Rule 10: Absolute imports — `@/app/admin/...` throughout, no relative paths
- [x] Rule 11: Centralized URL Config — `[module]_url_config.ts` used everywhere; no hardcoded strings.
- [x] Rule 13: Feature Map — this document; updated with every code change
- [x] Rule 14: Backend-driven messages — all toasts display `res.message` / `err.message`; fallback strings use `|| 'fallback'` pattern (backend message always preferred)
- [x] Rule 15A: Tests present — Co-located `__tests__` scaffolding generated for all ~25 submodules.
- [x] Rule 18: No inline mocks in React or API files. MSW must handle all stubbing.ners on all async actions
- [x] Rule 19: Clickable table rows — all tables use `cursor-pointer`, no View/Eye button
- [x] Rule 26: Loading button states — `Loader2` spinners on all async actions
- [x] Rule 32: No barrel files — direct named imports only
- [x] Rule 40: `_forbidden.md` present with 5+ specific entries
- [x] Rule 43: Sensitive data masked — phone numbers use `maskSensitiveData()`
- [x] Rule 44: No console.log — removed from all production files
- [x] Rule 71: Double verification — destructive actions use `useConfirm()` modal
- [x] Rule 73: `import type` — used for all type-only imports
- [x] Design §3: Sidebar active = subtle gold border + bg (NOT solid primary)
- [x] Design §12: Z-index scale — header z-20, dropdowns z-30, modals z-40, toasts z-50
- [x] Design §28: Surface elevation — `bg-popover` for dropdowns, `bg-overlay` for modals
- [x] Design §29: `motion-safe:` guards on all transitions and animations


## User Flows & Interactions
1. Enter the `/admin` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` where present, using skeleton layout rather than full-page generic spinners.
- Route failure: `error.tsx` where present, with module-specific recovery via `reset()`.
- Entity lists: use the feature's dedicated empty-state component; query failures remain inline unless explicitly configured to throw.

## Edge Cases and AI Warnings
- Do not introduce cross-role or cross-business-module imports.
- Do not move server/API data into Zustand or Context.
- Do not bypass the module API client or read fixtures directly from UI code.
- Do not introduce hardcoded business records or hardcoded API URLs.
- Preserve destructive-action confirmation and backend-driven messages.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `admin_components/AdminFeedback/AdminConfirmModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminFeedback/AdminConfirmProvider.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminFeedback/AdminToast.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminFeedback/AdminToastProvider.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminHeaderNotifications.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminHeaderProfile.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminHeaderSearch.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminImpersonationBanner.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminLayout.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminNotFound.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminSidebar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminLayout/AdminUsageAlert.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminQrScanner/AdminQrScannerModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminQueryProvider.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminShared/AdminDateFilterDropdown.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminShared/AdminErrorFallback.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminShared/AdminPagination.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminShared/AdminSearchableDropdown.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminShared/AdminStatCard.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `admin_components/AdminShared/AdminTableSkeleton.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `announcements/announcements_components/AdminAnnouncementsKPIs/AdminAnnouncementsKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `announcements/announcements_components/AdminAnnouncementsMain/AdminAnnouncementsMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `announcements/announcements_components/AdminAnnouncementsModal/AdminAnnouncementsModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `announcements/announcements_components/AdminAnnouncementsTable/AdminAnnouncementsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `attendance/attendance_components/AdminAttendanceEmptyState/AdminAttendanceEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `attendance/attendance_components/AdminAttendanceKPIs/AdminAttendanceKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `attendance/attendance_components/AdminAttendanceMain/AdminAttendanceMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `attendance/attendance_components/AdminAttendanceTable/AdminAttendanceTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `attendance/attendance_components/AdminAttendanceToolbar/AdminAttendanceToolbar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `attendance/attendance_components/AdminAttendanceTrendChart/AdminAttendanceTrendChart.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `audit_logs/audit_components/AdminAuditLogsDetailDrawer/AdminAuditLogsDetailDrawer.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `audit_logs/audit_components/AdminAuditLogsKPIs/AdminAuditLogsKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `audit_logs/audit_components/AdminAuditLogsMain/AdminAuditLogsMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `audit_logs/audit_components/AdminAuditLogsTable/AdminAuditLogsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `audit_logs/audit_components/AdminAuditLogsToolbar/AdminAuditLogsToolbar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistCrossGymView/AdminBlacklistCrossGymView.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistEmptyState/AdminBlacklistEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistKPIs/AdminBlacklistKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistMain/AdminBlacklistMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistModal/AdminBlacklistModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistTable/AdminBlacklistTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistTabs/AdminBlacklistTabs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `blacklist/blacklist_components/AdminBlacklistToolbar/AdminBlacklistToolbar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `branches/branches_components/AdminBranchCard/AdminBranchCard.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `branches/branches_components/AdminBranchDetailDrawer/AdminBranchDetailDrawer.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `branches/branches_components/AdminBranchesMain/AdminBranchesMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `branches/branches_components/AdminBranchesToolbar/AdminBranchesToolbar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/AdminCouponsEmptyState/AdminCouponsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/AdminCouponsKPIs/AdminCouponsKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/AdminCouponsMain/AdminCouponsMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/AdminCouponsModal/AdminCouponsModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/AdminCouponsTable/AdminCouponsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/AdminCouponsToolbar/AdminCouponsToolbar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardAlerts/AdminDashboardAlerts.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardAttendanceTrend/AdminDashboardAttendanceTrend.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardBranchLeaderboard/AdminDashboardBranchLeaderboard.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardExpiringWidget/AdminDashboardExpiringWidget.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardKPIs/AdminDashboardKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardMain/AdminDashboardMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/AdminDashboardRevenueTrend/AdminDashboardRevenueTrend.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `data-export/data_export_components/AdminDataExportForm/AdminDataExportForm.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `data-export/data_export_components/AdminDataExportHistory/AdminDataExportHistory.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `data-export/data_export_components/AdminDataExportKPIs/AdminDataExportKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `data-export/data_export_components/AdminDataExportMain/AdminDataExportMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceAddExpenseModal/AdminFinanceAddExpenseModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceAddPaymentModal/AdminFinanceAddPaymentModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceExpensesTable/AdminFinanceExpensesTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceKPIs/AdminFinanceKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceMain/AdminFinanceMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePaymentsTable/AdminFinancePaymentsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlCharts.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlPeriodSelector.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlRowBreakdown.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinancePnl/AdminFinancePnlTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceRevenueByMethod/AdminFinanceRevenueByMethod.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `finance/finance_components/AdminFinanceRevenueSummary/AdminFinanceRevenueSummary.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/admin_mocks/fixtures/AdminMockFixtures.ts` and `admin/admin_mocks/handlers/AdminMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.

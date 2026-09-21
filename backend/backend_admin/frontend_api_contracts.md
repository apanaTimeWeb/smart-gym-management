
### announcements/announcements_features.md
All calls go through the module's `announcementsApi` client in `announcements_api/AdminAnnouncementsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAnnouncements()` | GET | `/admin/announcements` | — | `Announcement[]` |
| `fetchKPIs()` | GET | `/admin/announcements/kpis` | — | `AnnouncementKPIData` |
| `createAnnouncement(payload)` | POST | `/admin/announcements` | `AnnouncementFormValues` | `Announcement` |
| `updateAnnouncement(id, payload)` | PATCH | `/admin/announcements/:id` | `AnnouncementFormValues` | `Announcement` |
| `deleteAnnouncement(id)` | DELETE | `/admin/announcements/:id` | — | `void` |
| `togglePin(id)` | PATCH | `/admin/announcements/:id/pin` | — | `Announcement` |

### attendance/attendance_features.md
All calls go through mock functions in `AdminAttendanceApi.ts`. Replace with `apiFetch` when backend is ready.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAttendanceRecords()` | GET | `/admin/attendance/records` | `{ page, limit, search, status, branchId, dateRange }` | `AdminAttendanceRecord[]` |
| `fetchAttendanceSummary()` | GET | `/admin/attendance/summary` | `{ branchId, dateRange }` | `AdminAttendanceSummary` |
| `fetchAttendanceTrend()` | GET | `/admin/attendance/trend` | `{ branchId }` | `AdminAttendanceTrendPoint[]` |

### audit_logs/audit_logs_features.md
All calls go through the typed `AdminAuditLogsApi.ts` client and `apiFetch`; module-owned MSW handlers provide frontend-first demo responses.
Backend path uses hyphens: `/admin/audit-logs` (not underscores). Always use `AdminAuditLogsUrlConfig`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAuditLogs(params)` | GET | `/admin/audit-logs` | `{ page, limit, actor, action, from, to, entityType, entityId }` | `AuditLog[]` + `PaginationMeta` |
| `fetchAuditLogById(id)` | GET | `/admin/audit-logs/:id` | — | `AuditLogDetail` |
| `fetchAuditKPIs()` | GET | `/admin/audit-logs/kpis` | — | `AuditKPIData` |
| `exportAuditLogs(params)` | GET | `/admin/audit-logs/export` | same as fetchAuditLogs | `Blob` (CSV) |
| `fetchActors()` | GET | `/admin/audit-logs/actors` | — | `string[]` |

### blacklist/blacklist_features.md
All calls go through `blacklistApi` in `AdminBlacklistApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchBlacklist()` | GET | `/admin/blacklist` | — | `BlacklistedMember[]` |
| `fetchKPIs()` | GET | `/admin/blacklist/kpis` | — | `BlacklistKPIData` |
| `addToBlacklist(dto)` | POST | `/admin/blacklist` | `BlacklistFormValues` | `BlacklistedMember` |
| `removeFromBlacklist(id)` | DELETE | `/admin/blacklist/:id/remove` | — | `null` |
| `toggleBlacklist(id)` | PATCH | `/admin/blacklist/:id` | — | `BlacklistedMember` |
| `propagateToAllBranches(id)` | PATCH | `/admin/blacklist/:id/propagate` | — | `BlacklistedMember` (scope upgraded to `global`) |

### branches/branches_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminBranchesApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### coupons/coupons_features.md
All calls go through `couponsApi` in `coupons_api/AdminCouponsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchCoupons(params)` | GET | `/admin/coupons` | `{ page, limit, search, status }` | `Coupon[]` + `PaginationMeta` |
| `fetchKPIs()` | GET | `/admin/coupons/kpis` | — | `CouponKPIData` |
| `createCoupon(dto)` | POST | `/admin/coupons` | `CouponFormValues` | `Coupon` |
| `updateCoupon(id, dto)` | PATCH | `/admin/coupons/:id` | `CouponFormValues` | `Coupon` |
| `deleteCoupon(id)` | DELETE | `/admin/coupons/:id` | — | `null` |
| `toggleCoupon(id)` | PATCH | `/admin/coupons/:id/toggle` | — | `Coupon` |

### dashboard/dashboard_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `dashboard_api/AdminDashboardApi.ts` for server prefetch | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### data-export/data-export_features.md
All calls go through `dataExportApi` in `data_export_api/AdminDataExportApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `requestExport(dto)` | POST | `/admin/data-export/request` | `{ dataType, dateFrom, dateTo, format }` | `ExportRequest` |
| `fetchHistory(params)` | GET | `/admin/data-export/history` | `{ page, limit }` | `ExportRequest[]` + `PaginationMeta` |
| `getDownloadUrl(id)` | GET | `/admin/data-export/:id/download` | — | `{ url: string, expiresAt: string }` |

### finance/finance_features.md
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchPayments(params)` | GET | `/admin/finance/payments/fetchPayments` | `page`, `limit`, optional `search`, `method`, `status`, `branchId` | `{ payments: Payment[]; total: number }` + pagination metadata |
| `fetchSummary(branchId, range)` | GET | `/admin/finance/summary` | optional `branchId`, `range` | `FinanceSummary` |
| `fetchBranchPnl(period, status?)` | GET | `/admin/finance/pnl` | required `period`, optional `status` | `BranchPnlRecord[]` |
| `fetchExpenses(params)` | GET | `/admin/finance/payments/fetchExpenses` | optional finance filter params | `Expense[]` |

### gym-health-alerts/gym-health-alerts_features.md
All calls go through `gymHealthAlertsApi` in `gym_health_alerts_api/AdminGymHealthAlertsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAlerts(params)` | GET | `/admin/gym-health-alerts` | `{ severity, search }` | `GymHealthAlert[]` |
| `fetchSummary()` | GET | `/admin/gym-health-alerts/summary` | — | `AlertKPIData` |
| `dismissAlert(id)` | POST | `/admin/gym-health-alerts/:id/dismiss` | — | `null` |

### hr/hr_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `hr_api/AdminHrApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### members/members_features.md
All calls go through `AdminMembersApi.ts`. Response envelope: `{ success, message, data: T | null, meta?: PaginationMeta }`

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchMembers(params)` | GET | `/admin/members` | `{ page, limit, search, status, branchId }` | `Member[]` + `PaginationMeta` |
| `fetchMemberById(id)` | GET | `/admin/members/:id` | — | `MemberDetail` |
| `fetchMemberStats()` | GET | `/admin/members/stats` | — | `MemberStats` |
| `exportMembers(filters)` | GET | `/admin/members/export` | `{ search, status, branchId }` | `string` (CSV payload)

### notifications/notifications_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminNotificationsApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### payouts/payouts_features.md
All calls go through `payoutsApi` in `payouts_api/AdminPayoutsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPayouts(params)` | GET | `/admin/payouts` | `{ page, limit, month, branchId }` | `Payout[]` + `PaginationMeta` |
| `fetchKPIs(params)` | GET | `/admin/payouts/kpis` | `{ month, branchId }` | `PayoutKPIData` |
| `fetchPnL(params)` | GET | `/admin/payouts/pnl` | `{ month, branchId }` | `PnLStatement` |
| `fetchPayoutById(id)` | GET | `/admin/payouts/:id` | — | `Payout` |

### permissions/permissions_features.md
All calls go through `permissionsApi` in `permissions_api/AdminPermissionsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPermissions()` | GET | `/admin/permissions` | — | `RolePermissions[]` |
| `fetchOverrides()` | GET | `/admin/permissions/overrides` | — | `StaffOverride[]` |
| `updateStaffPermission(staffId, dto)` | PATCH | `/admin/permissions/:staffId` | `{ permission: string, enabled: boolean }` | `StaffOverride` |
| `resetToDefaults(staffId)` | POST | `/admin/permissions/:staffId/reset` | — | `null` |

### plans/plans_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `plans_api/AdminPlansApi.ts` for server prefetch | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### profile/profile_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminProfileApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### reports/reports_features.md
All calls go through `reportsApi` in `reports_api/AdminReportsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchRevenueReport(params)` | GET | `/admin/reports/revenue` | `{ from, to, branchId }` | `RevenueReportData` |
| `fetchAttendanceReport(params)` | GET | `/admin/reports/attendance` | `{ from, to, branchId }` | `AttendanceReportData` |
| `fetchMembershipReport(params)` | GET | `/admin/reports/members` | `{ from, to, branchId }` | `MembershipReportData` |
| `fetchPayrollReport(params)` | GET | `/admin/reports/payroll` | `{ from, to, branchId }` | `PayrollReportData` |
| `fetchPnLReport(params)` | GET | `/admin/reports/pnl` | `{ from, to, branchId }` | `PnLReportData` |
| `exportReport(params)` | GET | `/admin/reports/export` | `{ type, format, from, to, branchId }` | `Blob` |

### sales/sales_features.md
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchOverview(branchId, range)` | GET | `/admin/sales/overview` | `branchId`, `range` query | `{ monthlyRevenue: OverviewDataPoint[] }` |
| `fetchReferralSources(branchId, range)` | GET | `/admin/sales/referral-sources` | `branchId`, `range` query | `ReferralDataPoint[]` |
| `fetchMembershipReport(branchId, range, search?)` | GET | `/admin/sales/membership-report` | `branchId`, `range`, optional `search` | `{ report: MembershipReportItem[]; totals: MembershipTotals }` |
| `fetchPendingPayments(params)` | GET | `/admin/sales/pending-payments` | `page`, `limit`, `search`, `branchId`, `range` | `{ members: PendingPaymentMember[]; total: number }` |
| `fetchAllMemberships(params)` | GET | `/admin/sales/all-memberships` | `page`, `limit`, `search`, `branchId`, `range` | `{ members: Member[]; total: number }` |

All browser API responses use the canonical `ApiResponse<T>` transport contract and module Zod schemas.

### settings/settings_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminSettingsApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

### subscriptions/subscriptions_features.md
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchSubscription()` | GET | `/admin/subscriptions/fetchSubscription` | — | `CurrentSubscription` |
| `fetchPlans()` | GET | `/admin/subscriptions/fetchPlans` | — | `SaaSPlan[]` |
| `fetchInvoices(params)` | GET | `/admin/subscriptions/fetchInvoices?page&limit` | `{ page, limit }` | `Invoice[]` + `PaginationMeta` |
| `fetchPaymentMethods()` | GET | `/admin/subscriptions/fetchPaymentMethods` | — | `PaymentMethod[]` |
| `fetchKPIs()` | GET | `/admin/subscriptions/fetchKPIs` | — | `SubscriptionKPIData` |
| `upgradePlan(planId, idempotencyKey)` | POST | `/admin/subscriptions/upgradePlan` | `planId` | `null` |
| `toggleAutoRenew(idempotencyKey)` | POST | `/admin/subscriptions/toggleAutoRenew` | — | `null` |
| `setDefaultPaymentMethod(id)` | POST | `/admin/subscriptions/setDefaultPaymentMethod` | `id` | `null` |
| `removePaymentMethod(id, idempotencyKey)` | DELETE | `/admin/subscriptions/removePaymentMethod` | `id` | `null` |

### usage/usage_features.md
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminUsageApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

// RESPONSIBILITY: Registers all tenant-scoped TypeORM entities for dynamic DataSources.
// FLOW: Tenant DataSource initialization -> AdminCoreTenantEntityRegistry -> PostgreSQL metadata.
import { AdminCoreAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-log.entity.js';
import { AdminCoreRealtimeEventEntity } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-event.entity.js';

import { AdminAnnouncementsEntity } from '@/backend_admin/admin_modules/admin_announcements/announcements_entities/admin-announcements-entity.js';
import { AdminAttendanceEntity } from '@/backend_admin/admin_modules/admin_attendance/attendance_entities/admin-attendance-entity.js';
import { AdminAuditLogsEntity } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_entities/admin-audit-logs-entity.js';
import { AdminBlacklistEntity } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_entities/admin-blacklist-entity.js';
import { AdminBranchesEntity } from '@/backend_admin/admin_modules/admin_branches/branches_entities/admin-branches-entity.js';
import { AdminCampaignsEntity } from '@/backend_admin/admin_modules/admin_campaigns/campaigns_entities/admin-campaigns-entity.js';
import { AdminCouponsEntity } from '@/backend_admin/admin_modules/admin_coupons/coupons_entities/admin-coupons-entity.js';
import { AdminDashboardEntity } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_entities/admin-dashboard-entity.js';
import { AdminDataExportEntity } from '@/backend_admin/admin_modules/admin_data-export/data-export_entities/admin-data-export-entity.js';
import { AdminFinanceEntity } from '@/backend_admin/admin_modules/admin_finance/finance_entities/admin-finance-entity.js';
import { AdminGymHealthAlertsEntity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_entities/admin-gym-health-alerts-entity.js';
import { AdminHrEntity } from '@/backend_admin/admin_modules/admin_hr/hr_entities/admin-hr-entity.js';
import { AdminMembersEntity } from '@/backend_admin/admin_modules/admin_members/members_entities/admin-members-entity.js';
import { AdminNotificationsEntity } from '@/backend_admin/admin_modules/admin_notifications/notifications_entities/admin-notifications-entity.js';
import { AdminPayoutsEntity } from '@/backend_admin/admin_modules/admin_payouts/payouts_entities/admin-payouts-entity.js';
import { AdminPermissionsEntity } from '@/backend_admin/admin_modules/admin_permissions/permissions_entities/admin-permissions-entity.js';
import { AdminPlansEntity } from '@/backend_admin/admin_modules/admin_plans/plans_entities/admin-plans-entity.js';
import { AdminProfileEntity } from '@/backend_admin/admin_modules/admin_profile/profile_entities/admin-profile-entity.js';
import { AdminReportsEntity } from '@/backend_admin/admin_modules/admin_reports/reports_entities/admin-reports-entity.js';
import { AdminSalesEntity } from '@/backend_admin/admin_modules/admin_sales/sales_entities/admin-sales-entity.js';
import { AdminSettingsEntity } from '@/backend_admin/admin_modules/admin_settings/settings_entities/admin-settings-entity.js';
import { AdminSubscriptionsEntity } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_entities/admin-subscriptions-entity.js';
import { AdminUsageEntity } from '@/backend_admin/admin_modules/admin_usage/usage_entities/admin-usage-entity.js';

export const AdminCoreTenantEntityRegistry = [AdminAnnouncementsEntity, AdminAttendanceEntity, AdminAuditLogsEntity, AdminBlacklistEntity, AdminBranchesEntity, AdminCampaignsEntity, AdminCouponsEntity, AdminDashboardEntity, AdminDataExportEntity, AdminFinanceEntity, AdminGymHealthAlertsEntity, AdminHrEntity, AdminMembersEntity, AdminNotificationsEntity, AdminPayoutsEntity, AdminPermissionsEntity, AdminPlansEntity, AdminProfileEntity, AdminReportsEntity, AdminSalesEntity, AdminSettingsEntity, AdminSubscriptionsEntity, AdminUsageEntity, AdminCoreAuditLogEntity, AdminCoreRealtimeEventEntity];
export const AdminCoreRealtimeEntityRegistry = [AdminCoreRealtimeEventEntity];

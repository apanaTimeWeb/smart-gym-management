// RESPONSIBILITY: Registers all tenant-scoped TypeORM entities for dynamic DataSources.
// FLOW: Tenant DataSource initialization -> CoreTenantEntityRegistry -> PostgreSQL metadata.

import { AdminAnnouncementsEntity } from '@/backend_admin/modules/admin/announcements/entities/admin-announcements-entity';
import { AdminAttendanceEntity } from '@/backend_admin/modules/admin/attendance/entities/admin-attendance-entity';
import { AdminAuditLogsEntity } from '@/backend_admin/modules/admin/audit_logs/entities/admin-audit_logs-entity';
import { AdminBlacklistEntity } from '@/backend_admin/modules/admin/blacklist/entities/admin-blacklist-entity';
import { AdminBranchesEntity } from '@/backend_admin/modules/admin/branches/entities/admin-branches-entity';
import { AdminCampaignsEntity } from '@/backend_admin/modules/admin/campaigns/entities/admin-campaigns-entity';
import { AdminCouponsEntity } from '@/backend_admin/modules/admin/coupons/entities/admin-coupons-entity';
import { AdminDashboardEntity } from '@/backend_admin/modules/admin/dashboard/entities/admin-dashboard-entity';
import { AdminDataExportEntity } from '@/backend_admin/modules/admin/data-export/entities/admin-data_export-entity';
import { AdminFinanceEntity } from '@/backend_admin/modules/admin/finance/entities/admin-finance-entity';
import { AdminGymHealthAlertsEntity } from '@/backend_admin/modules/admin/gym-health-alerts/entities/admin-gym_health_alerts-entity';
import { AdminHrEntity } from '@/backend_admin/modules/admin/hr/entities/admin-hr-entity';
import { AdminMembersEntity } from '@/backend_admin/modules/admin/members/entities/admin-members-entity';
import { AdminNotificationsEntity } from '@/backend_admin/modules/admin/notifications/entities/admin-notifications-entity';
import { AdminPayoutsEntity } from '@/backend_admin/modules/admin/payouts/entities/admin-payouts-entity';
import { AdminPermissionsEntity } from '@/backend_admin/modules/admin/permissions/entities/admin-permissions-entity';
import { AdminPlansEntity } from '@/backend_admin/modules/admin/plans/entities/admin-plans-entity';
import { AdminProfileEntity } from '@/backend_admin/modules/admin/profile/entities/admin-profile-entity';
import { AdminReportsEntity } from '@/backend_admin/modules/admin/reports/entities/admin-reports-entity';
import { AdminSalesEntity } from '@/backend_admin/modules/admin/sales/entities/admin-sales-entity';
import { AdminSettingsEntity } from '@/backend_admin/modules/admin/settings/entities/admin-settings-entity';
import { AdminSubscriptionsEntity } from '@/backend_admin/modules/admin/subscriptions/entities/admin-subscriptions-entity';
import { AdminUsageEntity } from '@/backend_admin/modules/admin/usage/entities/admin-usage-entity';
import { CoreAuditLogEntity } from '@/backend_admin/core/audit/core-audit-log.entity';

export const CoreTenantEntityRegistry = [AdminAnnouncementsEntity, AdminAttendanceEntity, AdminAuditLogsEntity, AdminBlacklistEntity, AdminBranchesEntity, AdminCampaignsEntity, AdminCouponsEntity, AdminDashboardEntity, AdminDataExportEntity, AdminFinanceEntity, AdminGymHealthAlertsEntity, AdminHrEntity, AdminMembersEntity, AdminNotificationsEntity, AdminPayoutsEntity, AdminPermissionsEntity, AdminPlansEntity, AdminProfileEntity, AdminReportsEntity, AdminSalesEntity, AdminSettingsEntity, AdminSubscriptionsEntity, AdminUsageEntity, CoreAuditLogEntity];

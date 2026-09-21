// RESPONSIBILITY: Registers all tenant-scoped TypeORM entities for dynamic DataSources.
// FLOW: Tenant DataSource initialization -> CoreTenantEntityRegistry -> PostgreSQL metadata.

import { AdminAnnouncementsEntity } from '@/modules/admin/announcements/entities/admin-announcements-entity';
import { AdminAttendanceEntity } from '@/modules/admin/attendance/entities/admin-attendance-entity';
import { AdminAuditLogsEntity } from '@/modules/admin/audit_logs/entities/admin-audit_logs-entity';
import { AdminBlacklistEntity } from '@/modules/admin/blacklist/entities/admin-blacklist-entity';
import { AdminBranchesEntity } from '@/modules/admin/branches/entities/admin-branches-entity';
import { AdminCampaignsEntity } from '@/modules/admin/campaigns/entities/admin-campaigns-entity';
import { AdminCouponsEntity } from '@/modules/admin/coupons/entities/admin-coupons-entity';
import { AdminDashboardEntity } from '@/modules/admin/dashboard/entities/admin-dashboard-entity';
import { AdminDataExportEntity } from '@/modules/admin/data-export/entities/admin-data_export-entity';
import { AdminFinanceEntity } from '@/modules/admin/finance/entities/admin-finance-entity';
import { AdminGymHealthAlertsEntity } from '@/modules/admin/gym-health-alerts/entities/admin-gym_health_alerts-entity';
import { AdminHrEntity } from '@/modules/admin/hr/entities/admin-hr-entity';
import { AdminMembersEntity } from '@/modules/admin/members/entities/admin-members-entity';
import { AdminNotificationsEntity } from '@/modules/admin/notifications/entities/admin-notifications-entity';
import { AdminPayoutsEntity } from '@/modules/admin/payouts/entities/admin-payouts-entity';
import { AdminPermissionsEntity } from '@/modules/admin/permissions/entities/admin-permissions-entity';
import { AdminPlansEntity } from '@/modules/admin/plans/entities/admin-plans-entity';
import { AdminProfileEntity } from '@/modules/admin/profile/entities/admin-profile-entity';
import { AdminReportsEntity } from '@/modules/admin/reports/entities/admin-reports-entity';
import { AdminSalesEntity } from '@/modules/admin/sales/entities/admin-sales-entity';
import { AdminSettingsEntity } from '@/modules/admin/settings/entities/admin-settings-entity';
import { AdminSubscriptionsEntity } from '@/modules/admin/subscriptions/entities/admin-subscriptions-entity';
import { AdminUsageEntity } from '@/modules/admin/usage/entities/admin-usage-entity';
import { CoreAuditLogEntity } from '@/core/audit/core-audit-log.entity';

export const CoreTenantEntityRegistry = [AdminAnnouncementsEntity, AdminAttendanceEntity, AdminAuditLogsEntity, AdminBlacklistEntity, AdminBranchesEntity, AdminCampaignsEntity, AdminCouponsEntity, AdminDashboardEntity, AdminDataExportEntity, AdminFinanceEntity, AdminGymHealthAlertsEntity, AdminHrEntity, AdminMembersEntity, AdminNotificationsEntity, AdminPayoutsEntity, AdminPermissionsEntity, AdminPlansEntity, AdminProfileEntity, AdminReportsEntity, AdminSalesEntity, AdminSettingsEntity, AdminSubscriptionsEntity, AdminUsageEntity, CoreAuditLogEntity];

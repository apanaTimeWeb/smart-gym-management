// RESPONSIBILITY: Orchestrates deterministic, idempotent seeding for the tenant database.
// FLOW: CLI -> tenant DataSource -> module-local seeders -> feature tables + audit trail.

import 'reflect-metadata';
import 'dotenv/config';
import tenantDataSource from '@/core/database/core-tenant-data-source';
import { CoreAuditLogEntity } from '@/core/audit/core-audit-log.entity';
import { AdminAnnouncementsSeeder } from '@/modules/admin/announcements/admin-announcements.seeder';
import { AdminAttendanceSeeder } from '@/modules/admin/attendance/admin-attendance.seeder';
import { AdminAuditLogsSeeder } from '@/modules/admin/audit_logs/admin-audit_logs.seeder';
import { AdminBlacklistSeeder } from '@/modules/admin/blacklist/admin-blacklist.seeder';
import { AdminBranchesSeeder } from '@/modules/admin/branches/admin-branches.seeder';
import { AdminCampaignsSeeder } from '@/modules/admin/campaigns/admin-campaigns.seeder';
import { AdminCouponsSeeder } from '@/modules/admin/coupons/admin-coupons.seeder';
import { AdminDashboardSeeder } from '@/modules/admin/dashboard/admin-dashboard.seeder';
import { AdminDataExportSeeder } from '@/modules/admin/data-export/admin-data_export.seeder';
import { AdminFinanceSeeder } from '@/modules/admin/finance/admin-finance.seeder';
import { AdminGymHealthAlertsSeeder } from '@/modules/admin/gym-health-alerts/admin-gym_health_alerts.seeder';
import { AdminHrSeeder } from '@/modules/admin/hr/admin-hr.seeder';
import { AdminMembersSeeder } from '@/modules/admin/members/admin-members.seeder';
import { AdminNotificationsSeeder } from '@/modules/admin/notifications/admin-notifications.seeder';
import { AdminPayoutsSeeder } from '@/modules/admin/payouts/admin-payouts.seeder';
import { AdminPermissionsSeeder } from '@/modules/admin/permissions/admin-permissions.seeder';
import { AdminPlansSeeder } from '@/modules/admin/plans/admin-plans.seeder';
import { AdminProfileSeeder } from '@/modules/admin/profile/admin-profile.seeder';
import { AdminReportsSeeder } from '@/modules/admin/reports/admin-reports.seeder';
import { AdminSalesSeeder } from '@/modules/admin/sales/admin-sales.seeder';
import { AdminSettingsSeeder } from '@/modules/admin/settings/admin-settings.seeder';
import { AdminSubscriptionsSeeder } from '@/modules/admin/subscriptions/admin-subscriptions.seeder';
import { AdminUsageSeeder } from '@/modules/admin/usage/admin-usage.seeder';
async function seedTenant(): Promise<void> {
  await tenantDataSource.initialize();
  await new AdminAnnouncementsSeeder().seed(tenantDataSource);
  await new AdminAttendanceSeeder().seed(tenantDataSource);
  await new AdminAuditLogsSeeder().seed(tenantDataSource);
  await new AdminBlacklistSeeder().seed(tenantDataSource);
  await new AdminBranchesSeeder().seed(tenantDataSource);
  await new AdminCampaignsSeeder().seed(tenantDataSource);
  await new AdminCouponsSeeder().seed(tenantDataSource);
  await new AdminDashboardSeeder().seed(tenantDataSource);
  await new AdminDataExportSeeder().seed(tenantDataSource);
  await new AdminFinanceSeeder().seed(tenantDataSource);
  await new AdminGymHealthAlertsSeeder().seed(tenantDataSource);
  await new AdminHrSeeder().seed(tenantDataSource);
  await new AdminMembersSeeder().seed(tenantDataSource);
  await new AdminNotificationsSeeder().seed(tenantDataSource);
  await new AdminPayoutsSeeder().seed(tenantDataSource);
  await new AdminPermissionsSeeder().seed(tenantDataSource);
  await new AdminPlansSeeder().seed(tenantDataSource);
  await new AdminProfileSeeder().seed(tenantDataSource);
  await new AdminReportsSeeder().seed(tenantDataSource);
  await new AdminSalesSeeder().seed(tenantDataSource);
  await new AdminSettingsSeeder().seed(tenantDataSource);
  await new AdminSubscriptionsSeeder().seed(tenantDataSource);
  await new AdminUsageSeeder().seed(tenantDataSource);
  const auditRepository = tenantDataSource.getRepository(CoreAuditLogEntity);
  if ((await auditRepository.count()) === 0) {
    await auditRepository.save(auditRepository.create({
      actorId: '00000000-0000-0000-0000-000000000901',
      actorRole: 'ADMIN',
      action: 'TENANT_SEEDED',
      entityType: 'Tenant',
      entityId: '00000000-0000-0000-0000-000000000001',
      oldValue: null,
      newValue: { seeded: true },
      ipAddress: null,
      timestamp: new Date(),
      severity: 'low',
      module: 'core',
    }));
  }
  await tenantDataSource.destroy();
}

void seedTenant().catch(async () => {
  if (tenantDataSource.isInitialized) await tenantDataSource.destroy();
  process.exitCode = 1;
});

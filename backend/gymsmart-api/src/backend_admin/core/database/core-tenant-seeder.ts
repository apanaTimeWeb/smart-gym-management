// RESPONSIBILITY: Orchestrates deterministic, idempotent seeding for the tenant database.
// FLOW: CLI -> tenant DataSource -> module-local seeders -> feature tables + audit trail.

import 'reflect-metadata';
import 'dotenv/config';
import tenantDataSource from '@/backend_admin/core/database/core-tenant-data-source';
import { CoreAuditLogEntity } from '@/backend_admin/core/audit/core-audit-log.entity';
import { AdminAnnouncementsSeeder } from '@/backend_admin/modules/admin/announcements/admin-announcements.seeder';
import { AdminAttendanceSeeder } from '@/backend_admin/modules/admin/attendance/admin-attendance.seeder';
import { AdminAuditLogsSeeder } from '@/backend_admin/modules/admin/audit_logs/admin-audit_logs.seeder';
import { AdminBlacklistSeeder } from '@/backend_admin/modules/admin/blacklist/admin-blacklist.seeder';
import { AdminBranchesSeeder } from '@/backend_admin/modules/admin/branches/admin-branches.seeder';
import { AdminCampaignsSeeder } from '@/backend_admin/modules/admin/campaigns/admin-campaigns.seeder';
import { AdminCouponsSeeder } from '@/backend_admin/modules/admin/coupons/admin-coupons.seeder';
import { AdminDashboardSeeder } from '@/backend_admin/modules/admin/dashboard/admin-dashboard.seeder';
import { AdminDataExportSeeder } from '@/backend_admin/modules/admin/data-export/admin-data_export.seeder';
import { AdminFinanceSeeder } from '@/backend_admin/modules/admin/finance/admin-finance.seeder';
import { AdminGymHealthAlertsSeeder } from '@/backend_admin/modules/admin/gym-health-alerts/admin-gym_health_alerts.seeder';
import { AdminHrSeeder } from '@/backend_admin/modules/admin/hr/admin-hr.seeder';
import { AdminMembersSeeder } from '@/backend_admin/modules/admin/members/admin-members.seeder';
import { AdminNotificationsSeeder } from '@/backend_admin/modules/admin/notifications/admin-notifications.seeder';
import { AdminPayoutsSeeder } from '@/backend_admin/modules/admin/payouts/admin-payouts.seeder';
import { AdminPermissionsSeeder } from '@/backend_admin/modules/admin/permissions/admin-permissions.seeder';
import { AdminPlansSeeder } from '@/backend_admin/modules/admin/plans/admin-plans.seeder';
import { AdminProfileSeeder } from '@/backend_admin/modules/admin/profile/admin-profile.seeder';
import { AdminReportsSeeder } from '@/backend_admin/modules/admin/reports/admin-reports.seeder';
import { AdminSalesSeeder } from '@/backend_admin/modules/admin/sales/admin-sales.seeder';
import { AdminSettingsSeeder } from '@/backend_admin/modules/admin/settings/admin-settings.seeder';
import { AdminSubscriptionsSeeder } from '@/backend_admin/modules/admin/subscriptions/admin-subscriptions.seeder';
import { AdminUsageSeeder } from '@/backend_admin/modules/admin/usage/admin-usage.seeder';
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

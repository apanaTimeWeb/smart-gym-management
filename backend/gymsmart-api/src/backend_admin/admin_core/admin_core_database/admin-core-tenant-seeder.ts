// RESPONSIBILITY: Orchestrates deterministic, idempotent seeding for the tenant database.
// FLOW: CLI -> tenant DataSource -> module-local seeders -> feature tables + audit trail.
import 'dotenv/config';
import 'reflect-metadata';

import { AdminCoreAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-log.entity.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';
import tenantDataSource from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.js';

import { AdminAnnouncementsSeeder } from '@/backend_admin/admin_modules/admin_announcements/admin-announcements.seeder.js';
import { AdminAttendanceSeeder } from '@/backend_admin/admin_modules/admin_attendance/admin-attendance.seeder.js';
import { AdminAuditLogsSeeder } from '@/backend_admin/admin_modules/admin_audit_logs/admin-audit-logs.seeder.js';
import { AdminBlacklistSeeder } from '@/backend_admin/admin_modules/admin_blacklist/admin-blacklist.seeder.js';
import { AdminBranchesSeeder } from '@/backend_admin/admin_modules/admin_branches/admin-branches.seeder.js';
import { AdminCampaignsSeeder } from '@/backend_admin/admin_modules/admin_campaigns/admin-campaigns.seeder.js';
import { AdminCouponsSeeder } from '@/backend_admin/admin_modules/admin_coupons/admin-coupons.seeder.js';
import { AdminDashboardSeeder } from '@/backend_admin/admin_modules/admin_dashboard/admin-dashboard.seeder.js';
import { AdminDataExportSeeder } from '@/backend_admin/admin_modules/admin_data-export/admin-data-export.seeder.js';
import { AdminFinanceSeeder } from '@/backend_admin/admin_modules/admin_finance/admin-finance.seeder.js';
import { AdminGymHealthAlertsSeeder } from '@/backend_admin/admin_modules/admin_gym-health-alerts/admin-gym-health-alerts.seeder.js';
import { AdminHrSeeder } from '@/backend_admin/admin_modules/admin_hr/admin-hr.seeder.js';
import { AdminMembersSeeder } from '@/backend_admin/admin_modules/admin_members/admin-members.seeder.js';
import { AdminNotificationsSeeder } from '@/backend_admin/admin_modules/admin_notifications/admin-notifications.seeder.js';
import { AdminPayoutsSeeder } from '@/backend_admin/admin_modules/admin_payouts/admin-payouts.seeder.js';
import { AdminPermissionsSeeder } from '@/backend_admin/admin_modules/admin_permissions/admin-permissions.seeder.js';
import { AdminPlansSeeder } from '@/backend_admin/admin_modules/admin_plans/admin-plans.seeder.js';
import { AdminProfileSeeder } from '@/backend_admin/admin_modules/admin_profile/admin-profile.seeder.js';
import { AdminReportsSeeder } from '@/backend_admin/admin_modules/admin_reports/admin-reports.seeder.js';
import { AdminSalesSeeder } from '@/backend_admin/admin_modules/admin_sales/admin-sales.seeder.js';
import { AdminSettingsSeeder } from '@/backend_admin/admin_modules/admin_settings/admin-settings.seeder.js';
import { AdminSubscriptionsSeeder } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.seeder.js';
import { AdminUsageSeeder } from '@/backend_admin/admin_modules/admin_usage/admin-usage.seeder.js';

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
  const auditRepository = tenantDataSource.getRepository(AdminCoreAuditLogEntity);
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
      severity: AdminCoreAuditSeverity.LOW,
      module: 'core',
    }));
  }
  await tenantDataSource.destroy();
}

void seedTenant().catch(async () => {
  if (tenantDataSource.isInitialized) await tenantDataSource.destroy();
  process.exitCode = 1;
});

// RESPONSIBILITY: Aggregates the complete Admin backend role/domain into one explicit NestJS module.
// FLOW: Application root -> BackendAdminModule -> AdminCoreModule + Admin feature modules.
import { Module } from '@nestjs/common';
import { AdminCoreModule } from '@/backend_admin/admin_core/admin-core.module';
import { AdminAnnouncementsModule } from '@/backend_admin/admin_modules/admin_announcements/admin-announcements.module';
import { AdminAttendanceModule } from '@/backend_admin/admin_modules/admin_attendance/admin-attendance.module';
import { AdminAuditLogsModule } from '@/backend_admin/admin_modules/admin_audit_logs/admin-audit-logs.module';
import { AdminBlacklistModule } from '@/backend_admin/admin_modules/admin_blacklist/admin-blacklist.module';
import { AdminBranchesModule } from '@/backend_admin/admin_modules/admin_branches/admin-branches.module';
import { AdminCampaignsModule } from '@/backend_admin/admin_modules/admin_campaigns/admin-campaigns.module';
import { AdminCouponsModule } from '@/backend_admin/admin_modules/admin_coupons/admin-coupons.module';
import { AdminDashboardModule } from '@/backend_admin/admin_modules/admin_dashboard/admin-dashboard.module';
import { AdminDataExportModule } from '@/backend_admin/admin_modules/admin_data-export/admin-data-export.module';
import { AdminFinanceModule } from '@/backend_admin/admin_modules/admin_finance/admin-finance.module';
import { AdminGymHealthAlertsModule } from '@/backend_admin/admin_modules/admin_gym-health-alerts/admin-gym-health-alerts.module';
import { AdminHrModule } from '@/backend_admin/admin_modules/admin_hr/admin-hr.module';
import { AdminMembersModule } from '@/backend_admin/admin_modules/admin_members/admin-members.module';
import { AdminNotificationsModule } from '@/backend_admin/admin_modules/admin_notifications/admin-notifications.module';
import { AdminPayoutsModule } from '@/backend_admin/admin_modules/admin_payouts/admin-payouts.module';
import { AdminPermissionsModule } from '@/backend_admin/admin_modules/admin_permissions/admin-permissions.module';
import { AdminPlansModule } from '@/backend_admin/admin_modules/admin_plans/admin-plans.module';
import { AdminProfileModule } from '@/backend_admin/admin_modules/admin_profile/admin-profile.module';
import { AdminReportsModule } from '@/backend_admin/admin_modules/admin_reports/admin-reports.module';
import { AdminSalesModule } from '@/backend_admin/admin_modules/admin_sales/admin-sales.module';
import { AdminSettingsModule } from '@/backend_admin/admin_modules/admin_settings/admin-settings.module';
import { AdminSubscriptionsModule } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.module';
import { AdminUsageModule } from '@/backend_admin/admin_modules/admin_usage/admin-usage.module';

/**
 * Primary Intent: Defines BackendAdminModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [
    AdminCoreModule,
    AdminAnnouncementsModule,
    AdminAttendanceModule,
    AdminAuditLogsModule,
    AdminBlacklistModule,
    AdminBranchesModule,
    AdminCampaignsModule,
    AdminCouponsModule,
    AdminDashboardModule,
    AdminDataExportModule,
    AdminFinanceModule,
    AdminGymHealthAlertsModule,
    AdminHrModule,
    AdminMembersModule,
    AdminNotificationsModule,
    AdminPayoutsModule,
    AdminPermissionsModule,
    AdminPlansModule,
    AdminProfileModule,
    AdminReportsModule,
    AdminSalesModule,
    AdminSettingsModule,
    AdminSubscriptionsModule,
    AdminUsageModule,
  ],
  exports: [AdminCoreModule],
})
/**
 * Primary Intent: Defines BackendAdminModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class BackendAdminModule {}

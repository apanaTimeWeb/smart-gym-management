import { Module } from '@nestjs/common';
import { AdminAnnouncementsModule } from '@/backend_admin/modules/admin/announcements/admin-announcements.module';
import { AdminAttendanceModule } from '@/backend_admin/modules/admin/attendance/admin-attendance.module';
import { AdminAuditLogsModule } from '@/backend_admin/modules/admin/audit_logs/admin-audit_logs.module';
import { AdminBlacklistModule } from '@/backend_admin/modules/admin/blacklist/admin-blacklist.module';
import { AdminBranchesModule } from '@/backend_admin/modules/admin/branches/admin-branches.module';
import { AdminCampaignsModule } from '@/backend_admin/modules/admin/campaigns/admin-campaigns.module';
import { AdminCouponsModule } from '@/backend_admin/modules/admin/coupons/admin-coupons.module';
import { AdminDashboardModule } from '@/backend_admin/modules/admin/dashboard/admin-dashboard.module';
import { AdminDataExportModule } from '@/backend_admin/modules/admin/data-export/admin-data_export.module';
import { AdminFinanceModule } from '@/backend_admin/modules/admin/finance/admin-finance.module';
import { AdminGymHealthAlertsModule } from '@/backend_admin/modules/admin/gym-health-alerts/admin-gym_health_alerts.module';
import { AdminHrModule } from '@/backend_admin/modules/admin/hr/admin-hr.module';
import { AdminMembersModule } from '@/backend_admin/modules/admin/members/admin-members.module';
import { AdminNotificationsModule } from '@/backend_admin/modules/admin/notifications/admin-notifications.module';
import { AdminPayoutsModule } from '@/backend_admin/modules/admin/payouts/admin-payouts.module';
import { AdminPermissionsModule } from '@/backend_admin/modules/admin/permissions/admin-permissions.module';
import { AdminPlansModule } from '@/backend_admin/modules/admin/plans/admin-plans.module';
import { AdminProfileModule } from '@/backend_admin/modules/admin/profile/admin-profile.module';
import { AdminReportsModule } from '@/backend_admin/modules/admin/reports/admin-reports.module';
import { AdminSalesModule } from '@/backend_admin/modules/admin/sales/admin-sales.module';
import { AdminSettingsModule } from '@/backend_admin/modules/admin/settings/admin-settings.module';
import { AdminSubscriptionsModule } from '@/backend_admin/modules/admin/subscriptions/admin-subscriptions.module';
import { AdminUsageModule } from '@/backend_admin/modules/admin/usage/admin-usage.module';

@Module({
  imports: [
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
  exports: [
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
  ]
})
export class AdminDomainModule {}

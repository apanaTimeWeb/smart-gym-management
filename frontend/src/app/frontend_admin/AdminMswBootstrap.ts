// RESPONSIBILITY: Registers Admin module MSW handler groups without owning feature business logic.
// DATA FLOW: Global MSW bootstrap → AdminMswBootstrap → module-owned handlers → module-owned fixtures → API clients/UI.
import { adminAnnouncementsMockHandlers } from '@/app/frontend_admin/admin_announcements/admin_announcements_mocks/admin_announcements_handlers/AdminAnnouncementsMockHandlers';
import { adminAttendanceMockHandlers } from '@/app/frontend_admin/admin_attendance/admin_attendance_mocks/admin_attendance_handlers/AdminAttendanceMockHandlers';
import { adminAuditLogsMockHandlers } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_mocks/admin_audit_logs_handlers/AdminAuditLogsMockHandlers';
import { adminBlacklistMockHandlers } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_mocks/admin_blacklist_handlers/AdminBlacklistMockHandlers';
import { adminBranchesMockHandlers } from '@/app/frontend_admin/admin_branches/admin_branches_mocks/admin_branches_handlers/AdminBranchesMockHandlers';
import { adminCouponsMockHandlers } from '@/app/frontend_admin/admin_coupons/admin_coupons_mocks/admin_coupons_handlers/AdminCouponsMockHandlers';
import { adminCampaignsMockHandlers } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_mocks/admin_campaigns_handlers/AdminCampaignsMockHandlers';
import { adminDashboardMockHandlers } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_mocks/admin_dashboard_handlers/AdminDashboardMockHandlers';
import { adminFinanceMockHandlers } from '@/app/frontend_admin/admin_finance/admin_finance_mocks/admin_finance_handlers/AdminFinanceMockHandlers';
import { adminGymHealthAlertsMockHandlers } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_mocks/admin_gym_health_alerts_handlers/AdminGymHealthAlertsMockHandlers';
import { adminHrMockHandlers } from '@/app/frontend_admin/admin_hr/admin_hr_mocks/admin_hr_handlers/AdminHrMockHandlers';
import { adminMembersMockHandlers } from '@/app/frontend_admin/admin_members/admin_members_mocks/admin_members_handlers/AdminMembersMockHandlers';
import { adminNotificationsMockHandlers } from '@/app/frontend_admin/admin_notifications/admin_notifications_mocks/admin_notifications_handlers/AdminNotificationsMockHandlers';
import { adminPayoutsMockHandlers } from '@/app/frontend_admin/admin_payouts/admin_payouts_mocks/admin_payouts_handlers/AdminPayoutsMockHandlers';
import { adminPermissionsMockHandlers } from '@/app/frontend_admin/admin_permissions/admin_permissions_mocks/admin_permissions_handlers/AdminPermissionsMockHandlers';
import { adminPlansMockHandlers } from '@/app/frontend_admin/admin_plans/admin_plans_mocks/admin_plans_handlers/AdminPlansMockHandlers';
import { adminProfileMockHandlers } from '@/app/frontend_admin/admin_profile/admin_profile_mocks/admin_profile_handlers/AdminProfileMockHandlers';
import { adminReportsMockHandlers } from '@/app/frontend_admin/admin_reports/admin_reports_mocks/admin_reports_handlers/AdminReportsMockHandlers';
import { adminSalesMockHandlers } from '@/app/frontend_admin/admin_sales/admin_sales_mocks/admin_sales_handlers/AdminSalesMockHandlers';
import { adminSettingsMockHandlers } from '@/app/frontend_admin/admin_settings/admin_settings_mocks/admin_settings_handlers/AdminSettingsMockHandlers';
import { adminSubscriptionsMockHandlers } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_mocks/admin_subscriptions_handlers/AdminSubscriptionsMockHandlers';
import { adminUsageMockHandlers } from '@/app/frontend_admin/admin_usage/admin_usage_mocks/admin_usage_handlers/AdminUsageMockHandlers';

import { adminMembersBranchReferenceMockHandlers } from '@/app/frontend_admin/admin_members/admin_members_mocks/admin_members_handlers/AdminMembersBranchReferenceMockHandlers';
import { adminAttendanceBranchReferenceMockHandlers } from '@/app/frontend_admin/admin_attendance/admin_attendance_mocks/admin_attendance_handlers/AdminAttendanceBranchReferenceMockHandlers';
import { adminHrBranchReferenceMockHandlers } from '@/app/frontend_admin/admin_hr/admin_hr_mocks/admin_hr_handlers/AdminHrBranchReferenceMockHandlers';
import { adminReportsBranchReferenceMockHandlers } from '@/app/frontend_admin/admin_reports/admin_reports_mocks/admin_reports_handlers/AdminReportsBranchReferenceMockHandlers';
export const adminHandlers = [
  ...adminMembersBranchReferenceMockHandlers,
  ...adminAttendanceBranchReferenceMockHandlers,
  ...adminHrBranchReferenceMockHandlers,
  ...adminReportsBranchReferenceMockHandlers,
  ...adminAnnouncementsMockHandlers,
  ...adminAttendanceMockHandlers,
  ...adminAuditLogsMockHandlers,
  ...adminBlacklistMockHandlers,
  ...adminBranchesMockHandlers,
  ...adminCouponsMockHandlers,
  ...adminCampaignsMockHandlers,
  ...adminDashboardMockHandlers,
  ...adminFinanceMockHandlers,
  ...adminGymHealthAlertsMockHandlers,
  ...adminHrMockHandlers,
  ...adminMembersMockHandlers,
  ...adminNotificationsMockHandlers,
  ...adminPayoutsMockHandlers,
  ...adminPermissionsMockHandlers,
  ...adminPlansMockHandlers,
  ...adminProfileMockHandlers,
  ...adminReportsMockHandlers,
  ...adminSalesMockHandlers,
  ...adminSettingsMockHandlers,
  ...adminSubscriptionsMockHandlers,
  ...adminUsageMockHandlers,
];

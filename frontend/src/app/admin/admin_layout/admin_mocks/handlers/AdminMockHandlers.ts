// RESPONSIBILITY: Registers Admin module MSW handler groups without owning feature business logic.
// DATA FLOW: Global MSW bootstrap → AdminMockHandlers → module-owned handlers → module-owned fixtures → API clients/UI.
import { adminAnnouncementsMockHandlers } from '@/app/admin/announcements/announcements_mocks/handlers/AdminAnnouncementsMockHandlers';
import { adminAttendanceMockHandlers } from '@/app/admin/attendance/attendance_mocks/handlers/AdminAttendanceMockHandlers';
import { adminAuditLogsMockHandlers } from '@/app/admin/audit_logs/audit_logs_mocks/handlers/AdminAuditLogsMockHandlers';
import { adminBlacklistMockHandlers } from '@/app/admin/blacklist/blacklist_mocks/handlers/AdminBlacklistMockHandlers';
import { adminBranchesMockHandlers } from '@/app/admin/branches/branches_mocks/handlers/AdminBranchesMockHandlers';
import { adminCouponsMockHandlers } from '@/app/admin/coupons/coupons_mocks/handlers/AdminCouponsMockHandlers';
import { adminCampaignsMockHandlers } from '@/app/admin/campaigns/campaigns_mocks/handlers/AdminCampaignsMockHandlers';
import { adminDashboardMockHandlers } from '@/app/admin/dashboard/dashboard_mocks/handlers/AdminDashboardMockHandlers';
import { adminDataExportMockHandlers } from '@/app/admin/data-export/data-export_mocks/handlers/AdminDataExportMockHandlers';
import { adminFinanceMockHandlers } from '@/app/admin/finance/finance_mocks/handlers/AdminFinanceMockHandlers';
import { adminGymHealthAlertsMockHandlers } from '@/app/admin/gym-health-alerts/gym-health-alerts_mocks/handlers/AdminGymHealthAlertsMockHandlers';
import { adminHrMockHandlers } from '@/app/admin/hr/hr_mocks/handlers/AdminHrMockHandlers';
import { adminMembersMockHandlers } from '@/app/admin/members/members_mocks/handlers/AdminMembersMockHandlers';
import { adminNotificationsMockHandlers } from '@/app/admin/notifications/notifications_mocks/handlers/AdminNotificationsMockHandlers';
import { adminPayoutsMockHandlers } from '@/app/admin/payouts/payouts_mocks/handlers/AdminPayoutsMockHandlers';
import { adminPermissionsMockHandlers } from '@/app/admin/permissions/permissions_mocks/handlers/AdminPermissionsMockHandlers';
import { adminPlansMockHandlers } from '@/app/admin/plans/plans_mocks/handlers/AdminPlansMockHandlers';
import { adminProfileMockHandlers } from '@/app/admin/profile/profile_mocks/handlers/AdminProfileMockHandlers';
import { adminReportsMockHandlers } from '@/app/admin/reports/reports_mocks/handlers/AdminReportsMockHandlers';
import { adminSalesMockHandlers } from '@/app/admin/sales/sales_mocks/handlers/AdminSalesMockHandlers';
import { adminSettingsMockHandlers } from '@/app/admin/settings/settings_mocks/handlers/AdminSettingsMockHandlers';
import { adminSubscriptionsMockHandlers } from '@/app/admin/subscriptions/subscriptions_mocks/handlers/AdminSubscriptionsMockHandlers';
import { adminUsageMockHandlers } from '@/app/admin/usage/usage_mocks/handlers/AdminUsageMockHandlers';

import { adminMembersBranchReferenceMockHandlers } from '@/app/admin/members/members_mocks/handlers/AdminMembersBranchReferenceMockHandlers';
import { adminAttendanceBranchReferenceMockHandlers } from '@/app/admin/attendance/attendance_mocks/handlers/AdminAttendanceBranchReferenceMockHandlers';
import { adminHrBranchReferenceMockHandlers } from '@/app/admin/hr/hr_mocks/handlers/AdminHrBranchReferenceMockHandlers';
import { adminReportsBranchReferenceMockHandlers } from '@/app/admin/reports/reports_mocks/handlers/AdminReportsBranchReferenceMockHandlers';
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
  ...adminDataExportMockHandlers,
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

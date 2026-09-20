import { http, HttpResponse } from "msw";
import { superadminGymsHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { superadminDashboardHandlers } from '@/app/superadmin/dashboard/dashboard_mocks/handlers/SuperadminDashboardMockHandlers';
import { superadminPlansHandlers } from '@/app/superadmin/saas-billing/plans/plans_mocks/handlers/SuperadminPlansMockHandlers';
import { superadminSettingsHandlers } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsMockHandlers';
import { superadminMigrationsHandlers } from '@/app/superadmin/system-ops/migrations/migrations_mocks/handlers/SuperadminMigrationsMockHandlers';
import { superadminInfrastructureHandlers } from '@/app/superadmin/system-ops/infrastructure/infrastructure_mocks/handlers/SuperadminInfrastructureMockHandlers';
import { superadminJobsHandlers } from '@/app/superadmin/system-ops/jobs/jobs_mocks/handlers/SuperadminJobsMockHandlers';
import { superadminBroadcastsHandlers } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import { superadminGlobalAuditHandlers } from '@/app/superadmin/global-audit/global-audit_mocks/handlers/SuperadminGlobalAuditMockHandlers';
import { superadminUsageMetersHandlers } from '@/app/superadmin/usage-meters/usage-meters_mocks/handlers/SuperadminUsageMetersMockHandlers';
import { superadminProfileHandlers } from '@/app/superadmin/profile/profile_mocks/handlers/SuperadminProfileMockHandlers';
import { superadminTicketsHandlers } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsMockHandlers';
import { superadminReportsHandlers } from '@/app/superadmin/reports/reports_mocks/handlers/SuperadminReportsMockHandlers';
import { superadminMessagingHandlers } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { superadminInvoicesHandlers } from '@/app/superadmin/saas-billing/invoices/invoices_mocks/handlers/SuperadminInvoicesMockHandlers';
import { superadminFeaturesHandlers } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesMockHandlers';
import { superadminCouponsHandlers } from '@/app/superadmin/saas-billing/coupons/coupons_mocks/handlers/SuperadminCouponsMockHandlers';
import { superadminAnalyticsHandlers } from '@/app/superadmin/analytics/analytics_mocks/handlers/SuperadminAnalyticsMockHandlers';
import { superadminAffiliatesHandlers } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';
import { superadminWhiteLabelingHandlers } from '@/app/superadmin/white-labeling/white-labeling_mocks/handlers/SuperadminWhiteLabelingMockHandlers';

import { adminHandlers } from '@/app/admin/admin_layout/admin_mocks/handlers/AdminMockHandlers';
import { AuthMockHandlers } from '@/app/auth/auth_mocks/AuthMockHandlers';
import { landingHandlers } from '@/app/landing/landing_mocks/LandingMockHandlers';
import { managerHandlers } from '@/app/manager/manager_mocks/ManagerMockHandlers';

import { trainerAttendanceHandlers } from '@/app/trainer/attendance/attendance_mocks/handlers/TrainerAttendanceMockHandlers';
import { trainerDashboardHandlers } from '@/app/trainer/dashboard/dashboard_mocks/handlers/TrainerDashboardMockHandlers';
import { trainerEarningsHandlers } from '@/app/trainer/earnings/earnings_mocks/handlers/TrainerEarningsMockHandlers';
import { trainerMembersHandlers } from '@/app/trainer/members/members_mocks/handlers/TrainerMembersMockHandlers';
import { trainerProgressHandlers } from '@/app/trainer/progress-tracking/progress-tracking_mocks/handlers/TrainerProgressMockHandlers';
import { trainerScheduleHandlers } from '@/app/trainer/schedule/schedule_mocks/handlers/TrainerScheduleMockHandlers';
import { trainerSessionsHandlers } from '@/app/trainer/sessions/sessions_mocks/handlers/TrainerSessionsMockHandlers';
import { trainerWorkoutMockHandlers } from '@/app/trainer/workout/workout_mocks/handlers/TrainerWorkoutMockHandlers';
import { trainerLibraryHandlers } from '@/app/trainer/library/library_mocks/handlers/TrainerLibraryMockHandlers';
import { trainerProfileHandlers } from '@/app/trainer/profile/profile_mocks/handlers/TrainerProfileMockHandlers';
import { trainerNotificationsHandlers } from '@/app/trainer/notifications/notifications_mocks/handlers/TrainerNotificationsMockHandlers';

export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
  ...adminHandlers,
  ...AuthMockHandlers,
  ...landingHandlers,
  ...managerHandlers,
  ...superadminGymsHandlers,
  ...superadminDashboardHandlers,
  ...superadminPlansHandlers,
  ...superadminSettingsHandlers,
  ...superadminMigrationsHandlers,
  ...superadminInfrastructureHandlers,
  ...superadminJobsHandlers,
  ...superadminBroadcastsHandlers,
  ...superadminGlobalAuditHandlers,
  ...superadminUsageMetersHandlers,
  ...superadminProfileHandlers,
  ...superadminTicketsHandlers,
  ...superadminReportsHandlers,
  ...superadminMessagingHandlers,
  ...superadminInvoicesHandlers,
  ...superadminFeaturesHandlers,
  ...superadminCouponsHandlers,
  ...superadminAnalyticsHandlers,
  ...superadminAffiliatesHandlers,
  ...superadminWhiteLabelingHandlers,
  ...trainerAttendanceHandlers,
  ...trainerDashboardHandlers,
  ...trainerEarningsHandlers,
  ...trainerMembersHandlers,
  ...trainerProgressHandlers,
  ...trainerScheduleHandlers,
  ...trainerSessionsHandlers,
  ...trainerWorkoutMockHandlers,
  ...trainerLibraryHandlers,
  ...trainerProfileHandlers,
  ...trainerNotificationsHandlers,
];

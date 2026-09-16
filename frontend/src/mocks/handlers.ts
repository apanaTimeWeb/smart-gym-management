import { http, HttpResponse } from "msw";
import { superadminGymsHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { superadminDashboardHandlers } from '@/app/superadmin/dashboard/dashboard_mocks/handlers/SuperadminDashboardMockHandlers';
import { superadminPlansHandlers } from '@/app/superadmin/plans/plans_mocks/handlers/SuperadminPlansMockHandlers';
import { superadminSystemHandlers } from '@/app/superadmin/system/system_mocks/handlers/SuperadminSystemMockHandlers';
import { superadminSettingsHandlers } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsMockHandlers';
import { superadminMigrationsHandlers } from '@/app/superadmin/migrations/migrations_mocks/handlers/SuperadminMigrationsMockHandlers';
import { superadminInfrastructureHandlers } from '@/app/superadmin/infrastructure/infrastructure_mocks/handlers/SuperadminInfrastructureMockHandlers';
import { superadminJobsHandlers } from '@/app/superadmin/jobs/jobs_mocks/handlers/SuperadminJobsMockHandlers';
import { superadminBroadcastsHandlers } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import { superadminGlobalAuditHandlers } from '@/app/superadmin/global-audit/global-audit_mocks/handlers/SuperadminGlobalAuditMockHandlers';
import { superadminUsageMetersHandlers } from '@/app/superadmin/usage-meters/usage-meters_mocks/handlers/SuperadminUsageMetersMockHandlers';
import { superadminProfileHandlers } from '@/app/superadmin/profile/profile_mocks/handlers/SuperadminProfileMockHandlers';
import { superadminTicketsHandlers } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsMockHandlers';
import { superadminReportsHandlers } from '@/app/superadmin/reports/reports_mocks/handlers/SuperadminReportsMockHandlers';
import { superadminOnboardingHandlers } from '@/app/superadmin/onboarding/onboarding_mocks/handlers/SuperadminOnboardingMockHandlers';
import { superadminMessagingHandlers } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { superadminInvoicesHandlers } from '@/app/superadmin/invoices/invoices_mocks/handlers/SuperadminInvoicesMockHandlers';
import { superadminFranchisesHandlers } from '@/app/superadmin/franchises/franchises_mocks/handlers/SuperadminFranchisesMockHandlers';
import { superadminFeaturesHandlers } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesMockHandlers';
import { superadminCancellationsHandlers } from '@/app/superadmin/cancellations/cancellations_mocks/handlers/SuperadminCancellationsMockHandlers';
import { superadminCouponsHandlers } from '@/app/superadmin/coupons/coupons_mocks/handlers/SuperadminCouponsMockHandlers';
import { superadminBranchesHandlers } from '@/app/superadmin/branches/branches_mocks/handlers/SuperadminBranchesMockHandlers';
import { superadminAnalyticsHandlers } from '@/app/superadmin/analytics/analytics_mocks/handlers/SuperadminAnalyticsMockHandlers';
import { superadminAffiliatesHandlers } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';

import { adminHandlers } from '@/app/admin/admin_mocks/handlers/AdminMockHandlers';
import { authHandlers } from './handlers/auth.handlers';
import { landingHandlers } from './handlers/landing.handlers';
import { managerWorkoutHandlers } from './handlers/manager-workout.handlers';
import { managerStoreHandlers } from './handlers/manager-store.handlers';
import { managerSettingsHandlers } from './handlers/manager-settings.handlers';
import { managerSalesHandlers } from './handlers/manager-sales.handlers';
import { managerReferralsHandlers } from './handlers/manager-referrals.handlers';
import { managerReportsHandlers } from './handlers/manager-reports.handlers';
import { managerProfileHandlers } from './handlers/manager-profile.handlers';
import { managerLibraryHandlers } from './handlers/manager-library.handlers';
import { managerDashboardHandlers } from './handlers/manager-dashboard.handlers';
import { managerAttendanceHandlers } from './handlers/manager-attendance.handlers';
import { managerCommunicationsHandlers } from './handlers/manager-communications.handlers';
import { managerExpensesHandlers } from './handlers/manager-expenses.handlers';
import { managerFinanceHandlers } from './handlers/manager-finance.handlers';
import { managerHrHandlers } from './handlers/manager-hr.handlers';
import { managerInquiriesHandlers } from './handlers/manager-inquiries.handlers';
import { managerMembersHandlers } from './handlers/manager-members.handlers';
import { managerPlansHandlers } from './handlers/manager-plans.handlers';
import { managerPtHandlers } from './handlers/manager-pt.handlers';

import { trainerAttendanceHandlers } from './handlers/trainer-attendance.handlers';
import { trainerDashboardHandlers } from './handlers/trainer-dashboard.handlers';
import { trainerEarningsHandlers } from './handlers/trainer-earnings.handlers';
import { trainerMembersHandlers } from './handlers/trainer-members.handlers';
import { trainerProgressHandlers } from './handlers/trainer-progress.handlers';
import { trainerScheduleHandlers } from './handlers/trainer-schedule.handlers';
import { trainerSessionsHandlers } from './handlers/trainer-sessions.handlers';
import { trainerWorkoutHandlers } from './handlers/trainer-workout.handlers';

export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
  ...adminHandlers,
  ...authHandlers,
  ...landingHandlers,
  ...managerWorkoutHandlers,
  ...managerStoreHandlers,
  ...managerSettingsHandlers,
  ...managerSalesHandlers,
  ...managerReferralsHandlers,
  ...managerReportsHandlers,
  ...managerProfileHandlers,
  ...managerLibraryHandlers,
  ...managerDashboardHandlers,
  ...managerAttendanceHandlers,
  ...managerCommunicationsHandlers,
  ...managerExpensesHandlers,
  ...managerFinanceHandlers,
  ...managerHrHandlers,
  ...managerInquiriesHandlers,
  ...managerMembersHandlers,
  ...managerPlansHandlers,
  ...managerPtHandlers,
  ...superadminGymsHandlers,
  ...superadminDashboardHandlers,
  ...superadminPlansHandlers,
  ...superadminSystemHandlers,
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
  ...superadminOnboardingHandlers,
  ...superadminMessagingHandlers,
  ...superadminInvoicesHandlers,
  ...superadminFranchisesHandlers,
  ...superadminFeaturesHandlers,
  ...superadminCancellationsHandlers,
  ...superadminCouponsHandlers,
  ...superadminBranchesHandlers,
  ...superadminAnalyticsHandlers,
  ...superadminAffiliatesHandlers,
  ...trainerAttendanceHandlers,
  ...trainerDashboardHandlers,
  ...trainerEarningsHandlers,
  ...trainerMembersHandlers,
  ...trainerProgressHandlers,
  ...trainerScheduleHandlers,
  ...trainerSessionsHandlers,
  ...trainerWorkoutHandlers,
];

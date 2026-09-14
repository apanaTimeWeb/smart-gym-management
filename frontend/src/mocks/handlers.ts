import { http, HttpResponse } from "msw";
import { superadminGymsHandlers } from './handlers/superadmin-gyms.handlers';
import { superadminDashboardHandlers } from './handlers/superadmin-dashboard.handlers';
import { superadminPlansHandlers } from './handlers/superadmin-plans.handlers';
import { superadminSystemHandlers } from './handlers/superadmin-system.handlers';
import { superadminSettingsHandlers } from './handlers/superadmin-settings.handlers';
import { superadminMigrationsHandlers } from './handlers/superadmin-migrations.handlers';
import { superadminInfrastructureHandlers } from './handlers/superadmin-infrastructure.handlers';
import { superadminJobsHandlers } from './handlers/superadmin-jobs.handlers';
import { superadminBroadcastsHandlers } from './handlers/superadmin-broadcasts.handlers';
import { superadminGlobalAuditHandlers } from './handlers/superadmin-global-audit.handlers';
import { superadminUsageMetersHandlers } from './handlers/superadmin-usage-meters.handlers';
import { superadminProfileHandlers } from './handlers/superadmin-profile.handlers';
import { superadminTicketsHandlers } from './handlers/superadmin-tickets.handlers';
import { superadminReportsHandlers } from './handlers/superadmin-reports.handlers';
import { superadminOnboardingHandlers } from './handlers/superadmin-onboarding.handlers';
import { superadminMessagingHandlers } from './handlers/superadmin-messaging.handlers';
import { superadminInvoicesHandlers } from './handlers/superadmin-invoices.handlers';
import { superadminFranchisesHandlers } from './handlers/superadmin-franchises.handlers';
import { superadminFeaturesHandlers } from './handlers/superadmin-features.handlers';
import { superadminChurnHandlers } from './handlers/superadmin-churn.handlers';
import { superadminCouponsHandlers } from './handlers/superadmin-coupons.handlers';
import { superadminBranchesHandlers } from './handlers/superadmin-branches.handlers';
import { superadminAnalyticsHandlers } from './handlers/superadmin-analytics.handlers';
import { superadminAffiliatesHandlers } from './handlers/superadmin-affiliates.handlers';

import { adminHandlers } from './handlers/admin.handlers';
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

export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
  ...adminHandlers,
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
  ...superadminChurnHandlers,
  ...superadminCouponsHandlers,
  ...superadminBranchesHandlers,
  ...superadminAnalyticsHandlers,
  ...superadminAffiliatesHandlers,
];

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

export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
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

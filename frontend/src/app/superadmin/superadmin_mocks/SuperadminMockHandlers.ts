// RESPONSIBILITY: Aggregates Superadmin-owned MSW handlers for the global MSW bootstrap; contains no fixture/business implementations.
import { superadminAffiliatesHandlers } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';
import { superadminAnalyticsHandlers } from '@/app/superadmin/analytics/analytics_mocks/handlers/SuperadminAnalyticsMockHandlers';
import { superadminBackupsHandlers } from '@/app/superadmin/backups/backups_mocks/handlers/SuperadminBackupsMockHandlers';
import { superadminBranchesHandlers } from '@/app/superadmin/branches/branches_mocks/handlers/SuperadminBranchesMockHandlers';
import { superadminBroadcastsHandlers } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import { superadminCancellationsHandlers } from '@/app/superadmin/cancellations/cancellations_mocks/handlers/SuperadminCancellationsMockHandlers';
import { superadminCouponsHandlers } from '@/app/superadmin/coupons/coupons_mocks/handlers/SuperadminCouponsMockHandlers';
import { superadminDashboardHandlers } from '@/app/superadmin/dashboard/dashboard_mocks/handlers/SuperadminDashboardMockHandlers';
import { superadminFeaturesHandlers } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesMockHandlers';
import { superadminFranchisesHandlers } from '@/app/superadmin/franchises/franchises_mocks/handlers/SuperadminFranchisesMockHandlers';
import { superadminGlobalAuditHandlers } from '@/app/superadmin/global-audit/global-audit_mocks/handlers/SuperadminGlobalAuditMockHandlers';
import { superadminGymsHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { superadminInfrastructureHandlers } from '@/app/superadmin/infrastructure/infrastructure_mocks/handlers/SuperadminInfrastructureMockHandlers';
import { superadminInvoicesHandlers } from '@/app/superadmin/invoices/invoices_mocks/handlers/SuperadminInvoicesMockHandlers';
import { superadminJobsHandlers } from '@/app/superadmin/jobs/jobs_mocks/handlers/SuperadminJobsMockHandlers';
import { superadminMessagingHandlers } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { superadminMigrationsHandlers } from '@/app/superadmin/migrations/migrations_mocks/handlers/SuperadminMigrationsMockHandlers';
import { superadminOnboardingHandlers } from '@/app/superadmin/onboarding/onboarding_mocks/handlers/SuperadminOnboardingMockHandlers';
import { superadminPlansHandlers } from '@/app/superadmin/plans/plans_mocks/handlers/SuperadminPlansMockHandlers';
import { superadminProfileHandlers } from '@/app/superadmin/profile/profile_mocks/handlers/SuperadminProfileMockHandlers';
import { superadminReportsHandlers } from '@/app/superadmin/reports/reports_mocks/handlers/SuperadminReportsMockHandlers';
import { superadminSettingsHandlers } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsMockHandlers';
import { superadminSystemHandlers } from '@/app/superadmin/system/system_mocks/handlers/SuperadminSystemMockHandlers';
import { superadminTicketsHandlers } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsMockHandlers';
import { superadminUsageMetersHandlers } from '@/app/superadmin/usage-meters/usage-meters_mocks/handlers/SuperadminUsageMetersMockHandlers';
import { superadminShellNotificationHandlers } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationMockHandlers';

export const superadminMockHandlers = [
  ...superadminAffiliatesHandlers,
  ...superadminAnalyticsHandlers,
  ...superadminBackupsHandlers,
  ...superadminBranchesHandlers,
  ...superadminBroadcastsHandlers,
  ...superadminCancellationsHandlers,
  ...superadminCouponsHandlers,
  ...superadminDashboardHandlers,
  ...superadminFeaturesHandlers,
  ...superadminFranchisesHandlers,
  ...superadminGlobalAuditHandlers,
  ...superadminGymsHandlers,
  ...superadminInfrastructureHandlers,
  ...superadminInvoicesHandlers,
  ...superadminJobsHandlers,
  ...superadminMessagingHandlers,
  ...superadminMigrationsHandlers,
  ...superadminOnboardingHandlers,
  ...superadminPlansHandlers,
  ...superadminProfileHandlers,
  ...superadminReportsHandlers,
  ...superadminSettingsHandlers,
  ...superadminSystemHandlers,
  ...superadminTicketsHandlers,
  ...superadminUsageMetersHandlers,
  ...superadminShellNotificationHandlers,
] as const;

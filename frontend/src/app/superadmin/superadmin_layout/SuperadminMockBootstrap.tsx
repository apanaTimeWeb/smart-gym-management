// RESPONSIBILITY: Registers Superadmin-owned MSW handlers after the global MSW worker starts. No feature data lives here.
'use client';
import { worker } from '@/mocks/browser';
import { superadminComplianceHandlers } from '@/app/superadmin/compliance/compliance_mocks/handlers/SuperadminComplianceMockHandlers';
import { superadminGymDetailHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymDetailMockHandlers';
import { superadminIntegrationsHandlers } from '@/app/superadmin/integrations/integrations_mocks/handlers/SuperadminIntegrationsMockHandlers';
import { superadminTeamHandlers } from '@/app/superadmin/team/team_mocks/handlers/SuperadminTeamMockHandlers';

import { superadminAffiliatesHandlers } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';
import { superadminAnalyticsHandlers } from '@/app/superadmin/analytics/analytics_mocks/handlers/SuperadminAnalyticsMockHandlers';
import { superadminBackupsHandlers } from '@/app/superadmin/system-ops/backups/backups_mocks/handlers/SuperadminBackupsMockHandlers';
import { superadminBroadcastsHandlers } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import { superadminCouponsHandlers } from '@/app/superadmin/saas-billing/coupons/coupons_mocks/handlers/SuperadminCouponsMockHandlers';
import { superadminDashboardHandlers } from '@/app/superadmin/dashboard/dashboard_mocks/handlers/SuperadminDashboardMockHandlers';
import { superadminFeaturesHandlers } from '@/app/superadmin/features/features_mocks/handlers/SuperadminFeaturesMockHandlers';
import { superadminGlobalAuditHandlers } from '@/app/superadmin/global-audit/global-audit_mocks/handlers/SuperadminGlobalAuditMockHandlers';
import { superadminGymsHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { superadminInfrastructureHandlers } from '@/app/superadmin/system-ops/infrastructure/infrastructure_mocks/handlers/SuperadminInfrastructureMockHandlers';
import { superadminInvoicesHandlers } from '@/app/superadmin/saas-billing/invoices/invoices_mocks/handlers/SuperadminInvoicesMockHandlers';
import { superadminJobsHandlers } from '@/app/superadmin/system-ops/jobs/jobs_mocks/handlers/SuperadminJobsMockHandlers';
import { superadminMessagingHandlers } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { superadminMigrationsHandlers } from '@/app/superadmin/system-ops/migrations/migrations_mocks/handlers/SuperadminMigrationsMockHandlers';
import { superadminSystemOpsHandlers } from '@/app/superadmin/system-ops/system-ops_mocks/handlers/SuperadminSystemOpsMockHandlers';
import { superadminPlansHandlers } from '@/app/superadmin/saas-billing/plans/plans_mocks/handlers/SuperadminPlansMockHandlers';
import { superadminProfileHandlers } from '@/app/superadmin/profile/profile_mocks/handlers/SuperadminProfileMockHandlers';
import { superadminReportsHandlers } from '@/app/superadmin/reports/reports_mocks/handlers/SuperadminReportsMockHandlers';
import { superadminSettingsHandlers } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsMockHandlers';
import { superadminTicketsHandlers } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsMockHandlers';
import { superadminUsageMetersHandlers } from '@/app/superadmin/usage-meters/usage-meters_mocks/handlers/SuperadminUsageMetersMockHandlers';
let isRegistered = false;

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && !isRegistered) {
    worker.use(
      ...superadminTeamHandlers, ...superadminIntegrationsHandlers, ...superadminComplianceHandlers,
      ...superadminDashboardHandlers, ...superadminGymsHandlers, ...superadminGymDetailHandlers, ...superadminPlansHandlers, ...superadminInvoicesHandlers,
      ...superadminAnalyticsHandlers, ...superadminReportsHandlers,
      ...superadminFeaturesHandlers, ...superadminSystemOpsHandlers, ...superadminInfrastructureHandlers, ...superadminJobsHandlers, ...superadminBackupsHandlers, ...superadminGlobalAuditHandlers, ...superadminSettingsHandlers,
      ...superadminAffiliatesHandlers, ...superadminCouponsHandlers, ...superadminProfileHandlers, ...superadminMigrationsHandlers, ...superadminUsageMetersHandlers,
      ...superadminBroadcastsHandlers, ...superadminMessagingHandlers, ...superadminTicketsHandlers,
    );
    isRegistered = true;
}

export default function SuperadminMockBootstrap() {
    return null;
}

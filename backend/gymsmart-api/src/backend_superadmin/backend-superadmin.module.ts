// RESPONSIBILITY: Aggregates the complete Superadmin backend role/domain into one explicit NestJS module.
// FLOW: Application root -> BackendSuperadminModule -> SuperadminCoreModule + Auth/Health + Superadmin feature modules.
import { Module } from '@nestjs/common';
import { SuperadminCoreModule } from '@/backend_superadmin/superadmin_core/superadmin-core.module';
import { SuperadminExportDataModule } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.module';
import { SuperadminAuthModule } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.module';
import { SuperadminHealthModule } from '@/backend_superadmin/superadmin_core/superadmin_core_health/superadmin-health.module';
import { SuperadminAffiliatesModule } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.module';
import { SuperadminAnalyticsModule } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.module';
import { SuperadminBroadcastsModule } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.module';
import { SuperadminComplianceModule } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.module';
import { SuperadminDashboardModule } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.module';
import { SuperadminFeaturesModule } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.module';
import { SuperadminGlobalAuditModule } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.module';
import { SuperadminGymsModule } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.module';
import { SuperadminIntegrationsModule } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.module';
import { SuperadminMessagingModule } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.module';
import { SuperadminProfileModule } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.module';
import { SuperadminReportsModule } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.module';
import { SuperadminSaasBillingModule } from '@/backend_superadmin/superadmin_modules/saas-billing/superadmin-saas-billing.module';
import { SuperadminSettingsModule } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.module';
import { SuperadminSystemOpsContainerModule } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops-container.module';
import { SuperadminTeamModule } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.module';
import { SuperadminTicketsModule } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.module';
import { SuperadminUsageMetersModule } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.module';
import { SuperadminWhiteLabelingModule } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.module';

/**
 * Primary Intent: Defines BackendSuperadminModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [SuperadminCoreModule, SuperadminExportDataModule, SuperadminAuthModule, SuperadminHealthModule, SuperadminAffiliatesModule, SuperadminAnalyticsModule, SuperadminBroadcastsModule, SuperadminComplianceModule, SuperadminDashboardModule, SuperadminFeaturesModule, SuperadminGlobalAuditModule, SuperadminGymsModule, SuperadminIntegrationsModule, SuperadminMessagingModule, SuperadminProfileModule, SuperadminReportsModule, SuperadminSaasBillingModule, SuperadminSettingsModule, SuperadminSystemOpsContainerModule, SuperadminTeamModule, SuperadminTicketsModule, SuperadminUsageMetersModule, SuperadminWhiteLabelingModule],
  exports: [SuperadminCoreModule],
})
/**
 * Primary Intent: Defines BackendSuperadminModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class BackendSuperadminModule {}

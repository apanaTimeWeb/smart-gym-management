// RESPONSIBILITY: Aggregates the complete Superadmin backend role/domain into one explicit NestJS module.
// FLOW: Application root -> BackendSuperadminModule -> CoreModule + Auth/Health + Superadmin feature modules.
import { Module } from '@nestjs/common';
import { CoreModule } from '@/backend_superadmin/core/core.module';
import { ExportDataModule } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data.module';
import { AuthModule } from '@/backend_superadmin/modules/auth/auth.module';
import { HealthModule } from '@/backend_superadmin/modules/health/health.module';
import { AffiliatesModule } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.module';
import { AnalyticsModule } from '@/backend_superadmin/modules/backend_superadmin/analytics/analytics.module';
import { BroadcastsModule } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.module';
import { ComplianceModule } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance.module';
import { DashboardModule } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.module';
import { FeaturesModule } from '@/backend_superadmin/modules/backend_superadmin/features/features.module';
import { GlobalAuditModule } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.module';
import { GymsModule } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.module';
import { IntegrationsModule } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.module';
import { MessagingModule } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.module';
import { ProfileModule } from '@/backend_superadmin/modules/backend_superadmin/profile/profile.module';
import { ReportsModule } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.module';
import { SaasBillingModule } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/saas-billing.module';
import { SettingsModule } from '@/backend_superadmin/modules/backend_superadmin/settings/settings.module';
import { SystemOpsContainerModule } from '@/backend_superadmin/modules/backend_superadmin/system-ops/system-ops-container.module';
import { TeamModule } from '@/backend_superadmin/modules/backend_superadmin/team/team.module';
import { TicketsModule } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.module';
import { UsageMetersModule } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/usage-meters.module';
import { WhiteLabelingModule } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.module';

@Module({
  imports: [CoreModule, ExportDataModule, AuthModule, HealthModule, AffiliatesModule, AnalyticsModule, BroadcastsModule, ComplianceModule, DashboardModule, FeaturesModule, GlobalAuditModule, GymsModule, IntegrationsModule, MessagingModule, ProfileModule, ReportsModule, SaasBillingModule, SettingsModule, SystemOpsContainerModule, TeamModule, TicketsModule, UsageMetersModule, WhiteLabelingModule],
  exports: [CoreModule],
})
export class BackendSuperadminModule {}
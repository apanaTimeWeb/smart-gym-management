import { Module } from '@nestjs/common';
import { AffiliatesModule } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.module';
import { BroadcastsModule } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.module';
import { GymsModule } from '@/backend_superadmin/modules/superadmin/gyms/gyms.module';
import { TicketsModule } from '@/backend_superadmin/modules/superadmin/tickets/tickets.module';
import { SettingsModule } from '@/backend_superadmin/modules/superadmin/settings/settings.module';
import { MessagingModule } from '@/backend_superadmin/modules/superadmin/messaging/messaging.module';
import { UsageMetersModule } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.module';
import { WhiteLabelingModule } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.module';
import { ProfileModule } from '@/backend_superadmin/modules/superadmin/profile/profile.module';
import { FeaturesModule } from '@/backend_superadmin/modules/superadmin/features/features.module';
import { IntegrationsModule } from '@/backend_superadmin/modules/superadmin/integrations/integrations.module';
import { TeamModule } from '@/backend_superadmin/modules/superadmin/team/team.module';
import { DashboardModule } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.module';
import { AnalyticsModule } from '@/backend_superadmin/modules/superadmin/analytics/analytics.module';
import { ComplianceModule } from '@/backend_superadmin/modules/superadmin/compliance/compliance.module';
import { ReportsModule } from '@/backend_superadmin/modules/superadmin/reports/reports.module';
import { SaaSBillingModule } from '@/backend_superadmin/modules/superadmin/saas-billing/saas-billing.module';
import { SuperadminSystemOpsContainerModule } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops-container.module';
import { GlobalAuditModule } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.module';
import { CoreModule as SuperadminCoreModule } from '@/backend_superadmin/core/core.module';

@Module({
  imports: [
    SuperadminCoreModule,
    AffiliatesModule,
    BroadcastsModule,
    GymsModule,
    TicketsModule,
    SettingsModule,
    MessagingModule,
    UsageMetersModule,
    WhiteLabelingModule,
    ProfileModule,
    FeaturesModule,
    IntegrationsModule,
    TeamModule,
    DashboardModule,
    AnalyticsModule,
    ComplianceModule,
    ReportsModule,
    GlobalAuditModule,
    SaaSBillingModule,
    SuperadminSystemOpsContainerModule,
  ],
  exports: [
    AffiliatesModule,
    BroadcastsModule,
    GymsModule,
    TicketsModule,
    SettingsModule,
    MessagingModule,
    UsageMetersModule,
    WhiteLabelingModule,
    ProfileModule,
    FeaturesModule,
    IntegrationsModule,
    TeamModule,
    DashboardModule,
    AnalyticsModule,
    ComplianceModule,
    ReportsModule,
    GlobalAuditModule,
    SaaSBillingModule,
    SuperadminSystemOpsContainerModule,
  ]
})
export class SuperadminDomainModule {}

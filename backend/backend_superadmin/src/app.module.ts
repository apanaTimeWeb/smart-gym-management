// RESPONSIBILITY: Composes the application module graph from core infrastructure, auth, health, and isolated Superadmin features.
// FLOW: Nest bootstrap -> AppModule -> CoreModule + Auth/Health/feature modules.
import { Module } from '@nestjs/common';
import { CoreModule } from '@/core/core.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { HealthModule } from '@/modules/health/health.module';
import { AffiliatesModule } from '@/modules/superadmin/affiliates/affiliates.module';
import { BroadcastsModule } from '@/modules/superadmin/broadcasts/broadcasts.module';
import { GymsModule } from '@/modules/superadmin/gyms/gyms.module';
import { TicketsModule } from '@/modules/superadmin/tickets/tickets.module';
import { SettingsModule } from '@/modules/superadmin/settings/settings.module';
import { MessagingModule } from '@/modules/superadmin/messaging/messaging.module';
import { UsageMetersModule } from '@/modules/superadmin/usage-meters/usage-meters.module';
import { WhiteLabelingModule } from '@/modules/superadmin/white-labeling/white-labeling.module';
import { ProfileModule } from '@/modules/superadmin/profile/profile.module';
import { FeaturesModule } from '@/modules/superadmin/features/features.module';
import { IntegrationsModule } from '@/modules/superadmin/integrations/integrations.module';
import { TeamModule } from '@/modules/superadmin/team/team.module';
import { DashboardModule } from '@/modules/superadmin/dashboard/dashboard.module';
import { AnalyticsModule } from '@/modules/superadmin/analytics/analytics.module';
import { ComplianceModule } from '@/modules/superadmin/compliance/compliance.module';
import { ReportsModule } from '@/modules/superadmin/reports/reports.module';
import { SaaSBillingModule } from '@/modules/superadmin/saas-billing/saas-billing.module';
import { SuperadminSystemOpsContainerModule } from '@/modules/superadmin/system-ops/system-ops-container.module';
import { GlobalAuditModule } from '@/modules/superadmin/global-audit/global-audit.module';
@Module({ imports: [CoreModule, AuthModule, HealthModule, AffiliatesModule, BroadcastsModule, GymsModule, TicketsModule, SettingsModule, MessagingModule, UsageMetersModule, WhiteLabelingModule, ProfileModule, FeaturesModule, IntegrationsModule, TeamModule, DashboardModule, AnalyticsModule, ComplianceModule, ReportsModule, GlobalAuditModule, SaaSBillingModule, SuperadminSystemOpsContainerModule] })
export class AppModule {}

// RESPONSIBILITY: Defines the single explicit TypeORM connection to the master PostgreSQL database.
// FLOW: Config -> PostgreSQL master database -> all Superadmin/master repositories.
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { config } from 'dotenv';
import { AffiliateEntity } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.entity';
import { BroadcastEntity } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.entity';
import { TenantEntity } from '@/backend_superadmin/modules/superadmin/gyms/gyms.entity';
import { SupportTicketEntity } from '@/backend_superadmin/modules/superadmin/tickets/tickets.entity';
import { PlatformSettingEntity } from '@/backend_superadmin/modules/superadmin/settings/settings.entity';
import { TenantMessageEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import { SuperadminNotificationEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging-notification.entity';
import { SubscriptionPlanEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/plans.entity';
import { CouponEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.entity';
import { SaasInvoiceEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.entity';
import { UsageMeterEntity } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.entity';
import { WhiteLabelDomainEntity } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.entity';
import { BackgroundJobEntity } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.entity';
import { MigrationLogEntity } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.entity';
import { BackupRecordEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.entity';
import { InfrastructureNodeEntity } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.entity';
import { SuperadminProfileEntity } from '@/backend_superadmin/modules/superadmin/profile/profile.entity';
import { FeatureFlagEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';
import { FeatureReleaseNoteEntity } from '@/backend_superadmin/modules/superadmin/features/features-release-note.entity';
import { IntegrationKeyEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';
import { TeamSnapshotEntity } from '@/backend_superadmin/modules/superadmin/team/team.entity';
import { DashboardSnapshotEntity } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.entity';
import { AnalyticsSnapshotEntity } from '@/backend_superadmin/modules/superadmin/analytics/analytics.entity';
import { ComplianceSnapshotEntity } from '@/backend_superadmin/modules/superadmin/compliance/compliance.entity';
import { ReportSnapshotEntity } from '@/backend_superadmin/modules/superadmin/reports/reports.entity';
import { AuditLogEntity } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.entity';
config();
export const MasterDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [AffiliateEntity, BroadcastEntity, TenantEntity, SupportTicketEntity, PlatformSettingEntity, TenantMessageEntity, SuperadminNotificationEntity, SubscriptionPlanEntity, CouponEntity, SaasInvoiceEntity, UsageMeterEntity, WhiteLabelDomainEntity, BackgroundJobEntity, MigrationLogEntity, BackupRecordEntity, InfrastructureNodeEntity, SuperadminProfileEntity, FeatureFlagEntity, FeatureReleaseNoteEntity, IntegrationKeyEntity, TeamSnapshotEntity, DashboardSnapshotEntity, AnalyticsSnapshotEntity, ComplianceSnapshotEntity, ReportSnapshotEntity, AuditLogEntity],
  migrations: [join(__dirname, '../../migrations/*.{js,ts}')],
  extra: { max: Number(process.env.DATABASE_POOL_MAX ?? 20), connectionTimeoutMillis: Number(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? 30000), idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT_MS ?? 10000), statement_timeout: Number(process.env.DATABASE_STATEMENT_TIMEOUT_MS ?? 30000) },
});

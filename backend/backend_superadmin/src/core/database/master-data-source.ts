// RESPONSIBILITY: Defines the single explicit TypeORM connection to the master PostgreSQL database.
// FLOW: Config -> PostgreSQL master database -> all Superadmin/master repositories.
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { config } from 'dotenv';
import { AffiliateEntity } from '@/modules/superadmin/affiliates/affiliates.entity';
import { BroadcastEntity } from '@/modules/superadmin/broadcasts/broadcasts.entity';
import { TenantEntity } from '@/modules/superadmin/gyms/gyms.entity';
import { SupportTicketEntity } from '@/modules/superadmin/tickets/tickets.entity';
import { PlatformSettingEntity } from '@/modules/superadmin/settings/settings.entity';
import { TenantMessageEntity } from '@/modules/superadmin/messaging/messaging.entity';
import { SubscriptionPlanEntity } from '@/modules/superadmin/saas-billing/plans/plans.entity';
import { CouponEntity } from '@/modules/superadmin/saas-billing/coupons/coupons.entity';
import { SaasInvoiceEntity } from '@/modules/superadmin/saas-billing/invoices/invoices.entity';
import { UsageMeterEntity } from '@/modules/superadmin/usage-meters/usage-meters.entity';
import { WhiteLabelDomainEntity } from '@/modules/superadmin/white-labeling/white-labeling.entity';
import { BackgroundJobEntity } from '@/modules/superadmin/system-ops/jobs/jobs.entity';
import { MigrationLogEntity } from '@/modules/superadmin/system-ops/migrations/migrations.entity';
import { BackupRecordEntity } from '@/modules/superadmin/system-ops/backups/backups.entity';
import { InfrastructureNodeEntity } from '@/modules/superadmin/system-ops/infrastructure/infrastructure.entity';
import { SuperadminProfileEntity } from '@/modules/superadmin/profile/profile.entity';
import { FeatureFlagEntity } from '@/modules/superadmin/features/features.entity';
import { IntegrationKeyEntity } from '@/modules/superadmin/integrations/integrations.entity';
import { TeamSnapshotEntity } from '@/modules/superadmin/team/team.entity';
import { DashboardSnapshotEntity } from '@/modules/superadmin/dashboard/dashboard.entity';
import { AnalyticsSnapshotEntity } from '@/modules/superadmin/analytics/analytics.entity';
import { ComplianceSnapshotEntity } from '@/modules/superadmin/compliance/compliance.entity';
import { ReportSnapshotEntity } from '@/modules/superadmin/reports/reports.entity';
import { SystemOpsContractSnapshotEntity } from '@/modules/superadmin/system-ops/system-ops.entity';
import { AuditLogEntity } from '@/modules/superadmin/global-audit/global-audit.entity';
import { GymDetailContractSnapshotEntity } from '@/modules/superadmin/gyms/gym-detail-contract-snapshot.entity';
import { JobsContractSnapshotEntity } from '@/modules/superadmin/system-ops/jobs/jobs-contract-snapshot.entity';
import { InfrastructureContractSnapshotEntity } from '@/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity';
import { BackupsContractSnapshotEntity } from '@/modules/superadmin/system-ops/backups/backups-contract-snapshot.entity';
import { InvoicesContractSnapshotEntity } from '@/modules/superadmin/saas-billing/invoices/invoices-contract-snapshot.entity';
import { PlansContractSnapshotEntity } from '@/modules/superadmin/saas-billing/plans/plans-contract-snapshot.entity';
import { TicketsContractSnapshotEntity } from '@/modules/superadmin/tickets/tickets-contract-snapshot.entity';
import { IntegrationsContractSnapshotEntity } from '@/modules/superadmin/integrations/integrations-contract-snapshot.entity';
import { MessagingContractSnapshotEntity } from '@/modules/superadmin/messaging/messaging-contract-snapshot.entity';
import { GlobalAuditContractSnapshotEntity } from '@/modules/superadmin/global-audit/global-audit-contract-snapshot.entity';
import { FeaturesContractSnapshotEntity } from '@/modules/superadmin/features/features-contract-snapshot.entity';
import { SettingsContractSnapshotEntity } from '@/modules/superadmin/settings/settings-contract-snapshot.entity';
import { BroadcastsContractSnapshotEntity } from '@/modules/superadmin/broadcasts/broadcasts-contract-snapshot.entity';
import { BackupScheduleContractSnapshotEntity } from '@/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.entity';
import { CouponsContractSnapshotEntity } from '@/modules/superadmin/saas-billing/coupons/coupons-contract-snapshot.entity';
config();
export const MasterDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [AffiliateEntity, BroadcastEntity, TenantEntity, SupportTicketEntity, PlatformSettingEntity, TenantMessageEntity, SubscriptionPlanEntity, CouponEntity, SaasInvoiceEntity, UsageMeterEntity, WhiteLabelDomainEntity, BackgroundJobEntity, MigrationLogEntity, BackupRecordEntity, InfrastructureNodeEntity, SuperadminProfileEntity, FeatureFlagEntity, IntegrationKeyEntity, TeamSnapshotEntity, DashboardSnapshotEntity, AnalyticsSnapshotEntity, ComplianceSnapshotEntity, ReportSnapshotEntity, SystemOpsContractSnapshotEntity, AuditLogEntity, BroadcastsContractSnapshotEntity, JobsContractSnapshotEntity, InfrastructureContractSnapshotEntity, BackupsContractSnapshotEntity, InvoicesContractSnapshotEntity, PlansContractSnapshotEntity, TicketsContractSnapshotEntity, IntegrationsContractSnapshotEntity, MessagingContractSnapshotEntity, GlobalAuditContractSnapshotEntity, FeaturesContractSnapshotEntity, SettingsContractSnapshotEntity, GymDetailContractSnapshotEntity, CouponsContractSnapshotEntity, BackupScheduleContractSnapshotEntity],
  migrations: [join(__dirname, '../../migrations/*.{js,ts}')],
  extra: { max: Number(process.env.DATABASE_POOL_MAX ?? 20), connectionTimeoutMillis: Number(process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? 30000), idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT_MS ?? 10000), statement_timeout: Number(process.env.DATABASE_STATEMENT_TIMEOUT_MS ?? 30000) },
});

// RESPONSIBILITY: Defines the single explicit TypeORM connection to the master PostgreSQL database using the validated application configuration.
// FLOW: ConfigService -> master PostgreSQL DataSource -> master repositories/entities.
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { AffiliatesEntity } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.entity';
import { BroadcastsEntity } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.entity';
import { GymsEntity } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.entity';
import { TicketsEntity } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.entity';
import { SettingsEntity } from '@/backend_superadmin/modules/backend_superadmin/settings/settings.entity';
import { MessagingEntity } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.entity';
import { MessagingNotificationEntity } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-notification.entity';
import { PlansEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans.entity';
import { CouponsEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.entity';
import { InvoicesEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices.entity';
import { UsageMetersEntity } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/usage-meters.entity';
import { WhiteLabelingEntity } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.entity';
import { JobsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.entity';
import { ExportDataJobEntity } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data-job.entity';
import { MigrationsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.entity';
import { BackupsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/backups.entity';
import { InfrastructureEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/infrastructure/infrastructure.entity';
import { ProfileEntity } from '@/backend_superadmin/modules/backend_superadmin/profile/profile.entity';
import { FeaturesEntity } from '@/backend_superadmin/modules/backend_superadmin/features/features.entity';
import { FeaturesReleaseNoteEntity } from '@/backend_superadmin/modules/backend_superadmin/features/features-release-note.entity';
import { IntegrationsEntity } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.entity';
import { TeamEntity } from '@/backend_superadmin/modules/backend_superadmin/team/team.entity';
import { DashboardEntity } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.entity';
import { AnalyticsEntity } from '@/backend_superadmin/modules/backend_superadmin/analytics/analytics.entity';
import { ComplianceEntity } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance.entity';
import { ComplianceDocumentEntity } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance-document.entity';
import { ReportsEntity } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.entity';
import { GlobalAuditEntity } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.entity';
import { BroadcastsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-contract-snapshot.entity';
import { FeaturesContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/features/features-contract-snapshot.entity';
import { GlobalAuditContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit-contract-snapshot.entity';
import { IntegrationsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations-contract-snapshot.entity';
import { MessagingContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-contract-snapshot.entity';
import { InvoicesContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/invoices-contract-snapshot.entity';
import { PlansContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans-contract-snapshot.entity';
import { SettingsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/settings/settings-contract-snapshot.entity';
import { SystemOpsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/system-ops.entity';
import { BackupsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/backups-contract-snapshot.entity';
import { BackupScheduleContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/backups-schedule-contract-snapshot.entity';
import { InfrastructureContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity';
import { JobsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs-contract-snapshot.entity';
import { TicketsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets-contract-snapshot.entity';
import { GymsDetailContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-detail-contract-snapshot.entity';
import configuration from '@/backend_superadmin/core/config/configuration';

export function createMasterDataSource(config: {
  databaseUrl: string;
  databasePoolMax: number;
  databaseAcquireTimeoutMs: number;
  databaseIdleTimeoutMs: number;
  databaseStatementTimeoutMs: number;
}): DataSource {
  return new DataSource({
    type: 'postgres',
    url: config.databaseUrl,
    synchronize: false,
    entities: [AffiliatesEntity, BroadcastsEntity, GymsEntity, TicketsEntity, SettingsEntity, MessagingEntity, MessagingNotificationEntity, PlansEntity, CouponsEntity, InvoicesEntity, UsageMetersEntity, WhiteLabelingEntity, JobsEntity, MigrationsEntity, BackupsEntity, InfrastructureEntity, ProfileEntity, FeaturesEntity, FeaturesReleaseNoteEntity, IntegrationsEntity, TeamEntity, DashboardEntity, AnalyticsEntity, ComplianceEntity, ComplianceDocumentEntity, ReportsEntity, GlobalAuditEntity, BroadcastsContractSnapshotEntity, FeaturesContractSnapshotEntity, GlobalAuditContractSnapshotEntity, IntegrationsContractSnapshotEntity, MessagingContractSnapshotEntity, InvoicesContractSnapshotEntity, PlansContractSnapshotEntity, SettingsContractSnapshotEntity, SystemOpsEntity, BackupsContractSnapshotEntity, BackupScheduleContractSnapshotEntity, InfrastructureContractSnapshotEntity, JobsContractSnapshotEntity, TicketsContractSnapshotEntity, GymsDetailContractSnapshotEntity, ExportDataJobEntity],
    migrations: [join(__dirname, '../../migrations/*.{js,ts}')],
    extra: {
      max: config.databasePoolMax,
      connectionTimeoutMillis: config.databaseAcquireTimeoutMs,
      idleTimeoutMillis: config.databaseIdleTimeoutMs,
      statement_timeout: config.databaseStatementTimeoutMs,
    },
  });
}

const appConfig = configuration();

export const MasterDataSource = createMasterDataSource({
  databaseUrl: appConfig.databaseUrl,
  databasePoolMax: appConfig.databasePoolMax,
  databaseAcquireTimeoutMs: appConfig.databaseAcquireTimeoutMs,
  databaseIdleTimeoutMs: appConfig.databaseIdleTimeoutMs,
  databaseStatementTimeoutMs: appConfig.databaseStatementTimeoutMs,
});

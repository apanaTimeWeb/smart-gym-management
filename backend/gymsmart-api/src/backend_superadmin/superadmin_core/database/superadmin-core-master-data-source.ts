// RESPONSIBILITY: Defines the single explicit TypeORM connection to the master PostgreSQL database using the validated application configuration.
// FLOW: ConfigService -> master PostgreSQL DataSource -> master repositories/entities.
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';
import { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import { SuperadminTicketsEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.entity';
import { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';
import { SuperadminMessagingEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';
import { SuperadminMessagingNotificationEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity';
import { SuperadminPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import { SuperadminCouponsEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.entity';
import { SuperadminInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';
import { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';
import { SuperadminJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';
import { SuperadminExportDataJobEntity } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-job.entity';
import { SuperadminMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import { SuperadminBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import { SuperadminInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';
import { SuperadminProfileEntity } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.entity';
import { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';
import { SuperadminFeaturesReleaseNoteEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.entity';
import { SuperadminIntegrationsEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import { SuperadminTeamEntity } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.entity';
import { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';
import { SuperadminAnalyticsEntity } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.entity';
import { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';
import { SuperadminComplianceDocumentEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-document.entity';
import { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';
import { SuperadminGlobalAuditEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.entity';
import { SuperadminBroadcastsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-contract-snapshot.entity';
import { SuperadminFeaturesContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-contract-snapshot.entity';
import { SuperadminGlobalAuditContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-contract-snapshot.entity';
import { SuperadminIntegrationsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations-contract-snapshot.entity';
import { SuperadminMessagingContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-contract-snapshot.entity';
import { SuperadminInvoicesContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-contract-snapshot.entity';
import { SuperadminPlansContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-contract-snapshot.entity';
import { SuperadminSettingsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-contract-snapshot.entity';
import { SuperadminSystemOpsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.entity';
import { SuperadminBackupsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-contract-snapshot.entity';
import { SuperadminBackupScheduleContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity';
import { SuperadminInfrastructureContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.entity';
import { SuperadminJobsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-contract-snapshot.entity';
import { SuperadminTicketsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-contract-snapshot.entity';
import { SuperadminGymsDetailContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-contract-snapshot.entity';
import configuration from '@/backend_superadmin/superadmin_core/config/superadmin-core-configuration';

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
    entities: [SuperadminAffiliatesEntity, SuperadminBroadcastsEntity, SuperadminGymsEntity, SuperadminTicketsEntity, SuperadminSettingsEntity, SuperadminMessagingEntity, SuperadminMessagingNotificationEntity, SuperadminPlansEntity, SuperadminCouponsEntity, SuperadminInvoicesEntity, SuperadminUsageMetersEntity, SuperadminWhiteLabelingEntity, SuperadminJobsEntity, SuperadminMigrationsEntity, SuperadminBackupsEntity, SuperadminInfrastructureEntity, SuperadminProfileEntity, SuperadminFeaturesEntity, SuperadminFeaturesReleaseNoteEntity, SuperadminIntegrationsEntity, SuperadminTeamEntity, SuperadminDashboardEntity, SuperadminAnalyticsEntity, SuperadminComplianceEntity, SuperadminComplianceDocumentEntity, SuperadminReportsEntity, SuperadminGlobalAuditEntity, SuperadminBroadcastsContractSnapshotEntity, SuperadminFeaturesContractSnapshotEntity, SuperadminGlobalAuditContractSnapshotEntity, SuperadminIntegrationsContractSnapshotEntity, SuperadminMessagingContractSnapshotEntity, SuperadminInvoicesContractSnapshotEntity, SuperadminPlansContractSnapshotEntity, SuperadminSettingsContractSnapshotEntity, SuperadminSystemOpsEntity, SuperadminBackupsContractSnapshotEntity, SuperadminBackupScheduleContractSnapshotEntity, SuperadminInfrastructureContractSnapshotEntity, SuperadminJobsContractSnapshotEntity, SuperadminTicketsContractSnapshotEntity, SuperadminGymsDetailContractSnapshotEntity, SuperadminExportDataJobEntity],
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

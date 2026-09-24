// RESPONSIBILITY: Registers the backups feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsBackupsOperationsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-operations-query.controller';
import { SuperadminSystemOpsBackupsOperationsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-operations-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSystemOpsBackupsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-contract-snapshot.entity';
import { SuperadminSystemOpsBackupsScheduleContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity';
import { SuperadminSystemOpsBackupsScheduleContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.repository';
import { SuperadminSystemOpsBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminSystemOpsBackupsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-query.controller';
import { SuperadminSystemOpsBackupsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-command.controller';
import { SuperadminSystemOpsBackupsListService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-list.service';
import { SuperadminSystemOpsBackupsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-find.service';
import { SuperadminSystemOpsBackupsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-create.service';
import { SuperadminSystemOpsBackupsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-update.service';
import { SuperadminSystemOpsBackupsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-delete.service';
import { SuperadminSystemOpsBackupsStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-status.service';
import { SuperadminSystemOpsBackupsHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-health.service';
import { SuperadminSystemOpsBackupsScheduleService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-schedule.service';
import { SuperadminSystemOpsBackupsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-trigger.service';
import { SuperadminSystemOpsBackupsDownloadService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-download.service';
import { SuperadminSystemOpsBackupsRestoreService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_services/superadmin-system-ops-backups-restore.service';
import { SuperadminSystemOpsBackupJobEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backup-job.entity';
import { SuperadminSystemOpsBackupJobRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository';
import { SuperadminSystemOpsBackupsWorkerService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_workers/superadmin-system-ops-backups-worker.service';
/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSystemOpsBackupsContractSnapshotEntity, SuperadminSystemOpsBackupsEntity, SuperadminSystemOpsBackupsScheduleContractSnapshotEntity, SuperadminSystemOpsBackupJobEntity])],
  controllers: [SuperadminSystemOpsBackupsQueryController, SuperadminSystemOpsBackupsCommandController, SuperadminSystemOpsBackupsOperationsQueryController, SuperadminSystemOpsBackupsOperationsCommandController],
  providers: [SuperadminSystemOpsBackupsScheduleContractSnapshotRepository, SuperadminSystemOpsBackupsHealthService, SuperadminSystemOpsBackupsScheduleService, SuperadminSystemOpsBackupsTriggerService, SuperadminSystemOpsBackupsDownloadService, SuperadminSystemOpsBackupsRestoreService, SuperadminSystemOpsBackupJobRepository, SuperadminSystemOpsBackupsWorkerService, SuperadminSystemOpsBackupsRepository, SuperadminSystemOpsBackupsListService, SuperadminSystemOpsBackupsFindService, SuperadminSystemOpsBackupsCreateService, SuperadminSystemOpsBackupsUpdateService, SuperadminSystemOpsBackupsDeleteService, SuperadminSystemOpsBackupsStatusService],
  exports: [SuperadminSystemOpsBackupsRepository],
})
/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSystemOpsBackupsModule {}

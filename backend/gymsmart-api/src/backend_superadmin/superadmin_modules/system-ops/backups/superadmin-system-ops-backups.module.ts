// RESPONSIBILITY: Registers the backups feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminBackupsOperationsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-operations-query.controller';
import { SuperadminBackupsOperationsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-operations-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminBackupsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-contract-snapshot.entity';
import { SuperadminBackupScheduleContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity';
import { SuperadminBackupScheduleContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.repository';
import { SuperadminBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-query.controller';
import { SuperadminBackupsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-command.controller';
import { SuperadminBackupsListService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-list.service';
import { SuperadminBackupsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-find.service';
import { SuperadminBackupsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-create.service';
import { SuperadminBackupsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-update.service';
import { SuperadminBackupsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-delete.service';
import { SuperadminBackupsStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-status.service';
import { SuperadminBackupsHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-health.service';
import { SuperadminBackupsScheduleService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-schedule.service';
import { SuperadminBackupsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-trigger.service';
import { SuperadminBackupsDownloadService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-download.service';
import { SuperadminBackupsRestoreService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-restore.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminBackupsContractSnapshotEntity, SuperadminBackupsEntity, SuperadminBackupScheduleContractSnapshotEntity])],
  controllers: [SuperadminBackupsQueryController, SuperadminBackupsCommandController, SuperadminBackupsOperationsQueryController, SuperadminBackupsOperationsCommandController],
  providers: [SuperadminBackupScheduleContractSnapshotRepository, SuperadminBackupsHealthService, SuperadminBackupsScheduleService, SuperadminBackupsTriggerService, SuperadminBackupsDownloadService, SuperadminBackupsRestoreService, SuperadminBackupsRepository, SuperadminBackupsListService, SuperadminBackupsFindService, SuperadminBackupsCreateService, SuperadminBackupsUpdateService, SuperadminBackupsDeleteService, SuperadminBackupsStatusService],
  exports: [SuperadminBackupsRepository],
})
export class SuperadminBackupsModule {}
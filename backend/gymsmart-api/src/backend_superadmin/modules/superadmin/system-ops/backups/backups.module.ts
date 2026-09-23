// RESPONSIBILITY: Registers the backups feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { BackupsOperationsQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-operations-query.controller';
import { BackupsOperationsCommandController } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-operations-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupsContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-contract-snapshot.entity';
import { BackupScheduleContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-schedule-contract-snapshot.entity';
import { BackupScheduleContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-schedule-contract-snapshot.repository';
import { BackupsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.entity';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-query.controller';
import { BackupsCommandController } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-command.controller';
import { BackupsListService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-list.service';
import { BackupsFindService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-find.service';
import { BackupsCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-create.service';
import { BackupsUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-update.service';
import { BackupsDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-delete.service';
import { BackupsStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-status.service';
import { BackupsHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-health.service';
import { BackupsScheduleService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-schedule.service';
import { BackupsTriggerService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-trigger.service';
import { BackupsDownloadService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-download.service';
import { BackupsRestoreService } from '@/backend_superadmin/modules/superadmin/system-ops/backups/services/backups-restore.service';
@Module({
  imports: [TypeOrmModule.forFeature([BackupsContractSnapshotEntity, BackupsEntity, BackupScheduleContractSnapshotEntity])],
  controllers: [BackupsQueryController, BackupsCommandController, BackupsOperationsQueryController, BackupsOperationsCommandController],
  providers: [BackupScheduleContractSnapshotRepository, BackupsHealthService, BackupsScheduleService, BackupsTriggerService, BackupsDownloadService, BackupsRestoreService, BackupsRepository, BackupsListService, BackupsFindService, BackupsCreateService, BackupsUpdateService, BackupsDeleteService, BackupsStatusService],
  exports: [BackupsRepository],
})
export class BackupsModule {}
// RESPONSIBILITY: Registers the backups feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupsContractSnapshotEntity } from '@/modules/superadmin/system-ops/backups/backups-contract-snapshot.entity';
import { BackupsContractSnapshotRepository } from '@/modules/superadmin/system-ops/backups/backups-contract-snapshot.repository';
import { BackupScheduleContractSnapshotEntity } from '@/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.entity';
import { BackupScheduleContractSnapshotRepository } from '@/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.repository';
import { BackupRecordEntity } from '@/modules/superadmin/system-ops/backups/backups.entity';
import { BackupsRepository } from '@/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsQueryController } from '@/modules/superadmin/system-ops/backups/backups-query.controller';
import { BackupsCommandController } from '@/modules/superadmin/system-ops/backups/backups-command.controller';
import { BackupsListService } from '@/modules/superadmin/system-ops/backups/services/backups-list.service';
import { BackupsFindService } from '@/modules/superadmin/system-ops/backups/services/backups-find.service';
import { BackupsCreateService } from '@/modules/superadmin/system-ops/backups/services/backups-create.service';
import { BackupsUpdateService } from '@/modules/superadmin/system-ops/backups/services/backups-update.service';
import { BackupsDeleteService } from '@/modules/superadmin/system-ops/backups/services/backups-delete.service';
import { BackupsStatusService } from '@/modules/superadmin/system-ops/backups/services/backups-status.service';
import { BackupsHealthService } from '@/modules/superadmin/system-ops/backups/services/backups-health.service';
import { BackupsScheduleService } from '@/modules/superadmin/system-ops/backups/services/backups-schedule.service';
import { BackupsTriggerService } from '@/modules/superadmin/system-ops/backups/services/backups-trigger.service';
import { BackupsDownloadService } from '@/modules/superadmin/system-ops/backups/services/backups-download.service';
import { BackupsRestoreService } from '@/modules/superadmin/system-ops/backups/services/backups-restore.service';
import { BackupsSpecialController } from '@/modules/superadmin/system-ops/backups/backups-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([BackupsContractSnapshotEntity, BackupRecordEntity, BackupScheduleContractSnapshotEntity])],
  controllers: [BackupsQueryController, BackupsCommandController, BackupsSpecialController],
  providers: [BackupsContractSnapshotRepository, BackupScheduleContractSnapshotRepository, BackupsHealthService, BackupsScheduleService, BackupsTriggerService, BackupsDownloadService, BackupsRestoreService, BackupsRepository, BackupsListService, BackupsFindService, BackupsCreateService, BackupsUpdateService, BackupsDeleteService, BackupsStatusService],
  exports: [BackupsRepository],
})
export class BackupsModule {}

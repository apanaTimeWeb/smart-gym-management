// RESPONSIBILITY: Registers the shared Superadmin export feature and its persistence boundary.
// FLOW: Nest module graph -> export controller/service -> job repository -> SuperadminExportDataJobEntity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminExportDataJobEntity } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-job.entity';
import { SuperadminExportDataController } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.controller';
import { SuperadminExportDataService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data.service';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/repositories/superadmin-export-data-job.repository';
import { SuperadminExportDataArchiveRepository } from '@/backend_superadmin/superadmin_modules/export-data/repositories/superadmin-export-data-archive.repository';
import { SuperadminExportDataSeeder } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.seeder';
import { SuperadminExportDataArchiveService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data-archive.service';
import { SuperadminExportDataStorageAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-storage.adapter';
import { SuperadminExportDataEmailAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-email.adapter';
import { SuperadminExportDataWhatsappAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-whatsapp.adapter';
import { SuperadminExportDataDeliveryService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data-delivery.service';
import { SuperadminExportDataWorkerService } from '@/backend_superadmin/superadmin_modules/export-data/workers/superadmin-export-data-worker.service';
import { SuperadminExportDataRetentionService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data-retention.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminExportDataJobEntity])],
  controllers: [SuperadminExportDataController],
  providers: [SuperadminExportDataService, SuperadminExportDataJobRepository, SuperadminExportDataArchiveRepository, SuperadminExportDataArchiveService, SuperadminExportDataStorageAdapter, SuperadminExportDataEmailAdapter, SuperadminExportDataWhatsappAdapter, SuperadminExportDataDeliveryService, SuperadminExportDataWorkerService, SuperadminExportDataRetentionService, SuperadminExportDataSeeder],
  exports: [SuperadminExportDataService],
})
export class SuperadminExportDataModule {}
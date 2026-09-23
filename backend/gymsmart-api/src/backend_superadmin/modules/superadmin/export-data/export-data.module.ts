// RESPONSIBILITY: Registers the shared Superadmin export feature and its persistence boundary.
// FLOW: Nest module graph -> export controller/service -> job repository -> ExportDataJobEntity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportDataJobEntity } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data-job.entity';
import { ExportDataController } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data.controller';
import { ExportDataService } from '@/backend_superadmin/modules/backend_superadmin/export-data/services/export-data.service';
import { ExportDataJobRepository } from '@/backend_superadmin/modules/backend_superadmin/export-data/repositories/export-data-job.repository';
import { ExportDataArchiveRepository } from '@/backend_superadmin/modules/backend_superadmin/export-data/repositories/export-data-archive.repository';
import { ExportDataSeeder } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data.seeder';
import { ExportDataArchiveService } from '@/backend_superadmin/modules/backend_superadmin/export-data/services/export-data-archive.service';
import { ExportDataStorageAdapter } from '@/backend_superadmin/modules/backend_superadmin/export-data/adapters/export-data-storage.adapter';
import { ExportDataEmailAdapter } from '@/backend_superadmin/modules/backend_superadmin/export-data/adapters/export-data-email.adapter';
import { ExportDataWhatsappAdapter } from '@/backend_superadmin/modules/backend_superadmin/export-data/adapters/export-data-whatsapp.adapter';
import { ExportDataDeliveryService } from '@/backend_superadmin/modules/backend_superadmin/export-data/services/export-data-delivery.service';
import { ExportDataWorkerService } from '@/backend_superadmin/modules/backend_superadmin/export-data/workers/export-data-worker.service';
import { ExportDataRetentionService } from '@/backend_superadmin/modules/backend_superadmin/export-data/services/export-data-retention.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExportDataJobEntity])],
  controllers: [ExportDataController],
  providers: [ExportDataService, ExportDataJobRepository, ExportDataArchiveRepository, ExportDataArchiveService, ExportDataStorageAdapter, ExportDataEmailAdapter, ExportDataWhatsappAdapter, ExportDataDeliveryService, ExportDataWorkerService, ExportDataRetentionService, ExportDataSeeder],
  exports: [ExportDataService],
})
export class ExportDataModule {}
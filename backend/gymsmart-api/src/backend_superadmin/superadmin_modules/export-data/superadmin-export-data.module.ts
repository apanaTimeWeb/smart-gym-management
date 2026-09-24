// RESPONSIBILITY: Registers the shared Superadmin export feature and its persistence boundary.
// FLOW: Nest module graph -> export controller/service -> job repository -> SuperadminExportDataJobEntity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminExportDataJobEntity } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-job.entity';
import { SuperadminExportDataCommandController } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-command.controller';
import { SuperadminExportDataQueryController } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-query.controller';
import { SuperadminExportDataService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data.service';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/export-data_repositories/superadmin-export-data-job.repository';
import { SuperadminExportDataArchiveRepository } from '@/backend_superadmin/superadmin_modules/export-data/export-data_repositories/superadmin-export-data-archive.repository';
import { SuperadminExportDataSeeder } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.seeder';
import { SuperadminExportDataArchiveService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data-archive.service';
import { SuperadminExportDataStorageAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-storage.adapter';
import { SuperadminExportDataEmailAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-email.adapter';
import { SuperadminExportDataWhatsappAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-whatsapp.adapter';
import { SuperadminExportDataDeliveryService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data-delivery.service';
import { SuperadminExportDataWorkerService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_workers/superadmin-export-data-worker.service';
import { SuperadminExportDataRetentionService } from '@/backend_superadmin/superadmin_modules/export-data/export-data_services/superadmin-export-data-retention.service';

/**
 * Primary Intent: Defines SuperadminExportDataModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminExportDataJobEntity])],
  controllers: [SuperadminExportDataCommandController, SuperadminExportDataQueryController],
  providers: [SuperadminExportDataService, SuperadminExportDataJobRepository, SuperadminExportDataArchiveRepository, SuperadminExportDataArchiveService, SuperadminExportDataStorageAdapter, SuperadminExportDataEmailAdapter, SuperadminExportDataWhatsappAdapter, SuperadminExportDataDeliveryService, SuperadminExportDataWorkerService, SuperadminExportDataRetentionService, SuperadminExportDataSeeder],
  exports: [SuperadminExportDataService],
})
/**
 * Primary Intent: Defines SuperadminExportDataModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminExportDataModule {}

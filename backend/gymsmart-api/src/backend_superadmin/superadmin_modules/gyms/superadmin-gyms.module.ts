// RESPONSIBILITY: Registers the gyms feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminGymsAdministrationQueryController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-administration-query.controller';
import { SuperadminGymsAdministrationCommandController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-administration-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminGymsDetailContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-contract-snapshot.entity';
import { SuperadminGymsDetailContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-contract-snapshot.repository';
import { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsQueryController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-query.controller';
import { SuperadminGymsCommandController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-command.controller';
import { SuperadminGymsListService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-list.service';
import { SuperadminGymsFindService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-find.service';
import { SuperadminGymsCreateService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-create.service';
import { SuperadminGymsUpdateService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-update.service';
import { SuperadminGymsDeleteService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-delete.service';
import { SuperadminGymsStatusService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-status.service';
import { SuperadminGymsBusinessControlsService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-business-controls.service';
import { SuperadminGymsBulkActionService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-bulk-action.service';
import { SuperadminGymsDetailBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-detail-business-overview.service';
import { SuperadminGymsApiQueryController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-api-query.controller';
import { SuperadminGymsApiCommandController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-api-command.controller';
import { SuperadminGymsExportController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-export.controller';
import { SuperadminGymsLookupController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-lookup.controller';
import { SuperadminGymsLookupService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-lookup.service';
import { SuperadminGymsProvisionService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-provision.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-operational.service';
import { SuperadminGymsExportJobEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-export-job.entity';
import { SuperadminGymsExportJobRepository } from '@/backend_superadmin/superadmin_modules/gyms/gyms_repositories/superadmin-gyms-export-job.repository';
import { SuperadminGymsExportWorkerService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_workers/superadmin-gyms-export-worker.service';
import { SuperadminGymsExportDownloadTokenService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-export-download-token.service';

/**
 * Primary Intent: Defines SuperadminGymsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminGymsDetailContractSnapshotEntity, SuperadminGymsEntity, SuperadminGymsExportJobEntity])],
  controllers: [SuperadminGymsQueryController, SuperadminGymsCommandController, SuperadminGymsApiQueryController, SuperadminGymsApiCommandController, SuperadminGymsExportController, SuperadminGymsLookupController, SuperadminGymsAdministrationQueryController, SuperadminGymsAdministrationCommandController],
  providers: [SuperadminGymsDetailContractSnapshotRepository, SuperadminGymsBusinessControlsService, SuperadminGymsBulkActionService, SuperadminGymsDetailBusinessOverviewService, SuperadminGymsRepository, SuperadminGymsListService, SuperadminGymsFindService, SuperadminGymsCreateService, SuperadminGymsUpdateService, SuperadminGymsDeleteService, SuperadminGymsStatusService, SuperadminGymsLookupService, SuperadminGymsProvisionService, SuperadminGymsExportJobRepository, SuperadminGymsExportWorkerService, SuperadminGymsExportDownloadTokenService, SuperadminGymsOperationalService],
  exports: [SuperadminGymsRepository],
})
/**
 * Primary Intent: Defines SuperadminGymsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminGymsModule {}

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
import { SuperadminGymsListService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-list.service';
import { SuperadminGymsFindService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-find.service';
import { SuperadminGymsCreateService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-create.service';
import { SuperadminGymsUpdateService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-update.service';
import { SuperadminGymsDeleteService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-delete.service';
import { SuperadminGymsStatusService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-status.service';
import { SuperadminGymsBusinessControlsService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-business-controls.service';
import { SuperadminGymsBulkActionService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-bulk-action.service';
import { SuperadminGymsDetailBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-detail-business-overview.service';
import { SuperadminGymsApiController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-api.controller';
import { SuperadminGymsLookupController } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-lookup.controller';
import { SuperadminGymsLookupService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-lookup.service';
import { SuperadminGymsProvisionService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-provision.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-operational.service';


@Module({
  imports: [TypeOrmModule.forFeature([SuperadminGymsDetailContractSnapshotEntity, SuperadminGymsEntity])],
  controllers: [SuperadminGymsQueryController, SuperadminGymsCommandController, SuperadminGymsApiController, SuperadminGymsLookupController, SuperadminGymsAdministrationQueryController, SuperadminGymsAdministrationCommandController],
  providers: [SuperadminGymsDetailContractSnapshotRepository, SuperadminGymsBusinessControlsService, SuperadminGymsBulkActionService, SuperadminGymsDetailBusinessOverviewService, SuperadminGymsRepository, SuperadminGymsListService, SuperadminGymsFindService, SuperadminGymsCreateService, SuperadminGymsUpdateService, SuperadminGymsDeleteService, SuperadminGymsStatusService, SuperadminGymsLookupService, SuperadminGymsProvisionService, SuperadminGymsOperationalService],
  exports: [SuperadminGymsRepository],
})
export class SuperadminGymsModule {}
// RESPONSIBILITY: Registers the gyms feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { GymsAdministrationQueryController } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-administration-query.controller';
import { GymsAdministrationCommandController } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-administration-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymsDetailContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-detail-contract-snapshot.entity';
import { GymsDetailContractSnapshotRepository } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-detail-contract-snapshot.repository';
import { GymsEntity } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.entity';
import { GymsRepository } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.repository';
import { GymsQueryController } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-query.controller';
import { GymsCommandController } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-command.controller';
import { GymsListService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-find.service';
import { GymsCreateService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-create.service';
import { GymsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-update.service';
import { GymsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-status.service';
import { GymsBusinessControlsService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-business-controls.service';
import { GymsBulkActionService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-bulk-action.service';
import { GymsDetailBusinessOverviewService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-detail-business-overview.service';
import { GymsApiController } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-api.controller';
import { GymsLookupController } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-lookup.controller';
import { GymsLookupService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-lookup.service';
import { GymsProvisionService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-provision.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-operational.service';


@Module({
  imports: [TypeOrmModule.forFeature([GymsDetailContractSnapshotEntity, GymsEntity])],
  controllers: [GymsQueryController, GymsCommandController, GymsApiController, GymsLookupController, GymsAdministrationQueryController, GymsAdministrationCommandController],
  providers: [GymsDetailContractSnapshotRepository, GymsBusinessControlsService, GymsBulkActionService, GymsDetailBusinessOverviewService, GymsRepository, GymsListService, GymsFindService, GymsCreateService, GymsUpdateService, GymsDeleteService, GymsStatusService, GymsLookupService, GymsProvisionService, GymsOperationalService],
  exports: [GymsRepository],
})
export class GymsModule {}
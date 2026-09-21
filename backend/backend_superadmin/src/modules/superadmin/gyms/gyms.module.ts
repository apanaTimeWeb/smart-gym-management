// RESPONSIBILITY: Registers the gyms feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymDetailContractSnapshotEntity } from '@/modules/superadmin/gyms/gym-detail-contract-snapshot.entity';
import { GymDetailContractSnapshotRepository } from '@/modules/superadmin/gyms/gym-detail-contract-snapshot.repository';
import { TenantEntity } from '@/modules/superadmin/gyms/gyms.entity';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsQueryController } from '@/modules/superadmin/gyms/gyms-query.controller';
import { GymsCommandController } from '@/modules/superadmin/gyms/gyms-command.controller';
import { GymsListService } from '@/modules/superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/modules/superadmin/gyms/services/gyms-find.service';
import { GymsCreateService } from '@/modules/superadmin/gyms/services/gyms-create.service';
import { GymsUpdateService } from '@/modules/superadmin/gyms/services/gyms-update.service';
import { GymsDeleteService } from '@/modules/superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/modules/superadmin/gyms/services/gyms-status.service';
import { GymsBusinessControlsService } from '@/modules/superadmin/gyms/services/gyms-business-controls.service';
import { GymsBulkActionService } from '@/modules/superadmin/gyms/services/gyms-bulk-action.service';
import { GymsDetailBusinessOverviewService } from '@/modules/superadmin/gyms/services/gyms-detail-business-overview.service';
import { GymsSpecialController } from '@/modules/superadmin/gyms/gyms-special.controller';
import { GymsLookupController } from '@/modules/superadmin/gyms/gyms-lookup.controller';
import { GymsLookupService } from '@/modules/superadmin/gyms/services/gyms-lookup.service';
@Module({
  imports: [TypeOrmModule.forFeature([GymDetailContractSnapshotEntity, TenantEntity])],
  controllers: [GymsQueryController, GymsCommandController, GymsSpecialController, GymsLookupController],
  providers: [GymDetailContractSnapshotRepository, GymsBusinessControlsService, GymsBulkActionService, GymsDetailBusinessOverviewService, GymsRepository, GymsListService, GymsFindService, GymsCreateService, GymsUpdateService, GymsDeleteService, GymsStatusService, GymsLookupService],
  exports: [GymsRepository],
})
export class GymsModule {}

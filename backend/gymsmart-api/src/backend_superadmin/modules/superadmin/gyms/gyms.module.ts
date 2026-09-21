// RESPONSIBILITY: Registers the gyms feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymDetailContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/gyms/gym-detail-contract-snapshot.entity';
import { GymDetailContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/gyms/gym-detail-contract-snapshot.repository';
import { TenantEntity } from '@/backend_superadmin/modules/superadmin/gyms/gyms.entity';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsQueryController } from '@/backend_superadmin/modules/superadmin/gyms/gyms-query.controller';
import { GymsCommandController } from '@/backend_superadmin/modules/superadmin/gyms/gyms-command.controller';
import { GymsListService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-find.service';
import { GymsCreateService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-create.service';
import { GymsUpdateService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-update.service';
import { GymsDeleteService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-status.service';
import { GymsBusinessControlsService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-business-controls.service';
import { GymsBulkActionService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-bulk-action.service';
import { GymsDetailBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-detail-business-overview.service';
import { GymsSpecialController } from '@/backend_superadmin/modules/superadmin/gyms/gyms-special.controller';
import { GymsLookupController } from '@/backend_superadmin/modules/superadmin/gyms/gyms-lookup.controller';
import { GymsLookupService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-lookup.service';
import { GymsProvisionService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-provision.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-operational.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([GymDetailContractSnapshotEntity, TenantEntity]), JwtModule.register({})],
  controllers: [GymsQueryController, GymsCommandController, GymsSpecialController, GymsLookupController],
  providers: [GymDetailContractSnapshotRepository, GymsBusinessControlsService, GymsBulkActionService, GymsDetailBusinessOverviewService, GymsRepository, GymsListService, GymsFindService, GymsCreateService, GymsUpdateService, GymsDeleteService, GymsStatusService, GymsLookupService, GymsProvisionService, GymsOperationalService],
  exports: [GymsRepository],
})
export class GymsModule {}

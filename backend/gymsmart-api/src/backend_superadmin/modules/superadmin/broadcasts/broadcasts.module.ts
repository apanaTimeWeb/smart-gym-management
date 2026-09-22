// RESPONSIBILITY: Registers the broadcasts feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroadcastsContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-contract-snapshot.entity';
import { BroadcastsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-contract-snapshot.repository';
import { BroadcastEntity } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.entity';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsQueryController } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-query.controller';
import { BroadcastsCommandController } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-command.controller';
import { BroadcastsListService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-list.service';
import { BroadcastsFindService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-find.service';
import { BroadcastsCreateService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-create.service';
import { BroadcastsUpdateService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-update.service';
import { BroadcastsDeleteService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-delete.service';
import { BroadcastsStatusService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-status.service';
import { BroadcastsAudienceInsightsService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-audience-insights.service';
import { BroadcastsSpecialController } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-special.controller';
import { BroadcastsContractController } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-contract.controller';
import { BroadcastsDeliveryService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-delivery.service';
import { BroadcastsCompatibilityController, BroadcastsInsightsCompatibilityController } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts-compatibility.controller';
@Module({
  imports: [TypeOrmModule.forFeature([BroadcastsContractSnapshotEntity, BroadcastEntity])],
  controllers: [BroadcastsQueryController, BroadcastsCommandController, BroadcastsSpecialController, BroadcastsContractController, BroadcastsCompatibilityController, BroadcastsInsightsCompatibilityController],
  providers: [BroadcastsContractSnapshotRepository, BroadcastsDeliveryService, BroadcastsAudienceInsightsService, BroadcastsRepository, BroadcastsListService, BroadcastsFindService, BroadcastsCreateService, BroadcastsUpdateService, BroadcastsDeleteService, BroadcastsStatusService],
  exports: [BroadcastsRepository],
})
export class BroadcastsModule {}

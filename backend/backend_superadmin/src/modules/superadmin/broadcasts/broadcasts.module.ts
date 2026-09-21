// RESPONSIBILITY: Registers the broadcasts feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroadcastsContractSnapshotEntity } from '@/modules/superadmin/broadcasts/broadcasts-contract-snapshot.entity';
import { BroadcastsContractSnapshotRepository } from '@/modules/superadmin/broadcasts/broadcasts-contract-snapshot.repository';
import { BroadcastEntity } from '@/modules/superadmin/broadcasts/broadcasts.entity';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsQueryController } from '@/modules/superadmin/broadcasts/broadcasts-query.controller';
import { BroadcastsCommandController } from '@/modules/superadmin/broadcasts/broadcasts-command.controller';
import { BroadcastsListService } from '@/modules/superadmin/broadcasts/services/broadcasts-list.service';
import { BroadcastsFindService } from '@/modules/superadmin/broadcasts/services/broadcasts-find.service';
import { BroadcastsCreateService } from '@/modules/superadmin/broadcasts/services/broadcasts-create.service';
import { BroadcastsUpdateService } from '@/modules/superadmin/broadcasts/services/broadcasts-update.service';
import { BroadcastsDeleteService } from '@/modules/superadmin/broadcasts/services/broadcasts-delete.service';
import { BroadcastsStatusService } from '@/modules/superadmin/broadcasts/services/broadcasts-status.service';
import { BroadcastsAudienceInsightsService } from '@/modules/superadmin/broadcasts/services/broadcasts-audience-insights.service';
import { BroadcastsSpecialController } from '@/modules/superadmin/broadcasts/broadcasts-special.controller';
import { BroadcastsContractController } from '@/modules/superadmin/broadcasts/broadcasts-contract.controller';
import { BroadcastsDeliveryService } from '@/modules/superadmin/broadcasts/services/broadcasts-delivery.service';
@Module({
  imports: [TypeOrmModule.forFeature([BroadcastsContractSnapshotEntity, BroadcastEntity])],
  controllers: [BroadcastsQueryController, BroadcastsCommandController, BroadcastsSpecialController, BroadcastsContractController],
  providers: [BroadcastsContractSnapshotRepository, BroadcastsDeliveryService, BroadcastsAudienceInsightsService, BroadcastsRepository, BroadcastsListService, BroadcastsFindService, BroadcastsCreateService, BroadcastsUpdateService, BroadcastsDeleteService, BroadcastsStatusService],
  exports: [BroadcastsRepository],
})
export class BroadcastsModule {}

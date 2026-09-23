// RESPONSIBILITY: Registers the broadcasts feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { BroadcastsAudienceInsightsQueryController } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-audience-insights-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroadcastsEntity } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.entity';
import { BroadcastsRepository } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.repository';
import { BroadcastsQueryController } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-query.controller';
import { BroadcastsCommandController } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-command.controller';
import { BroadcastsListService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-list.service';
import { BroadcastsFindService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-find.service';
import { BroadcastsCreateService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-create.service';
import { BroadcastsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-update.service';
import { BroadcastsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-delete.service';
import { BroadcastsStatusService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-status.service';
import { BroadcastsAudienceInsightsService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-audience-insights.service';
import { BroadcastsContractController } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-contract.controller';
import { BroadcastsDeliveryService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-delivery.service';
@Module({
  imports: [TypeOrmModule.forFeature([BroadcastsEntity])],
  controllers: [BroadcastsQueryController, BroadcastsCommandController, BroadcastsContractController, BroadcastsAudienceInsightsQueryController],
  providers: [BroadcastsDeliveryService, BroadcastsAudienceInsightsService, BroadcastsRepository, BroadcastsListService, BroadcastsFindService, BroadcastsCreateService, BroadcastsUpdateService, BroadcastsDeleteService, BroadcastsStatusService],
  exports: [BroadcastsRepository],
})
export class BroadcastsModule {}
// RESPONSIBILITY: Registers the broadcasts feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminBroadcastsAudienceInsightsQueryController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-audience-insights-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsQueryController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-query.controller';
import { SuperadminBroadcastsCommandController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-command.controller';
import { SuperadminBroadcastsListService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-list.service';
import { SuperadminBroadcastsFindService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-find.service';
import { SuperadminBroadcastsCreateService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-create.service';
import { SuperadminBroadcastsUpdateService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-update.service';
import { SuperadminBroadcastsDeleteService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-delete.service';
import { SuperadminBroadcastsStatusService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-status.service';
import { SuperadminBroadcastsAudienceInsightsService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-audience-insights.service';
import { SuperadminBroadcastsContractController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-contract.controller';
import { SuperadminBroadcastsDeliveryService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-delivery.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminBroadcastsEntity])],
  controllers: [SuperadminBroadcastsQueryController, SuperadminBroadcastsCommandController, SuperadminBroadcastsContractController, SuperadminBroadcastsAudienceInsightsQueryController],
  providers: [SuperadminBroadcastsDeliveryService, SuperadminBroadcastsAudienceInsightsService, SuperadminBroadcastsRepository, SuperadminBroadcastsListService, SuperadminBroadcastsFindService, SuperadminBroadcastsCreateService, SuperadminBroadcastsUpdateService, SuperadminBroadcastsDeleteService, SuperadminBroadcastsStatusService],
  exports: [SuperadminBroadcastsRepository],
})
export class SuperadminBroadcastsModule {}
// RESPONSIBILITY: Registers the broadcasts feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminBroadcastsAudienceInsightsQueryController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-audience-insights-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsQueryController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-query.controller';
import { SuperadminBroadcastsCommandController } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-command.controller';
import { SuperadminBroadcastsListService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-list.service';
import { SuperadminBroadcastsFindService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-find.service';
import { SuperadminBroadcastsCreateService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-create.service';
import { SuperadminBroadcastsUpdateService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-update.service';
import { SuperadminBroadcastsDeleteService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-delete.service';
import { SuperadminBroadcastsStatusService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-status.service';
import { SuperadminBroadcastsAudienceInsightsService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-audience-insights.service';
import { SuperadminBroadcastsDeliveryService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-delivery.service';
/**
 * Primary Intent: Defines SuperadminBroadcastsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminBroadcastsEntity])],
  controllers: [SuperadminBroadcastsAudienceInsightsQueryController, SuperadminBroadcastsCommandController, SuperadminBroadcastsQueryController],
  providers: [SuperadminBroadcastsDeliveryService, SuperadminBroadcastsAudienceInsightsService, SuperadminBroadcastsRepository, SuperadminBroadcastsListService, SuperadminBroadcastsFindService, SuperadminBroadcastsCreateService, SuperadminBroadcastsUpdateService, SuperadminBroadcastsDeleteService, SuperadminBroadcastsStatusService],
  exports: [SuperadminBroadcastsRepository],
})
/**
 * Primary Intent: Defines SuperadminBroadcastsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminBroadcastsModule {}

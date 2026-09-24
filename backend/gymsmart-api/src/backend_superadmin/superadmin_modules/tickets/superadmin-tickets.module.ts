// RESPONSIBILITY: Registers the tickets feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminTicketsInsightsQueryController } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-insights-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminTicketsContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-contract-snapshot.entity';
import { SuperadminTicketsContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-contract-snapshot.repository';
import { SuperadminTicketsEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.entity';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import { SuperadminTicketsQueryController } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-query.controller';
import { SuperadminTicketsCommandController } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-command.controller';
import { SuperadminTicketsListService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-list.service';
import { SuperadminTicketsFindService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-find.service';
import { SuperadminTicketsCreateService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-create.service';
import { SuperadminTicketsUpdateService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-update.service';
import { SuperadminTicketsDeleteService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-delete.service';
import { SuperadminSupportTicketStatusService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-status.service';
import { SuperadminTicketsInsightsService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-insights.service';
import { SuperadminTicketsActionsController } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-actions.controller';
import { SuperadminTicketsActionsService } from '@/backend_superadmin/superadmin_modules/tickets/tickets_services/superadmin-tickets-actions.service';

/**
 * Primary Intent: Defines SuperadminTicketsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminTicketsContractSnapshotEntity, SuperadminTicketsEntity])],
  controllers: [SuperadminTicketsQueryController, SuperadminTicketsCommandController, SuperadminTicketsActionsController, SuperadminTicketsInsightsQueryController],
  providers: [SuperadminTicketsActionsService, SuperadminTicketsContractSnapshotRepository, SuperadminTicketsInsightsService, SuperadminTicketsRepository, SuperadminTicketsListService, SuperadminTicketsFindService, SuperadminTicketsCreateService, SuperadminTicketsUpdateService, SuperadminTicketsDeleteService, SuperadminSupportTicketStatusService],
  exports: [SuperadminTicketsRepository],
})
/**
 * Primary Intent: Defines SuperadminTicketsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminTicketsModule {}

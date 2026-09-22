// RESPONSIBILITY: Registers the tickets feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/tickets/tickets-contract-snapshot.entity';
import { TicketsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/tickets/tickets-contract-snapshot.repository';
import { SupportTicketEntity } from '@/backend_superadmin/modules/superadmin/tickets/tickets.entity';
import { TicketsRepository } from '@/backend_superadmin/modules/superadmin/tickets/tickets.repository';
import { TicketsQueryController } from '@/backend_superadmin/modules/superadmin/tickets/tickets-query.controller';
import { TicketsCommandController } from '@/backend_superadmin/modules/superadmin/tickets/tickets-command.controller';
import { TicketsListService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-list.service';
import { TicketsFindService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-find.service';
import { TicketsCreateService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-create.service';
import { TicketsUpdateService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-update.service';
import { TicketsDeleteService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-delete.service';
import { TicketsStatusService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-status.service';
import { TicketsInsightsService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-insights.service';
import { TicketsSpecialController } from '@/backend_superadmin/modules/superadmin/tickets/tickets-special.controller';
import { TicketsActionsController } from '@/backend_superadmin/modules/superadmin/tickets/tickets-actions.controller';
import { TicketsActionsService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-actions.service';
import { TicketsCompatibilityController } from '@/backend_superadmin/modules/superadmin/tickets/tickets-compatibility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TicketsContractSnapshotEntity, SupportTicketEntity])],
  controllers: [TicketsQueryController, TicketsCommandController, TicketsSpecialController, TicketsActionsController, TicketsCompatibilityController],
  providers: [TicketsActionsService, TicketsContractSnapshotRepository, TicketsInsightsService, TicketsRepository, TicketsListService, TicketsFindService, TicketsCreateService, TicketsUpdateService, TicketsDeleteService, TicketsStatusService],
  exports: [TicketsRepository],
})
export class TicketsModule {}

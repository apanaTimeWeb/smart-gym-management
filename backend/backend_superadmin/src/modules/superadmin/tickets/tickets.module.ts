// RESPONSIBILITY: Registers the tickets feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsContractSnapshotEntity } from '@/modules/superadmin/tickets/tickets-contract-snapshot.entity';
import { TicketsContractSnapshotRepository } from '@/modules/superadmin/tickets/tickets-contract-snapshot.repository';
import { SupportTicketEntity } from '@/modules/superadmin/tickets/tickets.entity';
import { TicketsRepository } from '@/modules/superadmin/tickets/tickets.repository';
import { TicketsQueryController } from '@/modules/superadmin/tickets/tickets-query.controller';
import { TicketsCommandController } from '@/modules/superadmin/tickets/tickets-command.controller';
import { TicketsListService } from '@/modules/superadmin/tickets/services/tickets-list.service';
import { TicketsFindService } from '@/modules/superadmin/tickets/services/tickets-find.service';
import { TicketsCreateService } from '@/modules/superadmin/tickets/services/tickets-create.service';
import { TicketsUpdateService } from '@/modules/superadmin/tickets/services/tickets-update.service';
import { TicketsDeleteService } from '@/modules/superadmin/tickets/services/tickets-delete.service';
import { TicketsStatusService } from '@/modules/superadmin/tickets/services/tickets-status.service';
import { TicketsInsightsService } from '@/modules/superadmin/tickets/services/tickets-insights.service';
import { TicketsSpecialController } from '@/modules/superadmin/tickets/tickets-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([TicketsContractSnapshotEntity, SupportTicketEntity])],
  controllers: [TicketsQueryController, TicketsCommandController, TicketsSpecialController],
  providers: [TicketsContractSnapshotRepository, TicketsInsightsService, TicketsRepository, TicketsListService, TicketsFindService, TicketsCreateService, TicketsUpdateService, TicketsDeleteService, TicketsStatusService],
  exports: [TicketsRepository],
})
export class TicketsModule {}

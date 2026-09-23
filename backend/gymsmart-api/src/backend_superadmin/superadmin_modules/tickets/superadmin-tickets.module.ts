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
import { SuperadminTicketsListService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-list.service';
import { SuperadminTicketsFindService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-find.service';
import { SuperadminTicketsCreateService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-create.service';
import { SuperadminTicketsUpdateService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-update.service';
import { SuperadminTicketsDeleteService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-delete.service';
import { SuperadminTicketsStatusService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-status.service';
import { SuperadminTicketsInsightsService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-insights.service';
import { SuperadminTicketsActionsController } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-actions.controller';
import { SuperadminTicketsActionsService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-actions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminTicketsContractSnapshotEntity, SuperadminTicketsEntity])],
  controllers: [SuperadminTicketsQueryController, SuperadminTicketsCommandController, SuperadminTicketsActionsController, SuperadminTicketsInsightsQueryController],
  providers: [SuperadminTicketsActionsService, SuperadminTicketsContractSnapshotRepository, SuperadminTicketsInsightsService, SuperadminTicketsRepository, SuperadminTicketsListService, SuperadminTicketsFindService, SuperadminTicketsCreateService, SuperadminTicketsUpdateService, SuperadminTicketsDeleteService, SuperadminTicketsStatusService],
  exports: [SuperadminTicketsRepository],
})
export class SuperadminTicketsModule {}
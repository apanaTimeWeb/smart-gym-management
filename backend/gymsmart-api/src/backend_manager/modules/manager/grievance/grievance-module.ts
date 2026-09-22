// RESPONSIBILITY: Registers the isolated Manager grievance feature boundary.
// FLOW: ManagerDomainModule -> GrievanceModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { GrievanceCommandController } from '@/backend_manager/modules/manager/grievance/grievance-command.controller';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/backend_manager/modules/manager/grievance/services/grievance-manager-grievance-api-create-grievance-ticket.service';
import { GrievanceManagerGrievanceApiFetchGrievanceTicketsService } from '@/backend_manager/modules/manager/grievance/services/grievance-manager-grievance-api-fetch-grievance-tickets.service';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/backend_manager/modules/manager/grievance/services/grievance-manager-grievance-api-resolve-grievance-ticket.service';
import { GrievanceOrchestratorService } from '@/backend_manager/modules/manager/grievance/services/grievance-orchestrator.service';
import { GrievanceQueryController } from '@/backend_manager/modules/manager/grievance/grievance-query.controller';
import { GrievanceRepository } from '@/backend_manager/modules/manager/grievance/repositories/grievance-repository';

@Module({
  controllers: [GrievanceQueryController, GrievanceCommandController],
  providers: [GrievanceManagerGrievanceApiCreateGrievanceTicketService, GrievanceManagerGrievanceApiResolveGrievanceTicketService, GrievanceManagerGrievanceApiFetchGrievanceTicketsService, GrievanceRepository, GrievanceOrchestratorService],
  exports: [GrievanceRepository],
})
export class GrievanceModule {}

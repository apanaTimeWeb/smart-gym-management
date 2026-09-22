// RESPONSIBILITY: Registers the isolated Manager grievance feature boundary.
// FLOW: ManagerDomainModule -> GrievanceModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { GrievanceCommandController } from '@/modules/manager/grievance/grievance-command.controller';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/modules/manager/grievance/services/grievance-manager-grievance-api-create-grievance-ticket.service';
import { GrievanceManagerGrievanceApiFetchGrievanceTicketsService } from '@/modules/manager/grievance/services/grievance-manager-grievance-api-fetch-grievance-tickets.service';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/modules/manager/grievance/services/grievance-manager-grievance-api-resolve-grievance-ticket.service';
import { GrievanceOrchestratorService } from '@/modules/manager/grievance/services/grievance-orchestrator.service';
import { GrievanceQueryController } from '@/modules/manager/grievance/grievance-query.controller';
import { GrievanceRepository } from '@/modules/manager/grievance/repositories/grievance-repository';

@Module({
  controllers: [GrievanceQueryController, GrievanceCommandController],
  providers: [GrievanceManagerGrievanceApiCreateGrievanceTicketService, GrievanceManagerGrievanceApiResolveGrievanceTicketService, GrievanceManagerGrievanceApiFetchGrievanceTicketsService, GrievanceRepository, GrievanceOrchestratorService],
  exports: [GrievanceRepository],
})
export class GrievanceModule {}

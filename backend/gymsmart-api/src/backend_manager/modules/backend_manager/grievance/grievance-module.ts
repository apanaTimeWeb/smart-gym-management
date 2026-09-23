// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { GrievanceCommandController } from '@/backend_manager/modules/backend_manager/grievance/grievance-command.controller';
import { GrievanceQueryController } from '@/backend_manager/modules/backend_manager/grievance/grievance-query.controller';
import { GrievanceRepository } from '@/backend_manager/modules/backend_manager/grievance/repositories/grievance-repository';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-manager-grievance-api-create-grievance-ticket.service';
import { GrievanceManagerGrievanceApiFetchGrievanceTicketsService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-manager-grievance-api-fetch-grievance-tickets.service';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-manager-grievance-api-resolve-grievance-ticket.service';
import { GrievanceOrchestratorService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-orchestrator.service';

@Module({
  controllers: [GrievanceQueryController, GrievanceCommandController],
  providers: [GrievanceManagerGrievanceApiCreateGrievanceTicketService, GrievanceManagerGrievanceApiResolveGrievanceTicketService, GrievanceManagerGrievanceApiFetchGrievanceTicketsService, GrievanceRepository, GrievanceOrchestratorService],
  exports: [GrievanceRepository],
})
export class GrievanceModule {}

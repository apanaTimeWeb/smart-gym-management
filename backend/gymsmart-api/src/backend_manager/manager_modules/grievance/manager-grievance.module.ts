// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerGrievanceMutationService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerGrievanceAuthorizationService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-authorization.service';

import { ManagerGrievanceCommandController } from '@/backend_manager/manager_modules/grievance/manager-grievance-command.controller';
import { ManagerGrievanceQueryController } from '@/backend_manager/manager_modules/grievance/manager-grievance-query.controller';
import { ManagerGrievanceRepository } from '@/backend_manager/manager_modules/grievance/manager-grievance.repository';
import { ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-create-grievance-ticket.service';
import { ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-find-grievance-tickets.service';
import { ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-resolve-grievance-ticket.service';
import { ManagerGrievanceOrchestratorService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-orchestrator.service';

@Module({
  controllers: [ManagerGrievanceQueryController, ManagerGrievanceCommandController],
  providers: [ManagerGrievanceMutationService, ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService, ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService, ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService, ManagerGrievanceRepository, ManagerGrievanceOrchestratorService,
  ManagerGrievanceAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:grievance`, useFactory: (authorization: ManagerGrievanceAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('grievance', authorization); return authorization; }, inject: [ManagerGrievanceAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerGrievanceRepository],
})
export class ManagerGrievanceModule {}

export { ManagerGrievanceModule as GrievanceModule };

import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerGrievanceEntity } from '@/backend_manager/manager_modules/grievance/manager-grievance.entity';
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

/**
 * Primary Intent: Defines ManagerGrievanceModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerGrievanceEntity])],
  controllers: [ManagerGrievanceQueryController, ManagerGrievanceCommandController],
  providers: [ManagerGrievanceMutationService, ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService, ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService, ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService, ManagerGrievanceRepository, ManagerGrievanceOrchestratorService,
  ManagerGrievanceAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:grievance`, useFactory: (authorization: ManagerGrievanceAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('grievance', authorization); return authorization; }, inject: [ManagerGrievanceAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerGrievanceRepository],
})
export class ManagerGrievanceModule {}

export { ManagerGrievanceModule as GrievanceModule };

import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerMaintenanceEntity } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.entity';
import { ManagerMaintenanceMutationService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerMaintenanceAuthorizationService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-authorization.service';

import { ManagerMaintenanceCommandController } from '@/backend_manager/manager_modules/maintenance/manager-maintenance-command.controller';
import { ManagerMaintenanceQueryController } from '@/backend_manager/manager_modules/maintenance/manager-maintenance-query.controller';
import { ManagerMaintenanceRepository } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.repository';
import { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-create-maintenance-ticket.service';
import { ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-find-maintenance-issues.service';
import { ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';
import { ManagerMaintenanceOrchestratorService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-orchestrator.service';

/**
 * Primary Intent: Defines ManagerMaintenanceModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerMaintenanceEntity])],
  controllers: [ManagerMaintenanceQueryController, ManagerMaintenanceCommandController],
  providers: [ManagerMaintenanceMutationService, ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService, ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService, ManagerMaintenanceRepository, ManagerMaintenanceOrchestratorService,
  ManagerMaintenanceAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:maintenance`, useFactory: (authorization: ManagerMaintenanceAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('maintenance', authorization); return authorization; }, inject: [ManagerMaintenanceAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerMaintenanceRepository],
})
export class ManagerMaintenanceModule {}

export { ManagerMaintenanceModule as MaintenanceModule };

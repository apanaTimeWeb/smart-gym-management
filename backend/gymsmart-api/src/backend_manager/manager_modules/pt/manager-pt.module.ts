import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerPtEntity } from '@/backend_manager/manager_modules/pt/manager-pt.entity';
import { ManagerPtMutationService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerPtAuthorizationService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-authorization.service';

import { ManagerPtCommandController } from '@/backend_manager/manager_modules/pt/manager-pt-command.controller';
import { ManagerPtQueryController } from '@/backend_manager/manager_modules/pt/manager-pt-query.controller';
import { ManagerPtRepository } from '@/backend_manager/manager_modules/pt/manager-pt.repository';
import { ManagerPtCreateAssignmentService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-create-assignment.service';
import { ManagerPtFindAssignmentsService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-assignments.service';
import { ManagerPtFindPackagesService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-packages.service';
import { ManagerPtFindPtDashboardKpisService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-pt-dashboard-kpis.service';
import { ManagerPtFindWorkloadService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-workload.service';
import { ManagerPtMarkSessionCompleteService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-mark-session-complete.service';
import { ManagerPtOrchestratorService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-orchestrator.service';

/**
 * Primary Intent: Defines ManagerPtModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerPtEntity])],
  controllers: [ManagerPtQueryController, ManagerPtCommandController],
  providers: [ManagerPtMutationService, ManagerPtCreateAssignmentService, ManagerPtMarkSessionCompleteService, ManagerPtFindPtDashboardKpisService, ManagerPtFindWorkloadService, ManagerPtFindPackagesService, ManagerPtFindAssignmentsService, ManagerPtRepository, ManagerPtOrchestratorService,
  ManagerPtAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:pt`, useFactory: (authorization: ManagerPtAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('pt', authorization); return authorization; }, inject: [ManagerPtAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerPtRepository],
})
export class ManagerPtModule {}

export { ManagerPtModule as PtModule };

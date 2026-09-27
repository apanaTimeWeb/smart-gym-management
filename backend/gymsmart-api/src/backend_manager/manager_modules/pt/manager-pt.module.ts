// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
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

@Module({
  controllers: [ManagerPtQueryController, ManagerPtCommandController],
  providers: [ManagerPtMutationService, ManagerPtCreateAssignmentService, ManagerPtMarkSessionCompleteService, ManagerPtFindPtDashboardKpisService, ManagerPtFindWorkloadService, ManagerPtFindPackagesService, ManagerPtFindAssignmentsService, ManagerPtRepository, ManagerPtOrchestratorService,
  ManagerPtAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:pt`, useFactory: (authorization: ManagerPtAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('pt', authorization); return authorization; }, inject: [ManagerPtAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerPtRepository],
})
export class ManagerPtModule {}

export { ManagerPtModule as PtModule };

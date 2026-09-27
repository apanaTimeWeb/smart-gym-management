// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerPlansMutationService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerPlansAuthorizationService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-authorization.service';

import { ManagerPlansCommandController } from '@/backend_manager/manager_modules/plans/manager-plans-command.controller';
import { ManagerPlansQueryController } from '@/backend_manager/manager_modules/plans/manager-plans-query.controller';
import { ManagerPlansRepository } from '@/backend_manager/manager_modules/plans/manager-plans.repository';
import { ManagerPlansActivateMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-activate-membership.service';
import { ManagerPlansCreateChangeRequestService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-create-change-request.service';
import { ManagerPlansCreatePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-create-plan.service';
import { ManagerPlansDeletePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-delete-plan.service';
import { ManagerPlansFindMembershipOverviewService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-membership-overview.service';
import { ManagerPlansFindPlanByIdService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-plan-by-id.service';
import { ManagerPlansFindPlansService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-find-plans.service';
import { ManagerPlansFreezeMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-freeze-membership.service';
import { ManagerPlansOrchestratorService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-orchestrator.service';
import { ManagerPlansRenewMembershipService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-renew-membership.service';
import { ManagerPlansUpdatePlanService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-update-plan.service';

@Module({
  controllers: [ManagerPlansQueryController, ManagerPlansCommandController],
  providers: [ManagerPlansMutationService, ManagerPlansCreatePlanService, ManagerPlansUpdatePlanService, ManagerPlansDeletePlanService, ManagerPlansCreateChangeRequestService, ManagerPlansActivateMembershipService, ManagerPlansRenewMembershipService, ManagerPlansFreezeMembershipService, ManagerPlansFindPlansService, ManagerPlansFindPlanByIdService, ManagerPlansFindMembershipOverviewService, ManagerPlansRepository, ManagerPlansOrchestratorService,
  ManagerPlansAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:plans`, useFactory: (authorization: ManagerPlansAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('plans', authorization); return authorization; }, inject: [ManagerPlansAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerPlansRepository],
})
export class ManagerPlansModule {}

export { ManagerPlansModule as PlansModule };

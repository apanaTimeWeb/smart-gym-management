// RESPONSIBILITY: Registers the isolated Manager plans feature boundary.
// FLOW: ManagerDomainModule -> PlansModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { PlansActivateMembershipService } from '@/modules/manager/plans/services/plans-activate-membership.service';
import { PlansCommandController } from '@/modules/manager/plans/plans-command.controller';
import { PlansCreateChangeRequestService } from '@/modules/manager/plans/services/plans-create-change-request.service';
import { PlansCreatePlanService } from '@/modules/manager/plans/services/plans-create-plan.service';
import { PlansDeletePlanService } from '@/modules/manager/plans/services/plans-delete-plan.service';
import { PlansFetchMembershipOverviewService } from '@/modules/manager/plans/services/plans-fetch-membership-overview.service';
import { PlansFetchPlanByIdService } from '@/modules/manager/plans/services/plans-fetch-plan-by-id.service';
import { PlansFetchPlansService } from '@/modules/manager/plans/services/plans-fetch-plans.service';
import { PlansFreezeMembershipService } from '@/modules/manager/plans/services/plans-freeze-membership.service';
import { PlansOrchestratorService } from '@/modules/manager/plans/services/plans-orchestrator.service';
import { PlansQueryController } from '@/modules/manager/plans/plans-query.controller';
import { PlansRenewMembershipService } from '@/modules/manager/plans/services/plans-renew-membership.service';
import { PlansRepository } from '@/modules/manager/plans/repositories/plans-repository';
import { PlansUpdatePlanService } from '@/modules/manager/plans/services/plans-update-plan.service';

@Module({
  controllers: [PlansQueryController, PlansCommandController],
  providers: [PlansCreatePlanService, PlansUpdatePlanService, PlansDeletePlanService, PlansCreateChangeRequestService, PlansActivateMembershipService, PlansRenewMembershipService, PlansFreezeMembershipService, PlansFetchPlansService, PlansFetchPlanByIdService, PlansFetchMembershipOverviewService, PlansRepository, PlansOrchestratorService],
  exports: [PlansRepository],
})
export class PlansModule {}

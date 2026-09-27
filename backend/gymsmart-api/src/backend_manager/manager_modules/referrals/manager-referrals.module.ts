// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerReferralsMutationService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerReferralsAuthorizationService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-authorization.service';

import { ManagerReferralsCommandController } from '@/backend_manager/manager_modules/referrals/manager-referrals-command.controller';
import { ManagerReferralsQueryController } from '@/backend_manager/manager_modules/referrals/manager-referrals-query.controller';
import { ManagerReferralsRepository } from '@/backend_manager/manager_modules/referrals/manager-referrals.repository';
import { ManagerReferralsClaimRewardService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-claim-reward.service';
import { ManagerReferralsCreateReferralService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-create-referral.service';
import { ManagerReferralsFindReferralKPIsService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-find-referral-k-p-is.service';
import { ManagerReferralsFindReferralsService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-find-referrals.service';
import { ManagerReferralsOrchestratorService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-orchestrator.service';

@Module({
  controllers: [ManagerReferralsQueryController, ManagerReferralsCommandController],
  providers: [ManagerReferralsMutationService, ManagerReferralsCreateReferralService, ManagerReferralsClaimRewardService, ManagerReferralsFindReferralKPIsService, ManagerReferralsFindReferralsService, ManagerReferralsRepository, ManagerReferralsOrchestratorService,
  ManagerReferralsAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:referrals`, useFactory: (authorization: ManagerReferralsAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('referrals', authorization); return authorization; }, inject: [ManagerReferralsAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerReferralsRepository],
})
export class ManagerReferralsModule {}

export { ManagerReferralsModule as ReferralsModule };

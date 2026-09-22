// RESPONSIBILITY: Registers the isolated Manager referrals feature boundary.
// FLOW: ManagerDomainModule -> ReferralsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ReferralsClaimRewardService } from '@/backend_manager/modules/manager/referrals/services/referrals-claim-reward.service';
import { ReferralsCommandController } from '@/backend_manager/modules/manager/referrals/referrals-command.controller';
import { ReferralsCreateReferralService } from '@/backend_manager/modules/manager/referrals/services/referrals-create-referral.service';
import { ReferralsFetchReferralKPIsService } from '@/backend_manager/modules/manager/referrals/services/referrals-fetch-referral-k-p-is.service';
import { ReferralsFetchReferralsService } from '@/backend_manager/modules/manager/referrals/services/referrals-fetch-referrals.service';
import { ReferralsOrchestratorService } from '@/backend_manager/modules/manager/referrals/services/referrals-orchestrator.service';
import { ReferralsQueryController } from '@/backend_manager/modules/manager/referrals/referrals-query.controller';
import { ReferralsRepository } from '@/backend_manager/modules/manager/referrals/repositories/referrals-repository';

@Module({
  controllers: [ReferralsQueryController, ReferralsCommandController],
  providers: [ReferralsCreateReferralService, ReferralsClaimRewardService, ReferralsFetchReferralKPIsService, ReferralsFetchReferralsService, ReferralsRepository, ReferralsOrchestratorService],
  exports: [ReferralsRepository],
})
export class ReferralsModule {}

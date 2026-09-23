// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { ReferralsCommandController } from '@/backend_manager/modules/backend_manager/referrals/referrals-command.controller';
import { ReferralsQueryController } from '@/backend_manager/modules/backend_manager/referrals/referrals-query.controller';
import { ReferralsRepository } from '@/backend_manager/modules/backend_manager/referrals/repositories/referrals-repository';
import { ReferralsClaimRewardService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-claim-reward.service';
import { ReferralsCreateReferralService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-create-referral.service';
import { ReferralsFetchReferralKPIsService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-fetch-referral-k-p-is.service';
import { ReferralsFetchReferralsService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-fetch-referrals.service';
import { ReferralsOrchestratorService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-orchestrator.service';

@Module({
  controllers: [ReferralsQueryController, ReferralsCommandController],
  providers: [ReferralsCreateReferralService, ReferralsClaimRewardService, ReferralsFetchReferralKPIsService, ReferralsFetchReferralsService, ReferralsRepository, ReferralsOrchestratorService],
  exports: [ReferralsRepository],
})
export class ReferralsModule {}

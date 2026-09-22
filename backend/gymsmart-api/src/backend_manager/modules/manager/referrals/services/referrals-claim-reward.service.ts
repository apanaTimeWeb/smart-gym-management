// RESPONSIBILITY: Write use-case for POST /api/v1/manager/referrals/:referralId/claim.
// FLOW: Controller DTO -> ReferralsClaimRewardService -> ReferralsOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ReferralsOrchestratorService } from '@/modules/manager/referrals/services/referrals-orchestrator.service';

@Injectable()
export class ReferralsClaimRewardService {
  constructor(private readonly orchestrator: ReferralsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async claimReward(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createReferrals(data, id);
  }
}

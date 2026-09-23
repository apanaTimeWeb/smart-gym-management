// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReferralsOrchestratorService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ReferralsClaimRewardService {
  constructor(private readonly orchestrator: ReferralsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async claimReward(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createReferrals(data);
  }
}

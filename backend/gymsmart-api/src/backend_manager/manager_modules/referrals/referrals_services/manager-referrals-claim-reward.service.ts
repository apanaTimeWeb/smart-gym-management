// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

import { ReferralsOrchestratorService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerReferralsClaimRewardService {
  constructor(private readonly orchestrator: ReferralsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async claimReward(data: ManagerCoreJsonObject, id?: string): ReturnType<ReferralsOrchestratorService['claimReward']> {
    if (!id) throw new ManagerCoreContextException('Referral id is required.', 'REFERRALS.REFERRAL.ID_REQUIRED', HttpStatus.BAD_REQUEST);
    return this.orchestrator.claimReward(data, id);
  }
}

export { ManagerReferralsClaimRewardService as ReferralsClaimRewardService };

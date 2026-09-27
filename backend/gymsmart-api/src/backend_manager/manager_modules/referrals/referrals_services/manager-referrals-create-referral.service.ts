// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReferralsOrchestratorService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerReferralsCreateReferralService {
  constructor(private readonly orchestrator: ReferralsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createReferral(data: ManagerCoreJsonObject): ReturnType<ReferralsOrchestratorService['createReferral']> {
    return this.orchestrator.createReferral(data);
  }
}

export { ManagerReferralsCreateReferralService as ReferralsCreateReferralService };

// RESPONSIBILITY: Write use-case for POST /api/v1/manager/plans/membership-freeze.
// FLOW: Controller DTO -> PlansFreezeMembershipService -> PlansOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PlansOrchestratorService } from '@/modules/manager/plans/services/plans-orchestrator.service';

@Injectable()
export class PlansFreezeMembershipService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async freezeMembership(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createPlans(data, id);
  }
}

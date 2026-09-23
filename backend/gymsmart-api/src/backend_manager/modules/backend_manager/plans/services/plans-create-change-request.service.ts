// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansOrchestratorService } from '@/backend_manager/modules/backend_manager/plans/services/plans-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class PlansCreateChangeRequestService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createChangeRequest(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createPlans(data);
  }
}

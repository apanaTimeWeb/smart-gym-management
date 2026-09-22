// RESPONSIBILITY: Write use-case for POST /api/v1/manager/plans/change-requests.
// FLOW: Controller DTO -> PlansCreateChangeRequestService -> PlansOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PlansOrchestratorService } from '@/modules/manager/plans/services/plans-orchestrator.service';

@Injectable()
export class PlansCreateChangeRequestService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createChangeRequest(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createPlans(data, id);
  }
}

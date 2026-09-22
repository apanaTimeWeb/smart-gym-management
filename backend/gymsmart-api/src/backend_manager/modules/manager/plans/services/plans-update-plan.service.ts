// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/plans/:id.
// FLOW: Controller DTO -> PlansUpdatePlanService -> PlansOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PlansOrchestratorService } from '@/modules/manager/plans/services/plans-orchestrator.service';

@Injectable()
export class PlansUpdatePlanService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updatePlan(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updatePlansById(data, id);
  }
}

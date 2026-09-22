// RESPONSIBILITY: Write use-case for POST /api/v1/manager/plans.
// FLOW: Controller DTO -> PlansCreatePlanService -> PlansOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { PlansOrchestratorService } from '@/backend_manager/modules/manager/plans/services/plans-orchestrator.service';

@Injectable()
export class PlansCreatePlanService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createPlan(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createPlans(data);
  }
}

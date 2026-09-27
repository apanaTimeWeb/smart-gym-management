// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansOrchestratorService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerPlansCreatePlanService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createPlan(data: ManagerCoreJsonObject): ReturnType<PlansOrchestratorService['createPlan']> {
    return this.orchestrator.createPlan(data);
  }
}

export { ManagerPlansCreatePlanService as PlansCreatePlanService };

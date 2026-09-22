// RESPONSIBILITY: Write use-case for POST /api/v1/manager/library/diet-plans.
// FLOW: Controller DTO -> LibraryCreateDietPlanService -> LibraryOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { LibraryOrchestratorService } from '@/backend_manager/modules/manager/library/services/library-orchestrator.service';

@Injectable()
export class LibraryCreateDietPlanService {
  constructor(private readonly orchestrator: LibraryOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createDietPlan(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createLibrary(data);
  }
}

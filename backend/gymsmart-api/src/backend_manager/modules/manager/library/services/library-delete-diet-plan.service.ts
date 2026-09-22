// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/library/diet-plans/:id.
// FLOW: Controller DTO -> LibraryDeleteDietPlanService -> LibraryOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { LibraryOrchestratorService } from '@/backend_manager/modules/manager/library/services/library-orchestrator.service';

@Injectable()
export class LibraryDeleteDietPlanService {
  constructor(private readonly orchestrator: LibraryOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteDietPlan(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteLibraryById(id); }
}

// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerLibraryOrchestratorService } from '@/backend_manager/manager_modules/library/library_services/manager-library-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerLibraryDeleteDietPlanService {
  constructor(private readonly orchestrator: ManagerLibraryOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteDietPlan(id?: string): ReturnType<ManagerLibraryOrchestratorService['deleteDietPlan']> { return this.orchestrator.deleteDietPlan(id); }
}

export { ManagerLibraryDeleteDietPlanService as LibraryDeleteDietPlanService };

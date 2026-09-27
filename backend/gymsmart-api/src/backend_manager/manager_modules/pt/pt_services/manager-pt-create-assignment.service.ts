// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtOrchestratorService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerPtCreateAssignmentService {
  constructor(private readonly orchestrator: PtOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createAssignment(data: ManagerCoreJsonObject): ReturnType<PtOrchestratorService['createAssignment']> {
    return this.orchestrator.createAssignment(data);
  }
}

export { ManagerPtCreateAssignmentService as PtCreateAssignmentService };

// RESPONSIBILITY: Write use-case for POST /api/v1/manager/pt/assignments.
// FLOW: Controller DTO -> PtCreateAssignmentService -> PtOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { PtOrchestratorService } from '@/backend_manager/modules/manager/pt/services/pt-orchestrator.service';

@Injectable()
export class PtCreateAssignmentService {
  constructor(private readonly orchestrator: PtOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createAssignment(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createPt(data);
  }
}

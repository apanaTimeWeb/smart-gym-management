// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/communications/automations/:id.
// FLOW: Controller DTO -> CommunicationsUpdateAutomationService -> CommunicationsOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { CommunicationsOrchestratorService } from '@/modules/manager/communications/services/communications-orchestrator.service';

@Injectable()
export class CommunicationsUpdateAutomationService {
  constructor(private readonly orchestrator: CommunicationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateAutomation(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateCommunicationsById(data, id);
  }
}

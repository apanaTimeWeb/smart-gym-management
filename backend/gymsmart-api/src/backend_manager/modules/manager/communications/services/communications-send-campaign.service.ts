// RESPONSIBILITY: Write use-case for POST /api/v1/manager/communications/campaigns.
// FLOW: Controller DTO -> CommunicationsSendCampaignService -> CommunicationsOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { CommunicationsOrchestratorService } from '@/backend_manager/modules/manager/communications/services/communications-orchestrator.service';

@Injectable()
export class CommunicationsSendCampaignService {
  constructor(private readonly orchestrator: CommunicationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async sendCampaign(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createCommunications(data);
  }
}

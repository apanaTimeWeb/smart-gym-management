// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/settings.
// FLOW: Controller DTO -> SettingsUpdateSettingsService -> SettingsOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { SettingsOrchestratorService } from '@/backend_manager/modules/manager/settings/services/settings-orchestrator.service';

@Injectable()
export class SettingsUpdateSettingsService {
  constructor(private readonly orchestrator: SettingsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateSettings(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateSettingsById(data, id);
  }
}

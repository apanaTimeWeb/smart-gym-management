// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { SettingsOrchestratorService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerSettingsUpdateSettingsService {
  constructor(private readonly orchestrator: SettingsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateSettings(data: ManagerCoreJsonObject, id?: string): ReturnType<SettingsOrchestratorService['updateSettings']> {
    return this.orchestrator.updateSettings(data, id);
  }
}

export { ManagerSettingsUpdateSettingsService as SettingsUpdateSettingsService };

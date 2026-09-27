// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsOrchestratorService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerCommunicationsUpdateAutomationService {
  constructor(private readonly orchestrator: CommunicationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateAutomation(data: ManagerCoreJsonObject, id?: string): ReturnType<CommunicationsOrchestratorService['updateAutomation']> {
    return this.orchestrator.updateAutomation(data, id);
  }
}

export { ManagerCommunicationsUpdateAutomationService as CommunicationsUpdateAutomationService };

// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

import { PtOrchestratorService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerPtMarkSessionCompleteService {
  constructor(private readonly orchestrator: PtOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async completeSession(data: ManagerCoreJsonObject, id?: string): ReturnType<PtOrchestratorService['completeSession']> {
    if (!id) throw new ManagerCoreContextException('Assignment id is required.', 'PT.ASSIGNMENT.ID_REQUIRED', HttpStatus.BAD_REQUEST);
    return this.orchestrator.completeSession(data, id);
  }
}

export { ManagerPtMarkSessionCompleteService as PtMarkSessionCompleteService };

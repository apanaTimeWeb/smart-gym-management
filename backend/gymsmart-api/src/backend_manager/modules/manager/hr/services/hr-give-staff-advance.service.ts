// RESPONSIBILITY: Write use-case for POST /api/v1/manager/hr/ledger/advance.
// FLOW: Controller DTO -> HrGiveStaffAdvanceService -> HrOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { HrOrchestratorService } from '@/backend_manager/modules/manager/hr/services/hr-orchestrator.service';

@Injectable()
export class HrGiveStaffAdvanceService {
  constructor(private readonly orchestrator: HrOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async giveStaffAdvance(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createHr(data);
  }
}

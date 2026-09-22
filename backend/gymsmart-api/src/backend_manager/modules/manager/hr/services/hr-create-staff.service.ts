// RESPONSIBILITY: Write use-case for POST /api/v1/manager/hr/staff.
// FLOW: Controller DTO -> HrCreateStaffService -> HrOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { HrOrchestratorService } from '@/modules/manager/hr/services/hr-orchestrator.service';

@Injectable()
export class HrCreateStaffService {
  constructor(private readonly orchestrator: HrOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createStaff(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createHr(data, id);
  }
}

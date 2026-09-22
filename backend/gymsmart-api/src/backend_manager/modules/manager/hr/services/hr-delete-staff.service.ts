// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/hr/staff/:id.
// FLOW: Controller DTO -> HrDeleteStaffService -> HrOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { HrOrchestratorService } from '@/modules/manager/hr/services/hr-orchestrator.service';

@Injectable()
export class HrDeleteStaffService {
  constructor(private readonly orchestrator: HrOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteStaff(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteHrById(id); }
}

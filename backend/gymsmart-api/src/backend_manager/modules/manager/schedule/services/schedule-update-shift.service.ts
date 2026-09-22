// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/schedule/shifts/:id.
// FLOW: Controller DTO -> ScheduleUpdateShiftService -> ScheduleOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ScheduleOrchestratorService } from '@/backend_manager/modules/manager/schedule/services/schedule-orchestrator.service';

@Injectable()
export class ScheduleUpdateShiftService {
  constructor(private readonly orchestrator: ScheduleOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateShift(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateScheduleById(data, id);
  }
}

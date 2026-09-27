// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ScheduleOrchestratorService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerScheduleUpdateShiftService {
  constructor(private readonly orchestrator: ScheduleOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateShift(data: ManagerCoreJsonObject, id?: string): ReturnType<ScheduleOrchestratorService['updateShift']> {
    return this.orchestrator.updateShift(data, id);
  }
}

export { ManagerScheduleUpdateShiftService as ScheduleUpdateShiftService };

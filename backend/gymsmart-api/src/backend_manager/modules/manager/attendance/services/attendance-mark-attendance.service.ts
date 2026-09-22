// RESPONSIBILITY: Write use-case for POST /api/v1/manager/attendance.
// FLOW: Controller DTO -> AttendanceMarkAttendanceService -> AttendanceOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { AttendanceOrchestratorService } from '@/backend_manager/modules/manager/attendance/services/attendance-orchestrator.service';

@Injectable()
export class AttendanceMarkAttendanceService {
  constructor(private readonly orchestrator: AttendanceOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async markAttendance(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createAttendance(data);
  }
}

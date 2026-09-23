// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { AttendanceRepository } from '@/backend_manager/modules/backend_manager/attendance/repositories/attendance-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class AttendanceFetchAttendanceHistoryService {
  constructor(private readonly repository: AttendanceRepository) {}

  /** @description Loads the attendance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAttendanceHistory(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findAttendanceList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return rows;
  }
}

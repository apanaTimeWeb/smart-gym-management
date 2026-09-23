// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { AttendanceRepository } from '@/backend_manager/modules/backend_manager/attendance/repositories/attendance-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class AttendanceFetchAttendanceStatsService {
  constructor(private readonly repository: AttendanceRepository) {}

  /** @description Loads the attendance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAttendanceStats(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findAttendanceList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const memberCheckIns=rows.filter((row)=>row.type==='MEMBER').length;
    const staffCheckIns=rows.filter((row)=>row.type==='STAFF').length;
    return { totalCheckIns:rows.length, memberCheckIns, staffCheckIns };
  }
}

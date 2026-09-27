// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { AttendanceRepository } from '@/backend_manager/manager_modules/attendance/manager-attendance.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerAttendanceFindAttendanceStatsServiceFindAttendanceStatsResult {
  totalCheckIns: number;
  memberCheckIns: number;
  staffCheckIns: number;
}

@Injectable()
export class ManagerAttendanceFindAttendanceStatsService {
  constructor(private readonly repository: AttendanceRepository) {}

  /** @description Loads the attendance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findAttendanceStats(query:ManagerCoreJsonObject={}):Promise<ManagerAttendanceFindAttendanceStatsServiceFindAttendanceStatsResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const memberCheckIns=rows.filter((row)=>row.type==='MEMBER').length;
    const staffCheckIns=rows.filter((row)=>row.type==='STAFF').length;
    return { totalCheckIns:rows.length, memberCheckIns, staffCheckIns };
  }
}

export { ManagerAttendanceFindAttendanceStatsService as AttendanceFindAttendanceStatsService };

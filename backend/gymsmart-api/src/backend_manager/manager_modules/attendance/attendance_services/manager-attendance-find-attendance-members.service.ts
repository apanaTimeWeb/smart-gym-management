// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { AttendanceRepository } from '@/backend_manager/manager_modules/attendance/manager-attendance.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerAttendanceFindAttendanceMembersServiceFindAttendanceMembersResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerAttendanceFindAttendanceMembersService {
  constructor(private readonly repository: AttendanceRepository) {}

  /** @description Loads the attendance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findAttendanceMembers(query: ManagerCoreJsonObject = {}): Promise<ManagerAttendanceFindAttendanceMembersServiceFindAttendanceMembersResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { members: rows,  }, meta: result.meta  };
  }
}

export { ManagerAttendanceFindAttendanceMembersService as AttendanceFindAttendanceMembersService };

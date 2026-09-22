// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/attendance/members.
// FLOW: Controller -> AttendanceFetchAttendanceMembersService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { AttendanceRepository } from '@/backend_manager/modules/manager/attendance/repositories/attendance-repository';

@Injectable()
export class AttendanceFetchAttendanceMembersService {
  constructor(private readonly repository: AttendanceRepository) {}

  /** @description Loads the attendance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchAttendanceMembers(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findAttendanceList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { members: rows,  }, meta: result.meta };
  }
}

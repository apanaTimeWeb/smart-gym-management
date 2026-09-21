// RESPONSIBILITY: Owns read-side use cases for Admin attendance; no write persistence occurs here.
// FLOW: AdminAttendanceQueryController → AdminAttendanceQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminAttendanceRepository } from '@/modules/admin/attendance/repositories/admin-attendance-repository';
import { AdminAttendanceMapper } from '@/modules/admin/attendance/mappers/admin-attendance.mapper';
import { AdminAttendanceQueryDto } from '@/modules/admin/attendance/dtos/admin-attendance-query.dto';
import { AdminAttendanceRecordDto, AdminAttendanceSummaryDto, AdminAttendanceTrendPointDto } from '@/modules/admin/attendance/dtos/admin-attendance-response.dto';

@Injectable()
export class AdminAttendanceQueryService {
  constructor(
    private readonly repository: AdminAttendanceRepository,
    private readonly mapper: AdminAttendanceMapper,
  ) {}


  /** @description Executes fetchAttendance for the Admin attendance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAttendance(query: AdminAttendanceQueryDto): Promise<AdminAttendanceRecordDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminAttendanceRecordDto[];
  }

  /** @description Executes fetchSummary for the Admin attendance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSummary(_query?: AdminAttendanceQueryDto): Promise<AdminAttendanceSummaryDto> {
    const result = await this.repository.findFirstSnapshot(); 
    return (result ? result.payload : {}) as AdminAttendanceSummaryDto;
  }

  /** @description Executes fetchTrend for the Admin attendance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchTrend(_query?: AdminAttendanceQueryDto): Promise<AdminAttendanceTrendPointDto[]> {
    const result = await this.repository.findFirstSnapshot(); 
    return (result && Array.isArray(result.payload) ? result.payload : []) as AdminAttendanceTrendPointDto[];
  }
}

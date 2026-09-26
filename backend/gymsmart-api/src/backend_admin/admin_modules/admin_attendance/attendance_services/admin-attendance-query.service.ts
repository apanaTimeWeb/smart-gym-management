// RESPONSIBILITY: Owns read-side use cases for Admin attendance; no write persistence occurs here.
// FLOW: AdminAttendanceQueryController â†’ AdminAttendanceQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminAttendanceQueryDto } from '@/backend_admin/admin_modules/admin_attendance/attendance_dtos/admin-attendance-query.dto'
import { AdminAttendanceRecordDto, AdminAttendanceSummaryDto, AdminAttendanceTrendPointDto } from '@/backend_admin/admin_modules/admin_attendance/attendance_dtos/admin-attendance-response.dto'
import { AdminAttendanceResponsePresenter } from '@/backend_admin/admin_modules/admin_attendance/attendance_mappers/admin-attendance.response.presenter'
import { AdminAttendanceRepository } from '@/backend_admin/admin_modules/admin_attendance/attendance_repositories/admin-attendance-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminAttendanceQueryService boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAttendanceQueryService {
  constructor(
    private readonly repository: AdminAttendanceRepository,
    private readonly presenter: AdminAttendanceResponsePresenter,
  ) {}

  /** @description Executes fetchAttendance for the Admin attendance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllAttendance(query: AdminAttendanceQueryDto): Promise<AdminCorePaginatedResult<AdminAttendanceRecordDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchSummary for the Admin attendance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAttendanceSummary(_query?: AdminAttendanceQueryDto): Promise<AdminAttendanceSummaryDto> {
    const result = await this.repository.findLatestReadModel(_query); 
    if (!result) {
      return {
        todayTotal: 0,
        todayPresent: 0,
        todayLate: 0,
        weeklyAverage: 0,
        peakHour: 'N/A',
        trendVsLastWeek: 0,
        uniqueMembersThisMonth: 0,
      } as AdminAttendanceSummaryDto;
    }
    return this.presenter.toSummaryResponse(result);
  }

  /** @description Executes fetchTrend for the Admin attendance feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAttendanceTrend(_query?: AdminAttendanceQueryDto): Promise<AdminAttendanceTrendPointDto[]> {
    const result = await this.repository.findLatestReadModel(_query); 
    if (!result) return [];
    return this.presenter.toTrendResponse(result);
  }
}

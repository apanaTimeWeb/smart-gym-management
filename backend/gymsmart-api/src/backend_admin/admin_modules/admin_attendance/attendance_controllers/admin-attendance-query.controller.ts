// RESPONSIBILITY: Exposes read-only Admin attendance HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAttendanceQueryController -> AdminAttendanceQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminAttendanceQueryDto } from '@/backend_admin/admin_modules/admin_attendance/attendance_dtos/admin-attendance-query.dto.js';
import { AdminAttendanceRecordDto, AdminAttendanceSummaryDto, AdminAttendanceTrendPointDto } from '@/backend_admin/admin_modules/admin_attendance/attendance_dtos/admin-attendance-response.dto.js';
import { AdminAttendanceQueryService } from '@/backend_admin/admin_modules/admin_attendance/attendance_services/admin-attendance-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / attendance')
@Controller('admin/attendance')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminAttendanceQueryController boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAttendanceQueryController {
  constructor(private readonly service: AdminAttendanceQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchAttendance' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAttendanceRecordDto] })
  async findAllAttendance(@Query() query: AdminAttendanceQueryDto): Promise<AdminCorePaginatedResult<AdminAttendanceRecordDto>> {
    return this.service.findAllAttendance(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAttendanceSummaryDto })
  async findAttendanceSummary(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceSummaryDto> {
    return this.service.findAttendanceSummary(query);
  }

  // SLA: STANDARD
  @Get('trend')
  @ApiOperation({ summary: 'Execute fetchTrend' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAttendanceTrendPointDto] })
  async findAttendanceTrend(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceTrendPointDto[]> {
    return this.service.findAttendanceTrend(query);
  }

}

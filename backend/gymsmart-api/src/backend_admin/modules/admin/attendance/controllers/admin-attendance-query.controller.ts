// RESPONSIBILITY: Exposes read-only Admin attendance HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAttendanceQueryController -> AdminAttendanceQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminAttendanceQueryService } from '@/backend_admin/modules/admin/attendance/services/admin-attendance-query.service';
import { AdminAttendanceQueryDto } from '@/backend_admin/modules/admin/attendance/dtos/admin-attendance-query.dto';
import { AdminAttendanceRecordDto, AdminAttendanceSummaryDto, AdminAttendanceTrendPointDto } from '@/backend_admin/modules/admin/attendance/dtos/admin-attendance-response.dto';

@ApiTags('Admin / attendance')
@Controller('admin/attendance')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminAttendanceQueryController {
  constructor(private readonly service: AdminAttendanceQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchAttendance' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAttendanceRecordDto] })
  async fetchAttendance(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceRecordDto[]> {
    return this.service.fetchAttendance(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAttendanceSummaryDto })
  async fetchSummary(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceSummaryDto> {
    return this.service.fetchSummary(query);
  }

  // SLA: STANDARD
  @Get('trend')
  @ApiOperation({ summary: 'Execute fetchTrend' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAttendanceTrendPointDto] })
  async fetchTrend(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceTrendPointDto[]> {
    return this.service.fetchTrend(query);
  }

}

// RESPONSIBILITY: Exposes read-only Admin attendance HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAttendanceQueryController -> AdminAttendanceQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminAttendanceQueryService } from '@/modules/admin/attendance/services/admin-attendance-query.service';
import { AdminAttendanceQueryDto } from '@/modules/admin/attendance/dtos/admin-attendance-query.dto';
import { AdminAttendanceListResponseDto, AdminAttendanceSummaryResponseDto, AdminAttendanceTrendResponseDto } from '@/modules/admin/attendance/dtos/admin-attendance-response.dto';

@ApiTags('Admin / attendance')
@Controller('admin/attendance')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminAttendanceQueryController {
  constructor(private readonly service: AdminAttendanceQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchAttendance' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAttendanceListResponseDto })
  async fetchAttendance(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceListResponseDto> {
    return this.service.fetchAttendance(query) as unknown as AdminAttendanceListResponseDto;
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAttendanceSummaryResponseDto })
  async fetchSummary(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceSummaryResponseDto> {
    return this.service.fetchSummary(query) as unknown as AdminAttendanceSummaryResponseDto;
  }

  // SLA: STANDARD
  @Get('trend')
  @ApiOperation({ summary: 'Execute fetchTrend' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAttendanceTrendResponseDto })
  async fetchTrend(@Query() query: AdminAttendanceQueryDto): Promise<AdminAttendanceTrendResponseDto> {
    return this.service.fetchTrend(query) as unknown as AdminAttendanceTrendResponseDto;
  }

}

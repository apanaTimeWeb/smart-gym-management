// RESPONSIBILITY: Exposes read-only Admin reports HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminReportsQueryController -> AdminReportsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminReportsQueryService } from '@/modules/admin/reports/services/admin-reports-query.service';
import { AdminReportsQueryDto } from '@/modules/admin/reports/dtos/admin-reports-query.dto';
import { AdminReportsResponseDto } from '@/modules/admin/reports/dtos/admin-reports-response.dto';

@ApiTags('Admin / reports')
@Controller('admin/reports')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminReportsQueryController {
  constructor(private readonly service: AdminReportsQueryService) {}

  // SLA: STANDARD
  @Get('fetchReportData')
  @ApiOperation({ summary: 'Execute fetchReportData' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsResponseDto })
  async fetchReportData(@Query() query: AdminReportsQueryDto): Promise<unknown> {
    return this.service.fetchReportData(query);
  }

  // SLA: STANDARD
  @Get('revenue')
  @ApiOperation({ summary: 'Fetch revenue report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsResponseDto })
  async fetchRevenue(): Promise<unknown> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('attendance')
  @ApiOperation({ summary: 'Fetch attendance report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsResponseDto })
  async fetchAttendance(): Promise<unknown> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('members')
  @ApiOperation({ summary: 'Fetch membership report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsResponseDto })
  async fetchMembers(): Promise<unknown> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('payroll')
  @ApiOperation({ summary: 'Fetch payroll report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsResponseDto })
  async fetchPayroll(): Promise<unknown> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('pnl')
  @ApiOperation({ summary: 'Fetch PnL report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsResponseDto })
  async fetchPnl(): Promise<unknown> {
    return this.service.fetchReportData();
  }

}

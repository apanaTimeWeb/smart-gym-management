// RESPONSIBILITY: Exposes read-only Admin reports HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminReportsQueryController -> AdminReportsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminReportsQueryService } from '@/backend_admin/modules/admin/reports/services/admin-reports-query.service';
import { AdminReportsQueryDto } from '@/backend_admin/modules/admin/reports/dtos/admin-reports-query.dto';
import { AdminReportsDataResponseDto } from '@/backend_admin/modules/admin/reports/dtos/admin-reports-response.dto';

@ApiTags('Admin / reports')
@Controller('admin/reports')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminReportsQueryController {
  constructor(private readonly service: AdminReportsQueryService) {}

  // SLA: STANDARD
  @Get('fetchReportData')
  @ApiOperation({ summary: 'Execute fetchReportData' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchReportData(@Query() query: AdminReportsQueryDto): Promise<AdminReportsDataResponseDto> {
    return this.service.fetchReportData(query);
  }

  // SLA: STANDARD
  @Get('revenue')
  @ApiOperation({ summary: 'Fetch revenue report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchRevenue(): Promise<AdminReportsDataResponseDto> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('attendance')
  @ApiOperation({ summary: 'Fetch attendance report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchAttendance(): Promise<AdminReportsDataResponseDto> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('members')
  @ApiOperation({ summary: 'Fetch membership report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchMembers(): Promise<AdminReportsDataResponseDto> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('payroll')
  @ApiOperation({ summary: 'Fetch payroll report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchPayroll(): Promise<AdminReportsDataResponseDto> {
    return this.service.fetchReportData();
  }

  // SLA: STANDARD
  @Get('pnl')
  @ApiOperation({ summary: 'Fetch PnL report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchPnl(): Promise<AdminReportsDataResponseDto> {
    return this.service.fetchReportData();
  }

}

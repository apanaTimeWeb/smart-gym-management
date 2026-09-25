// RESPONSIBILITY: Exposes read-only Admin reports HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminReportsQueryController -> AdminReportsQueryService -> repository.
import { Controller, Get, HttpStatus, Param, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminReportsQueryDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-query.dto.js';
import { AdminReportsDataResponseDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-response.dto.js';
import { AdminReportsQueryService } from '@/backend_admin/admin_modules/admin_reports/reports_services/admin-reports-query.service.js';

@ApiTags('Admin / reports')
@Controller('admin/reports')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminReportsQueryController boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsQueryController {
  constructor(private readonly service: AdminReportsQueryService) {}

  // SLA: STANDARD
  @Get('fetchReportData')
  @ApiOperation({ summary: 'Execute fetchReportData' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async findReportData(@Query() query: AdminReportsQueryDto): Promise<AdminReportsDataResponseDto> {
    return this.service.findReportData(query);
  }

  // SLA: STANDARD
  @Get('revenue')
  @ApiOperation({ summary: 'Fetch revenue report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchRevenue(): Promise<AdminReportsDataResponseDto> {
    return this.service.findReportData(new AdminReportsQueryDto());
  }

  // SLA: STANDARD
  @Get('attendance')
  @ApiOperation({ summary: 'Fetch attendance report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchAttendance(): Promise<AdminReportsDataResponseDto> {
    return this.service.findReportData(new AdminReportsQueryDto());
  }

  // SLA: STANDARD
  @Get('members')
  @ApiOperation({ summary: 'Fetch membership report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchMembers(): Promise<AdminReportsDataResponseDto> {
    return this.service.findReportData(new AdminReportsQueryDto());
  }

  // SLA: STANDARD
  @Get('payroll')
  @ApiOperation({ summary: 'Fetch payroll report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchPayroll(): Promise<AdminReportsDataResponseDto> {
    return this.service.findReportData(new AdminReportsQueryDto());
  }

  // SLA: STANDARD
  @Get('pnl')
  @ApiOperation({ summary: 'Fetch PnL report' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminReportsDataResponseDto })
  async fetchPnl(): Promise<AdminReportsDataResponseDto> {
    return this.service.findReportData(new AdminReportsQueryDto());
  }

  /** @description Streams a completed report artifact for the authenticated tenant only. @param id Export job UUID. @returns Streamable artifact. */
  // SLA: STANDARD
  @Get('export/:id/download')
  @ApiOperation({ summary: 'Download completed report export' })
  @ApiResponse({ status: HttpStatus.OK })
  async findReportExportDownload(@Param('id') id: string): Promise<StreamableFile> {
    const result = await this.service.findReportExportDownload(id);
    return new StreamableFile(result.content, { type: result.contentType, disposition: `attachment; filename=${result.fileName}` });
  }
}

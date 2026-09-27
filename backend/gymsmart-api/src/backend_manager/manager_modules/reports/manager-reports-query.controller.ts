// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query, Header } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { ManagerCoreRawResponse } from '@/backend_manager/manager_core/manager_core_http/manager-core-raw-response.decorator';

import { ManagerReportsFetchReportsSummaryResponseDto } from '@/backend_manager/manager_modules/reports/reports_responses/manager-reports-fetch-reports-summary.response.dto';
import { ManagerReportsQueryDto } from '@/backend_manager/manager_modules/reports/reports_dtos/manager-reports-query.dto';
import { ManagerReportsExportReportsReportService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-export-reports-report.service';
import { ManagerReportsFindReportsSummaryService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-find-reports-summary.service';

@Controller('manager')
@ApiTags('Manager reports')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerReportsQueryController {
  constructor(private readonly fetchReportsSummaryService: ManagerReportsFindReportsSummaryService, private readonly exportReportsReportService: ManagerReportsExportReportsReportService) {}

  // SLA: HEAVY
  // CONTRACT EXCEPTION: This endpoint returns a binary export body, not the JSON envelope.
  @Get("reports/export")
  @ApiOperation({ summary: 'createReportsExport for Manager reports' })
  @ManagerCoreRawResponse()
  @Header('Content-Type', 'text/csv')
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'string', format: 'binary' } })
  createReportsExport(@Query() query: ManagerReportsQueryDto): ReturnType<ManagerReportsExportReportsReportService['createReportsExport']> { return this.exportReportsReportService.createReportsExport(query); }


  // SLA: FAST
  @Get("reports/summary")
  @ApiOperation({ summary: 'findReportsSummary for Manager reports' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerReportsFetchReportsSummaryResponseDto })
  findReportsSummary(@Query() query: ManagerReportsQueryDto): ReturnType<ManagerReportsFindReportsSummaryService['findReportsSummary']> { return this.fetchReportsSummaryService.findReportsSummary(query); }


}

export { ManagerReportsQueryController as ReportsQueryController };

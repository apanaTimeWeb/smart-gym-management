// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query, Header } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRawResponse } from '@/backend_manager/core/http/core-raw-response.decorator';

import { ReportsFetchReportsSummaryResponseDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-fetch-reports-summary.response.dto';
import { ReportsQueryDto } from '@/backend_manager/modules/backend_manager/reports/dtos/reports-query.dto';
import { ReportsExportReportsReportService } from '@/backend_manager/modules/backend_manager/reports/services/reports-export-reports-report.service';
import { ReportsFetchReportsSummaryService } from '@/backend_manager/modules/backend_manager/reports/services/reports-fetch-reports-summary.service';

@Controller('manager')
@ApiTags('Manager reports')
@Roles(CoreRole.MANAGER)
export class ReportsQueryController {
  constructor(private readonly fetchReportsSummaryService: ReportsFetchReportsSummaryService, private readonly exportReportsReportService: ReportsExportReportsReportService) {}

  // SLA: STANDARD
  @Get("reports/export")
  @ApiOperation({ summary: 'exportReportsReport for Manager reports' })
  @CoreRawResponse()
  @Header('Content-Type', 'text/csv')
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'string', format: 'binary' } })
  exportReportsReport(@Query() query: ReportsQueryDto): ReturnType<ReportsExportReportsReportService['exportReportsReport']> { return this.exportReportsReportService.exportReportsReport(query as any); }


  // SLA: FAST
  @Get("reports/summary")
  @ApiOperation({ summary: 'fetchReportsSummary for Manager reports' })
  @ApiResponse({ status: HttpStatus.OK, type: ReportsFetchReportsSummaryResponseDto })
  fetchReportsSummary(@Query() query: ReportsQueryDto): ReturnType<ReportsFetchReportsSummaryService['fetchReportsSummary']> { return this.fetchReportsSummaryService.fetchReportsSummary(query as any); }


}

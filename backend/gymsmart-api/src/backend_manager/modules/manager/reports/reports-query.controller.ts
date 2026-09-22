// RESPONSIBILITY: Owns the Manager reports query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRawResponse } from '@/core/http/core-raw-response.decorator';
import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { ReportsExportReportsReportService } from '@/modules/manager/reports/services/reports-export-reports-report.service';
import { ReportsFetchReportsSummaryResponseDto } from '@/modules/manager/reports/dtos/reports-fetch-reports-summary.response.dto';
import { ReportsFetchReportsSummaryService } from '@/modules/manager/reports/services/reports-fetch-reports-summary.service';
import { ReportsQueryDto } from '@/modules/manager/reports/dtos/reports-query.dto';

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
  @ApiResponse({ status: HttpStatus.OK, type: 'string', format: 'binary' })
  exportReportsReport(@Query() query: ReportsQueryDto): Promise<Buffer> { return this.exportReportsReportService.exportReportsReport(query) as unknown as Promise<Buffer>; }


  // SLA: FAST
  @Get("reports/summary")
  @ApiOperation({ summary: 'fetchReportsSummary for Manager reports' })
  @ApiResponse({ status: HttpStatus.OK, type: ReportsFetchReportsSummaryResponseDto })
  fetchReportsSummary(@Query() query: ReportsQueryDto): Promise<ReportsFetchReportsSummaryResponseDto> {  return this.fetchReportsSummaryService.fetchReportsSummary(query) as Promise<ReportsFetchReportsSummaryResponseDto>;  }


}

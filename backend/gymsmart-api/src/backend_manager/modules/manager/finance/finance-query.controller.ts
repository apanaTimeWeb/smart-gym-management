// RESPONSIBILITY: Owns the Manager finance query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { FinanceExportPaymentsReportResponseDto } from '@/modules/manager/finance/dtos/finance-export-payments-report.response.dto';
import { FinanceExportPaymentsReportService } from '@/modules/manager/finance/services/finance-export-payments-report.service';
import { FinanceFetchFinanceSummaryResponseDto } from '@/modules/manager/finance/dtos/finance-fetch-finance-summary.response.dto';
import { FinanceFetchFinanceSummaryService } from '@/modules/manager/finance/services/finance-fetch-finance-summary.service';
import { FinanceFetchPaymentsByMemberResponseDto } from '@/modules/manager/finance/dtos/finance-fetch-payments-by-member.response.dto';
import { FinanceFetchPaymentsByMemberService } from '@/modules/manager/finance/services/finance-fetch-payments-by-member.service';
import { FinanceFetchPaymentsResponseDto } from '@/modules/manager/finance/dtos/finance-fetch-payments.response.dto';
import { FinanceFetchPaymentsService } from '@/modules/manager/finance/services/finance-fetch-payments.service';
import { FinanceQueryDto } from '@/modules/manager/finance/dtos/finance-query.dto';

@Controller('manager')
@ApiTags('Manager finance')
@Roles(CoreRole.MANAGER)
export class FinanceQueryController {
  constructor(private readonly fetchPaymentsService: FinanceFetchPaymentsService, private readonly fetchPaymentsByMemberService: FinanceFetchPaymentsByMemberService, private readonly fetchFinanceSummaryService: FinanceFetchFinanceSummaryService, private readonly exportPaymentsReportService: FinanceExportPaymentsReportService) {}

  // SLA: STANDARD
  @Get("finance/export")
  @ApiOperation({ summary: 'exportPaymentsReport for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: FinanceExportPaymentsReportResponseDto })
  exportPaymentsReport(@Query() query: FinanceQueryDto): Promise<FinanceExportPaymentsReportResponseDto> {  return this.exportPaymentsReportService.exportPaymentsReport(query) as Promise<FinanceExportPaymentsReportResponseDto>;  }


  // SLA: STANDARD
  @Get("finance/payments")
  @ApiOperation({ summary: 'fetchPayments for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: FinanceFetchPaymentsResponseDto })
  fetchPayments(@Query() query: FinanceQueryDto): Promise<FinanceFetchPaymentsResponseDto> {  return this.fetchPaymentsService.fetchPayments(query) as Promise<FinanceFetchPaymentsResponseDto>;  }


  // SLA: FAST
  @Get("finance/summary")
  @ApiOperation({ summary: 'fetchFinanceSummary for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: FinanceFetchFinanceSummaryResponseDto })
  fetchFinanceSummary(@Query() query: FinanceQueryDto): Promise<FinanceFetchFinanceSummaryResponseDto> {  return this.fetchFinanceSummaryService.fetchFinanceSummary(query) as Promise<FinanceFetchFinanceSummaryResponseDto>;  }


  // SLA: STANDARD
  @Get("finance/payments/member/:memberId")
  @ApiOperation({ summary: 'fetchPaymentsByMember for Manager finance' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [FinanceFetchPaymentsByMemberResponseDto] })
  fetchPaymentsByMember(@Param('memberId') memberId: string, @Query() query: FinanceQueryDto): Promise<FinanceFetchPaymentsByMemberResponseDto[]> {  return this.fetchPaymentsByMemberService.fetchPaymentsByMember(memberId, query) as Promise<FinanceFetchPaymentsByMemberResponseDto[]>;  }


}

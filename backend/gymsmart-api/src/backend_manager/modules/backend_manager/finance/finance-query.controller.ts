// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { CoreRawResponse } from '@/backend_manager/core/http/core-raw-response.decorator';

import { FinanceExportPaymentsReportResponseDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-export-payments-report.response.dto';
import { FinanceFetchFinanceSummaryResponseDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-fetch-finance-summary.response.dto';
import { FinanceFetchPaymentsByMemberResponseDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-fetch-payments-by-member.response.dto';
import { FinanceFetchPaymentsResponseDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-fetch-payments.response.dto';
import { FinanceQueryDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-query.dto';
import { FinanceExportPaymentsReportService } from '@/backend_manager/modules/backend_manager/finance/services/finance-export-payments-report.service';
import { FinanceFetchFinanceSummaryService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-finance-summary.service';
import { FinanceFetchPaymentsByMemberService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-payments-by-member.service';
import { FinanceFetchPaymentsService } from '@/backend_manager/modules/backend_manager/finance/services/finance-fetch-payments.service';

import type { Response } from 'express';

@Controller('manager')
@ApiTags('Manager finance')
@Roles(CoreRole.MANAGER)
export class FinanceQueryController {
  constructor(private readonly fetchPaymentsService: FinanceFetchPaymentsService, private readonly fetchPaymentsByMemberService: FinanceFetchPaymentsByMemberService, private readonly fetchFinanceSummaryService: FinanceFetchFinanceSummaryService, private readonly exportPaymentsReportService: FinanceExportPaymentsReportService) {}

  // SLA: STANDARD
  @Get("finance/export")
  @ApiOperation({ summary: 'exportPaymentsReport for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: FinanceExportPaymentsReportResponseDto })
  exportPaymentsReport(@Query() query: FinanceQueryDto): ReturnType<FinanceExportPaymentsReportService['exportPaymentsReport']> { return this.exportPaymentsReportService.exportPaymentsReport(query as any); }


  // SLA: STANDARD
  @Get("finance/payments")
  @ApiOperation({ summary: 'fetchPayments for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: FinanceFetchPaymentsResponseDto })
  fetchPayments(@Query() query: FinanceQueryDto): ReturnType<FinanceFetchPaymentsService['fetchPayments']> { return this.fetchPaymentsService.fetchPayments(query as any); }


  // SLA: FAST
  @Get("finance/summary")
  @ApiOperation({ summary: 'fetchFinanceSummary for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: FinanceFetchFinanceSummaryResponseDto })
  fetchFinanceSummary(@Query() query: FinanceQueryDto): ReturnType<FinanceFetchFinanceSummaryService['fetchFinanceSummary']> { return this.fetchFinanceSummaryService.fetchFinanceSummary(query as any); }


  // SLA: STANDARD
  @Get("finance/payments/member/:memberId")
  @ApiOperation({ summary: 'fetchPaymentsByMember for Manager finance' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [FinanceFetchPaymentsByMemberResponseDto] })
  fetchPaymentsByMember(@Param('memberId') memberId: string, @Query() query: FinanceQueryDto): ReturnType<FinanceFetchPaymentsByMemberService['fetchPaymentsByMember']> { return this.fetchPaymentsByMemberService.fetchPaymentsByMember(memberId, query as any); }


  // SLA: HEAVY
  @Get("finance/export/:artifactId")
  @CoreRawResponse()
  @ApiOperation({ summary: 'download finance export artifact' })
  @ApiParam({ name: 'artifactId', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'string', format: 'binary' }, description: 'Binary finance export artifact.' })
  async downloadFinanceExport(@Param('artifactId') artifactId: string, @Res({ passthrough: true }) response: Response): Promise<Buffer> {
    const artifact = await this.exportPaymentsReportService.getExportArtifact(artifactId);
    if (!artifact) throw new CoreNotFoundException('finance export', artifactId);
    response.setHeader('Content-Type', artifact.contentType);
    response.setHeader('Content-Disposition', `attachment; filename=\"${artifact.fileName}\"`);
    return artifact.buffer;
  }

}

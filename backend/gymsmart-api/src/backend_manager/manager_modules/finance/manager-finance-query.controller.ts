// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreRawResponse } from '@/backend_manager/manager_core/manager_core_http/manager-core-raw-response.decorator';

import { ManagerFinanceExportPaymentsReportResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-export-payments-report.response.dto';
import { ManagerFinanceFetchFinanceSummaryResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-fetch-finance-summary.response.dto';
import { ManagerFinanceFetchPaymentsByMemberResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-fetch-payments-by-member.response.dto';
import { ManagerFinanceFetchPaymentsResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-fetch-payments.response.dto';
import { ManagerFinanceQueryDto } from '@/backend_manager/manager_modules/finance/finance_dtos/manager-finance-query.dto';
import { ManagerFinanceExportPaymentsReportService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-export-payments-report.service';
import { ManagerFinanceFindFinanceSummaryService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-finance-summary.service';
import { ManagerFinanceFindPaymentsByMemberService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-payments-by-member.service';
import { ManagerFinanceFindPaymentsService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-find-payments.service';

import type { Response } from 'express';

@Controller('manager')
@ApiTags('Manager finance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerFinanceQueryController {
  constructor(private readonly fetchPaymentsService: ManagerFinanceFindPaymentsService, private readonly fetchPaymentsByMemberService: ManagerFinanceFindPaymentsByMemberService, private readonly fetchFinanceSummaryService: ManagerFinanceFindFinanceSummaryService, private readonly exportPaymentsReportService: ManagerFinanceExportPaymentsReportService) {}

  // SLA: HEAVY
  // CONTRACT EXCEPTION: This endpoint returns a binary/job-artifact descriptor, not the JSON envelope.
  @Get("finance/export")
  @ApiOperation({ summary: 'createPaymentsReportExport for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerFinanceExportPaymentsReportResponseDto })
  createPaymentsReportExport(@Query() query: ManagerFinanceQueryDto): ReturnType<ManagerFinanceExportPaymentsReportService['createPaymentsReportExport']> { return this.exportPaymentsReportService.createPaymentsReportExport(query); }


  // SLA: STANDARD
  @Get("finance/payments")
  @ApiOperation({ summary: 'findPayments for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerFinanceFetchPaymentsResponseDto })
  findPayments(@Query() query: ManagerFinanceQueryDto): ReturnType<ManagerFinanceFindPaymentsService['findPayments']> { return this.fetchPaymentsService.findPayments(query); }


  // SLA: FAST
  @Get("finance/summary")
  @ApiOperation({ summary: 'findFinanceSummary for Manager finance' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerFinanceFetchFinanceSummaryResponseDto })
  findFinanceSummary(@Query() query: ManagerFinanceQueryDto): ReturnType<ManagerFinanceFindFinanceSummaryService['findFinanceSummary']> { return this.fetchFinanceSummaryService.findFinanceSummary(query); }


  // SLA: STANDARD
  @Get("finance/payments/member/:memberId")
  @ManagerCoreAuthorizeResourceParam('memberId', 'members')
  @ApiOperation({ summary: 'findPaymentsByMember for Manager finance' })
  @ApiParam({ name: 'memberId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerFinanceFetchPaymentsByMemberResponseDto] })
  findPaymentsByMember(@Param('memberId') memberId: string, @Query() query: ManagerFinanceQueryDto): ReturnType<ManagerFinanceFindPaymentsByMemberService['findPaymentsByMember']> { return this.fetchPaymentsByMemberService.findPaymentsByMember(memberId, query); }


  // SLA: HEAVY
  @Get("finance/export/:artifactId")
  @ManagerCoreRawResponse()
  @ApiOperation({ summary: 'download finance export artifact' })
  @ApiParam({ name: 'artifactId', required: true })
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'string', format: 'binary' }, description: 'Binary finance export artifact.' })
  async downloadFinanceExport(@Param('artifactId') artifactId: string, @Res({ passthrough: true }) response: Response): Promise<Buffer> {
    const artifact = await this.exportPaymentsReportService.findExportArtifact(artifactId);
    if (!artifact) throw new ManagerCoreNotFoundException('finance export', artifactId);
    response.setHeader('Content-Type', artifact.contentType);
    response.setHeader('Content-Disposition', `attachment; filename=\"${artifact.fileName}\"`);
    return artifact.buffer;
  }

}

export { ManagerFinanceQueryController as FinanceQueryController };

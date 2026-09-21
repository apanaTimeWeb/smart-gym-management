// RESPONSIBILITY: Exposes read-only Admin finance HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminFinanceQueryController -> AdminFinanceQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminFinanceQueryService } from '@/modules/admin/finance/services/admin-finance-query.service';
import { AdminFinanceQueryDto } from '@/modules/admin/finance/dtos/admin-finance-query.dto';
import { AdminFinancePaymentResponseDto, AdminFinanceSummaryResponseDto, AdminFinancePnlResponseDto, AdminFinanceExpenseResponseDto } from '@/modules/admin/finance/dtos/admin-finance-response.dto';

@ApiTags('Admin / finance')
@Controller('admin/finance')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminFinanceQueryController {
  constructor(private readonly service: AdminFinanceQueryService) {}

  // SLA: STANDARD
  @Get('payments/fetchPayments')
  @ApiOperation({ summary: 'Execute fetchPayments' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinancePaymentResponseDto })
  async fetchPayments(@Query() query: AdminFinanceQueryDto): Promise<AdminFinancePaymentResponseDto> {
    return this.service.fetchPayments(query) as unknown as AdminFinancePaymentResponseDto;
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceSummaryResponseDto })
  async fetchSummary(@Query() query: AdminFinanceQueryDto): Promise<AdminFinanceSummaryResponseDto> {
    return this.service.fetchSummary(query) as unknown as AdminFinanceSummaryResponseDto;
  }

  // SLA: STANDARD
  @Get('pnl')
  @ApiOperation({ summary: 'Execute fetchPnl' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinancePnlResponseDto })
  async fetchPnl(@Query() query: AdminFinanceQueryDto): Promise<AdminFinancePnlResponseDto> {
    return this.service.fetchPnl(query) as unknown as AdminFinancePnlResponseDto;
  }

  // SLA: STANDARD
  @Get('payments/fetchExpenses')
  @ApiOperation({ summary: 'Execute fetchExpenses' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceExpenseResponseDto })
  async fetchExpenses(@Query() query: AdminFinanceQueryDto): Promise<AdminFinanceExpenseResponseDto> {
    return this.service.fetchExpenses(query) as unknown as AdminFinanceExpenseResponseDto;
  }

}

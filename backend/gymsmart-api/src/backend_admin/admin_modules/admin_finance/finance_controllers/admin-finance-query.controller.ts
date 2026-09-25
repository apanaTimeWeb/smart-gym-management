// RESPONSIBILITY: Exposes read-only Admin finance HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminFinanceQueryController -> AdminFinanceQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminFinanceQueryDto } from '@/backend_admin/admin_modules/admin_finance/finance_dtos/admin-finance-query.dto.js';
import { AdminFinancePaymentResponseDto, AdminFinanceSummaryResponseDto, AdminFinancePnlRecordDto, AdminFinanceExpenseResponseDto } from '@/backend_admin/admin_modules/admin_finance/finance_dtos/admin-finance-response.dto.js';
import { AdminFinanceQueryService } from '@/backend_admin/admin_modules/admin_finance/finance_services/admin-finance-query.service.js';

@ApiTags('Admin / finance')
@Controller('admin/finance')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminFinanceQueryController boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceQueryController {
  constructor(private readonly service: AdminFinanceQueryService) {}

  // SLA: STANDARD
  @Get('payments/fetchPayments')
  @ApiOperation({ summary: 'Execute fetchPayments' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinancePaymentResponseDto })
  async findAllPayments(@Query() query: AdminFinanceQueryDto): Promise<AdminFinancePaymentResponseDto> {
    return this.service.findAllPayments(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceSummaryResponseDto })
  async findFinanceSummary(@Query() query: AdminFinanceQueryDto): Promise<AdminFinanceSummaryResponseDto> {
    return this.service.findFinanceSummary(query);
  }

  // SLA: STANDARD
  @Get('pnl')
  @ApiOperation({ summary: 'Execute fetchPnl' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminFinancePnlRecordDto] })
  async findPnl(@Query() query: AdminFinanceQueryDto): Promise<AdminFinancePnlRecordDto[]> {
    return this.service.findPnl(query);
  }

  // SLA: STANDARD
  @Get('payments/fetchExpenses')
  @ApiOperation({ summary: 'Execute fetchExpenses' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceExpenseResponseDto })
  async findAllExpenses(@Query() query: AdminFinanceQueryDto): Promise<AdminFinanceExpenseResponseDto> {
    return this.service.findAllExpenses(query);
  }

}

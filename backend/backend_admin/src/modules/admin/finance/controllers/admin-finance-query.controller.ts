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
import { AdminFinanceResponseDto } from '@/modules/admin/finance/dtos/admin-finance-response.dto';

@ApiTags('Admin / finance')
@Controller('admin/finance')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminFinanceQueryController {
  constructor(private readonly service: AdminFinanceQueryService) {}

  // SLA: STANDARD
  @Get('payments/fetchPayments')
  @ApiOperation({ summary: 'Execute fetchPayments' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceResponseDto })
  async fetchPayments(@Query() query: AdminFinanceQueryDto): Promise<unknown> {
    return this.service.fetchPayments(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceResponseDto })
  async fetchSummary(@Query() query: AdminFinanceQueryDto): Promise<unknown> {
    return this.service.fetchSummary(query);
  }

  // SLA: STANDARD
  @Get('pnl')
  @ApiOperation({ summary: 'Execute fetchPnl' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceResponseDto })
  async fetchPnl(@Query() query: AdminFinanceQueryDto): Promise<unknown> {
    return this.service.fetchPnl(query);
  }

  // SLA: STANDARD
  @Get('payments/fetchExpenses')
  @ApiOperation({ summary: 'Execute fetchExpenses' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminFinanceResponseDto })
  async fetchExpenses(@Query() query: AdminFinanceQueryDto): Promise<unknown> {
    return this.service.fetchExpenses(query);
  }

}

// RESPONSIBILITY: Exposes read-only Admin payouts HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPayoutsQueryController -> AdminPayoutsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminPayoutsQueryService } from '@/modules/admin/payouts/services/admin-payouts-query.service';
import { AdminPayoutsQueryDto } from '@/modules/admin/payouts/dtos/admin-payouts-query.dto';
import { AdminGymPayoutListResponseDto, AdminPnLEntryListResponseDto, AdminPayoutsKPIDataDto } from '@/modules/admin/payouts/dtos/admin-payouts-response.dto';

@ApiTags('Admin / payouts')
@Controller('admin/payouts')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminPayoutsQueryController {
  constructor(private readonly service: AdminPayoutsQueryService) {}

  // SLA: STANDARD
  @Get('fetchPayouts')
  @ApiOperation({ summary: 'Execute fetchPayouts' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminGymPayoutListResponseDto })
  async fetchPayouts(@Query() query: AdminPayoutsQueryDto): Promise<AdminGymPayoutListResponseDto> {
    return this.service.fetchPayouts(query) as unknown as AdminGymPayoutListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchPnL')
  @ApiOperation({ summary: 'Execute fetchPnl' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPnLEntryListResponseDto })
  async fetchPnl(@Query() query: AdminPayoutsQueryDto): Promise<AdminPnLEntryListResponseDto> {
    return this.service.fetchPnl(query) as unknown as AdminPnLEntryListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPayoutsKPIDataDto })
  async fetchKPIs(@Query() query: AdminPayoutsQueryDto): Promise<AdminPayoutsKPIDataDto> {
    return this.service.fetchKPIs(query) as unknown as AdminPayoutsKPIDataDto;
  }

}

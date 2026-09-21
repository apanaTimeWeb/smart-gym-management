// RESPONSIBILITY: Exposes read-only Admin payouts HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPayoutsQueryController -> AdminPayoutsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminPayoutsQueryService } from '@/backend_admin/modules/admin/payouts/services/admin-payouts-query.service';
import { AdminPayoutsQueryDto } from '@/backend_admin/modules/admin/payouts/dtos/admin-payouts-query.dto';
import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/backend_admin/modules/admin/payouts/dtos/admin-payouts-response.dto';

@ApiTags('Admin / payouts')
@Controller('admin/payouts')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminPayoutsQueryController {
  constructor(private readonly service: AdminPayoutsQueryService) {}

  // SLA: STANDARD
  @Get('fetchPayouts')
  @ApiOperation({ summary: 'Execute fetchPayouts' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminGymPayoutDto] })
  async fetchPayouts(@Query() query: AdminPayoutsQueryDto): Promise<AdminGymPayoutDto[]> {
    return this.service.fetchPayouts(query);
  }

  // SLA: STANDARD
  @Get('fetchPnL')
  @ApiOperation({ summary: 'Execute fetchPnl' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPnLEntryDto] })
  async fetchPnl(@Query() query: AdminPayoutsQueryDto): Promise<AdminPnLEntryDto[]> {
    return this.service.fetchPnl(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPayoutsKPIDataDto })
  async fetchKPIs(@Query() query: AdminPayoutsQueryDto): Promise<AdminPayoutsKPIDataDto> {
    return this.service.fetchKPIs(query);
  }

}

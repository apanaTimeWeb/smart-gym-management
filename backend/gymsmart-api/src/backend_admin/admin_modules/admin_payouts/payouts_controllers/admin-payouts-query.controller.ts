// RESPONSIBILITY: Exposes read-only Admin payouts HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPayoutsQueryController -> AdminPayoutsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminPayoutsQueryDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-query.dto'
import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-response.dto'
import { AdminPayoutsQueryService } from '@/backend_admin/admin_modules/admin_payouts/payouts_services/admin-payouts-query.service'

@ApiTags('Admin / payouts')
@Controller('admin/payouts')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminPayoutsQueryController boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsQueryController {
  constructor(private readonly service: AdminPayoutsQueryService) {}

  // SLA: STANDARD
  @Get('fetchPayouts')
  @ApiOperation({ summary: 'Execute fetchPayouts' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminGymPayoutDto] })
  async findAllPayouts(@Query() query: AdminPayoutsQueryDto): Promise<AdminGymPayoutDto[]> {
    return this.service.findAllPayouts(query);
  }

  // SLA: STANDARD
  @Get('fetchPnL')
  @ApiOperation({ summary: 'Execute fetchPnl' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminPnLEntryDto] })
  async findPayoutsPnl(@Query() query: AdminPayoutsQueryDto): Promise<AdminPnLEntryDto[]> {
    return this.service.findPayoutsPnl(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPayoutsKPIDataDto })
  async findPayoutKpis(@Query() query: AdminPayoutsQueryDto): Promise<AdminPayoutsKPIDataDto> {
    return this.service.findPayoutKpis(query);
  }

}

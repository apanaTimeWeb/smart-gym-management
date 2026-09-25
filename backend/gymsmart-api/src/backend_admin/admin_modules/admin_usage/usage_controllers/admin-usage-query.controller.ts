// RESPONSIBILITY: Exposes read-only Admin usage HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminUsageQueryController -> AdminUsageQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminUsageQueryDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-query.dto'
import { AdminUsageDataDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-response.dto'
import { AdminUsageQueryService } from '@/backend_admin/admin_modules/admin_usage/usage_services/admin-usage-query.service'

@ApiTags('Admin / usage')
@Controller('admin/usage')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminUsageQueryController boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageQueryController {
  constructor(private readonly service: AdminUsageQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchUsage' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminUsageDataDto })
  async findUsage(@Query() query: AdminUsageQueryDto): Promise<AdminUsageDataDto> {
    return this.service.findUsage(query);
  }

  // SLA: STANDARD
  @Get('plans')
  @ApiOperation({ summary: 'Execute fetchPlans' })
  @ApiResponse({ status: HttpStatus.OK })
  async findAllPlans(@Query() query: AdminUsageQueryDto): Promise<unknown> {
    return this.service.findAllPlans(query);
  }

}

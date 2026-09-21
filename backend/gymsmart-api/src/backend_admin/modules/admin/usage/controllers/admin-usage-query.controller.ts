// RESPONSIBILITY: Exposes read-only Admin usage HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminUsageQueryController -> AdminUsageQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminUsageQueryService } from '@/backend_admin/modules/admin/usage/services/admin-usage-query.service';
import { AdminUsageQueryDto } from '@/backend_admin/modules/admin/usage/dtos/admin-usage-query.dto';
import { AdminUsageDataDto } from '@/backend_admin/modules/admin/usage/dtos/admin-usage-response.dto';

@ApiTags('Admin / usage')
@Controller('admin/usage')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminUsageQueryController {
  constructor(private readonly service: AdminUsageQueryService) {}

  // SLA: STANDARD
  @Get()
  @ApiOperation({ summary: 'Execute fetchUsage' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminUsageDataDto })
  async fetchUsage(@Query() query: AdminUsageQueryDto): Promise<AdminUsageDataDto> {
    return this.service.fetchUsage(query);
  }

  // SLA: STANDARD
  @Get('plans')
  @ApiOperation({ summary: 'Execute fetchPlans' })
  @ApiResponse({ status: HttpStatus.OK })
  async fetchPlans(@Query() query: AdminUsageQueryDto): Promise<any> {
    return this.service.fetchPlans(query);
  }

}

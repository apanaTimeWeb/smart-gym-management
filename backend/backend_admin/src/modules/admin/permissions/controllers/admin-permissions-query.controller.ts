// RESPONSIBILITY: Exposes read-only Admin permissions HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPermissionsQueryController -> AdminPermissionsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminPermissionsQueryService } from '@/modules/admin/permissions/services/admin-permissions-query.service';
import { AdminPermissionsQueryDto } from '@/modules/admin/permissions/dtos/admin-permissions-query.dto';
import { AdminPermissionsDataDto } from '@/modules/admin/permissions/dtos/admin-permissions-response.dto';

@ApiTags('Admin / permissions')
@Controller('admin/permissions')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminPermissionsQueryController {
  constructor(private readonly service: AdminPermissionsQueryService) {}

  // SLA: STANDARD
  @Get('fetchPermissions')
  @ApiOperation({ summary: 'Execute fetchPermissions' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPermissionsDataDto })
  async fetchPermissions(@Query() query: AdminPermissionsQueryDto): Promise<AdminPermissionsDataDto> {
    return this.service.fetchPermissions(query) as unknown as AdminPermissionsDataDto;
  }

}

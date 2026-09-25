// RESPONSIBILITY: Exposes read-only Admin permissions HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPermissionsQueryController -> AdminPermissionsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminPermissionsQueryDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-query.dto'
import { AdminPermissionsDataDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-response.dto'
import { AdminPermissionsQueryService } from '@/backend_admin/admin_modules/admin_permissions/permissions_services/admin-permissions-query.service'

@ApiTags('Admin / permissions')
@Controller('admin/permissions')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminPermissionsQueryController boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsQueryController {
  constructor(private readonly service: AdminPermissionsQueryService) {}

  // SLA: STANDARD
  @Get('fetchPermissions')
  @ApiOperation({ summary: 'Execute fetchPermissions' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPermissionsDataDto })
  async findAllPermissions(@Query() query: AdminPermissionsQueryDto): Promise<AdminPermissionsDataDto> {
    return this.service.findAllPermissions(query);
  }

}

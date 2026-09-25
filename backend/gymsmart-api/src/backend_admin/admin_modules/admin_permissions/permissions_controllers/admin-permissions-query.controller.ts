// RESPONSIBILITY: Exposes read-only Admin permissions HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminPermissionsQueryController -> AdminPermissionsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminPermissionsQueryDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-query.dto.js';
import { AdminPermissionsDataDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-response.dto.js';
import { AdminPermissionsQueryService } from '@/backend_admin/admin_modules/admin_permissions/permissions_services/admin-permissions-query.service.js';

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

// RESPONSIBILITY: Exposes mutation endpoints for Admin permissions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminPermissionsCommandController -> AdminPermissionsCommandService.
import { Body, Controller, Delete, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminPermissionsIdDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-id.dto'
import { AdminPermissionsMutationDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-mutation.dto'
import { AdminPermissionsDataDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-response.dto'
import { AdminPermissionsCommandService } from '@/backend_admin/admin_modules/admin_permissions/permissions_services/admin-permissions-command.service'

@ApiTags('Admin / permissions')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/permissions')
/**
 * @description Defines the AdminPermissionsCommandController boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsCommandController {
  constructor(private readonly service: AdminPermissionsCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updateRolePermissions')
  @ApiOperation({ summary: 'Execute updateRolePermissions' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPermissionsDataDto })
  async updateRolePermissions(@Body() dto: AdminPermissionsMutationDto): Promise<AdminPermissionsDataDto> {
    return this.service.updateRolePermissions(dto.role ?? '', dto.permissions ?? {});
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updateGymOverride')
  @ApiOperation({ summary: 'Execute updateGymOverride' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPermissionsDataDto })
  async updateGymOverride(@Body() dto: AdminPermissionsMutationDto): Promise<AdminPermissionsDataDto> {
    return this.service.updateGymOverride(dto.gymId ?? '', dto.role ?? '', dto.overrides ?? {});
  }

}

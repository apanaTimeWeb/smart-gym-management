// RESPONSIBILITY: Exposes mutation endpoints for Admin permissions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminPermissionsCommandController -> AdminPermissionsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminPermissionsCommandService } from '@/backend_admin/modules/admin/permissions/services/admin-permissions-command.service';
import { AdminPermissionsMutationDto } from '@/backend_admin/modules/admin/permissions/dtos/admin-permissions-mutation.dto';
import { AdminPermissionsIdDto } from '@/backend_admin/modules/admin/permissions/dtos/admin-permissions-id.dto';
import { AdminPermissionsDataDto } from '@/backend_admin/modules/admin/permissions/dtos/admin-permissions-response.dto';

@ApiTags('Admin / permissions')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/permissions')
export class AdminPermissionsCommandController {
  constructor(private readonly service: AdminPermissionsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('updateRolePermissions')
  @ApiOperation({ summary: 'Execute updateRolePermissions' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPermissionsDataDto })
  async updateRolePermissions(@Body() dto: AdminPermissionsMutationDto): Promise<AdminPermissionsDataDto> {
    return this.service.updateRolePermissions(dto.role ?? '', dto.permissions ?? {});
  }

  // SLA: STANDARD
  @Post('updateGymOverride')
  @ApiOperation({ summary: 'Execute updateGymOverride' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPermissionsDataDto })
  async updateGymOverride(@Body() dto: AdminPermissionsMutationDto): Promise<AdminPermissionsDataDto> {
    return this.service.updateGymOverride(dto.gymId ?? '', dto.role ?? '', dto.overrides ?? {});
  }

}

// RESPONSIBILITY: Exposes mutation endpoints for Admin permissions; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminPermissionsCommandController -> AdminPermissionsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminPermissionsCommandService } from '@/modules/admin/permissions/services/admin-permissions-command.service';
import { AdminPermissionsMutationDto } from '@/modules/admin/permissions/dtos/admin-permissions-mutation.dto';
import { AdminPermissionsIdDto } from '@/modules/admin/permissions/dtos/admin-permissions-id.dto';
import { AdminPermissionsDataDto } from '@/modules/admin/permissions/dtos/admin-permissions-response.dto';

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

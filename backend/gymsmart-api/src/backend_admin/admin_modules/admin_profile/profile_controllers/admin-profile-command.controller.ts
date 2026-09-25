// RESPONSIBILITY: Exposes Admin profile mutations using the exact frontend API action paths and HTTP concerns only.
// FLOW: HTTP mutation â†’ AdminProfileCommandController â†’ AdminProfileCommandService.
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminProfileMutationDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-mutation.dto'
import { AdminProfileDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-response.dto'
import { AdminProfileCommandService } from '@/backend_admin/admin_modules/admin_profile/profile_services/admin-profile-command.service'

@ApiTags('Admin / profile')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/adminProfile')
/**
 * @description Defines the AdminProfileCommandController boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileCommandController {
  constructor(private readonly service: AdminProfileCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updateProfile')
  @ApiOperation({ summary: 'Execute updateProfile' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminProfileDto })
  async updateProfile(@Body() dto: AdminProfileMutationDto): Promise<AdminProfileDto> {
    return this.service.updateProfile(dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updatePassword')
  @ApiOperation({ summary: 'Execute updatePassword' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePassword(@Body() body: AdminProfileMutationDto): Promise<void> {
    const newPassword = String(body.newPassword ?? body.password ?? '');
    await this.service.updatePassword(newPassword);
    return;
  }
}

// RESPONSIBILITY: Exposes mutation endpoints for Admin settings; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminSettingsCommandController -> AdminSettingsCommandService.
import { Body, Controller, Delete, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminSettingsIdDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-id.dto'
import { AdminSettingsMutationDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-mutation.dto'
import { AdminSettingsResponseDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-response.dto'
import { AdminSettingsCommandService } from '@/backend_admin/admin_modules/admin_settings/settings_services/admin-settings-command.service'

@ApiTags('Admin / settings')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/settings')
/**
 * @description Defines the AdminSettingsCommandController boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsCommandController {
  constructor(private readonly service: AdminSettingsCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  @Post('updateSettings')
  @ApiOperation({ summary: 'Execute updateSettings' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async updateSettings(@Body() dto: AdminSettingsMutationDto): Promise<AdminSettingsResponseDto> {
    return this.service.updateSettings(dto) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  @Post('2fa/enable')
  @ApiOperation({ summary: 'Execute enable2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateTwoFactorEnabled(@Body() dto: AdminSettingsMutationDto): Promise<null> {
    return this.service.updateTwoFactorEnabled(dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  @Post('2fa/disable')
  @ApiOperation({ summary: 'Execute disable2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateTwoFactorDisabled(@Body() dto: AdminSettingsMutationDto): Promise<null> {
    return this.service.updateTwoFactorDisabled(dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  @Post('2fa/verify')
  @ApiOperation({ summary: 'Execute verify2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateTwoFactorVerified(@Body() dto: AdminSettingsMutationDto): Promise<null> {
    return this.service.updateTwoFactorVerified(dto);
  }

}

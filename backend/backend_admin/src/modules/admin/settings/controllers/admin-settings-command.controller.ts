// RESPONSIBILITY: Exposes mutation endpoints for Admin settings; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminSettingsCommandController -> AdminSettingsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminSettingsCommandService } from '@/modules/admin/settings/services/admin-settings-command.service';
import { AdminSettingsMutationDto } from '@/modules/admin/settings/dtos/admin-settings-mutation.dto';
import { AdminSettingsIdDto } from '@/modules/admin/settings/dtos/admin-settings-id.dto';
import { AdminSettingsResponseDto } from '@/modules/admin/settings/dtos/admin-settings-response.dto';

@ApiTags('Admin / settings')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/settings')
export class AdminSettingsCommandController {
  constructor(private readonly service: AdminSettingsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('updateSettings')
  @ApiOperation({ summary: 'Execute updateSettings' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSettingsResponseDto })
  async updateSettings(@Body() dto: AdminSettingsMutationDto): Promise<AdminSettingsResponseDto> {
    return this.service.updateSettings(dto) as Promise<AdminSettingsResponseDto>;
  }

  // SLA: STANDARD
  @Post('2fa/enable')
  @ApiOperation({ summary: 'Execute enable2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async enableTwoFactor(): Promise<void> {
    return this.service.enableTwoFactor() as Promise<void>;
  }

  // SLA: STANDARD
  @Post('2fa/disable')
  @ApiOperation({ summary: 'Execute disable2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async disableTwoFactor(): Promise<void> {
    return this.service.disableTwoFactor() as Promise<void>;
  }

  // SLA: STANDARD
  @Post('2fa/verify')
  @ApiOperation({ summary: 'Execute verify2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async verifyTwoFactor(): Promise<void> {
    return this.service.verifyTwoFactor() as Promise<void>;
  }

}

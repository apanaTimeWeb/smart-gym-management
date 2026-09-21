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

@ApiTags('Admin / settings')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/settings')
export class AdminSettingsCommandController {
  constructor(private readonly service: AdminSettingsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('updateSettings')
  @ApiOperation({ summary: 'Execute updateSettings' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateSettings(@Body() dto: AdminSettingsMutationDto): Promise<unknown> {
    return this.service.updateSettings(dto as unknown as Record<string, unknown>);
  }

  // SLA: STANDARD
  @Post('2fa/enable')
  @ApiOperation({ summary: 'Execute enable2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async enableTwoFactor(): Promise<unknown> {
    return this.service.enableTwoFactor();
  }

  // SLA: STANDARD
  @Post('2fa/disable')
  @ApiOperation({ summary: 'Execute disable2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async disableTwoFactor(): Promise<unknown> {
    return this.service.disableTwoFactor();
  }

  // SLA: STANDARD
  @Post('2fa/verify')
  @ApiOperation({ summary: 'Execute verify2fa' })
  @ApiResponse({ status: HttpStatus.OK })
  async verifyTwoFactor(): Promise<unknown> {
    return this.service.verifyTwoFactor();
  }

}

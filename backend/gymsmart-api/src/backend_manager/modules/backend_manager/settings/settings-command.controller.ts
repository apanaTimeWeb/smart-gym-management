// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { SettingsUpdateSettingsRequestDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings.request.dto';
import { SettingsUpdateSettingsResponseDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings.response.dto';
import { SettingsUpdateSettingsService } from '@/backend_manager/modules/backend_manager/settings/services/settings-update-settings.service';

@Controller('manager')
@ApiTags('Manager settings')
@Roles(CoreRole.MANAGER)
export class SettingsCommandController {
  constructor(private readonly updateSettingsService: SettingsUpdateSettingsService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("settings")
  @ApiOperation({ summary: 'updateSettings for Manager settings' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: SettingsUpdateSettingsResponseDto })
  updateSettings(@Body() dto: SettingsUpdateSettingsRequestDto): ReturnType<SettingsUpdateSettingsService['updateSettings']> { return this.updateSettingsService.updateSettings(dto as any); }


}

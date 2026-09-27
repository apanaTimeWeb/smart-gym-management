// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerSettingsUpdateSettingsRequestDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-update-settings.request.dto';
import { ManagerSettingsUpdateSettingsResponseDto } from '@/backend_manager/manager_modules/settings/settings_responses/manager-settings-update-settings.response.dto';
import { ManagerSettingsUpdateSettingsService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-update-settings.service';

@Controller('manager')
@ApiTags('Manager settings')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerSettingsCommandController {
  constructor(private readonly updateSettingsService: ManagerSettingsUpdateSettingsService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("settings")
  @ApiOperation({ summary: 'updateSettings for Manager settings' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerSettingsUpdateSettingsResponseDto })
  updateSettings(@Body() dto: ManagerSettingsUpdateSettingsRequestDto): ReturnType<ManagerSettingsUpdateSettingsService['updateSettings']> { return this.updateSettingsService.updateSettings(dto); }


}

export { ManagerSettingsCommandController as SettingsCommandController };

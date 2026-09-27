// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerSettingsFetchSettingsResponseDto } from '@/backend_manager/manager_modules/settings/settings_responses/manager-settings-fetch-settings.response.dto';
import { ManagerSettingsQueryDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-query.dto';
import { ManagerSettingsFindSettingsService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-find-settings.service';

@Controller('manager')
@ApiTags('Manager settings')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerSettingsQueryController {
  constructor(private readonly fetchSettingsService: ManagerSettingsFindSettingsService) {}

  // SLA: STANDARD
  @Get("settings")
  @ApiOperation({ summary: 'findSettings for Manager settings' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerSettingsFetchSettingsResponseDto })
  findSettings(@Query() query: ManagerSettingsQueryDto): ReturnType<ManagerSettingsFindSettingsService['findSettings']> { return this.fetchSettingsService.findSettings(query); }


}

export { ManagerSettingsQueryController as SettingsQueryController };

// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { SettingsFetchSettingsResponseDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-fetch-settings.response.dto';
import { SettingsQueryDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-query.dto';
import { SettingsFetchSettingsService } from '@/backend_manager/modules/backend_manager/settings/services/settings-fetch-settings.service';

@Controller('manager')
@ApiTags('Manager settings')
@Roles(CoreRole.MANAGER)
export class SettingsQueryController {
  constructor(private readonly fetchSettingsService: SettingsFetchSettingsService) {}

  // SLA: STANDARD
  @Get("settings")
  @ApiOperation({ summary: 'fetchSettings for Manager settings' })
  @ApiResponse({ status: HttpStatus.OK, type: SettingsFetchSettingsResponseDto })
  fetchSettings(@Query() query: SettingsQueryDto): ReturnType<SettingsFetchSettingsService['fetchSettings']> { return this.fetchSettingsService.fetchSettings(query as any); }


}

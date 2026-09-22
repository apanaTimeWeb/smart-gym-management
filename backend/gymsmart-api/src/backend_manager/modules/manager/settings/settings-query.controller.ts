// RESPONSIBILITY: Owns the Manager settings query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { SettingsFetchSettingsResponseDto } from '@/modules/manager/settings/dtos/settings-fetch-settings.response.dto';
import { SettingsFetchSettingsService } from '@/modules/manager/settings/services/settings-fetch-settings.service';
import { SettingsQueryDto } from '@/modules/manager/settings/dtos/settings-query.dto';

@Controller('manager')
@ApiTags('Manager settings')
@Roles(CoreRole.MANAGER)
export class SettingsQueryController {
  constructor(private readonly fetchSettingsService: SettingsFetchSettingsService) {}

  // SLA: STANDARD
  @Get("settings")
  @ApiOperation({ summary: 'fetchSettings for Manager settings' })
  @ApiResponse({ status: HttpStatus.OK, type: SettingsFetchSettingsResponseDto })
  fetchSettings(@Query() query: SettingsQueryDto): Promise<SettingsFetchSettingsResponseDto> {  return this.fetchSettingsService.fetchSettings(query) as Promise<SettingsFetchSettingsResponseDto>;  }


}

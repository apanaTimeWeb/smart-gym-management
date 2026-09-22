// RESPONSIBILITY: Owns the Manager settings command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { SettingsQueryDto } from '@/backend_manager/modules/manager/settings/dtos/settings-query.dto';
import { SettingsUpdateSettingsRequestDto } from '@/backend_manager/modules/manager/settings/dtos/settings-update-settings.request.dto';
import { SettingsUpdateSettingsResponseDto } from '@/backend_manager/modules/manager/settings/dtos/settings-update-settings.response.dto';
import { SettingsUpdateSettingsService } from '@/backend_manager/modules/manager/settings/services/settings-update-settings.service';

@Controller('manager')
@ApiTags('Manager settings')
@Roles(CoreRole.MANAGER)
export class SettingsCommandController {
  constructor(private readonly updateSettingsService: SettingsUpdateSettingsService) {}

  // SLA: STANDARD
  @Patch("settings")
  @ApiOperation({ summary: 'updateSettings for Manager settings' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: SettingsUpdateSettingsResponseDto })
  updateSettings(@Body() dto: SettingsUpdateSettingsRequestDto): Promise<SettingsUpdateSettingsResponseDto> {  return this.updateSettingsService.updateSettings(dto) as unknown as Promise<SettingsUpdateSettingsResponseDto>;  }


}

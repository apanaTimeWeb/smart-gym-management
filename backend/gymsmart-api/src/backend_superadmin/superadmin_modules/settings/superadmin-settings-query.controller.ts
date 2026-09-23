// RESPONSIBILITY: Owns HTTP transport for the settings-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminSettingsQueryDto } from '@/backend_superadmin/superadmin_modules/settings/dtos/superadmin-settings-query.dto';
import { SuperadminSettingsListService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-list.service';
import { SuperadminSettingsFindService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-find.service';

@ApiTags('settings')
@Controller('/superadmin/settings')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSettingsQueryController {
  constructor(private readonly listService: SuperadminSettingsListService, private readonly findService: SuperadminSettingsFindService) {}
  /** Returns a paginated settings list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminSettingsQueryDto): Promise<unknown> { return await this.listService.findSettingsPage(query); }
  /** Returns one settings record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findSettingsById(id); }
}
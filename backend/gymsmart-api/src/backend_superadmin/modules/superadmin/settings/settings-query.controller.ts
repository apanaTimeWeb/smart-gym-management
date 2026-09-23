// RESPONSIBILITY: Owns HTTP transport for the settings-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { SettingsQueryDto } from '@/backend_superadmin/modules/superadmin/settings/dtos/settings-query.dto';
import { SettingsListService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-list.service';
import { SettingsFindService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-find.service';

@ApiTags('settings')
@Controller('/superadmin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsQueryController {
  constructor(private readonly listService: SettingsListService, private readonly findService: SettingsFindService) {}
  /** Returns a paginated settings list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SettingsQueryDto): Promise<unknown> { return await this.listService.findSettingsPage(query); }
  /** Returns one settings record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findSettingsById(id); }
}
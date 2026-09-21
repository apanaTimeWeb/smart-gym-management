// RESPONSIBILITY: Owns GET endpoints for the settings feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { SettingsQueryDto } from '@/modules/superadmin/settings/dtos/settings-query.dto';
import { SettingsListService } from '@/modules/superadmin/settings/services/settings-list.service';
import { SettingsFindService } from '@/modules/superadmin/settings/services/settings-find.service';

@ApiTags('settings')
@Controller('/superadmin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsQueryController {
  constructor(private readonly listService: SettingsListService, private readonly findService: SettingsFindService) {}
  /** Returns a paginated settings list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: SettingsQueryDto): Promise<unknown> { return await this.listService.findSettingsPage(query); }
  /** Returns one settings record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findSettingsById(id); }
}

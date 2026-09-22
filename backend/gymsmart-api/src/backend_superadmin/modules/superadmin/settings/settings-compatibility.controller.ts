// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Settings.
// FLOW: /superadmin/settings -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/settings.

import { Body, Controller, Get, Param, Patch, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';

import { SettingsListService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-list.service';
import { SettingsUpdateService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-update.service';
import { SettingsGovernanceService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-governance.service';
import { SettingsQueryDto } from '@/backend_superadmin/modules/superadmin/settings/dtos/settings-query.dto';
import { SettingsUpdateDto } from '@/backend_superadmin/modules/superadmin/settings/dtos/settings-update.dto';

@ApiTags('Settings-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsCompatibilityController {
  constructor(
    private readonly listService: SettingsListService,
    private readonly updateService: SettingsUpdateService,
    private readonly governanceService: SettingsGovernanceService
  ) {}

  @Get('superadmin/settings')
  @Version(VERSION_NEUTRAL)
  async findAll(@Query() query: SettingsQueryDto) { return await this.listService.findSettingsPage(query); }

  @Patch('superadmin/settings/:id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
  async update(@Param('id') id: string, @Body() body: SettingsUpdateDto) { return this.updateService.updateSettings(id, body); }

  @Get('api/superadmin/settings/governance')
  @Version(VERSION_NEUTRAL)
  async governance(@Query() query: Record<string, string>) { return await this.governanceService.findSettingsGovernance(); }
}

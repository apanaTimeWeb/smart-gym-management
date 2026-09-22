// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Team.
// FLOW: /superadmin/team -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/team.

import { Body, Controller, Get, Patch, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { TeamMainService } from '@/backend_superadmin/modules/superadmin/team/services/team-main.service';
import { TeamAlertsService } from '@/backend_superadmin/modules/superadmin/team/services/team-alerts.service';

@ApiTags('Team-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamCompatibilityController {
  constructor(
    private readonly mainService: TeamMainService,
    private readonly alertsService: TeamAlertsService
  ) {}

  @Get('superadmin/team')
  @Version(VERSION_NEUTRAL)
  async main(@Query() query: Record<string, string>) { return await this.mainService.findTeamData(); }

  @Patch('superadmin/team/alerts')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async alerts(@Body() body: Record<string, unknown>) { return await this.alertsService.recordTeamAlertAction({ body }); }
}

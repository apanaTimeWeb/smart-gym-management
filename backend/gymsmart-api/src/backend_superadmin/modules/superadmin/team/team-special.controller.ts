// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the team feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { TeamMainService } from '@/backend_superadmin/modules/superadmin/team/services/team-main.service';
import { TeamAlertsService } from '@/backend_superadmin/modules/superadmin/team/services/team-alerts.service';

@ApiTags('team-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamSpecialController {
  constructor(private readonly mainService: TeamMainService, private readonly alertsService: TeamAlertsService) {}

  /** Executes GET /superadmin/team. */
  @ApiOperation({ summary: 'GET /superadmin/team' })
  @Get('superadmin/team')
  async main(@Query() query: Record<string, string>): Promise<unknown> { return await this.mainService.findTeamData(); }

  /** Executes PATCH /superadmin/team/alerts. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'PATCH /superadmin/team/alerts' })
  @Patch('superadmin/team/alerts')
  async alerts(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.alertsService.recordTeamAlertAction({ body }); }

}

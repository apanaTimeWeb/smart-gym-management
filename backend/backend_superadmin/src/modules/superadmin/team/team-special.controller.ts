// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the team feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { TeamMainService } from '@/modules/superadmin/team/services/team-main.service';
import { TeamAlertsService } from '@/modules/superadmin/team/services/team-alerts.service';

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

// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { TeamAlertsService } from '@/backend_superadmin/modules/backend_superadmin/team/services/team-alerts.service';
import { TeamAlertActionDto } from '@/backend_superadmin/modules/backend_superadmin/team/dtos/team-alert-action.dto';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('teamalertscommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamAlertsCommandController {
  constructor(private readonly alertsService: TeamAlertsService) {}


  /** Executes PATCH /superadmin/team/alerts. */
  @ApiOperation({ summary: 'PATCH /superadmin/team/alerts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/team/alerts')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async alerts(@Body() body: TeamAlertActionDto): Promise<unknown> { return await this.alertsService.recordTeamAlertAction(body); }

}
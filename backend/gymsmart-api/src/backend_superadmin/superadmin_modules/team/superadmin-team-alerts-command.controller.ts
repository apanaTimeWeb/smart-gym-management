// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminTeamAlertsService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-alerts.service';
import { SuperadminTeamAlertActionDto } from '@/backend_superadmin/superadmin_modules/team/dtos/superadmin-team-alert-action.dto';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('teamalertscommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTeamAlertsCommandController {
  constructor(private readonly alertsService: SuperadminTeamAlertsService) {}


  /** Executes PATCH /superadmin/team/alerts. */
  @ApiOperation({ summary: 'PATCH /superadmin/team/alerts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/team/alerts')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async alerts(@Body() body: SuperadminTeamAlertActionDto): Promise<unknown> { return await this.alertsService.recordTeamAlertAction(body); }

}
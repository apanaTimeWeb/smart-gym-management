// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamMainService } from '@/backend_superadmin/modules/superadmin/team/services/team-main.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('teamadministrationquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamAdministrationQueryController {
  constructor(private readonly mainService: TeamMainService) {}


  /** Executes GET /superadmin/team. */
  @ApiOperation({ summary: 'GET /superadmin/team' })
  // SLA: FAST
  @Get('superadmin/team')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.mainService.findTeamData({ query }); }

}
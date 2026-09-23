// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminTeamMainService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-main.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('teamadministrationquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTeamAdministrationQueryController {
  constructor(private readonly mainService: SuperadminTeamMainService) {}


  /** Executes GET /superadmin/team. */
  @ApiOperation({ summary: 'GET /superadmin/team' })
  // SLA: FAST
  @Get('superadmin/team')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Query() query: SuperadminQueryDto): Promise<unknown> { return await this.mainService.findTeamData({ query }); }

}
// RESPONSIBILITY: Owns HTTP transport for the team-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminTeamQueryDto } from '@/backend_superadmin/superadmin_modules/team/dtos/superadmin-team-query.dto';
import { SuperadminTeamListService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-list.service';
import { SuperadminTeamFindService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-find.service';

@ApiTags('team')
@Controller('/superadmin/team')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTeamQueryController {
  constructor(private readonly listService: SuperadminTeamListService, private readonly findService: SuperadminTeamFindService) {}
  /** Returns one team record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findTeamById(id); }
}
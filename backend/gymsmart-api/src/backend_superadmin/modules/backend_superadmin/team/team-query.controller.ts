// RESPONSIBILITY: Owns HTTP transport for the team-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { TeamQueryDto } from '@/backend_superadmin/modules/backend_superadmin/team/dtos/team-query.dto';
import { TeamListService } from '@/backend_superadmin/modules/backend_superadmin/team/services/team-list.service';
import { TeamFindService } from '@/backend_superadmin/modules/backend_superadmin/team/services/team-find.service';

@ApiTags('team')
@Controller('/superadmin/team')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamQueryController {
  constructor(private readonly listService: TeamListService, private readonly findService: TeamFindService) {}
  /** Returns one team record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findTeamById(id); }
}
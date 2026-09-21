// RESPONSIBILITY: Owns GET endpoints for the team feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { TeamQueryDto } from '@/modules/superadmin/team/dtos/team-query.dto';
import { TeamListService } from '@/modules/superadmin/team/services/team-list.service';
import { TeamFindService } from '@/modules/superadmin/team/services/team-find.service';

@ApiTags('team')
@Controller('/superadmin/team')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamQueryController {
  constructor(private readonly listService: TeamListService, private readonly findService: TeamFindService) {}
  /** Returns one team record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findTeamById(id); }
}

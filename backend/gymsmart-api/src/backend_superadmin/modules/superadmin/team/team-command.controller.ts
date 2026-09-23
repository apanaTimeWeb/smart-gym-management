// RESPONSIBILITY: Owns HTTP transport for the team-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { TeamCreateService } from '@/backend_superadmin/modules/superadmin/team/services/team-create.service';
import { TeamCreateDto } from '@/backend_superadmin/modules/superadmin/team/dtos/team-create.dto';
import { TeamUpdateService } from '@/backend_superadmin/modules/superadmin/team/services/team-update.service';
import { TeamUpdateDto } from '@/backend_superadmin/modules/superadmin/team/dtos/team-update.dto';
import { TeamDeleteService } from '@/backend_superadmin/modules/superadmin/team/services/team-delete.service';

@ApiTags('team')
@Controller('/superadmin/team')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TeamCommandController {
  constructor(private readonly createService: TeamCreateService, private readonly updateService: TeamUpdateService, private readonly deleteService: TeamDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create team' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
    async create(@Body() body: TeamCreateDto): Promise<unknown> { return this.createService.createTeam(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update team' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: TeamUpdateDto): Promise<unknown> { return this.updateService.updateTeam(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove team' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteTeam(id); }

}
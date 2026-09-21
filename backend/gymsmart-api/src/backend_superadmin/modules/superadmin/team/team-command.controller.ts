// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the team feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: TeamCreateDto): Promise<unknown> { return this.createService.createTeam(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update team' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: TeamUpdateDto): Promise<unknown> { return this.updateService.updateTeam(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove team' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteTeam(id); }

}

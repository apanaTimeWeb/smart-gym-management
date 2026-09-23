// RESPONSIBILITY: Owns HTTP transport for the team-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminTeamCreateService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-create.service';
import { SuperadminTeamCreateDto } from '@/backend_superadmin/superadmin_modules/team/dtos/superadmin-team-create.dto';
import { SuperadminTeamUpdateService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-update.service';
import { SuperadminTeamUpdateDto } from '@/backend_superadmin/superadmin_modules/team/dtos/superadmin-team-update.dto';
import { SuperadminTeamDeleteService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-delete.service';

@ApiTags('team')
@Controller('/superadmin/team')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTeamCommandController {
  constructor(private readonly createService: SuperadminTeamCreateService, private readonly updateService: SuperadminTeamUpdateService, private readonly deleteService: SuperadminTeamDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create team' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminTeamCreateDto): Promise<unknown> { return this.createService.createTeam(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update team' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminTeamUpdateDto): Promise<unknown> { return this.updateService.updateTeam(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove team' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteTeam(id); }

}
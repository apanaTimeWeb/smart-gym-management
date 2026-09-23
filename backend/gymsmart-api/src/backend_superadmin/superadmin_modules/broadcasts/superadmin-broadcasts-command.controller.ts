// RESPONSIBILITY: Owns HTTP transport for the broadcasts-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminBroadcastsCreateService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-create.service';
import { SuperadminBroadcastsCreateDto } from '@/backend_superadmin/superadmin_modules/broadcasts/dtos/superadmin-broadcasts-create.dto';
import { SuperadminBroadcastsUpdateService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-update.service';
import { SuperadminBroadcastsUpdateDto } from '@/backend_superadmin/superadmin_modules/broadcasts/dtos/superadmin-broadcasts-update.dto';
import { SuperadminBroadcastsDeleteService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-delete.service';
import { SuperadminBroadcastsStatusService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-status.service';
import { SuperadminBroadcastsStatusDto } from '@/backend_superadmin/superadmin_modules/broadcasts/dtos/superadmin-broadcasts-status.dto';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';

@ApiTags('broadcasts')
@Controller('/superadmin/broadcasts')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBroadcastsCommandController {
  constructor(private readonly createService: SuperadminBroadcastsCreateService, private readonly updateService: SuperadminBroadcastsUpdateService, private readonly deleteService: SuperadminBroadcastsDeleteService, private readonly statusService: SuperadminBroadcastsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
    async create(@Body() body: SuperadminBroadcastsCreateDto): Promise<SuperadminBroadcastsResponseDto> { return this.createService.createBroadcasts(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminBroadcastsUpdateDto): Promise<SuperadminBroadcastsResponseDto> { return this.updateService.updateBroadcasts(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteBroadcasts(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminBroadcastsStatusDto): Promise<SuperadminBroadcastsResponseDto> { return this.statusService.changeBroadcastsStatus(id, body.status); }

}
// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the broadcasts feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { BroadcastsCreateService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-create.service';
import { BroadcastsCreateDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcasts-create.dto';
import { BroadcastsUpdateService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-update.service';
import { BroadcastsUpdateDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcasts-update.dto';
import { BroadcastsDeleteService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-delete.service';
import { BroadcastsStatusService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-status.service';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('broadcasts')
@Controller('/superadmin/broadcasts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsCommandController {
  constructor(private readonly createService: BroadcastsCreateService, private readonly updateService: BroadcastsUpdateService, private readonly deleteService: BroadcastsDeleteService, private readonly statusService: BroadcastsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create broadcasts' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: BroadcastsResponseDto })
    async create(@Body() body: BroadcastsCreateDto): Promise<BroadcastsResponseDto> { return this.createService.createBroadcasts(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update broadcasts' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    @ApiResponse({ type: BroadcastsResponseDto })
    async update(@Param('id') id: string, @Body() body: BroadcastsUpdateDto): Promise<BroadcastsResponseDto> { return this.updateService.updateBroadcasts(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove broadcasts' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteBroadcasts(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus broadcasts' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: BroadcastsResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<BroadcastsResponseDto> { return this.statusService.changeBroadcastsStatus(id, body.status); }

}

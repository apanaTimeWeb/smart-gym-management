// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the broadcasts feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { BroadcastsCreateService } from '@/modules/superadmin/broadcasts/services/broadcasts-create.service';
import { BroadcastsCreateDto } from '@/modules/superadmin/broadcasts/dtos/broadcasts-create.dto';
import { BroadcastsUpdateService } from '@/modules/superadmin/broadcasts/services/broadcasts-update.service';
import { BroadcastsUpdateDto } from '@/modules/superadmin/broadcasts/dtos/broadcasts-update.dto';
import { BroadcastsDeleteService } from '@/modules/superadmin/broadcasts/services/broadcasts-delete.service';
import { BroadcastsStatusService } from '@/modules/superadmin/broadcasts/services/broadcasts-status.service';

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
    async create(@Body() body: BroadcastsCreateDto): Promise<unknown> { return this.createService.createBroadcasts(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update broadcasts' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: BroadcastsUpdateDto): Promise<unknown> { return this.updateService.updateBroadcasts(id, body); }

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
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeBroadcastsStatus(id, body.status); }

}

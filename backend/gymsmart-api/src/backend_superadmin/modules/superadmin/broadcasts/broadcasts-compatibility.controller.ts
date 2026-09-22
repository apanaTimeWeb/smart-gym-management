// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Broadcasts.
// FLOW: /superadmin/broadcasts -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/broadcasts.

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Version, VERSION_NEUTRAL, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { BroadcastsQueryDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcasts-query.dto';
import { BroadcastsListService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-list.service';
import { BroadcastsFindService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-find.service';

import { BroadcastsCreateDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcasts-create.dto';
import { BroadcastsUpdateDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcasts-update.dto';
import { BroadcastsCreateService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-create.service';
import { BroadcastsUpdateService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-update.service';
import { BroadcastsStatusService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-status.service';
import { BroadcastsDeleteService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-delete.service';
import { BroadcastsAudienceInsightsService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-audience-insights.service';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsDeliveryService } from '@/backend_superadmin/modules/superadmin/broadcasts/services/broadcasts-delivery.service';
import { BroadcastDeliveryDto } from '@/backend_superadmin/modules/superadmin/broadcasts/dtos/broadcast-delivery.dto';

@ApiTags('Broadcasts-Compatibility')
@Controller({ path: 'superadmin/broadcasts', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsCompatibilityController {
  constructor(
    private readonly listService: BroadcastsListService,
    private readonly findService: BroadcastsFindService,
    private readonly createService: BroadcastsCreateService,
    private readonly updateService: BroadcastsUpdateService,
    private readonly statusService: BroadcastsStatusService,
    private readonly deleteService: BroadcastsDeleteService,
    private readonly repository: BroadcastsRepository,
    private readonly deliveryService: BroadcastsDeliveryService
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  async findAll(@Query() query: BroadcastsQueryDto) { return await this.listService.findBroadcastsPage(query); }

  @Get('recipient-count')
  @Version(VERSION_NEUTRAL)
  async recipientCount() { return { count: await this.repository.countRecipients() }; }

  @Get(':id')
  @Version(VERSION_NEUTRAL)
  async findOne(@Param('id') id: string) { return await this.findService.findBroadcastsById(id); }

  @Post()
  @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.CREATED)
  @RequireIdempotencyKey()
  async create(@Body() body: BroadcastsCreateDto) { return this.createService.createBroadcasts(body); }

  @Patch(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async update(@Param('id') id: string, @Body() body: BroadcastsUpdateDto) { return this.updateService.updateBroadcasts(id, body); }

  @Patch(':id/status')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async changeStatus(@Param('id') id: string, @Body() body: { status: string }) { return this.statusService.changeBroadcastsStatus(id, body.status); }

  @Delete(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) { await this.deleteService.deleteBroadcasts(id); }

  @Post(':broadcastId/deliveries/:recipientId')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async deliver(@Param('broadcastId') broadcastId: string, @Param('recipientId') recipientId: string, @Body() body: BroadcastDeliveryDto) {
    return this.deliveryService.deliver({ broadcastId: body.broadcastId || broadcastId, recipientId: body.recipientId || recipientId });
  }
}

@ApiTags('Broadcasts-Insights-Compatibility')
@Controller({ path: 'api/superadmin/broadcasts', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsInsightsCompatibilityController {
  constructor(private readonly audienceInsightsService: BroadcastsAudienceInsightsService) {}

  @Get('audience-insights')
  @Version(VERSION_NEUTRAL)
  async audienceInsights(@Query() query: Record<string, string>) { return await this.audienceInsightsService.findBroadcastsAudienceInsights(); }
}

// RESPONSIBILITY: Owns broadcast-specific frontend contract endpoints absent from generic CRUD controllers.
// FLOW: HTTP -> delivery/count service -> repository -> canonical response interceptor.
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsDeliveryService } from '@/modules/superadmin/broadcasts/services/broadcasts-delivery.service';
import { BroadcastDeliveryDto } from '@/modules/superadmin/broadcasts/dtos/broadcast-delivery.dto';
import { SuperadminBroadcastDeliveryResultDto } from '@/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('broadcasts-contract')
@Controller('/superadmin/broadcasts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsContractController {
  constructor(private readonly repository: BroadcastsRepository, private readonly deliveryService: BroadcastsDeliveryService) {}

  /** Returns the current recipient count used by the broadcast composer. */
  @Get('recipient-count')
  async recipientCount(): Promise<{ count: number }> { return { count: await this.repository.countRecipients() }; }

  /** Records a recipient delivery result. */
  @Post(':broadcastId/deliveries/:recipientId')
  @RequireIdempotencyKey()
  @ApiResponse({ type: SuperadminBroadcastDeliveryResultDto })
  async deliver(@Param('broadcastId') broadcastId: string, @Param('recipientId') recipientId: string, @Body() body: BroadcastDeliveryDto): Promise<SuperadminBroadcastDeliveryResultDto> {
    return this.deliveryService.deliver({ broadcastId: body.broadcastId || broadcastId, recipientId: body.recipientId || recipientId });
  }
}

// RESPONSIBILITY: Owns HTTP transport for the broadcasts-contract.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { BroadcastsRepository } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.repository';
import { BroadcastsDeliveryService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-delivery.service';
import { BroadcastDeliveryDto } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/dtos/broadcasts-delivery.dto';
import { SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/responses/broadcasts-response.dto';


@ApiTags('broadcasts-contract')
@Controller('/superadmin/broadcasts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsContractController {
  constructor(private readonly repository: BroadcastsRepository, private readonly deliveryService: BroadcastsDeliveryService) {}

  /** Returns the current recipient count used by the broadcast composer. */
  // SLA: FAST
  @Get('recipient-count')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async recipientCount(): Promise<{ count: number }> { return { count: await this.repository.countRecipients() }; }

  /** Records a recipient delivery result. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':broadcastId/deliveries/:recipientId')
  @ApiResponse({ type: SuperadminBroadcastDeliveryResultDto })
  async deliver(@Param('broadcastId') broadcastId: string, @Param('recipientId') recipientId: string, @Body() body: BroadcastDeliveryDto): Promise<SuperadminBroadcastDeliveryResultDto> {
    return this.deliveryService.deliver({ broadcastId: body.broadcastId || broadcastId, recipientId: body.recipientId || recipientId });
  }
}
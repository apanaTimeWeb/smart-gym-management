// RESPONSIBILITY: Owns HTTP transport for the broadcasts-contract.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsDeliveryService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-delivery.service';
import { SuperadminBroadcastDeliveryDto } from '@/backend_superadmin/superadmin_modules/broadcasts/dtos/superadmin-broadcasts-delivery.dto';
import { SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';


@ApiTags('broadcasts-contract')
@Controller('/superadmin/broadcasts')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBroadcastsContractController {
  constructor(private readonly repository: SuperadminBroadcastsRepository, private readonly deliveryService: SuperadminBroadcastsDeliveryService) {}

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
  async deliver(@Param('broadcastId') broadcastId: string, @Param('recipientId') recipientId: string, @Body() body: SuperadminBroadcastDeliveryDto): Promise<SuperadminBroadcastDeliveryResultDto> {
    return this.deliveryService.deliver({ broadcastId: body.broadcastId || broadcastId, recipientId: body.recipientId || recipientId });
  }
}
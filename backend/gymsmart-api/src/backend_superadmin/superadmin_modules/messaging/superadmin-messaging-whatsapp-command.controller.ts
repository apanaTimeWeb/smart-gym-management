// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminMessagingWhatsappCampaignResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-whatsapp-campaign-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminMessagingWhatsappCampaignService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-whatsapp-campaign.service';
import { SuperadminMessagingWhatsappCampaignCreateDto } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-whatsapp-campaign-create.dto';

@ApiTags('messagingwhatsappcommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingWhatsappCommandController {
  constructor(private readonly whatsappCampaignService: SuperadminMessagingWhatsappCampaignService) {}


  /** Executes POST /superadmin/messaging/whatsapp/campaigns. */
  @ApiOperation({ summary: 'POST /superadmin/messaging/whatsapp/campaigns' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/messaging/whatsapp/campaigns')
  @ApiResponse({ type: SuperadminMessagingWhatsappCampaignResponseDto })
  async whatsappCampaign(@Body() body: SuperadminMessagingWhatsappCampaignCreateDto): Promise<SuperadminMessagingWhatsappCampaignResponseDto> { return this.whatsappCampaignService.createMessagingWhatsAppCampaign(body); }

}
// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { MessagingWhatsappCampaignResponseDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/responses/messaging-whatsapp-campaign-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagingWhatsappCampaignService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-whatsapp-campaign.service';
import { MessagingWhatsappCampaignCreateDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/dtos/messaging-whatsapp-campaign-create.dto';

@ApiTags('messagingwhatsappcommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingWhatsappCommandController {
  constructor(private readonly whatsappCampaignService: MessagingWhatsappCampaignService) {}


  /** Executes POST /superadmin/messaging/whatsapp/campaigns. */
  @ApiOperation({ summary: 'POST /superadmin/messaging/whatsapp/campaigns' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/messaging/whatsapp/campaigns')
  @ApiResponse({ type: MessagingWhatsappCampaignResponseDto })
  async whatsappCampaign(@Body() body: MessagingWhatsappCampaignCreateDto): Promise<MessagingWhatsappCampaignResponseDto> { return this.whatsappCampaignService.createMessagingWhatsAppCampaign(body); }

}
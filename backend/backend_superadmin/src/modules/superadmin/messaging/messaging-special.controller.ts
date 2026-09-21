// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the messaging feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import type { MessagingWhatsAppBulkCenterResponseDto } from '@/modules/superadmin/messaging/messaging-whatsapp-bulk-center-response.dto';
import type { MessagingTemplateInsightsResponseDto } from '@/modules/superadmin/messaging/messaging-template-insights-response.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { MessagingTemplateInsightsService } from '@/modules/superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsAppBulkCenterService } from '@/modules/superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { MessagingWhatsAppCampaignService } from '@/modules/superadmin/messaging/services/messaging-whatsapp-campaign.service';

@ApiTags('messaging-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingSpecialController {
  constructor(private readonly templateInsightsService: MessagingTemplateInsightsService, private readonly whatsappBulkCenterService: MessagingWhatsAppBulkCenterService, private readonly whatsappCampaignService: MessagingWhatsAppCampaignService) {}

  /** Executes GET /superadmin/messaging/template-insights. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/template-insights' })
  @Get('superadmin/messaging/template-insights')
  async templateInsights(@Query() query: Record<string, string>): Promise<unknown> { return await this.templateInsightsService.findMessagingTemplateInsights(); }

  /** Executes GET /superadmin/messaging/whatsapp/bulk-center. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/whatsapp/bulk-center' })
  @Get('superadmin/messaging/whatsapp/bulk-center')
  async whatsappBulkCenter(@Query() query: Record<string, string>): Promise<unknown> { return await this.whatsappBulkCenterService.findMessagingWhatsAppBulkCenter(); }

  /** Executes POST /superadmin/messaging/whatsapp/campaigns. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/messaging/whatsapp/campaigns' })
  @Post('superadmin/messaging/whatsapp/campaigns')
  async whatsappCampaign(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.whatsappCampaignService.createMessagingWhatsAppCampaign({ body }); }

}

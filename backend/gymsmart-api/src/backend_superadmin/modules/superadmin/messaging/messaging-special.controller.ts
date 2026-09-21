// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the messaging feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { MessagingWhatsAppBulkCenterResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/messaging-whatsapp-bulk-center-response.dto';
import { MessagingTemplateInsightsResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/messaging-template-insights-response.dto';
import { MessagingWhatsAppCampaignResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-whatsapp-campaign-response.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiResponse } from '@nestjs/swagger';
import { MessagingTemplateInsightsService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsAppBulkCenterService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { MessagingWhatsAppCampaignService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-whatsapp-campaign.service';

@ApiTags('messaging-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingSpecialController {
  constructor(private readonly templateInsightsService: MessagingTemplateInsightsService, private readonly whatsappBulkCenterService: MessagingWhatsAppBulkCenterService, private readonly whatsappCampaignService: MessagingWhatsAppCampaignService) {}

  /** Executes GET /superadmin/messaging/template-insights. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/template-insights' })
  @Get('superadmin/messaging/template-insights')
  @ApiResponse({ type: MessagingTemplateInsightsResponseDto })
  async templateInsights(@Query() query: Record<string, string>): Promise<MessagingTemplateInsightsResponseDto> { return (await this.templateInsightsService.findMessagingTemplateInsights()) as unknown as MessagingTemplateInsightsResponseDto; }

  /** Executes GET /superadmin/messaging/whatsapp/bulk-center. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/whatsapp/bulk-center' })
  @Get('superadmin/messaging/whatsapp/bulk-center')
  @ApiResponse({ type: MessagingWhatsAppBulkCenterResponseDto })
  async whatsappBulkCenter(@Query() query: Record<string, string>): Promise<MessagingWhatsAppBulkCenterResponseDto> { return (await this.whatsappBulkCenterService.findMessagingWhatsAppBulkCenter()) as unknown as MessagingWhatsAppBulkCenterResponseDto; }

  /** Executes POST /superadmin/messaging/whatsapp/campaigns. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/messaging/whatsapp/campaigns' })
  @Post('superadmin/messaging/whatsapp/campaigns')
  @ApiResponse({ type: MessagingWhatsAppCampaignResponseDto })
  async whatsappCampaign(@Body() body: Record<string, unknown>): Promise<MessagingWhatsAppCampaignResponseDto> { return (await this.whatsappCampaignService.createMessagingWhatsAppCampaign({ body })) as unknown as MessagingWhatsAppCampaignResponseDto; }

}

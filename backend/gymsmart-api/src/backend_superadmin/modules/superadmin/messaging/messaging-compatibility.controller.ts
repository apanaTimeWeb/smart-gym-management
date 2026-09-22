// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Messaging.
// FLOW: /superadmin/messaging -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/messaging.

import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, Version, VERSION_NEUTRAL, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';

import { MessagingListService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-list.service';
import { MessagingCreateService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-create.service';
import { MessagingNotificationService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-notification.service';
import { MessagingTemplateInsightsService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsAppBulkCenterService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { MessagingWhatsAppCampaignService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-whatsapp-campaign.service';
import { MessagingQueryDto } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-query.dto';
import { MessagingCreateDto } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-create.dto';

@ApiTags('Messaging-Compatibility')
@Controller({ path: 'superadmin/messaging', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingCompatibilityController {
  constructor(
    private readonly listService: MessagingListService,
    private readonly createService: MessagingCreateService,
    private readonly notificationService: MessagingNotificationService,
    private readonly templateInsightsService: MessagingTemplateInsightsService,
    private readonly whatsappBulkCenterService: MessagingWhatsAppBulkCenterService,
    private readonly whatsappCampaignService: MessagingWhatsAppCampaignService
  ) {}

  @Get('messages')
  @Version(VERSION_NEUTRAL)
  async fetchMessages(@Query() query: MessagingQueryDto) { return await this.listService.findMessagingPage(query); }

  @Post('messages')
  @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  async createMessage(@Body() body: MessagingCreateDto) { return await this.createService.createMessaging(body); }

  @Get('notifications')
  @Version(VERSION_NEUTRAL)
  async fetchNotifications() { return await this.notificationService.list(); }

  @Patch('notifications/read-all')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async markAllNotificationsRead() { return await this.notificationService.markAllRead(); }

  @Patch('notifications/:id/read')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async markNotificationRead(@Param('id') id: string) { return await this.notificationService.markRead(id); }

  @Get('tenants')
  @Version(VERSION_NEUTRAL)
  async fetchTenants() { return { success: true, message: "OK", data: [] }; }

  @Get('template-insights')
  @Version(VERSION_NEUTRAL)
  async templateInsights(@Query() query: Record<string, string>) { return await this.templateInsightsService.findMessagingTemplateInsights(); }

  @Get('whatsapp/bulk-center')
  @Version(VERSION_NEUTRAL)
  async whatsappBulkCenter(@Query() query: Record<string, string>) { return await this.whatsappBulkCenterService.findMessagingWhatsAppBulkCenter(); }

  @Post('whatsapp/campaigns')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async whatsappCampaign(@Body() body: Record<string, unknown>) { return await this.whatsappCampaignService.createMessagingWhatsAppCampaign({ body }); }
}

@ApiTags('Messaging-Insights-Compatibility')
@Controller({ path: 'api/superadmin/messaging', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingInsightsCompatibilityController {
  constructor(private readonly templateInsightsService: MessagingTemplateInsightsService) {}

  @Get('template-insights')
  @Version(VERSION_NEUTRAL)
  async templateInsights(@Query() query: Record<string, string>) { return await this.templateInsightsService.findMessagingTemplateInsights(); }
}

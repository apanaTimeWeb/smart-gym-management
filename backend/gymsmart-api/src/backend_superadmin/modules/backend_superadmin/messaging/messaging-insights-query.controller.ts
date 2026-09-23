// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { MessagingWhatsappBulkCenterResponseDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-whatsapp-bulk-center-response.dto';
import { MessagingTemplateInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-template-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagingTemplateInsightsService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsappBulkCenterService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('messaginginsightsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingInsightsQueryController {
  constructor(private readonly templateInsightsService: MessagingTemplateInsightsService, private readonly whatsappBulkCenterService: MessagingWhatsappBulkCenterService) {}


  /** Executes GET /superadmin/messaging/template-insights. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/template-insights' })
  // SLA: FAST
  @Get('superadmin/messaging/template-insights')
  @Get('api/superadmin/messaging/template-insights')
  @ApiResponse({ type: MessagingTemplateInsightsResponseDto })
  async templateInsights(@Query() query: SuperadminQueryDto): Promise<MessagingTemplateInsightsResponseDto> { return (await this.templateInsightsService.findMessagingTemplateInsights({ query })) as unknown as MessagingTemplateInsightsResponseDto; }


  /** Executes GET /superadmin/messaging/whatsapp/bulk-center. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/whatsapp/bulk-center' })
  // SLA: HEAVY
  @Get('superadmin/messaging/whatsapp/bulk-center')
  @ApiResponse({ type: MessagingWhatsappBulkCenterResponseDto })
  async whatsappBulkCenter(@Query() query: SuperadminQueryDto): Promise<MessagingWhatsappBulkCenterResponseDto> { return (await this.whatsappBulkCenterService.findMessagingWhatsAppBulkCenter({ query })) as unknown as MessagingWhatsappBulkCenterResponseDto; }

}
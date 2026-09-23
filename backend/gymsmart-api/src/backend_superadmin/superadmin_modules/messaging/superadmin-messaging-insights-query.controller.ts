// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminMessagingWhatsappBulkCenterResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-whatsapp-bulk-center-response.dto';
import { SuperadminMessagingTemplateInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-template-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminMessagingTemplateInsightsService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-template-insights.service';
import { SuperadminMessagingWhatsappBulkCenterService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-whatsapp-bulk-center.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('messaginginsightsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingInsightsQueryController {
  constructor(private readonly templateInsightsService: SuperadminMessagingTemplateInsightsService, private readonly whatsappBulkCenterService: SuperadminMessagingWhatsappBulkCenterService) {}


  /** Executes GET /superadmin/messaging/template-insights. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/template-insights' })
  // SLA: FAST
  @Get('superadmin/messaging/template-insights')
  @Get('api/superadmin/messaging/template-insights')
  @ApiResponse({ type: SuperadminMessagingTemplateInsightsResponseDto })
  async templateInsights(@Query() query: SuperadminQueryDto): Promise<SuperadminMessagingTemplateInsightsResponseDto> { return (await this.templateInsightsService.findMessagingTemplateInsights({ query })) as unknown as SuperadminMessagingTemplateInsightsResponseDto; }


  /** Executes GET /superadmin/messaging/whatsapp/bulk-center. */
  @ApiOperation({ summary: 'GET /superadmin/messaging/whatsapp/bulk-center' })
  // SLA: HEAVY
  @Get('superadmin/messaging/whatsapp/bulk-center')
  @ApiResponse({ type: SuperadminMessagingWhatsappBulkCenterResponseDto })
  async whatsappBulkCenter(@Query() query: SuperadminQueryDto): Promise<SuperadminMessagingWhatsappBulkCenterResponseDto> { return (await this.whatsappBulkCenterService.findMessagingWhatsAppBulkCenter({ query })) as unknown as SuperadminMessagingWhatsappBulkCenterResponseDto; }

}
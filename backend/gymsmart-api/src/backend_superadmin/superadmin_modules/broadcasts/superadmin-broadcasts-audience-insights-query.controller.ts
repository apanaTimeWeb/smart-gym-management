// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminBroadcastsAudienceInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-audience-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminBroadcastsAudienceInsightsService } from '@/backend_superadmin/superadmin_modules/broadcasts/services/superadmin-broadcasts-audience-insights.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('broadcastsaudienceinsightsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBroadcastsAudienceInsightsQueryController {
  constructor(private readonly audienceInsightsService: SuperadminBroadcastsAudienceInsightsService) {}


  /** Executes GET /superadmin/broadcasts/audience-insights. */
  @ApiOperation({ summary: 'GET /superadmin/broadcasts/audience-insights' })
  // SLA: FAST
  @Get('superadmin/broadcasts/audience-insights')
  @Get('api/superadmin/broadcasts/audience-insights')
  @ApiResponse({ type: SuperadminBroadcastsAudienceInsightsResponseDto })
  async audienceInsights(@Query() query: SuperadminQueryDto): Promise<SuperadminBroadcastsAudienceInsightsResponseDto> { void query; return await this.audienceInsightsService.findBroadcastsAudienceInsights(); }

}
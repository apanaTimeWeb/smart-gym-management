// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { BroadcastsAudienceInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts-audience-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BroadcastsAudienceInsightsService } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/services/broadcasts-audience-insights.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('broadcastsaudienceinsightsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsAudienceInsightsQueryController {
  constructor(private readonly audienceInsightsService: BroadcastsAudienceInsightsService) {}


  /** Executes GET /superadmin/broadcasts/audience-insights. */
  @ApiOperation({ summary: 'GET /superadmin/broadcasts/audience-insights' })
  // SLA: FAST
  @Get('superadmin/broadcasts/audience-insights')
  @Get('api/superadmin/broadcasts/audience-insights')
  @ApiResponse({ type: BroadcastsAudienceInsightsResponseDto })
  async audienceInsights(@Query() query: SuperadminQueryDto): Promise<BroadcastsAudienceInsightsResponseDto> { void query; return await this.audienceInsightsService.findBroadcastsAudienceInsights(); }

}
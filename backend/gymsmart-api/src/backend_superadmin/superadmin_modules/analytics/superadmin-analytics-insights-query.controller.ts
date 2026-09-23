// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';
import { SuperadminAnalyticsRetentionInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics-retention-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminAnalyticsMainService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-main.service';
import { SuperadminAnalyticsRetentionInsightsService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-retention-insights.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('analyticsinsightsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAnalyticsInsightsQueryController {
  constructor(private readonly mainService: SuperadminAnalyticsMainService, private readonly retentionInsightsService: SuperadminAnalyticsRetentionInsightsService) {}


  /** Executes GET /superadmin/analytics. */
  @ApiOperation({ summary: 'GET /superadmin/analytics' })
  // SLA: FAST
  @Get('superadmin/analytics')
  @ApiResponse({ type: SuperadminAnalyticsResponseDto })
  async main(@Query() query: SuperadminQueryDto): Promise<SuperadminAnalyticsResponseDto> { return await this.mainService.findAnalyticsData({ query }); }


  /** Executes GET /superadmin/analytics/retention-insights. */
  @ApiOperation({ summary: 'GET /superadmin/analytics/retention-insights' })
  // SLA: FAST
  @Get('superadmin/analytics/retention-insights')
  @Get('api/superadmin/analytics/retention-insights')
  @ApiResponse({ type: SuperadminAnalyticsRetentionInsightsResponseDto })
  async retentionInsights(@Query() query: SuperadminQueryDto): Promise<SuperadminAnalyticsRetentionInsightsResponseDto> { return await this.retentionInsightsService.findAnalyticsRetentionInsights({ query }); }

}
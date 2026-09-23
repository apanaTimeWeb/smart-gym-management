// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { AnalyticsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/analytics/responses/analytics-response.dto';
import { AnalyticsRetentionInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/analytics/analytics-retention-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsMainService } from '@/backend_superadmin/modules/backend_superadmin/analytics/services/analytics-main.service';
import { AnalyticsRetentionInsightsService } from '@/backend_superadmin/modules/backend_superadmin/analytics/services/analytics-retention-insights.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('analyticsinsightsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AnalyticsInsightsQueryController {
  constructor(private readonly mainService: AnalyticsMainService, private readonly retentionInsightsService: AnalyticsRetentionInsightsService) {}


  /** Executes GET /superadmin/analytics. */
  @ApiOperation({ summary: 'GET /superadmin/analytics' })
  // SLA: FAST
  @Get('superadmin/analytics')
  @ApiResponse({ type: AnalyticsResponseDto })
  async main(@Query() query: SuperadminQueryDto): Promise<AnalyticsResponseDto> { return await this.mainService.findAnalyticsData({ query }); }


  /** Executes GET /superadmin/analytics/retention-insights. */
  @ApiOperation({ summary: 'GET /superadmin/analytics/retention-insights' })
  // SLA: FAST
  @Get('superadmin/analytics/retention-insights')
  @Get('api/superadmin/analytics/retention-insights')
  @ApiResponse({ type: AnalyticsRetentionInsightsResponseDto })
  async retentionInsights(@Query() query: SuperadminQueryDto): Promise<AnalyticsRetentionInsightsResponseDto> { return await this.retentionInsightsService.findAnalyticsRetentionInsights({ query }); }

}
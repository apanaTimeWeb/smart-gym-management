// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the analytics feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AnalyticsResponseDto } from '@/modules/superadmin/analytics/responses/analytics-response.dto';
import { AnalyticsRetentionInsightsResponseDto } from '@/modules/superadmin/analytics/analytics-retention-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { AnalyticsMainService } from '@/modules/superadmin/analytics/services/analytics-main.service';
import { AnalyticsRetentionInsightsService } from '@/modules/superadmin/analytics/services/analytics-retention-insights.service';

@ApiTags('analytics-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AnalyticsSpecialController {
  constructor(private readonly mainService: AnalyticsMainService, private readonly retentionInsightsService: AnalyticsRetentionInsightsService) {}

  /** Executes GET /superadmin/analytics. */
  @ApiOperation({ summary: 'GET /superadmin/analytics' })
  @Get('superadmin/analytics')
  @ApiResponse({ type: AnalyticsResponseDto })
  async main(@Query() query: Record<string, string>): Promise<AnalyticsResponseDto> { return await this.mainService.findAnalyticsData(); }

  /** Executes GET /superadmin/analytics/retention-insights. */
  @ApiOperation({ summary: 'GET /superadmin/analytics/retention-insights' })
  @Get('superadmin/analytics/retention-insights')
  @ApiResponse({ type: AnalyticsRetentionInsightsResponseDto })
  async retentionInsights(@Query() query: Record<string, string>): Promise<AnalyticsRetentionInsightsResponseDto> { return await this.retentionInsightsService.findAnalyticsRetentionInsights(); }

}

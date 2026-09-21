// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the broadcasts feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { BroadcastsAudienceInsightsResponseDto } from '@/modules/superadmin/broadcasts/broadcasts-audience-insights-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { BroadcastsAudienceInsightsService } from '@/modules/superadmin/broadcasts/services/broadcasts-audience-insights.service';

@ApiTags('broadcasts-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BroadcastsSpecialController {
  constructor(private readonly audienceInsightsService: BroadcastsAudienceInsightsService) {}

  /** Executes GET /superadmin/broadcasts/audience-insights. */
  @ApiOperation({ summary: 'GET /superadmin/broadcasts/audience-insights' })
  @Get('superadmin/broadcasts/audience-insights')
  async audienceInsights(@Query() query: Record<string, string>): Promise<unknown> { return await this.audienceInsightsService.findBroadcastsAudienceInsights(); }

}

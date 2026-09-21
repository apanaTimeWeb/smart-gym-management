// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the features feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { FeaturesRolloutInsightsResponseDto } from '@/modules/superadmin/features/features-rollout-insights-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { FeaturesRolloutInsightsService } from '@/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/modules/superadmin/features/services/features-main.service';

@ApiTags('features-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesSpecialController {
  constructor(private readonly rolloutInsightsService: FeaturesRolloutInsightsService, private readonly mainService: FeaturesMainService) {}

  /** Executes GET /superadmin/features/rollout-insights. */
  @ApiOperation({ summary: 'GET /superadmin/features/rollout-insights' })
  @Get('superadmin/features/rollout-insights')
  async findFeaturesRolloutInsights(): Promise<FeaturesRolloutInsightsResponseDto> { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }

  /** Executes GET /superadmin/features. */
  @ApiOperation({ summary: 'GET /superadmin/features' })
  @Get('superadmin/features')
  async findFeaturesData(): Promise<unknown> { return await this.mainService.findFeaturesData(); }
}

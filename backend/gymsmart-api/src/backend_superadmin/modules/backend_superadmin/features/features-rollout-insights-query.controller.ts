// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { FeaturesRolloutInsightsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/features/features-rollout-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeaturesRolloutInsightsService } from '@/backend_superadmin/modules/backend_superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/backend_superadmin/modules/backend_superadmin/features/services/features-main.service';
import { FeaturesResponseDataDto } from '@/backend_superadmin/modules/backend_superadmin/features/features-response-data.dto';

@ApiTags('featuresrolloutinsightsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesRolloutInsightsQueryController {
  constructor(private readonly rolloutInsightsService: FeaturesRolloutInsightsService, private readonly mainService: FeaturesMainService) {}


  /** Executes GET /superadmin/features/rollout-insights. */
  @ApiOperation({ summary: 'GET /superadmin/features/rollout-insights' })
  // SLA: FAST
  @Get('superadmin/features/rollout-insights')
  @Get('api/superadmin/features/rollout-insights')
  @ApiResponse({ type: FeaturesRolloutInsightsResponseDto })
  async findFeaturesRolloutInsights(): Promise<FeaturesRolloutInsightsResponseDto> { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }


  /** Executes GET /superadmin/features. */
  @ApiOperation({ summary: 'GET /superadmin/features' })
  // SLA: FAST
  @Get('superadmin/features')
  @ApiResponse({ type: FeaturesResponseDataDto })
  async findFeaturesData(): Promise<FeaturesResponseDataDto> { return await this.mainService.findFeaturesData() as unknown as FeaturesResponseDataDto; }

}
// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminFeaturesRolloutInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-rollout-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminFeaturesRolloutInsightsService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-rollout-insights.service';
import { SuperadminFeaturesMainService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-main.service';
import { SuperadminFeaturesResponseDataDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-response-data.dto';

@ApiTags('featuresrolloutinsightsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesRolloutInsightsQueryController {
  constructor(private readonly rolloutInsightsService: SuperadminFeaturesRolloutInsightsService, private readonly mainService: SuperadminFeaturesMainService) {}


  /** Executes GET /superadmin/features/rollout-insights. */
  @ApiOperation({ summary: 'GET /superadmin/features/rollout-insights' })
  // SLA: FAST
  @Get('superadmin/features/rollout-insights')
  @Get('api/superadmin/features/rollout-insights')
  @ApiResponse({ type: SuperadminFeaturesRolloutInsightsResponseDto })
  async findFeaturesRolloutInsights(): Promise<SuperadminFeaturesRolloutInsightsResponseDto> { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }


  /** Executes GET /superadmin/features. */
  @ApiOperation({ summary: 'GET /superadmin/features' })
  // SLA: FAST
  @Get('superadmin/features')
  @ApiResponse({ type: SuperadminFeaturesResponseDataDto })
  async findFeaturesData(): Promise<SuperadminFeaturesResponseDataDto> { return await this.mainService.findFeaturesData() as unknown as SuperadminFeaturesResponseDataDto; }

}
// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Analytics.
// FLOW: /superadmin/analytics -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/analytics.

import { Controller, Get, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { AnalyticsMainService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-main.service';
import { AnalyticsRetentionInsightsService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-retention-insights.service';

@ApiTags('Analytics-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AnalyticsCompatibilityController {
  constructor(
    private readonly mainService: AnalyticsMainService,
    private readonly retentionInsightsService: AnalyticsRetentionInsightsService
  ) {}

  @Get('superadmin/analytics')
  @Version(VERSION_NEUTRAL)
  async main(@Query() query: Record<string, string>) { return await this.mainService.findAnalyticsData(); }

  @Get('api/superadmin/analytics/retention-insights')
  @Version(VERSION_NEUTRAL)
  async retentionInsights(@Query() query: Record<string, string>) { return await this.retentionInsightsService.findAnalyticsRetentionInsights(); }
}

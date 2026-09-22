// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Dashboard.
// FLOW: /superadmin/dashboard -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/dashboard.

import { Controller, Get, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { DashboardBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-business-overview.service';
import { DashboardMainService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-main.service';
import { DashboardMetricsService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-metrics.service';

@ApiTags('Dashboard-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardCompatibilityController {
  constructor(
    private readonly businessOverviewService: DashboardBusinessOverviewService,
    private readonly mainService: DashboardMainService,
    private readonly metricsService: DashboardMetricsService
  ) {}

  @Get('api/superadmin/dashboard/business-overview')
  @Version(VERSION_NEUTRAL)
  async businessOverview(@Query() query: Record<string, string>) { return await this.businessOverviewService.findDashboardBusinessOverview(); }

  @Get('superadmin/dashboard')
  @Version(VERSION_NEUTRAL)
  async main(@Query() query: Record<string, string>) { return await this.mainService.findDashboardData(); }

  @Get('superadmin/dashboard/metrics')
  @Version(VERSION_NEUTRAL)
  async metrics(@Query() query: Record<string, string>) { return await this.metricsService.findDashboardMetrics(); }
}

// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the dashboard feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { DashboardBusinessOverviewResponseDto } from '@/modules/superadmin/dashboard/dashboard-business-overview-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { DashboardBusinessOverviewService } from '@/modules/superadmin/dashboard/services/dashboard-business-overview.service';
import { DashboardMainService } from '@/modules/superadmin/dashboard/services/dashboard-main.service';
import { DashboardMetricsService } from '@/modules/superadmin/dashboard/services/dashboard-metrics.service';

@ApiTags('dashboard-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardSpecialController {
  constructor(private readonly businessOverviewService: DashboardBusinessOverviewService, private readonly mainService: DashboardMainService, private readonly metricsService: DashboardMetricsService) {}

  /** Executes GET /superadmin/dashboard/business-overview. */
  @ApiOperation({ summary: 'GET /superadmin/dashboard/business-overview' })
  @Get('superadmin/dashboard/business-overview')
  async businessOverview(@Query() query: Record<string, string>): Promise<unknown> { return await this.businessOverviewService.findDashboardBusinessOverview(); }

  /** Executes GET /superadmin/dashboard. */
  @ApiOperation({ summary: 'GET /superadmin/dashboard' })
  @Get('superadmin/dashboard')
  async main(@Query() query: Record<string, string>): Promise<unknown> { return await this.mainService.findDashboardData(); }

  /** Executes GET /superadmin/dashboard/metrics. */
  @ApiOperation({ summary: 'GET /superadmin/dashboard/metrics' })
  @Get('superadmin/dashboard/metrics')
  async metrics(@Query() query: Record<string, string>): Promise<unknown> { return await this.metricsService.findDashboardMetrics(); }

}

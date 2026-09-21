// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the dashboard feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { DashboardBusinessOverviewResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-business-overview-response.dto';
import { DashboardResponseDataDto } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-response-data.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { DashboardBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-business-overview.service';
import { DashboardMainService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-main.service';
import { DashboardMetricsService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-metrics.service';

@ApiTags('dashboard-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardSpecialController {
  constructor(private readonly businessOverviewService: DashboardBusinessOverviewService, private readonly mainService: DashboardMainService, private readonly metricsService: DashboardMetricsService) {}

  /** Executes GET /superadmin/dashboard/business-overview. */
  @ApiOperation({ summary: 'GET /superadmin/dashboard/business-overview' })
  @Get('superadmin/dashboard/business-overview')
  @ApiResponse({ type: DashboardBusinessOverviewResponseDto })
  async businessOverview(@Query() query: Record<string, string>): Promise<DashboardBusinessOverviewResponseDto> { return await this.businessOverviewService.findDashboardBusinessOverview(); }

  /** Executes GET /superadmin/dashboard. */
  @ApiOperation({ summary: 'GET /superadmin/dashboard' })
  @Get('superadmin/dashboard')
  @ApiResponse({ type: DashboardResponseDataDto })
  async main(@Query() query: Record<string, string>): Promise<DashboardResponseDataDto> { return await this.mainService.findDashboardData(); }

  /** Executes GET /superadmin/dashboard/metrics. */
  @ApiOperation({ summary: 'GET /superadmin/dashboard/metrics' })
  @Get('superadmin/dashboard/metrics')
  @ApiResponse({ type: DashboardResponseDataDto })
  async metrics(@Query() query: Record<string, string>): Promise<DashboardResponseDataDto> { return await this.metricsService.findDashboardMetrics(); }

}

// RESPONSIBILITY: Owns dashboard widget read transport; every endpoint returns one bounded UI capability.
// FLOW: HTTP query -> widget-specific service -> repository projection -> canonical response envelope.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';
import { SuperadminDashboardKpisService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-kpis.service';
import { SuperadminDashboardRevenueChartService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-revenue-chart.service';
import { SuperadminDashboardGrowthChartService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-growth-chart.service';
import { SuperadminDashboardRevenueByTierService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-revenue-by-tier.service';
import { SuperadminDashboardRevenueByGeographyService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-revenue-by-geography.service';
import { SuperadminDashboardRecentOnboardsService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-recent-onboards.service';
import { SuperadminDashboardKpisResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-kpis-response.dto';
import { SuperadminDashboardRevenueChartResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-revenue-chart-response.dto';
import { SuperadminDashboardGrowthChartResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-growth-chart-response.dto';
import { SuperadminDashboardRevenueByTierResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-revenue-by-tier-response.dto';
import { SuperadminDashboardRevenueByGeographyResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-revenue-by-geography-response.dto';
import { SuperadminDashboardRecentOnboardsResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-recent-onboards-response.dto';
import { SuperadminDashboardBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-business-overview-response.dto';
import { SuperadminDashboardBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/dashboard/services/superadmin-dashboard-business-overview.service';

@ApiTags('dashboard')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminDashboardOverviewQueryController {
  constructor(
    private readonly businessOverviewService: SuperadminDashboardBusinessOverviewService,
    private readonly kpisService: SuperadminDashboardKpisService,
    private readonly revenueChartService: SuperadminDashboardRevenueChartService,
    private readonly growthChartService: SuperadminDashboardGrowthChartService,
    private readonly revenueByTierService: SuperadminDashboardRevenueByTierService,
    private readonly revenueByGeographyService: SuperadminDashboardRevenueByGeographyService,
    private readonly recentOnboardsService: SuperadminDashboardRecentOnboardsService,
  ) {}

  /** Returns the business-overview widget contract. */
  @ApiOperation({ summary: 'Dashboard business overview widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/business-overview')
  @Get('api/superadmin/dashboard/business-overview')
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminDashboardBusinessOverviewResponseDto })
  async businessOverview(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardBusinessOverviewResponseDto> {
    return this.businessOverviewService.findDashboardBusinessOverview({ query });
  }

  /** Returns the KPI widget contract without chart or recent-onboard payloads. */
  @ApiOperation({ summary: 'Dashboard KPI widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/kpis')
  @Get('superadmin/dashboard/metrics')
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminDashboardKpisResponseDto })
  async kpis(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardKpisResponseDto> {
    return this.kpisService.getDashboardKpis(query);
  }

  /** Returns the revenue chart widget. */
  @ApiOperation({ summary: 'Dashboard revenue chart widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/revenue-chart')
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRevenueChartResponseDto] })
  async revenueChart(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardRevenueChartResponseDto[]> {
    return this.revenueChartService.getRevenueChart(query);
  }

  /** Returns the gym-growth chart widget. */
  @ApiOperation({ summary: 'Dashboard growth chart widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/growth-chart')
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardGrowthChartResponseDto] })
  async growthChart(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardGrowthChartResponseDto[]> {
    return this.growthChartService.getGrowthChart(query);
  }

  /** Returns revenue grouped by subscription plan. */
  @ApiOperation({ summary: 'Dashboard revenue by tier widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/revenue-by-tier')
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRevenueByTierResponseDto] })
  async revenueByTier(): Promise<SuperadminDashboardRevenueByTierResponseDto[]> {
    return this.revenueByTierService.getRevenueByTier();
  }

  /** Returns revenue grouped by tenant geography. */
  @ApiOperation({ summary: 'Dashboard revenue by geography widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/revenue-by-geography')
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRevenueByGeographyResponseDto] })
  async revenueByGeography(): Promise<SuperadminDashboardRevenueByGeographyResponseDto[]> {
    return this.revenueByGeographyService.getRevenueByGeography();
  }

  /** Returns the five newest tenant records with all fields the UI consumes. */
  @ApiOperation({ summary: 'Dashboard recent onboards widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/recent-onboards')
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRecentOnboardsResponseDto] })
  async recentOnboards(): Promise<SuperadminDashboardRecentOnboardsResponseDto[]> {
    return this.recentOnboardsService.getRecentOnboards();
  }
}

// RESPONSIBILITY: Owns dashboard widget read transport; every endpoint returns one bounded UI capability.
// FLOW: HTTP query -> widget-specific service -> repository projection -> canonical response envelope.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';
import { DashboardKpisService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-kpis.service';
import { DashboardRevenueChartService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-revenue-chart.service';
import { DashboardGrowthChartService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-growth-chart.service';
import { DashboardRevenueByTierService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-revenue-by-tier.service';
import { DashboardRevenueByGeographyService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-revenue-by-geography.service';
import { DashboardRecentOnboardsService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-recent-onboards.service';
import { DashboardKpisResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-kpis-response.dto';
import { DashboardRevenueChartResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-revenue-chart-response.dto';
import { DashboardGrowthChartResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-growth-chart-response.dto';
import { DashboardRevenueByTierResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-revenue-by-tier-response.dto';
import { DashboardRevenueByGeographyResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-revenue-by-geography-response.dto';
import { DashboardRecentOnboardsResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/responses/dashboard-recent-onboards-response.dto';
import { DashboardBusinessOverviewResponseDto } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-business-overview-response.dto';
import { DashboardBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-business-overview.service';

@ApiTags('dashboard')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class DashboardOverviewQueryController {
  constructor(
    private readonly businessOverviewService: DashboardBusinessOverviewService,
    private readonly kpisService: DashboardKpisService,
    private readonly revenueChartService: DashboardRevenueChartService,
    private readonly growthChartService: DashboardGrowthChartService,
    private readonly revenueByTierService: DashboardRevenueByTierService,
    private readonly revenueByGeographyService: DashboardRevenueByGeographyService,
    private readonly recentOnboardsService: DashboardRecentOnboardsService,
  ) {}

  /** Returns the business-overview widget contract. */
  @ApiOperation({ summary: 'Dashboard business overview widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/business-overview')
  @Get('api/superadmin/dashboard/business-overview')
  @ApiResponse({ status: HttpStatus.OK, type: DashboardBusinessOverviewResponseDto })
  async businessOverview(@Query() query: SuperadminQueryDto): Promise<DashboardBusinessOverviewResponseDto> {
    return this.businessOverviewService.findDashboardBusinessOverview({ query });
  }

  /** Returns the KPI widget contract without chart or recent-onboard payloads. */
  @ApiOperation({ summary: 'Dashboard KPI widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/kpis')
  @Get('superadmin/dashboard/metrics')
  @ApiResponse({ status: HttpStatus.OK, type: DashboardKpisResponseDto })
  async kpis(@Query() query: SuperadminQueryDto): Promise<DashboardKpisResponseDto> {
    return this.kpisService.getDashboardKpis(query);
  }

  /** Returns the revenue chart widget. */
  @ApiOperation({ summary: 'Dashboard revenue chart widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/revenue-chart')
  @ApiResponse({ status: HttpStatus.OK, type: [DashboardRevenueChartResponseDto] })
  async revenueChart(@Query() query: SuperadminQueryDto): Promise<DashboardRevenueChartResponseDto[]> {
    return this.revenueChartService.getRevenueChart(query);
  }

  /** Returns the gym-growth chart widget. */
  @ApiOperation({ summary: 'Dashboard growth chart widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/growth-chart')
  @ApiResponse({ status: HttpStatus.OK, type: [DashboardGrowthChartResponseDto] })
  async growthChart(@Query() query: SuperadminQueryDto): Promise<DashboardGrowthChartResponseDto[]> {
    return this.growthChartService.getGrowthChart(query);
  }

  /** Returns revenue grouped by subscription plan. */
  @ApiOperation({ summary: 'Dashboard revenue by tier widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/revenue-by-tier')
  @ApiResponse({ status: HttpStatus.OK, type: [DashboardRevenueByTierResponseDto] })
  async revenueByTier(): Promise<DashboardRevenueByTierResponseDto[]> {
    return this.revenueByTierService.getRevenueByTier();
  }

  /** Returns revenue grouped by tenant geography. */
  @ApiOperation({ summary: 'Dashboard revenue by geography widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/revenue-by-geography')
  @ApiResponse({ status: HttpStatus.OK, type: [DashboardRevenueByGeographyResponseDto] })
  async revenueByGeography(): Promise<DashboardRevenueByGeographyResponseDto[]> {
    return this.revenueByGeographyService.getRevenueByGeography();
  }

  /** Returns the five newest tenant records with all fields the UI consumes. */
  @ApiOperation({ summary: 'Dashboard recent onboards widget' })
  // SLA: FAST
  @Get('superadmin/dashboard/recent-onboards')
  @ApiResponse({ status: HttpStatus.OK, type: [DashboardRecentOnboardsResponseDto] })
  async recentOnboards(): Promise<DashboardRecentOnboardsResponseDto[]> {
    return this.recentOnboardsService.getRecentOnboards();
  }
}

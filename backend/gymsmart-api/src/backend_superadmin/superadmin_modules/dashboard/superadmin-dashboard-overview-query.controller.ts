// RESPONSIBILITY: Owns dashboard read transport and exposes widget-sliced plus frontend-compatible aggregate queries.
// FLOW: HTTP query -> isolated widget service(s) -> stable typed DTO -> canonical response envelope.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';
import { SuperadminDashboardKpisService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-kpis.service';
import { SuperadminDashboardRevenueChartService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-chart.service';
import { SuperadminDashboardGrowthChartService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-growth-chart.service';
import { SuperadminDashboardRevenueByTierService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-by-tier.service';
import { SuperadminDashboardRevenueByGeographyService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-by-geography.service';
import { SuperadminDashboardRecentOnboardsService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-recent-onboards.service';
import { SuperadminDashboardKpisResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-kpis-response.dto';
import { SuperadminDashboardRevenueChartResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-revenue-chart-response.dto';
import { SuperadminDashboardGrowthChartResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-growth-chart-response.dto';
import { SuperadminDashboardRevenueByTierResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-revenue-by-tier-response.dto';
import { SuperadminDashboardRevenueByGeographyResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-revenue-by-geography-response.dto';
import { SuperadminDashboardRecentOnboardsResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-recent-onboards-response.dto';
import { SuperadminDashboardBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-business-overview-response.dto';
import { SuperadminDashboardBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-business-overview.service';
import { SuperadminDashboardApiResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-api-response.dto';
import { SuperadminDashboardApiReadService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-api-read.service';
/**
 * Primary Intent: Defines SuperadminDashboardOverviewQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('dashboard')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
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
    private readonly apiReadService: SuperadminDashboardApiReadService,
  ) {}
  /**
   * Primary Intent: Returns the business-overview widget as a bounded dashboard read capability.
   * Edge Cases: The widget service owns all date and empty-result semantics.
   * Side-Effects: None.
   * AI-Note: Keep this endpoint independently usable by widget consumers.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/business-overview', 'superadmin/dashboard/business-overview'])
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminDashboardBusinessOverviewResponseDto })
  @ApiOperation({ summary: 'businessOverview' })
  /**
   * Primary Intent: Executes the businessOverview use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async businessOverview(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardBusinessOverviewResponseDto> {
    return this.businessOverviewService.findDashboardBusinessOverview({ query });
  }
  /**
   * Primary Intent: Returns dashboard KPI values without chart or recent-onboard payloads.
   * Edge Cases: Empty/zero aggregate results remain explicitly typed and are not replaced with placeholders.
   * Side-Effects: None.
   * AI-Note: KPI calculation remains isolated inside the KPI service.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/kpis', 'superadmin/dashboard/kpis', 'superadmin/dashboard/metrics'])
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminDashboardKpisResponseDto })
  @ApiOperation({ summary: 'kpis' })
  /**
   * Primary Intent: Executes the kpis use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async kpis(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardKpisResponseDto> {
    return this.kpisService.getDashboardKpis(query);
  }
  /**
   * Primary Intent: Returns monthly revenue chart points.
   * Edge Cases: No matching months return an empty array with stable item shape.
   * Side-Effects: None.
   * AI-Note: Preserve backend-defined currency and smallest-unit semantics.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/revenue-chart', 'superadmin/dashboard/revenue-chart'])
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRevenueChartResponseDto] })
  @ApiOperation({ summary: 'revenueChart' })
  /**
   * Primary Intent: Executes the revenueChart use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async revenueChart(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardRevenueChartResponseDto[]> {
    return this.revenueChartService.getRevenueChart(query);
  }
  /**
   * Primary Intent: Returns monthly tenant-growth chart points.
   * Edge Cases: Empty periods produce an empty array without missing metadata fields.
   * Side-Effects: None.
   * AI-Note: Keep month ordering deterministic.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/growth-chart', 'superadmin/dashboard/growth-chart'])
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardGrowthChartResponseDto] })
  @ApiOperation({ summary: 'growthChart' })
  /**
   * Primary Intent: Executes the growthChart use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async growthChart(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardGrowthChartResponseDto[]> {
    return this.growthChartService.getGrowthChart(query);
  }
  /**
   * Primary Intent: Returns revenue grouped by subscription tier.
   * Edge Cases: Empty tiers produce no rows; values retain explicit currency.
   * Side-Effects: None.
   * AI-Note: Do not move tier aggregation into the controller.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/revenue-by-tier', 'superadmin/dashboard/revenue-by-tier'])
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRevenueByTierResponseDto] })
  @ApiOperation({ summary: 'revenueByTier' })
  /**
   * Primary Intent: Executes the revenueByTier use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async revenueByTier(): Promise<SuperadminDashboardRevenueByTierResponseDto[]> {
    return this.revenueByTierService.getRevenueByTier();
  }
  /**
   * Primary Intent: Returns revenue grouped by tenant geography.
   * Edge Cases: Unknown/empty geography remains represented by the service's explicit label rules.
   * Side-Effects: None.
   * AI-Note: Preserve tenant scope and monetary currency semantics.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/revenue-by-geography', 'superadmin/dashboard/revenue-by-geography'])
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRevenueByGeographyResponseDto] })
  @ApiOperation({ summary: 'revenueByGeography' })
  /**
   * Primary Intent: Executes the revenueByGeography use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async revenueByGeography(): Promise<SuperadminDashboardRevenueByGeographyResponseDto[]> {
    return this.revenueByGeographyService.getRevenueByGeography();
  }
  /**
   * Primary Intent: Returns the most recent tenant onboarding records with all UI-required relationship fields.
   * Edge Cases: Fewer than five tenants returns the available rows without synthetic placeholders.
   * Side-Effects: None.
   * AI-Note: Keep the projection in its owning service and repository.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard/recent-onboards', 'superadmin/dashboard/recent-onboards'])
  @ApiResponse({ status: HttpStatus.OK, type: [SuperadminDashboardRecentOnboardsResponseDto] })
  @ApiOperation({ summary: 'recentOnboards' })
  /**
   * Primary Intent: Executes the recentOnboards use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async recentOnboards(): Promise<SuperadminDashboardRecentOnboardsResponseDto[]> {
    return this.recentOnboardsService.getRecentOnboards();
  }
}

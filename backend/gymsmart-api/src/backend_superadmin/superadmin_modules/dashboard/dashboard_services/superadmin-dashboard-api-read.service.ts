// RESPONSIBILITY: Composes the frontend-compatible dashboard GET response from isolated widget services without moving query logic into a mega repository.
// FLOW: GET /superadmin/dashboard -> widget services in parallel -> stable API DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardKpisService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-kpis.service';
import { SuperadminDashboardRevenueChartService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-chart.service';
import { SuperadminDashboardGrowthChartService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-growth-chart.service';
import { SuperadminDashboardRecentOnboardsService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-recent-onboards.service';
import { SuperadminDashboardRevenueByTierService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-by-tier.service';
import { SuperadminDashboardRevenueByGeographyService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-revenue-by-geography.service';
import { SuperadminDashboardApiResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-api-response.dto';
import type { SuperadminDashboardWidgetQuery } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_types/superadmin-dashboard.interfaces';

/**
 * Primary Intent: Bridges the frontend's existing dashboard base GET call with the backend's widget-sliced architecture.
 * Edge Cases: Each widget still owns its own query and failures abort the aggregate contract rather than silently inventing values.
 * Side-Effects: Performs parallel read-only repository queries.
 * AI-Note: This service composes widget outputs only; never add raw SQL or business logic here.
 */
@Injectable()
/**
 * Primary Intent: Defines SuperadminDashboardApiReadService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminDashboardApiReadService {
  constructor(
    private readonly kpis: SuperadminDashboardKpisService,
    private readonly revenueChart: SuperadminDashboardRevenueChartService,
    private readonly growthChart: SuperadminDashboardGrowthChartService,
    private readonly recentOnboards: SuperadminDashboardRecentOnboardsService,
    private readonly revenueByTier: SuperadminDashboardRevenueByTierService,
    private readonly revenueByGeography: SuperadminDashboardRevenueByGeographyService,
  ) {}

  /**
   * Primary Intent: Returns the exact frontend dashboard data shape while preserving widget-level backend ownership.
   * Edge Cases: Empty datasets are represented by empty arrays and zero-valued aggregates from their authoritative queries.
   * Side-Effects: None; this is read-only.
   * AI-Note: Preserve the frontend field names and never move widget SQL into this composition service.
   */
  /**
   * Primary Intent: Executes the findDashboard use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findDashboard(query: SuperadminDashboardWidgetQuery = {}): Promise<SuperadminDashboardApiResponseDto> {
    const [metrics, revenue, growth, recentOnboards, revenueByTier, revenueByGeography] = await Promise.all([
      this.kpis.getDashboardKpis(query),
      this.revenueChart.getRevenueChart(query),
      this.growthChart.getGrowthChart(query),
      this.recentOnboards.getRecentOnboards(),
      this.revenueByTier.getRevenueByTier(),
      this.revenueByGeography.getRevenueByGeography(),
    ]);
    return { metrics: { ...metrics, recentOnboards, revenueByTier, revenueByGeography }, revenue, growth };
  }
}

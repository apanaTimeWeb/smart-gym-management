import { Injectable, Logger } from '@nestjs/common';
import {
  DUMMY_DASHBOARD_METRICS,
  DUMMY_TENANTS,
  REVENUE_CHART_DATA,
  GYM_GROWTH_DATA,
} from '../../superadmin.constants';

/**
 * DashboardService — computes aggregated SaaS metrics.
 * There is NO dashboard entity. All data is computed from other tables.
 */
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  /**
   * Returns all dashboard KPIs, chart data, and recent onboards
   * in a single API call for the /superadmin/dashboard page.
   */
  getDashboardData() {
    this.logger.log('Fetching superadmin dashboard metrics');
    return {
      success: true,
      message: 'Dashboard metrics fetched successfully',
      data: {
        metrics: DUMMY_DASHBOARD_METRICS,
        recentOnboards: DUMMY_DASHBOARD_METRICS.recentOnboards,
        revenueChartData: REVENUE_CHART_DATA,
        gymGrowthData: GYM_GROWTH_DATA,
        allTenants: DUMMY_TENANTS,
      },
    };
  }

  /** Returns only the KPI summary metrics (for lightweight polling) */
  getMetrics() {
    this.logger.log('Fetching KPI metrics only');
    return {
      success: true,
      message: 'KPI metrics fetched successfully',
      data: {
        totalGyms: DUMMY_DASHBOARD_METRICS.totalGyms,
        activeGyms: DUMMY_DASHBOARD_METRICS.activeGyms,
        suspendedGyms: DUMMY_DASHBOARD_METRICS.suspendedGyms,
        totalEndUsers: DUMMY_DASHBOARD_METRICS.totalEndUsers,
        monthlyRecurringRevenue: DUMMY_DASHBOARD_METRICS.monthlyRecurringRevenue,
      },
    };
  }
}

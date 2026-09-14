import { http, HttpResponse, delay } from 'msw';
import type { AnalyticsApiData, RevenueMetrics, MonthlyAnalyticsDataPoint, PlanRevenueBreakdown } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/analytics';

const MOCK_REVENUE_METRICS: RevenueMetrics = {
  mrr: 150000,
  arr: 1800000,
  churnRate: 2.5,
  ltv: 50000,
  cac: 2000,
  activeTenants: 125,
  arpu: 1200,
  mrrDeltaPercent: 5.2,
  arrDeltaPercent: 12.5,
  churnDeltaPercent: -0.5,
};

const MOCK_MONTHLY_DATA: MonthlyAnalyticsDataPoint[] = [
  { month: 'Jan', mrr: 100000, tenantCount: 100, churnedCount: 2 },
  { month: 'Feb', mrr: 110000, tenantCount: 105, churnedCount: 1 },
  { month: 'Mar', mrr: 125000, tenantCount: 112, churnedCount: 3 },
  { month: 'Apr', mrr: 135000, tenantCount: 118, churnedCount: 2 },
  { month: 'May', mrr: 150000, tenantCount: 125, churnedCount: 1 },
];

const MOCK_PLAN_REVENUE: PlanRevenueBreakdown[] = [
  { plan: 'Basic', revenue: 30000, tenantCount: 50 },
  { plan: 'Pro', revenue: 70000, tenantCount: 50 },
  { plan: 'Enterprise', revenue: 50000, tenantCount: 25 },
];

const MOCK_SUPERADMIN_ANALYTICS: AnalyticsApiData = {
  metrics: MOCK_REVENUE_METRICS,
  monthly: MOCK_MONTHLY_DATA,
  planRevenue: MOCK_PLAN_REVENUE,
};

export const superadminAnalyticsHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<AnalyticsApiData>>({
      success: true,
      message: 'Success',
      data: MOCK_SUPERADMIN_ANALYTICS,
    });
  }),
];

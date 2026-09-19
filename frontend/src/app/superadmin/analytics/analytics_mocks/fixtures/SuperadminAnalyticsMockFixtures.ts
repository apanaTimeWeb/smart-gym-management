// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { AnalyticsApiData, RevenueMetrics, MonthlyAnalyticsDataPoint, PlanRevenueBreakdown } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsTypes';
export const MOCK_REVENUE_METRICS: RevenueMetrics = {
    mrr: 150000,
    arr: 1800000,
    cancellationRate: 2.5,
    ltv: 50000,
    cac: 2000,
    activeTenants: 125,
    arpu: 1200,
    mrrDeltaPercent: 5.2,
    arrDeltaPercent: 12.5,
    cancellationDeltaPercent: -0.5,
};
export const MOCK_MONTHLY_DATA: MonthlyAnalyticsDataPoint[] = [
    { month: 'Jan', mrr: 100000, tenantCount: 100, cancelledCount: 2 },
    { month: 'Feb', mrr: 110000, tenantCount: 105, cancelledCount: 1 },
    { month: 'Mar', mrr: 125000, tenantCount: 112, cancelledCount: 3 },
    { month: 'Apr', mrr: 135000, tenantCount: 118, cancelledCount: 2 },
    { month: 'May', mrr: 150000, tenantCount: 125, cancelledCount: 1 },
];
export const MOCK_PLAN_REVENUE: PlanRevenueBreakdown[] = [
    { plan: 'Basic', revenue: 30000, tenantCount: 50 },
    { plan: 'Pro', revenue: 70000, tenantCount: 50 },
    { plan: 'Enterprise', revenue: 50000, tenantCount: 25 },
];
export const MOCK_SUPERADMIN_ANALYTICS: AnalyticsApiData = {
    metrics: MOCK_REVENUE_METRICS,
    monthly: MOCK_MONTHLY_DATA,
    planRevenue: MOCK_PLAN_REVENUE,
};

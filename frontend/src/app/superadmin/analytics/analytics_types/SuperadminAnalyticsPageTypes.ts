// RESPONSIBILITY: Defines UI query state types for the Superadmin Analytics page.
import type { MonthlyAnalyticsDataPoint, RevenueMetrics } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsTypes';

export type SuperadminAnalyticsTimeRange = 'this_week' | 'this_month' | 'this_year' | 'custom';

export interface SuperadminAnalyticsPageReturn {
  metrics: RevenueMetrics | null;
  monthlyData: MonthlyAnalyticsDataPoint[];
  isPending: boolean;
  isError: boolean;
  error: string | null;
  timeRange: SuperadminAnalyticsTimeRange;
  customStart: string;
  customEnd: string;
}

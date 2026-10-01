// RESPONSIBILITY: Defines UI query state types for the Superadmin Analytics page.
import type { MonthlyAnalyticsDataPoint, RevenueMetrics } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';

import { SUPERADMIN_ANALYTICS_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_constants/SuperadminAnalyticsDateRangeConstants';

export type SuperadminAnalyticsTimeRange = typeof SUPERADMIN_ANALYTICS_TIME_RANGES[number];

export interface SuperadminAnalyticsPageReturn {
  metrics: RevenueMetrics | null;
  monthlyData: MonthlyAnalyticsDataPoint[];
  isPending: boolean;
  isError: boolean;
  error: string | null;
  timeRange: SuperadminAnalyticsTimeRange;
  customStart: string;
  customEnd: string;
  refetch: () => void;
}

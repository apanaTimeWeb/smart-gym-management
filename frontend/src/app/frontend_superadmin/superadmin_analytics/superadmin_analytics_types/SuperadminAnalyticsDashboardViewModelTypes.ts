import type { ApexAxisChartSeries, ApexOptions } from 'apexcharts';

import type { SuperadminAnalyticsKpiCardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsKpiViewModelTypes';

import {
  SUPERADMIN_ANALYTICS_SECONDARY_METRIC_ICONS,
  SUPERADMIN_ANALYTICS_SECONDARY_METRIC_KEYS,
  SUPERADMIN_ANALYTICS_SECONDARY_METRIC_TONES,
} from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_constants/SuperadminAnalyticsKpiConstants';

export interface SuperadminAnalyticsChartViewModel {
  mrrAreaOptions: ApexOptions;
  mrrAreaSeries: ApexAxisChartSeries;
  tenantBarOptions: ApexOptions;
  tenantBarSeries: ApexAxisChartSeries;
}

export interface SuperadminAnalyticsSecondaryMetricViewModel {
  key: (typeof SUPERADMIN_ANALYTICS_SECONDARY_METRIC_KEYS)[number];
  labelKey: string;
  helperKey: string;
  value: string;
  helperValue?: string;
  tone: (typeof SUPERADMIN_ANALYTICS_SECONDARY_METRIC_TONES)[number];
  icon: (typeof SUPERADMIN_ANALYTICS_SECONDARY_METRIC_ICONS)[number];
}

export interface SuperadminAnalyticsDashboardViewModel {
  kpiCards: SuperadminAnalyticsKpiCardViewModel[];
  charts: SuperadminAnalyticsChartViewModel;
  secondaryMetrics: SuperadminAnalyticsSecondaryMetricViewModel[];
}

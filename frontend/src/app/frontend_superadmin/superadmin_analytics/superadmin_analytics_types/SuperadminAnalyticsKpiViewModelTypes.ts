import {
  SUPERADMIN_ANALYTICS_KPI_ICON_BACKGROUND_CLASSES,
  SUPERADMIN_ANALYTICS_KPI_ICON_TEXT_CLASSES,
} from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_constants/SuperadminAnalyticsKpiConstants';

import type { LucideIcon } from 'lucide-react';



export type SuperadminAnalyticsKpiIcon = LucideIcon;
export type SuperadminAnalyticsKpiIconBackgroundClass = (typeof SUPERADMIN_ANALYTICS_KPI_ICON_BACKGROUND_CLASSES)[number];
export type SuperadminAnalyticsKpiIconTextClass = (typeof SUPERADMIN_ANALYTICS_KPI_ICON_TEXT_CLASSES)[number];

export interface SuperadminAnalyticsKpiCardViewModel {
  label: string;
  value: string;
  delta?: string;
  deltaUp: boolean;
  icon: SuperadminAnalyticsKpiIcon;
  iconBgClass: SuperadminAnalyticsKpiIconBackgroundClass;
  iconColorClass: SuperadminAnalyticsKpiIconTextClass;
}

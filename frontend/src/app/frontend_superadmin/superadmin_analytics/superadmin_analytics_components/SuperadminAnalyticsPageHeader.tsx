// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsPageHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the analytics page heading and feature-owned date-range control.
import { useTranslations } from 'next-intl';

import { SuperadminAnalyticsDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsDateFilterDropdown';



/**
 * @description Renders only analytics page-level title and date-range controls.
 * @dependencies Consumes the feature-owned analytics translation namespace and date filter component.
 * @edge-case Keeps controls stacked on mobile to avoid overflow.
 */
export function SuperadminAnalyticsPageHeader() {
  const t = useTranslations('superadmin_analytics');
  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="superadmin-page-title text-primary">{t('ui.revenue_analytics_763da6e')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.global_saas_metrics_and_financial_intelligence_34f7b50')}</p>
      </div>
      <SuperadminAnalyticsDateFilterDropdown />
    </header>
  );
}

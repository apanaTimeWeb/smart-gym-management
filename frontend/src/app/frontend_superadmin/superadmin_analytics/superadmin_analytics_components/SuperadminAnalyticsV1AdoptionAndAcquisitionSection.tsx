'use client';
// RESPONSIBILITY: Renders and composes SuperadminAnalyticsV1AdoptionAndAcquisitionSection for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { useTranslations, useLocale } from 'next-intl';

import Panel from '@/components/ui/Panel';

import { SuperadminAnalyticsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatters';

import type { SuperadminAnalyticsV1SectionProps } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsV1Types';



/**
 * @description Renders the Superadmin analytics V1 Feature adoption, Acquisition source comparison view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAnalyticsV1AdoptionAndAcquisitionSection({ data }: SuperadminAnalyticsV1SectionProps) {
  const t = useTranslations('superadmin_analytics');
    const locale = useLocale();

    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title={t('ui.feature_adoption_f5941dd')} description={t('ui.available_vs_enabled_vs_actually_used_by_tenants_d6d2afd')}>
    <div className="overflow-x-auto">
      <table className="w-full text-sm superadmin-mobile-card-table">
        <thead>
          <tr className="border-b border-border text-xs uppercase text-secondary" data-testid="superadmin_analytics-superadmin-analytics-v1-adoption-and-acquisition-section-acquisition-section-action-1">
            <th className="px-3 py-3 text-left">
              
              {t('ui.feature_20a09b8')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.available_0afde8a')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.enabled_4ea38f2')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.used_23ccf15')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.adoption.map((a) => <tr key={a.feature} className="border-b border-border" data-testid={`superadmin_analytics-analytics-v1-adoption-and-acquisition-section-item-a-feature-2-${String(a.feature)}`}>
            <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_feature')}>
              {a.feature}
            </td>
            <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_available')}>
              {formatNumber(a.available)}
            </td>
            <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_enabled')}>
              {formatNumber(a.active)}
            </td>
            <td className="px-3 py-3 text-primary" data-mobile-label={t('ui.mobile_used')}>
              {formatNumber(a.used)}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </Panel>
  <Panel title={t('ui.acquisition_source_comparison_7fa72f5')} description={t('ui.compare_source_quality_by_volume_income_and_chur_4c19c9f')}>
    <div className="space-y-3">
      {data.sources.map((s) => <div key={s.source} className="rounded-lg border border-border p-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-primary">
            {s.source}
          </span>
          <span className="text-sm text-primary">
            {formatNumber(s.gyms)}
            
            {t('ui.superadmin_gyms_2809861')}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-secondary">
          <span>
            {SuperadminAnalyticsFormatCurrency(s.monthlyIncome, data.metrics.currency || 'INR', locale)}
          </span>
          <span>
            {formatPercent1dp(s.churn)}
            
            {t('ui.churn_fe07db7')}
          </span>
        </div>
      </div>)}
    </div>
  </Panel>
    </div>;
}


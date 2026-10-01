'use client';
// RESPONSIBILITY: Renders the Superadmin analytics V1 AnalyticsRetentionSummary summary cards.
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatters';


import { SuperadminAnalyticsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatCurrency';

import type { SuperadminAnalyticsV1SectionProps } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsV1Types';

/**
 * @description Renders the Superadmin analytics V1 AnalyticsRetentionSummary summary cards.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAnalyticsV1RetentionSummaryCards({ data }: SuperadminAnalyticsV1SectionProps) {
  const t = useTranslations('superadmin_analytics');
    const locale = useLocale();

    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label={t('ui.income_kept_from_existing_gyms_2bb2418')} value={formatPercent1dp(data.metrics.existingIncomeRetained)} helper={t('ui.kpi_helper_existing_gym_income_v3')} tone="success"/>
  <MetricCard label={t('ui.income_kept_without_upgrades_0ed7fc6')} value={formatPercent1dp(data.metrics.grossIncomeRetained)} helper={t('ui.kpi_helper_protected_base_income_v3')}/>
  <MetricCard label={t('ui.gym_retention_db81fb1')} value={formatPercent1dp(data.metrics.gymRetention)} helper={t('ui.kpi_helper_gym_survival_v3')} tone="success"/>
  <MetricCard label={t('ui.revenue_lost_e66d6b5')} value={formatPercent1dp(data.metrics.revenueLost)} helper={t('ui.kpi_helper_income_lost_v3')} tone="danger"/>
  <MetricCard label={t('ui.customer_churn_c5ef269')} value={formatPercent1dp(data.metrics.customerChurn)} helper={t('ui.kpi_helper_gyms_leaving_v3')} tone="warning"/>
    </div>;
}

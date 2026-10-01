'use client';
// RESPONSIBILITY: Renders the Superadmin dashboard V1 DashboardRetentionSummary summary cards.
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardFormatters';


import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardFormatCurrency';

import type { SuperadminDashboardV1SectionProps } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardV1Types';

/**
 * @description Renders the Superadmin dashboard V1 DashboardRetentionSummary summary cards.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminDashboardV1RetentionSummaryCards({ data }: SuperadminDashboardV1SectionProps) {
  const t = useTranslations('superadmin_dashboard');
    const locale = useLocale();

    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label={t('ui.income_kept_from_existing_gyms_9852c05')} value={formatPercent1dp(data.existingIncomeRetained)} helper={t('ui.kpi_helper_existing_gym_income_retained_v3')} tone="success"/>
  <MetricCard label={t('ui.gym_retention_4d0d6ff')} value={formatPercent1dp(data.gymRetention)} helper={t('ui.kpi_helper_gyms_still_active_v3')} tone="success"/>
  <MetricCard label={t('ui.revenue_lost_a0055be')} value={formatPercent1dp(data.revenueLostPercent)} helper={t('ui.kpi_helper_share_of_opening_income_v3')} tone="danger"/>
  <MetricCard label={t('ui.customer_churn_ca890ee')} value={formatPercent1dp(data.customerChurn)} helper={t('ui.kpi_helper_gyms_that_left_v3')} tone="warning"/>
  <MetricCard label={t('ui.closing_monthly_income_535dc71')} value={SuperadminDashboardFormatCurrency(data.endingIncome, data.currency || 'INR', locale)} helper={t('ui.kpi_helper_current_recurring_income_v3')}/>
    </div>;
}

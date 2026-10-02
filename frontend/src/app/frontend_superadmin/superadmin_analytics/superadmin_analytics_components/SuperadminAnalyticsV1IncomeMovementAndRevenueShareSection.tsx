'use client';
// RESPONSIBILITY: Renders and composes SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import { useTranslations, useLocale } from 'next-intl';

import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';

import { SuperadminAnalyticsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_utils/SuperadminAnalyticsFormatters';

import type { SuperadminAnalyticsV1SectionProps } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsV1Types';



/**
 * @description Renders the Superadmin analytics V1 Income movement, Revenue share concentration view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection({ data }: SuperadminAnalyticsV1SectionProps) {
  const t = useTranslations('superadmin_analytics');
    const locale = useLocale();

    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title={t('ui.income_movement_b220cd3')} description={t('ui.where_monthly_income_moved_during_the_period_6702573')}>
    <div className="h-72">
      <ApexBarChart categories={data.movement.map((x) => x.label)} series={[{ name: t('ui.monthly_income_change'), data: data.movement.map((x) => x.value) }]} horizontal valueFormatter={(v) => SuperadminAnalyticsFormatCurrency(v, data.metrics.currency || 'INR', locale)}/>
    </div>
  </Panel>
  <Panel title={t('ui.revenue_share_concentration_e9f05f7')} description={t('ui.shows_how_dependent_the_platform_is_on_a_few_gro_bf1c9cd')}>
    <div className="h-72">
      <ApexBarChart categories={data.concentration.map((x) => x.group)} series={[{ name: t('ui.revenue_share'), data: data.concentration.map((x) => x.share) }]} valueFormatter={(v) => `${formatPercent1dp(v)}`}/>
    </div>
  </Panel>
    </div>;
}

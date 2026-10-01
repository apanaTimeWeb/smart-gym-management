'use client';
// RESPONSIBILITY: Renders the Superadmin analytics V1 Cohort retention view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import type { SuperadminAnalyticsV1SectionProps } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsV1Types';

/**
 * @description Renders the Superadmin analytics V1 Cohort retention view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAnalyticsV1CohortRetentionTable({ data }: SuperadminAnalyticsV1SectionProps) {
  const t = useTranslations('superadmin_analytics');
    return <Panel title={t('ui.cohort_retention_65cb9db')} description={t('ui.each_row_follows_gyms_that_started_in_the_same_m_4c17d57')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-xs uppercase text-secondary" data-testid="superadmin_analytics-analytics-v1-cohort-retention-table-action-1">
          <th className="px-3 py-3 text-left">
            
            {t('ui.signup_month_3fc178b')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.month_1_4741efc')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.month_2_147a08b')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.month_3_a9ec160')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.month_6_ced5dde')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.month_12_48839a0')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.cohort.map((c) => <tr key={c.month} className="border-b border-border" data-testid={`superadmin_analytics-analytics-v1-cohort-retention-table-item-c-month-2-${String(c.month)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_signup_month')}>
            {c.month}
          </td>
          {[c.m1, c.m2, c.m3, c.m6, c.m12].map((v, i) => <td key={`${c.month}-${i}`} className={`px-3 py-3 text-center ${v >= 90 ? 'text-success' : v >= 80 ? 'text-warning' : 'text-danger'}`} data-mobile-label={t('ui.mobile_month_1')}>
            {v}
            %
          </td>)}
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}

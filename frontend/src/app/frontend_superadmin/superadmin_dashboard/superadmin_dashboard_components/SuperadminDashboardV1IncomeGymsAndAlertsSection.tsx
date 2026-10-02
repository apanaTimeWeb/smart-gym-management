'use client';
import { Tooltip } from '@/components/ui/Tooltip';
// RESPONSIBILITY: Renders and composes SuperadminDashboardV1IncomeGymsAndAlertsSection for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import { ArrowDown, ArrowUp, CircleAlert } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';

import { SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardFormatters';

import type { SuperadminDashboardV1SectionProps } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardV1Types';



/**
 * @description Renders the Superadmin dashboard V1 Why monthly income changed, Top & at-risk gyms, Critical platform alerts view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminDashboardV1IncomeGymsAndAlertsSection({ data }: SuperadminDashboardV1SectionProps) {
  const t = useTranslations('superadmin_dashboard');
    const locale = useLocale();

    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
  <Panel title={t('ui.why_monthly_income_changed_2bb9f09')} description={t('ui.opening_income_plus_gains_and_losses_for_this_pe_f160b7a')}>
    <div className="h-72">
      <ApexBarChart categories={data.waterfall.map((item) => item.label)} series={[{ name: t('ui.monthly_income'), data: data.waterfall.map((item) => item.value) }]} valueFormatter={(value) => SuperadminDashboardFormatCurrency(value, data.currency || 'INR', locale)} horizontal/>
    </div>
  </Panel>
  <Panel title={t('ui.top_at_risk_superadmin_gyms_dc32f55')} description={t('ui.use_this_to_see_high_value_growth_and_tenants_ne_688bcd9')}>
    <div className="overflow-x-auto">
      <table className="w-full text-sm superadmin-mobile-card-table">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_dashboard-superadmin-dashboard-v1-income-gyms-and-alerts-section-alerts-section-action-1">
            <th className="px-3 py-3">
              
              {t('ui.gym_a6afd38')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.income_d0641f2')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.growth_d5cd63b')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.health_68dd8b4')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((row) => <tr key={row.name} className="border-b border-border" data-testid={`superadmin_dashboard-dashboard-v1-income-gyms-and-alerts-section-item-row-name-2-${String(row.name)}`}>
            <td className="px-3 py-3" data-mobile-label={t('ui.mobile_gym')}>
              <Tooltip content={row.name}>
                <div className="max-w-48 truncate font-medium text-primary">
                  {row.name}
                </div>
              </Tooltip>
              <div className="text-xs text-secondary">
                {row.plan}
              </div>
            </td>
            <td className="px-3 py-3 text-primary" data-mobile-label={t('ui.mobile_income')}>
              {SuperadminDashboardFormatCurrency(row.income, data.currency || 'INR', locale)}
            </td>
            <td className={row.growth >= 0 ? 'px-3 py-3 text-success' : 'px-3 py-3 text-danger'} data-mobile-label={t('ui.mobile_growth')}>
              {row.growth >= 0 ? <ArrowUp size={18} className="mr-1 inline"/> : <ArrowDown size={18} className="mr-1 inline"/>}
              {formatPercent1dp(row.growth)}
            </td>
            <td className="px-3 py-3 text-primary" data-mobile-label={t('ui.mobile_health')}>
              {formatNumber(row.health)}
              {t('ui.100_36d3d20a')}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </Panel>
  <Panel title={t('ui.critical_platform_alerts_ae5bed0')} description={t('ui.a_single_action_list_for_issues_that_otherwise_l_e4eecd4')}>
    <div className="space-y-3">
      {data.alerts.map((alert) => <div key={alert.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
        <CircleAlert size={18} className={`mt-0.5 ${SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES[alert.level as keyof typeof SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES].icon}`}/>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES[alert.level as keyof typeof SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES].badge}`}>
              {alert.level}
            </span>
            <Tooltip content={alert.title}>
              <p className="truncate font-medium text-primary">
                {alert.title}
              </p>
            </Tooltip>
          </div>
          <p className="mt-1 text-xs text-secondary">
            {alert.detail}
          </p>
        </div>
        <span className="ml-auto text-sm font-semibold text-primary">
          {formatNumber(alert.count)}
        </span>
      </div>)}
    </div>
  </Panel>
    </div>;
}

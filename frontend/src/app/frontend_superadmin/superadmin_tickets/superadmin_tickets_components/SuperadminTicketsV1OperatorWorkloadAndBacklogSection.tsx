'use client';
// RESPONSIBILITY: Renders the Superadmin tickets V1 Operator workload, Backlog age view.
import { useTranslations } from 'next-intl';

import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_utils/SuperadminTicketsFormatters';


import type { SuperadminTicketsV1SectionProps } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsV1Types';

/**
 * @description Renders the Superadmin tickets V1 Operator workload, Backlog age view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminTicketsV1OperatorWorkloadAndBacklogSection({ data }: SuperadminTicketsV1SectionProps) {
  const t = useTranslations('superadmin_tickets');
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title={t('ui.operator_workload_ed91300')} description={t('ui.open_work_and_overdue_service_targets_by_support_118d47c')}>
    <div className="overflow-x-auto">
      <table className="w-full text-sm superadmin-mobile-card-table">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_tickets-tickets-v1-operator-workload-and-backlog-section-action-1">
            <th className="px-3 py-3">
              
              {t('ui.operator_0eef9ff')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.open_2e4a3b6')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.urgent_6c931ba')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.over_target_6659676')}
            </th>
            <th className="px-3 py-3">
              
              {t('ui.avg_hours_ae4c4d3')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.agents.map((a) => <tr key={a.name} className="border-b border-border" data-testid={`superadmin_tickets-tickets-v1-operator-workload-and-backlog-section-item-a-name-2-${String(a.name)}`}>
            <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_operator')}>
              {a.name}
            </td>
            <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_open')}>
              {a.open}
            </td>
            <td className="px-3 py-3 text-warning" data-mobile-label={t('ui.mobile_urgent')}>
              {a.urgent}
            </td>
            <td className="px-3 py-3 text-danger" data-mobile-label={t('ui.mobile_over_target')}>
              {a.overTarget}
            </td>
            <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_avg_hours')}>
              {a.averageHours}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </Panel>
  <Panel title={t('ui.backlog_age_e2f584b')} description={t('ui.older_tickets_need_faster_attention_f6898f6')}>
    <div className="h-64">
      <ApexBarChart categories={data.aging.map((x) => x.bucket)} series={[{ name: t('ui.chart_tickets'), data: data.aging.map((x) => x.count) }]} valueFormatter={(v) => formatNumber(v)}/>
    </div>
  </Panel>
    </div>;
}

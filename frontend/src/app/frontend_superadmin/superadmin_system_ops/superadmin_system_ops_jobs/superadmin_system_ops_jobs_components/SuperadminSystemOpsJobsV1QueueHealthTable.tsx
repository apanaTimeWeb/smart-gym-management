'use client';
// RESPONSIBILITY: Renders the Superadmin jobs V1 Queue health view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import type { SuperadminJobsV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsV1Types';

/**
 * @description Renders the Superadmin jobs V1 Queue health view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsJobsV1QueueHealthTable({ data }: SuperadminJobsV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    return <Panel title={t('ui.queue_health_39d3b3a')} description={t('ui.see_where_background_work_is_building_up_c07c662')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_system_ops_jobs-system-ops-jobs-v1-queue-health-table-action-1">
          <th className="px-3 py-3">
            
            {t('ui.queue_9cd7e3f')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.waiting_fca0165')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.running_aa078e6')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.failed_0875149')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.dead_letter_e8cca6f')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.queues.map((q) => <tr key={q.name} className="border-b border-border" data-testid={`superadmin_system_ops_jobs-system-ops-jobs-v1-queue-health-table-item-q-name-2-${String(q.name)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_queue')}>
            {q.name}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_waiting')}>
            {q.waiting}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_running')}>
            {q.running}
          </td>
          <td className="px-3 py-3 text-danger" data-mobile-label={t('ui.mobile_failed')}>
            {q.failed24h}
          </td>
          <td className="px-3 py-3 text-warning" data-mobile-label={t('ui.mobile_dead_letter')}>
            {q.deadLetter}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}

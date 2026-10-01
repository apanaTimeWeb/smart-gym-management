'use client';
// RESPONSIBILITY: Renders the Superadmin jobs V1 JobsQueueSummary summary cards.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatNumber, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_utils/SuperadminSystemOpsJobsFormatters';


import type { SuperadminJobsV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsV1Types';

/**
 * @description Renders the Superadmin jobs V1 JobsQueueSummary summary cards.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsJobsV1QueueSummaryCards({ data }: SuperadminJobsV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label={t('ui.waiting_fca0165')} value={formatNumber(data.summary.waiting)} helper={t('ui.kpi_helper_queued_jobs_v3')}/>
  <MetricCard label={t('ui.running_aa078e6')} value={formatNumber(data.summary.running)} helper={t('ui.kpi_helper_in_progress_v3')} tone="info"/>
  <MetricCard label={t('ui.failed_today_fce49ec')} value={formatNumber(data.summary.failed24h)} helper={t('ui.kpi_helper_last_24_hours_v3')} tone="danger"/>
  <MetricCard label={t('ui.stuck_jobs_d202210')} value={formatNumber(data.summary.deadLetter)} helper={t('ui.kpi_helper_needs_manual_review_v3')} tone="warning"/>
  <MetricCard label={t('ui.oldest_waiting_4a9eb98')} value={`${data.summary.oldestWaitingMinutes} min`} helper={t('ui.kpi_helper_queue_delay_v3')} tone="warning"/>
    </div>;
}

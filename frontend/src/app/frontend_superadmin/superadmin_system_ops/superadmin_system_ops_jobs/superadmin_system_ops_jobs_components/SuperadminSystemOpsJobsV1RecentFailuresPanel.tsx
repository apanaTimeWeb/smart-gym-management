'use client';// RESPONSIBILITY: Renders the Superadmin jobs V1 Recent job failures view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';

import { formatNumber, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_utils/SuperadminSystemOpsJobsFormatters';

import type { SuperadminJobsV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsV1Types';



/**
 * @description Renders the Superadmin jobs V1 Recent job failures view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsJobsV1RecentFailuresPanel({ data }: SuperadminJobsV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    return <Panel title={t('ui.recent_job_failures_54c6a58')} description={t('ui.actionable_failures_with_tenant_context_and_reasons_5b3bf8b')}>
  <div className="space-y-3">
    {data.recentFailures.map((f) => <div key={`${f.job}-${f.time}`} className="rounded-lg border border-border p-3">
      <div className="flex justify-between gap-3">
        <Tooltip content={f.job}><span className="truncate font-medium text-primary">{f.job}</span></Tooltip>
        <span className="text-xs text-secondary">
          {formatDateTime(f.time)}
        </span>
      </div>
      <p className="mt-1 text-xs text-secondary">
        {f.tenant}
      </p>
      <p className="mt-1 text-xs text-danger">
        {f.reason}
      </p>
    </div>)}
  </div>
    </Panel>;
}

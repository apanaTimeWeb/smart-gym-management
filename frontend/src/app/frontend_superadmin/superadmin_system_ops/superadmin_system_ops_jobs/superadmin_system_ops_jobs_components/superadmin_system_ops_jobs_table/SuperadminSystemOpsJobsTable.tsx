'use client';
import { formatDuration, formatDateTime } from '@/lib/formatters';
import Tooltip from '@/components/ui/Tooltip';
import { useTranslations } from 'next-intl';
import { Trash2, RefreshCw, XCircle } from 'lucide-react';

// RESPONSIBILITY: Renders and composes SuperadminSystemOpsJobsTable for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import SuperadminSystemOpsJobsEmptyState from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_components/superadmin_system_ops_jobs_empty_state/SuperadminSystemOpsJobsEmptyState';
import { SUPERADMIN_JOBS_STATUS_CODES, SUPERADMIN_JOBS_STATUS_STYLES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsConstants';

import type { SuperadminJobsTableProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTableTypes';
import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';



/**
 * @description Renders the background-job table with selection, inspection, retry, cancel, and delete actions.
 * @dependencies Consumes typed job data and callbacks from the feature page orchestration without owning server state.
 * @edge-case Empty and filtered-empty states delegate to the entity-specific empty-state component while keyboard row activation mirrors pointer activation.
 */
export default function SuperadminSystemOpsJobsTable({ jobs, allJobsFiltered, selectedJobIds, toggleSelection, toggleAll, onInspect, onRetry, onCancel, onDelete, }: SuperadminJobsTableProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    if (jobs.length === 0) {
        return <SuperadminSystemOpsJobsEmptyState isFiltered={allJobsFiltered}/>;
    }
    return (<div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-full superadmin-mobile-card-table">
        <thead>
          <tr className="bg-primary-subtle border-b border-border text-sm" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-table-jobs-table-action-1">
            <th className="p-4 w-12 text-center">
              <input  type="checkbox" aria-label={t('ui.select_all_visible_jobs_33ef689')} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded border-border text-primary cursor-pointer w-4 h-4 min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out" checked={selectedJobIds.size === jobs.length && jobs.length> 0} onChange={() => toggleAll(jobs.map((job) => job.id))} data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-table-jobs-table-select-all"/>
            </th>
            <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.job_id_0e9172b')}</th>
            <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.queue_9cd7e3f')}</th>
            <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.task_error_1fb40b6')}</th>
            <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.status_b5bd428')}</th>
            <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider">{t('ui.timing_bcdb348')}</th>
            <th className="p-4 font-semibold text-secondary text-xs uppercase tracking-wider text-right">{t('ui.actions_0290a3d')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {jobs.map((job, index) => {
            const jobExt = job as BackgroundJob & {
                durationMs?: number;
                finishedAt?: string;
            };
            const statusKey = job.status as keyof typeof SUPERADMIN_JOBS_STATUS_STYLES;
            return (<tr key={job.id} tabIndex={0} aria-label={t('ui.a11y_inspect_job', { id: job.id })} data-testid={`superadmin_system_ops_jobs-table-${job.id}-inspect`} onClick={() => onInspect(job)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onInspect(job); } }} className="hover:bg-card motion-safe:transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()} data-testid={`superadmin_system_ops_jobs-superadminjobstable-click-action-${index}`} data-mobile-label={t('ui.mobile_select_all_visible_jobs')}>
                  <input  type="checkbox" aria-label={t('ui.a11y_select_job', { id: job.id })} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded border-border text-primary cursor-pointer w-4 h-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out" checked={selectedJobIds.has(job.id)} onChange={() => toggleSelection(job.id)} data-testid={`superadmin_system_ops_jobs-jobs-table-control-${index}`}/>
                </td>
                <td className="p-4 text-xs font-mono text-secondary" data-mobile-label={t('ui.mobile_job_id')}><Tooltip content={job.id}><span className="block max-w-32 truncate">{job.id}</span></Tooltip></td>
                <td className="p-4 text-sm font-medium text-primary" data-mobile-label={t('ui.mobile_queue')}>{job.queueName}</td>
                <td className="p-4 text-sm max-w-sm" data-mobile-label={t('ui.mobile_task_error')}>
                  <Tooltip content={job.jobName}><div className="font-medium text-primary truncate">{job.jobName}</div></Tooltip>
                  {job.error && (<Tooltip content={job.error}><div className="text-xs text-danger truncate mt-1">{job.error}</div></Tooltip>)}
                </td>
                <td className="p-4" data-mobile-label={t('ui.mobile_status')}>
                  <div className="flex flex-col items-start gap-1">
                    <span data-testid={`superadmin_system_ops_jobs-status-${job.id}`} className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${SUPERADMIN_JOBS_STATUS_STYLES[statusKey]}`}>
                      {job.status}
                    </span>
                    {job.attempts > 1 && (<span className="text-xs text-secondary">{t('ui.attempts_4b7e006')} {job.attempts}</span>)}
                  </div>
                </td>
                <td className="p-4 text-xs text-secondary whitespace-nowrap" data-mobile-label={t('ui.mobile_timing')}>
                  <div>{t('ui.created_a7e5415')} {formatDateTime(job.createdAt)}</div>
                  {jobExt.finishedAt && <div>{t('ui.finished_04c8a88')} {formatDateTime(jobExt.finishedAt)}</div>}
                  <div className="font-mono mt-1 text-primary">{t('ui.duration_973f43d')} {formatDuration(jobExt.durationMs)}</div>
                </td>
                <td className="p-4 text-right" onClick={(e) => e.stopPropagation()} data-testid={`superadmin_system_ops_jobs-superadminjobstable-click-action-2-${index}`} data-mobile-label={t('ui.mobile_actions')}>
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
                    {job.status === SUPERADMIN_JOBS_STATUS_CODES.FAILED && (<button  type="button" onClick={() => onRetry(job.id)} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-success hover:bg-success-bg rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.retry_job_d0ee807')} aria-label={t('ui.a11y_retry_job', { id: job.id })} data-testid={`superadmin_system_ops_jobs-jobs-table-retry-${index}`}>
                        <RefreshCw size={18} strokeWidth={2}/>
                      </button>)}
                    {(job.status === SUPERADMIN_JOBS_STATUS_CODES.ACTIVE || job.status === SUPERADMIN_JOBS_STATUS_CODES.DELAYED) && (<button  type="button" onClick={() => onCancel(job.id)} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-warning hover:bg-warning-bg rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.cancel_job_57545ef')} aria-label={t('ui.a11y_cancel_job', { id: job.id })} data-testid={`superadmin_system_ops_jobs-jobs-table-cancel-${index}`}>
                        <XCircle size={18} strokeWidth={2}/>
                      </button>)}
                    <button  type="button" onClick={() => onDelete(job.id)} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.delete_job_e2ce66b')} aria-label={t('ui.a11y_delete_job', { id: job.id })} data-testid={`superadmin_system_ops_jobs-jobs-table-delete-${index}`}>
                      <Trash2 size={18} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>);
        })}
        </tbody>
      </table>
    </div>);
}


import { SUPERADMIN_JOBS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsConstants';
/**
 * @description Static Jobs filter options owned by the Superadmin Jobs feature. These values are UI configuration, not server records.
 */
export const SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'ui.filter_all_statuses' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.FAILED, labelKey: 'ui.filter_failed' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, labelKey: 'ui.filter_active' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, labelKey: 'ui.filter_completed' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.DELAYED, labelKey: 'ui.filter_delayed' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.CANCELLED, labelKey: 'ui.filter_cancelled' },
] as const;

export const SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'ui.filter_all_queues' },
  { value: 'billing', labelKey: 'ui.queue_billing' },
  { value: 'email', labelKey: 'ui.queue_email' },
  { value: 'webhook', labelKey: 'ui.queue_webhook' },
  { value: 'database', labelKey: 'ui.queue_database' },
] as const;

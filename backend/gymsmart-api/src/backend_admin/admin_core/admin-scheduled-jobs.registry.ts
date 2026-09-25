// RESPONSIBILITY: Master inventory of all scheduled background jobs in the Admin backend.
// FLOW: Scheduled job implementation -> registry -> operational review; current supplied scope has no local scheduler jobs.

export const SCHEDULED_JOBS_REGISTRY = [
  {
    name: 'AdminDataExportRetentionCleanupJob',
    module: 'admin-data-export',
    file: 'src/backend_admin/admin_modules/admin_data-export/data-export_jobs/admin-data-export-retention-cleanup.job.ts',
    schedule: '0 2 * * *',
    description: 'Permanently deletes tenant export artifacts and suspended tenant data after the 90-day grace period.',
    touchesEntities: ['admin_data_export_jobs'],
    failureBehavior: 'Moves failed work to the central DLQ and alerts operations for manual retry.',
    idempotent: true,
  },
] as const;

// RESPONSIBILITY: Master inventory for every distributed scheduled job in the application.
// FLOW: Job implementation -> registry entry -> distributed scheduler/DLQ.
export const SCHEDULED_JOBS_REGISTRY = [
  { name: 'SuperadminBackupHealthRefreshJob', module: 'system-ops/backups', file: 'src/modules/superadmin/system-ops/backups/jobs/superadmin-backup-health-refresh.job.ts', schedule: '*/15 * * * *', description: 'Refreshes backup health state for operational dashboards.', touchesEntities: ['backup_records'], failureBehavior: 'Moves exhausted work to the DLQ and logs the failure.', idempotent: true },
  { name: 'SuperadminJobQueueHealthRefreshJob', module: 'system-ops/jobs', file: 'src/modules/superadmin/system-ops/jobs/jobs-queue-health.service.ts', schedule: '*/5 * * * *', description: 'Refreshes queue-health metrics for operational dashboards.', touchesEntities: ['background_jobs'], failureBehavior: 'Leaves last known health state and records failure.', idempotent: true },
] as const;

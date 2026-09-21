// RESPONSIBILITY: Central inventory for distributed scheduled jobs and their operational contracts.
// FLOW: Job registration -> distributed scheduler -> queue -> worker -> audit/DLQ.
export interface ScheduledJobDefinition {
  name: string;
  queue: string;
  schedule: string;
  timeoutMs: number;
  retries: number;
  dlq: string;
  tenantAware: boolean;
}
export const SCHEDULED_JOBS: readonly ScheduledJobDefinition[] = [
  { name: 'backups.retention.cleanup', queue: 'superadmin.backups', schedule: '0 2 * * *', timeoutMs: 300000, retries: 3, dlq: 'superadmin.backups.dlq', tenantAware: true },
  { name: 'audit.retention.cleanup', queue: 'superadmin.audit', schedule: '0 3 * * 0', timeoutMs: 300000, retries: 3, dlq: 'superadmin.audit.dlq', tenantAware: false },
];

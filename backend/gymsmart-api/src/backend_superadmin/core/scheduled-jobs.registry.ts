// RESPONSIBILITY: Authoritative metadata for every distributed scheduled job.
// FLOW: Registry metadata -> scheduler -> Redis lease -> feature-owned handler.
export const SCHEDULED_JOBS_REGISTRY = [
  { name: 'SUPERADMIN.TENANT.OFFBOARDING_PURGE', module: 'export-data', file: 'modules/backend_superadmin/export-data/services/export-data-retention.service.ts', schedule: '0 2 * * *', description: 'Permanently purges tenant databases and export artifacts after the 90-day retention window.', touchesEntities: ['tenants', 'tenant_admin_accounts', 'superadmin_export_jobs'], failureBehavior: 'CRITICAL — failed purge remains soft-deleted and is retried on the next distributed run.', idempotent: true, cadence: 'DAILY', lockKey: 'superadmin-tenant-offboarding', lockSeconds: 3600 },
] as const;

export type ScheduledJobName = (typeof SCHEDULED_JOBS_REGISTRY)[number]['name'];

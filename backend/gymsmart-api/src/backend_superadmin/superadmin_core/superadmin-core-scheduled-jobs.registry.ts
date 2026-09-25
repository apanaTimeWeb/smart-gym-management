// RESPONSIBILITY: Authoritative metadata for every distributed scheduled job.
// FLOW: Registry metadata -> scheduler -> Redis lease -> feature-owned handler.
export const SCHEDULED_JOBS_REGISTRY = [
  { name: 'SUPERADMIN.TENANT.OFFBOARDING_PURGE', module: 'export-data', file: 'superadmin_modules/export-data/export-data_services/superadmin-export-data-retention.service.ts', schedule: '0 2 * * *', description: 'Permanently purges tenant databases and export artifacts after the 90-day retention window.', touchesEntities: ['tenants', 'tenant_admin_accounts', 'superadmin_export_jobs'], failureBehavior: 'CRITICAL — failed purge remains soft-deleted and is retried on the next distributed run.', idempotent: true, cadence: 'DAILY', lockKey: 'superadmin-tenant-offboarding', lockSeconds: 3600 },
] as const;

/**
 * Primary Intent: Defines ScheduledJobName as the type-level contract for superadmin-core-scheduled-jobs.registry.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export type ScheduledJobName = (typeof SCHEDULED_JOBS_REGISTRY)[number]['name'];

// RESPONSIBILITY: Feature-owned visual status mapping for schema migration records.
import type { MigrationLog } from '@/app/superadmin/system-ops/migrations/migrations_types/SuperadminMigrationsTypes';
export const SUPERADMIN_MIGRATION_STATUS_STYLES: Record<MigrationLog['status'], string> = {
  COMPLETED: 'bg-success-bg text-success', FAILED: 'bg-danger-bg text-danger', PENDING: 'bg-warning-bg text-warning', IN_PROGRESS: 'bg-primary-subtle text-primary', ROLLED_BACK: 'bg-surface-highlight text-secondary', SUCCESS: 'bg-success-bg text-success', ROLLBACK: 'bg-surface-highlight text-secondary',
};

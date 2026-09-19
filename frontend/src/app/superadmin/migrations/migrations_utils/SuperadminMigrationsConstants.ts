// RESPONSIBILITY: Feature-owned visual status mapping for schema migration records.
import type { MigrationLog } from '@/app/superadmin/migrations/migrations_types/SuperadminMigrationsTypes';
export const SUPERADMIN_MIGRATION_STATUS_STYLES: Record<MigrationLog['status'], string> = {
  COMPLETED: 'bg-success/10 text-success', FAILED: 'bg-danger-bg text-danger', PENDING: 'bg-warning/10 text-warning', IN_PROGRESS: 'bg-primary/10 text-primary', ROLLED_BACK: 'bg-surface-highlight text-secondary', SUCCESS: 'bg-success/10 text-success', ROLLBACK: 'bg-surface-highlight text-secondary',
};

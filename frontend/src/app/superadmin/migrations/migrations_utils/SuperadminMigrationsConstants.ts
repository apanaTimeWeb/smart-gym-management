// RESPONSIBILITY: Centralized mock data constants for the Schema Rollouts Module.
import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';
export const STATUS_COLORS: Record<MigrationLog['status'], string> = {
    PENDING: 'bg-warning/10 text-warning',
    IN_PROGRESS: 'bg-primary/10 text-primary',
    COMPLETED: 'bg-success/10 text-success',
    SUCCESS: 'bg-success/10 text-success',
    FAILED: 'bg-danger-bg/10 text-danger',
    ROLLED_BACK: 'bg-secondary/10 text-secondary',
    ROLLBACK: 'bg-secondary/10 text-secondary',
};

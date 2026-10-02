// RESPONSIBILITY: Prop contract for the migration status badge.
import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes';
export interface SuperadminMigrationStatusBadgeProps { status: MigrationLog['status']; }

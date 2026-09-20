// RESPONSIBILITY: Prop contract for the migration status badge.
import type { MigrationLog } from '@/app/superadmin/system-ops/migrations/migrations_types/SuperadminMigrationsTypes';
export interface SuperadminMigrationStatusBadgeProps { status: MigrationLog['status']; }

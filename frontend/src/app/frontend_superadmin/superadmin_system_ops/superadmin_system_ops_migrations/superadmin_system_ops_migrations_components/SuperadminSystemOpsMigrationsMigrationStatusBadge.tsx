'use client';
import { AlertTriangle, RefreshCw, XCircle, CheckCircle, Clock } from 'lucide-react';

// RESPONSIBILITY: Renders and composes SuperadminSystemOpsMigrationsMigrationStatusBadge for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import { SUPERADMIN_MIGRATION_STATUS_CODES, SUPERADMIN_MIGRATION_STATUS_STYLES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsConstants';

import type { SuperadminMigrationStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsMigrationStatusBadgeTypes';
import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_types/SuperadminSystemOpsMigrationsTypes';



/**
 * @description Renders one semantic migration status badge with its status-specific icon.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsMigrationsMigrationStatusBadge({ status }: SuperadminMigrationStatusBadgeProps) {
  const icon = status === SUPERADMIN_MIGRATION_STATUS_CODES.COMPLETED || status === SUPERADMIN_MIGRATION_STATUS_CODES.SUCCESS ? <CheckCircle size={18} aria-hidden="true" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-migration-status-badge-migration-status-badge-status"/> : status === SUPERADMIN_MIGRATION_STATUS_CODES.FAILED ? <XCircle size={18} aria-hidden="true"/> : status === SUPERADMIN_MIGRATION_STATUS_CODES.IN_PROGRESS ? <RefreshCw size={18} className="motion-safe:animate-spin" aria-hidden="true"/> : status === SUPERADMIN_MIGRATION_STATUS_CODES.ROLLED_BACK || status === SUPERADMIN_MIGRATION_STATUS_CODES.ROLLBACK ? <AlertTriangle size={18} aria-hidden="true"/> : <Clock size={18} aria-hidden="true"/>;
  return <span data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-migration-status-badge-superadmin_system_ops_migrations-superadminmigrationstatusbadge-status" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${SUPERADMIN_MIGRATION_STATUS_STYLES[status as MigrationLog['status']]}`}>{icon}{status.replaceAll('_', ' ')}</span>;
}

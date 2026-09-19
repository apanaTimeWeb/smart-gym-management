// RESPONSIBILITY: Renders one semantic migration status badge with its status-specific icon.
'use client';
import { AlertTriangle, CheckCircle, Clock, RefreshCw, XCircle } from 'lucide-react';
import type { MigrationLog } from '@/app/superadmin/migrations/migrations_types/SuperadminMigrationsTypes';
import type { SuperadminMigrationStatusBadgeProps } from '@/app/superadmin/migrations/migrations_types/SuperadminMigrationStatusBadgeTypes';
import { SUPERADMIN_MIGRATION_STATUS_STYLES } from '@/app/superadmin/migrations/migrations_utils/SuperadminMigrationsConstants';

export default function SuperadminMigrationStatusBadge({ status }: SuperadminMigrationStatusBadgeProps) {
  const icon = status === 'COMPLETED' || status === 'SUCCESS' ? <CheckCircle size={18} aria-hidden="true" /> : status === 'FAILED' ? <XCircle size={18} aria-hidden="true" /> : status === 'IN_PROGRESS' ? <RefreshCw size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : status === 'ROLLED_BACK' || status === 'ROLLBACK' ? <AlertTriangle size={18} aria-hidden="true" /> : <Clock size={18} aria-hidden="true" />;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${SUPERADMIN_MIGRATION_STATUS_STYLES[status as MigrationLog['status']]}`}>{icon}{status.replaceAll('_', ' ')}</span>;
}

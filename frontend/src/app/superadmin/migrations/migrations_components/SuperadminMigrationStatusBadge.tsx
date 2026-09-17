'use client';
// RESPONSIBILITY: Renders the migration status badge using the feature-owned status mapping.
import { CheckCircle, Clock, RefreshCw, XCircle } from 'lucide-react';
import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';
import { SUPERADMIN_MIGRATION_STATUS_STYLES } from '@/app/superadmin/migrations/migrations_utils/SuperadminMigrationsConstants';

export default function SuperadminMigrationStatusBadge({ status }: { status: MigrationLog['status'] }) {
  const icon = status === 'COMPLETED' || status === 'SUCCESS' ? <CheckCircle size={18} strokeWidth={2} aria-hidden="true" /> : status === 'FAILED' ? <XCircle size={18} strokeWidth={2} aria-hidden="true" /> : status === 'IN_PROGRESS' ? <RefreshCw size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : <Clock size={18} strokeWidth={2} aria-hidden="true" />;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${SUPERADMIN_MIGRATION_STATUS_STYLES[status]}`}>{icon}{status.replaceAll('_', ' ')}</span>;
}

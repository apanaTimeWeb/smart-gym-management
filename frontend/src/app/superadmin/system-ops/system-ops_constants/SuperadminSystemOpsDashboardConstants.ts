// RESPONSIBILITY: Owns static System Ops dashboard card configuration without storing server data.
import { Activity, DatabaseBackup, DatabaseZap, Server } from 'lucide-react';
import { formatDateTime, formatNumber } from '@/lib/formatters';
import { BackupsUrlConfig } from '@/app/superadmin/system-ops/backups/superadmin_backups_url_config';
import { InfrastructureUrlConfig } from '@/app/superadmin/system-ops/infrastructure/superadmin_infrastructure_url_config';
import { JobsUrlConfig } from '@/app/superadmin/system-ops/jobs/superadmin_jobs_url_config';
import { MigrationsUrlConfig } from '@/app/superadmin/system-ops/migrations/superadmin_migrations_url_config';
import type { SuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';
import type { SuperadminSystemOpsCardDefinition } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsCardTypes';

const toStatusLabel = (value: string): string => value.replaceAll('_', ' ');

export const SUPERADMIN_SYSTEM_OPS_CARD_DEFINITIONS: SuperadminSystemOpsCardDefinition[] = [
  { key: 'infrastructure', title: 'Infrastructure', description: 'Monitor CPU, memory, and node health across active clusters.', href: InfrastructureUrlConfig.PAGES.MAIN, icon: Server, label: (summary: SuperadminSystemOpsSummary) => toStatusLabel(summary.infrastructureStatus), toneClass: 'bg-primary-subtle text-primary' },
  { key: 'jobs', title: 'Background Jobs', description: 'Manage queue health, failed jobs, and scheduled tasks.', href: JobsUrlConfig.PAGES.MAIN, icon: Activity, label: (summary: SuperadminSystemOpsSummary) => `${formatNumber(summary.pendingJobs)} pending`, toneClass: 'bg-warning-bg text-warning' },
  { key: 'backups', title: 'Database Backups', description: 'Review backup health and recovery operations.', href: BackupsUrlConfig.PAGES.MAIN, icon: DatabaseBackup, label: (summary: SuperadminSystemOpsSummary) => summary.lastBackupAt ? `Last run ${formatDateTime(summary.lastBackupAt)}` : 'No recent run', toneClass: 'bg-purple-bg text-purple-text' },
  { key: 'migrations', title: 'Schema Rollouts', description: 'Review tenant and global database migration state.', href: MigrationsUrlConfig.PAGES.MAIN, icon: DatabaseZap, label: (summary: SuperadminSystemOpsSummary) => toStatusLabel(summary.migrationStatus), toneClass: 'bg-danger-bg text-danger' },
];

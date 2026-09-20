// RESPONSIBILITY: Owns presentation labels for the System Ops summary feature without storing server data.
import type { SuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';

export const SUPERADMIN_SYSTEM_OPS_CARD_DEFINITIONS = {
  infrastructure: {
    title: 'Infrastructure',
    description: 'Monitor CPU, memory, and node health across active clusters.',
    label: (summary: SuperadminSystemOpsSummary) => summary.infrastructureStatus.replace('_', ' '),
  },
  jobs: {
    title: 'Background Jobs',
    description: 'Manage queue health, failed jobs, and scheduled tasks.',
    label: (summary: SuperadminSystemOpsSummary) => `${summary.pendingJobs} pending`,
  },
  backups: {
    title: 'Database Backups',
    description: 'Review backup health and recovery operations.',
    label: (summary: SuperadminSystemOpsSummary) => summary.lastBackupAt ? 'Last run available' : 'No recent run',
  },
  migrations: {
    title: 'Schema Rollouts',
    description: 'Review tenant and global database migration state.',
    label: (summary: SuperadminSystemOpsSummary) => summary.migrationStatus.replaceAll('_', ' '),
  },
} as const;

// RESPONSIBILITY: Owns realistic mock server data for the System Ops summary feature.
import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';

export const SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE: SuperadminSystemOpsSummary = {
  infrastructureStatus: 'HEALTHY',
  pendingJobs: 3,
  lastBackupAt: '2026-09-20T12:00:00Z',
  backupStatus: 'HEALTHY',
  migrationStatus: 'UP_TO_DATE',
};

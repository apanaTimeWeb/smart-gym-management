import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
export const MOCK_SUPERADMIN_BACKUPS: BackupRecord[] = [
    { id: 'bk1', tenantName: 'Iron Paradise', databaseName: 'db_iron_paradise', sizeMB: 482, status: 'SUCCESS', timestamp: '2026-09-01T02:00:00Z' },
    { id: 'bk2', tenantName: 'Fit Life Studio', databaseName: 'db_fit_life', sizeMB: 316, status: 'SUCCESS', timestamp: '2026-09-02T02:00:00Z' },
    { id: 'bk3', tenantName: 'CrossFit Box', databaseName: 'db_crossfit', sizeMB: 715, status: 'FAILED', timestamp: '2026-09-03T02:00:00Z' },
    { id: 'bk4', tenantName: 'Zenith Fitness', databaseName: 'db_zenith', sizeMB: 528, status: 'IN_PROGRESS', timestamp: '2026-09-04T02:00:00Z' },
    { id: 'bk5', tenantName: 'Peak Performance', databaseName: 'db_peak', sizeMB: 640, status: 'SUCCESS', timestamp: '2026-09-05T02:00:00Z' },
    { id: 'bk6', tenantName: 'Pulse Arena', databaseName: 'db_pulse', sizeMB: 295, status: 'SUCCESS', timestamp: '2026-08-28T02:00:00Z' },
    { id: 'bk7', tenantName: 'Core Strength', databaseName: 'db_core', sizeMB: 812, status: 'SUCCESS', timestamp: '2026-08-30T02:00:00Z' },
    { id: 'bk8', tenantName: 'Urban Fitness', databaseName: 'db_urban', sizeMB: 405, status: 'FAILED', timestamp: '2026-08-25T02:00:00Z' },
    { id: 'bk9', tenantName: 'Elevate Gym', databaseName: 'db_elevate', sizeMB: 555, status: 'SUCCESS', timestamp: '2026-08-27T02:00:00Z' },
    { id: 'bk10', tenantName: 'Momentum Fitness', databaseName: 'db_momentum', sizeMB: 377, status: 'SUCCESS', timestamp: '2026-09-06T02:00:00Z' },
    { id: 'bk11', tenantName: 'Fit Republic', databaseName: 'db_fit_republic', sizeMB: 266, status: 'SUCCESS', timestamp: '2026-09-07T02:00:00Z' },
    { id: 'bk12', tenantName: 'MaxFit Studio', databaseName: 'db_maxfit', sizeMB: 735, status: 'IN_PROGRESS', timestamp: '2026-09-08T02:00:00Z' },
];

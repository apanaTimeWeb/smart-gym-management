import type { SuperadminSystemAuditLog, SuperadminSystemTenant } from '@/app/superadmin/system/system_types/superadmin_system_types';
export const MOCK_SYSTEM_TENANTS: SuperadminSystemTenant[] = [
    { id: 't1', name: 'Iron Paradise', plan: 'Pro', databaseVersion: 'v2.4.1' },
    { id: 't2', name: 'Fit Life Studio', plan: 'Basic', databaseVersion: 'v2.4.0' },
    { id: 't3', name: 'CrossFit Box', plan: 'Enterprise', databaseVersion: 'v2.3.9' },
    { id: 't4', name: 'Zenith Fitness', plan: 'Pro', databaseVersion: 'v2.4.1' },
    { id: 't5', name: 'Peak Performance', plan: 'Enterprise', databaseVersion: 'v2.4.0' },
];
export const MOCK_SYSTEM_AUDIT_LOGS: SuperadminSystemAuditLog[] = [
    { id: 'sa1', timestamp: '2026-09-01T09:00:00Z', targetResource: 'Iron Paradise', actorName: 'superadmin@gymsmart.com', actorRole: 'SUPERADMIN', action: 'MIGRATION_CHECK' },
    { id: 'sa2', timestamp: '2026-09-02T10:20:00Z', targetResource: 'Fit Life Studio', actorName: 'system', actorRole: 'SYSTEM', action: 'HEALTH_CHECK' },
    { id: 'sa3', timestamp: '2026-09-04T12:15:00Z', targetResource: 'CrossFit Box', actorName: 'superadmin@gymsmart.com', actorRole: 'SUPERADMIN', action: 'SCHEMA_ROLLOUT_STARTED' },
    { id: 'sa4', timestamp: '2026-09-06T08:35:00Z', targetResource: 'Zenith Fitness', actorName: 'system', actorRole: 'SYSTEM', action: 'DATABASE_BACKUP' },
    { id: 'sa5', timestamp: '2026-09-08T14:10:00Z', targetResource: 'Peak Performance', actorName: 'superadmin@gymsmart.com', actorRole: 'SUPERADMIN', action: 'MIGRATION_COMPLETED' },
    { id: 'sa6', timestamp: '2026-09-10T16:40:00Z', targetResource: 'Iron Paradise', actorName: 'system', actorRole: 'SYSTEM', action: 'AUDIT_EXPORT' },
    { id: 'sa7', timestamp: '2026-09-12T11:30:00Z', targetResource: 'Fit Life Studio', actorName: 'superadmin@gymsmart.com', actorRole: 'SUPERADMIN', action: 'MIGRATION_CHECK' },
    { id: 'sa8', timestamp: '2026-09-14T17:00:00Z', targetResource: 'CrossFit Box', actorName: 'system', actorRole: 'SYSTEM', action: 'HEALTH_CHECK' },
    { id: 'sa9', timestamp: '2026-08-28T07:15:00Z', targetResource: 'Zenith Fitness', actorName: 'superadmin@gymsmart.com', actorRole: 'SUPERADMIN', action: 'SCHEMA_ROLLOUT_STARTED' },
    { id: 'sa10', timestamp: '2026-08-25T09:45:00Z', targetResource: 'Peak Performance', actorName: 'system', actorRole: 'SYSTEM', action: 'DATABASE_BACKUP' },
];

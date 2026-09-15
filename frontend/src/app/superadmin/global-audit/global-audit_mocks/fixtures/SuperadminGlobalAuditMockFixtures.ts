import type { AuditLog } from '@/app/superadmin/global-audit/superadmin_global-audit_types/superadmin_global-audit_types';

export const MOCK_SUPERADMIN_GLOBAL_AUDIT: AuditLog[] = [
  {
    id: 'al1', timestamp: '2023-11-20T10:00:00Z', actor: 'superadmin@system.com',
    actorRole: 'SUPERADMIN', actorType: 'SUPERADMIN', action: 'CREATED_TENANT',
    resource: 'Tenant', resourceId: 't3', details: 'Created new tenant "CrossFit Box"',
    ipAddress: '192.168.1.1', severity: 'INFO'
  },
  {
    id: 'al2', timestamp: '2023-11-19T14:30:00Z', actor: 'admin@iron.com',
    actorRole: 'ADMIN', tenantId: 't1', tenantName: 'Iron Paradise', actorType: 'TENANT',
    action: 'DELETED_MEMBER', resource: 'Member', resourceId: 'm123',
    details: 'Deleted member John Doe', ipAddress: '10.0.0.5', severity: 'WARNING'
  }
];

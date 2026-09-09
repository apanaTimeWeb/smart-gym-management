// RESPONSIBILITY: Defines types and interfaces for the Superadmin Global Audit module.

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole?: 'SUPERADMIN' | 'ADMIN' | 'STAFF' | 'MEMBER';
  tenantId?: string;
  tenantName?: string;
  actorType?: 'SUPERADMIN' | 'SYSTEM' | 'TENANT';
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  sessionId?: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

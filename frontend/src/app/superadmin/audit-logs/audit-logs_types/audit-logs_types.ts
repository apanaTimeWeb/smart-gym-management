export interface GlobalAuditLog {
  id: string;
  actorName: string;
  actorRole: 'SUPERADMIN' | 'SUPPORT_AGENT' | 'BILLING_ADMIN';
  action: string;
  targetResource: string;
  timestamp: string;
  ipAddress: string;
}

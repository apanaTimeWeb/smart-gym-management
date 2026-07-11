export interface IGlobalAuditLog {
  id: string;
  actorName: string;
  actorRole: 'SUPERADMIN' | 'SUPPORT_AGENT' | 'BILLING_ADMIN';
  action: string;
  targetResource: string;
  timestamp: string;
  ipAddress: string;
}

export interface IAuditLogListResponse {
  data: IGlobalAuditLog[];
  meta: { total: number; page: number; limit: number };
  message: string;
}

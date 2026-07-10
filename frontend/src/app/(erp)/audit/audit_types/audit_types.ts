export interface AuditLog {
  id: string;
  actorId: string | null;
  actorRole: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: any | null;
  newValue: any | null;
  ipAddress: string | null;
  timestamp: string;
}

export interface AuditLogResponse {
  success: boolean;
  message: string;
  data: AuditLog[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface AuditFilterState {
  page: number;
  limit: number;
  entityType?: string;
  actorId?: string;
}

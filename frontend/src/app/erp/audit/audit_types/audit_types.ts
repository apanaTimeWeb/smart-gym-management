// RESPONSIBILITY: Defines strict types and API response interfaces for the Audit module to ensure type safety.
export interface AuditLog {
  id: string;
  actorId: string | null;
  actorRole: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: unknown | null;
  newValue: unknown | null;
  ipAddress: string | null;
  timestamp: string;
}

export interface AuditLogResponse {
  logs: AuditLog[];
  total: number;
}

export interface AuditFilterState {
  page: number;
  limit: number;
  entityType?: string;
  actorId?: string;
}

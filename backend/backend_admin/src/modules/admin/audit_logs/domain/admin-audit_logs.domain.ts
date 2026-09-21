// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin audit_logs records.
// FLOW: PostgreSQL entity → AdminAuditLogsMapper → AdminAuditLogsDomainModel → service.

export interface AdminAuditLogsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

// RESPONSIBILITY: Defines the ORM-independent domain contract consumed by the Admin audit-log UI.
// FLOW: Core audit entity â†’ mapper â†’ domain model â†’ API response.

export interface AdminAuditLogsDomainModel {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  branchId: string;
  details: string;
  severity: 'high' | 'medium' | 'low';
  ip: string;
  module: 'Finance' | 'Members' | 'HR' | 'Plans' | 'Auth' | 'Settings' | 'Branches' | 'Store' | 'Attendance';
  affectedRecordId?: string;
}

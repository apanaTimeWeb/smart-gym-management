// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin data-export records.
// FLOW: PostgreSQL entity → AdminDataExportMapper → AdminDataExportDomainModel → service.

export interface AdminDataExportDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

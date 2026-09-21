// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin blacklist records.
// FLOW: PostgreSQL entity → AdminBlacklistMapper → AdminBlacklistDomainModel → service.

export interface AdminBlacklistDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

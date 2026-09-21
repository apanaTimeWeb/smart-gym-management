// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin profile records.
// FLOW: PostgreSQL entity → AdminProfileMapper → AdminProfileDomainModel → service.

export interface AdminProfileDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

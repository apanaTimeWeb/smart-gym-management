// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin branches records.
// FLOW: PostgreSQL entity → AdminBranchesMapper → AdminBranchesDomainModel → service.

export interface AdminBranchesDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

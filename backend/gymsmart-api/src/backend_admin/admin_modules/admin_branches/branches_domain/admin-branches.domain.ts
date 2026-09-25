// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin branches records.
// FLOW: PostgreSQL entity â†’ AdminBranchesMapper â†’ AdminBranchesDomainModel â†’ service.

export interface AdminBranchesDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

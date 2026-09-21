// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin usage records.
// FLOW: PostgreSQL entity â†’ AdminUsageMapper â†’ AdminUsageDomainModel â†’ service.

export interface AdminUsageDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin blacklist records.
// FLOW: PostgreSQL entity â†’ AdminBlacklistMapper â†’ AdminBlacklistDomainModel â†’ service.

export interface AdminBlacklistDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

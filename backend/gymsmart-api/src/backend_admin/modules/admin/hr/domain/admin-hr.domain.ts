// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin hr records.
// FLOW: PostgreSQL entity â†’ AdminHrMapper â†’ AdminHrDomainModel â†’ service.

export interface AdminHrDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

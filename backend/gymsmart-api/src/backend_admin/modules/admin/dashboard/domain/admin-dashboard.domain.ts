// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin dashboard records.
// FLOW: PostgreSQL entity â†’ AdminDashboardMapper â†’ AdminDashboardDomainModel â†’ service.

export interface AdminDashboardDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

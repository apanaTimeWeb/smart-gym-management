// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin plans records.
// FLOW: PostgreSQL entity → AdminPlansMapper → AdminPlansDomainModel → service.

export interface AdminPlansDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

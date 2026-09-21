// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin sales records.
// FLOW: PostgreSQL entity â†’ AdminSalesMapper â†’ AdminSalesDomainModel â†’ service.

export interface AdminSalesDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

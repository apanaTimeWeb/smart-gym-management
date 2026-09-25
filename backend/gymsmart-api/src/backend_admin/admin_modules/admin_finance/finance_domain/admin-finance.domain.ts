// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin finance records.
// FLOW: PostgreSQL entity â†’ AdminFinanceMapper â†’ AdminFinanceDomainModel â†’ service.

export interface AdminFinanceDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

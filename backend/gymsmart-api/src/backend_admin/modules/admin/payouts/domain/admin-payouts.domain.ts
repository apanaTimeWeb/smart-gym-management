// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin payouts records.
// FLOW: PostgreSQL entity → AdminPayoutsMapper → AdminPayoutsDomainModel → service.

export interface AdminPayoutsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

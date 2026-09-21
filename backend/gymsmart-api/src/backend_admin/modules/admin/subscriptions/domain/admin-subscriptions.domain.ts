// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin subscriptions records.
// FLOW: PostgreSQL entity → AdminSubscriptionsMapper → AdminSubscriptionsDomainModel → service.

export interface AdminSubscriptionsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

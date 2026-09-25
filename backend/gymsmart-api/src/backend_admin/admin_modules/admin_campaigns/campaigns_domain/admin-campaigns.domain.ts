// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin campaigns records.
// FLOW: PostgreSQL entity â†’ AdminCampaignsMapper â†’ AdminCampaignsDomainModel â†’ service.

export interface AdminCampaignsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

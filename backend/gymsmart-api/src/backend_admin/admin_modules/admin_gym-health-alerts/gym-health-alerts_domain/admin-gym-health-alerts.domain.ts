// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin gym-health-alerts records.
// FLOW: PostgreSQL entity â†’ AdminGymHealthAlertsMapper â†’ AdminGymHealthAlertsDomainModel â†’ service.

export interface AdminGymHealthAlertsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

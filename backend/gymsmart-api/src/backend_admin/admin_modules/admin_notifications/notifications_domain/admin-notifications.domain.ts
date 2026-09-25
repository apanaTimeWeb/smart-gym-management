// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin notifications records.
// FLOW: PostgreSQL entity â†’ AdminNotificationsMapper â†’ AdminNotificationsDomainModel â†’ service.

export interface AdminNotificationsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

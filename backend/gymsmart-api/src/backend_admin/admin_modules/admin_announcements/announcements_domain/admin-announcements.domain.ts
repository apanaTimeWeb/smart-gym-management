// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin announcements records.
// FLOW: PostgreSQL entity â†’ AdminAnnouncementsMapper â†’ AdminAnnouncementsDomainModel â†’ service.

export interface AdminAnnouncementsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

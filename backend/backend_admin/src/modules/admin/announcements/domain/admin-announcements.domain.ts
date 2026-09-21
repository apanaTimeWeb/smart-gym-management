// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin announcements records.
// FLOW: PostgreSQL entity → AdminAnnouncementsMapper → AdminAnnouncementsDomainModel → service.

export interface AdminAnnouncementsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

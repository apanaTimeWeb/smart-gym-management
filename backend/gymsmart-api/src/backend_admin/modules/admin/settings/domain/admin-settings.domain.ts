// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin settings records.
// FLOW: PostgreSQL entity â†’ AdminSettingsMapper â†’ AdminSettingsDomainModel â†’ service.

export interface AdminSettingsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

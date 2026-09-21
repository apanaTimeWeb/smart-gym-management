// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin permissions records.
// FLOW: PostgreSQL entity â†’ AdminPermissionsMapper â†’ AdminPermissionsDomainModel â†’ service.

export interface AdminPermissionsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

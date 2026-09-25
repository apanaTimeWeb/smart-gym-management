// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin members records.
// FLOW: PostgreSQL entity â†’ AdminMembersMapper â†’ AdminMembersDomainModel â†’ service.

export interface AdminMembersDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

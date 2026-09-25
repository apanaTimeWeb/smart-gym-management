// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin attendance records.
// FLOW: PostgreSQL entity â†’ AdminAttendanceMapper â†’ AdminAttendanceDomainModel â†’ service.

export interface AdminAttendanceDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}

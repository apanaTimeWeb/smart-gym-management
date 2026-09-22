// RESPONSIBILITY: Defines the schedule business object independent from TypeORM persistence.
// FLOW: schedule repository → mapper → domain object → service.

export interface ScheduleLeaveDomain {
  id: string;
  trainerId: string;
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  status: string;
  managerNotes: string | null;
  totalDays: number | null;
  attachmentUrl: string | null;
  approvedBy: string | null;
  rejectedReason: string | null;
  createdAt: string;
}

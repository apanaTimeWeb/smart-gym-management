// RESPONSIBILITY: Defines schedule leave response data independently from persistence nullability.
// FLOW: TrainerScheduleLeaveRequestEntity → mapper → frontend-compatible leave contract.

export interface ScheduleLeaveDomain {
  id: string;
  trainerId: string;
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  status: string;
  managerNotes?: string;
  totalDays?: number;
  attachmentUrl?: string;
  approvedBy?: string;
  rejectedReason?: string;
  createdAt: string;
}

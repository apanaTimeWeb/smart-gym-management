// RESPONSIBILITY: Defines Trainer schedule leave persistence input types independent of TypeORM entities.
// FLOW: Leave DTO → TrainerScheduleLeavePersistenceInput → repository persistence.

export interface TrainerScheduleLeavePersistenceInput {
  trainerId: string;
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  status: string;
  managerNotes: string | null;
  totalDays: number;
  attachmentUrl: string | null;
  approvedBy: string | null;
  rejectedReason: string | null;
}

import { z } from 'zod';

export const managerPtAssignmentSchema = z.object({
  memberId: z.string().trim().min(1, 'Member ID is required'),
  trainerId: z.string().trim().min(1, 'Trainer is required'),
  packageId: z.string().trim().min(1, 'PT package is required'),
  startDate: z.string().trim().min(1, 'Start date is required'),
});

export type ManagerPtAssignmentFormValues = z.infer<typeof managerPtAssignmentSchema>;

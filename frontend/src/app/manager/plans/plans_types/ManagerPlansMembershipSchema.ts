import { z } from 'zod';

export const managerPlansMemberOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  status: z.string(),
  planName: z.string(),
  planId: z.string(),
  expiryDate: z.string(),
});

export const managerPlansMembershipOverviewSchema = z.object({
  memberOptions: z.array(managerPlansMemberOptionSchema),
  renewalCandidates: z.array(managerPlansMemberOptionSchema),
});

export const managerPlansActionResponseSchema = z.object({});

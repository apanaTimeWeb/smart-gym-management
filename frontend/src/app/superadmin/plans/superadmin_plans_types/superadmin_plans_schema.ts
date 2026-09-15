import { z } from 'zod';

export const planFormSchema = z.object({
  name: z.string().min(1, 'Plan Name is required'),
  priceMonthly: z.coerce.number().min(0),
  priceAnnual: z.coerce.number().min(0),
  maxMembers: z.coerce.number().min(1),
  maxStaff: z.coerce.number().min(1),
  dbLimitGb: z.coerce.number().min(0),
  binaryLimitGb: z.coerce.number().min(0),
  features: z.array(z.object({ value: z.string().min(1, 'Feature cannot be empty') })).min(1),
});

export type PlanFormValues = z.infer<typeof planFormSchema>;

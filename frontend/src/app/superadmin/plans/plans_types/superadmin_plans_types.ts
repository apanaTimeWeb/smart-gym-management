import { z } from 'zod';

export const SubscriptionPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceMonthly: z.number(),
  priceAnnual: z.number(),
  maxMembers: z.number(),
  maxStaff: z.number(),
  dbLimitGb: z.number(),
  binaryLimitGb: z.number(),
  features: z.array(z.string()),
  activeTenants: z.number(),
  isPublic: z.boolean(),
  trialDays: z.number(),
  setupFee: z.number(),
  currency: z.string(),
  isArchived: z.boolean().optional(),
});
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;

export const CreatePlanPayloadSchema = SubscriptionPlanSchema.omit({ id: true, activeTenants: true });
export type CreatePlanPayload = z.infer<typeof CreatePlanPayloadSchema>;

export const UpdatePlanPayloadSchema = CreatePlanPayloadSchema.partial();
export type UpdatePlanPayload = z.infer<typeof UpdatePlanPayloadSchema>;

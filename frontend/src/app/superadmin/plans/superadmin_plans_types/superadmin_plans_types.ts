// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module.
import { z } from 'zod';

export const SubscriptionPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceMonthly: z.number(),
  priceAnnual: z.number(),
  maxMembers: z.number(),
  maxStaff: z.number(),
  dbLimitGb: z.number().optional(),
  binaryLimitGb: z.number().optional(),
  features: z.array(z.string()),
  activeTenants: z.number(),
  isPublic: z.boolean(),
  trialDays: z.number(),
  setupFee: z.number(),
  currency: z.string(),
  isArchived: z.boolean().optional(),
});
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;

export const CreatePlanPayloadSchema = SubscriptionPlanSchema.omit({ id: true, activeTenants: true, isArchived: true });
export type CreatePlanPayload = z.infer<typeof CreatePlanPayloadSchema>;

export const UpdatePlanPayloadSchema = CreatePlanPayloadSchema.partial();
export type UpdatePlanPayload = z.infer<typeof UpdatePlanPayloadSchema>;


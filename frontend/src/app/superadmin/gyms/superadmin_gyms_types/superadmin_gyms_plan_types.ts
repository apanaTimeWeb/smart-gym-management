import { z } from 'zod';

// RESPONSIBILITY: Defines the minimum subscription-plan contract required by Gyms forms.
// The Gyms module owns this local UI/API contract to avoid a business dependency on the Plans module.
export const SuperadminGymsPlanOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceMonthly: z.number(),
  currency: z.string(),
});

export type SuperadminGymsPlanOption = z.infer<typeof SuperadminGymsPlanOptionSchema>;

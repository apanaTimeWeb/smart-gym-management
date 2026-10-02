/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module.
import { z } from 'zod';export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
import { SubscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansContractSchemas';
import { CreatePlanPayloadSchema, UpdatePlanPayloadSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansSchemas';
export type CreatePlanPayload = z.infer<typeof CreatePlanPayloadSchema>;
export type UpdatePlanPayload = z.infer<typeof UpdatePlanPayloadSchema>;

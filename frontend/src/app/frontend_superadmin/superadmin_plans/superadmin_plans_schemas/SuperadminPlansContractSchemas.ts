/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
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

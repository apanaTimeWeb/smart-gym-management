/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const UsageMeterSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
    tenantName: z.string(),
    smsSent: z.number(),
    smsLimit: z.number(),
    whatsappMessagesSent: z.number(),
    whatsappLimit: z.number(),
    emailsSent: z.number(),
    emailLimit: z.number(),
    apiCallsCount: z.number(),
    apiCallsLimit: z.number().optional(),
    databaseGb: z.number(),
    mediaGb: z.number(),
    storageLimitGb: z.number(),
    activeMembers: z.number(),
    totalMembers: z.number(),
    memberLimit: z.number(),
    staffCount: z.number(),
    staffLimit: z.number(),
    billingCycleEnd: z.string(),
}).passthrough();

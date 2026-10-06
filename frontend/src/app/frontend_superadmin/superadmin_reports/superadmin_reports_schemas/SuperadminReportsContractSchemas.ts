/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const RevenueRowSchema = z.object({
    month: z.string(),
    mrr: z.number(),
    newRevenue: z.number(),
    cancelledRevenue: z.number(),
    netRevenue: z.number(),
    tenantCount: z.number()
});
export const CancellationsRecordSchema = z.object({
    id: z.string(),
    gymName: z.string(),
    ownerName: z.string(),
    plan: z.string(),
    cancelledAt: z.string(),
    reason: z.string(),
    mrr: z.number(),
    daysActive: z.number()
});
export const TenantHealthScoreSchema = z.object({
    id: z.string(),
    gymName: z.string(),
    plan: z.string(),
    score: z.number(),
    grade: z.enum(['A', 'B', 'C', 'D', 'F']),
    memberCount: z.number(),
    lastLogin: z.string(),
    paymentHealth: z.enum(['GOOD', 'AT_RISK', 'OVERDUE']),
    featureUsage: z.number(),
    supportTickets: z.number()
});

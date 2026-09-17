// RESPONSIBILITY: Encapsulates functionality for superadmin_reports_types.ts
import { z } from 'zod';
export const RevenueRowSchema = z.object({
    month: z.string(),
    mrr: z.number(),
    newRevenue: z.number(),
    cancelledRevenue: z.number(),
    netRevenue: z.number(),
    tenantCount: z.number()
});
export type RevenueRow = z.infer<typeof RevenueRowSchema>;
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
export type CancellationsRecord = z.infer<typeof CancellationsRecordSchema>;
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
export type TenantHealthScore = z.infer<typeof TenantHealthScoreSchema>;
export type ReportsTab = 'revenue' | 'cancellations' | 'health';

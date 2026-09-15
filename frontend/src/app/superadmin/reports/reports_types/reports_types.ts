import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Reports module.

export interface RevenueRow {
  month: string;
  mrr: number;
  newRevenue: number;
  cancellationsedRevenue: number;
  netRevenue: number;
  tenantCount: number;
}

export interface CancellationsRecord {
  id: string;
  gymName: string;
  ownerName: string;
  plan: string;
  cancellationsedAt: string;
  reason: string;
  mrr: number;
  daysActive: number;
}

export interface TenantHealthScore {
  id: string;
  gymName: string;
  plan: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  memberCount: number;
  lastLogin: string;
  paymentHealth: 'GOOD' | 'AT_RISK' | 'OVERDUE';
  featureUsage: number;
  supportTickets: number;
}

/** Tab identifiers for the reports page. */
export type ReportsTab = 'revenue' | 'cancellations' | 'health';


export const RevenueRowSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.number(),
  source: z.string(),
  tenantId: z.string().optional()
});

export const CancellationsRecordSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  cancellationsDate: z.string(),
  reason: z.string(),
  lifetimeValue: z.number()
});

export const TenantHealthScoreSchema = z.object({
  tenantId: z.string(),
  tenantName: z.string(),
  score: z.number(),
  trend: z.enum(['UP', 'DOWN', 'STABLE']),
  lastCalculated: z.string()
});

import { z } from 'zod';

export interface RevenueRow {
  month: string;
  mrr: number;
  newRevenue: number;
  cancelledRevenue: number;
  netRevenue: number;
  tenantCount: number;
}

export interface CancellationsRecord {
  id: string;
  gymName: string;
  ownerName: string;
  plan: string;
  cancelledAt: string;
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

export type ReportsTab = 'revenue' | 'cancellations' | 'health';

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

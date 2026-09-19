// RESPONSIBILITY: Zod contracts and domain types for Trainer earnings server data and ledger pagination.
import { z } from 'zod';

export const TrainerEarningsKPIsDataSchema = z.object({
  totalEarnings: z.number(),
  pendingPayouts: z.number(),
  sessionsCompleted: z.number(),
  commissionRate: z.number(),
  taxDeduction: z.number(),
  bankAccount: z.string().optional(),
  commissionTier: z.string().optional(),
});
export type TrainerEarningsKPIsData = z.infer<typeof TrainerEarningsKPIsDataSchema>;

export const PayoutStatusSchema = z.enum(['pending', 'processing', 'settled']);
export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;

export const TrainerPendingPayoutSchema = z.object({
  id: z.string(),
  period: z.string(),
  amount: z.number(),
  status: PayoutStatusSchema,
  dueDate: z.string(),
});
export type TrainerPendingPayout = z.infer<typeof TrainerPendingPayoutSchema>;

export const TrainerEarningsHistoryRowSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.enum(['Session', 'Bonus', 'Commission']),
  description: z.string(),
  amount: z.number(),
  status: PayoutStatusSchema,
  sessionId: z.string().optional(),
  tdsDeducted: z.number().optional(),
  netPayout: z.number().optional(),
  invoiceNumber: z.string().optional(),
});
export type TrainerEarningsHistoryRow = z.infer<typeof TrainerEarningsHistoryRowSchema>;

export const TrainerEarningsDataSchema = z.object({
  kpis: TrainerEarningsKPIsDataSchema,
  pendingPayouts: z.array(TrainerPendingPayoutSchema),
  history: z.array(TrainerEarningsHistoryRowSchema),
  historyTotal: z.number().int().nonnegative().optional(),
  historyPage: z.number().int().positive().optional(),
  historyLimit: z.number().int().positive().optional(),
});
export type TrainerEarningsData = z.infer<typeof TrainerEarningsDataSchema>;

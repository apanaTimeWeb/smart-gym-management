// RESPONSIBILITY: Owns Trainer Earnings Zod schemas for server data and ledger responses.
import { z } from 'zod';

import { TRAINER_EARNINGS_LEDGER_ENTRY_TYPES, TRAINER_EARNINGS_PAYOUT_STATUS_VALUES } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_constants/TrainerEarningsConstants';



export const TrainerEarningsKPIsDataSchema = z.object({ totalEarnings: z.number(), currency: z.string().length(3), pendingPayouts: z.number(), sessionsCompleted: z.number(), commissionRate: z.number(), taxDeduction: z.number(), bankAccount: z.string().optional(), commissionTier: z.string().optional() });
export const TrainerEarningsPayoutStatusSchema = z.enum(TRAINER_EARNINGS_PAYOUT_STATUS_VALUES);
export const TrainerEarningsTrainerPendingPayoutSchema = z.object({ id: z.string(), period: z.string(), amount: z.number(), currency: z.string().length(3), status: TrainerEarningsPayoutStatusSchema, dueDate: z.string() });
export const TrainerEarningsHistoryRowSchema = z.object({ id: z.string(), date: z.string(), type: z.enum(TRAINER_EARNINGS_LEDGER_ENTRY_TYPES), description: z.string(), amount: z.number(), currency: z.string().length(3), status: TrainerEarningsPayoutStatusSchema, sessionId: z.string().optional(), tdsDeducted: z.number().optional(), netPayout: z.number().optional(), invoiceNumber: z.string().optional() });
export const TrainerEarningsDataSchema = z.object({ kpis: TrainerEarningsKPIsDataSchema, pendingPayouts: z.array(TrainerEarningsTrainerPendingPayoutSchema), history: z.array(TrainerEarningsHistoryRowSchema), historyTotal: z.number().int().nonnegative().optional(), historyPage: z.number().int().positive().optional(), historyLimit: z.number().int().positive().optional() });

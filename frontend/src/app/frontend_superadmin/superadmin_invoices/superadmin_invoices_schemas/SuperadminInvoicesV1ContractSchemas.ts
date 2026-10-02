/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminInvoicesV1DataSchema = z.object({ summary: z.object({ failed: z.number(), inRecovery: z.number(), recoveredIncome: z.number(), unrecoveredIncome: z.number(), currency: z.string().optional() }), recovery: z.array(z.object({ gym: z.string(), invoice: z.string(), amount: z.number(), currency: z.string().optional(), attempts: z.number(), nextRetry: z.string(), daysLate: z.number(), reason: z.string() })), reconciliation: z.array(z.object({ type: z.string(), gym: z.string(), amount: z.number(), currency: z.string().optional(), status: z.string() })), policy: z.object({ firstRetry: z.string(), secondRetry: z.string(), finalRetry: z.string(), gracePeriod: z.string(), autoSuspend: z.string() }) });
export const SuperadminInvoicesV1ResponseSchema = z.object({ data: SuperadminInvoicesV1DataSchema, message: z.string(), success: z.boolean() });

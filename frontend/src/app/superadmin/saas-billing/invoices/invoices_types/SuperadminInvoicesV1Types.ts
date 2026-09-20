// RESPONSIBILITY: Defines the runtime-validated data contract for Payment Recovery & Billing Adjustments.
import { z } from 'zod';
export const SuperadminInvoicesV1DataSchema = z.object({ summary: z.object({ failed: z.number(), inRecovery: z.number(), recoveredIncome: z.number(), unrecoveredIncome: z.number() }), recovery: z.array(z.object({ gym: z.string(), invoice: z.string(), amount: z.number(), attempts: z.number(), nextRetry: z.string(), daysLate: z.number(), reason: z.string() })), reconciliation: z.array(z.object({ type: z.string(), gym: z.string(), amount: z.number(), status: z.string() })), policy: z.object({ firstRetry: z.string(), secondRetry: z.string(), finalRetry: z.string(), gracePeriod: z.string(), autoSuspend: z.string() }) });
export const SuperadminInvoicesV1ResponseSchema = z.object({ data: SuperadminInvoicesV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminInvoicesV1Data = z.infer<typeof SuperadminInvoicesV1DataSchema>;
export type SuperadminInvoicesV1Response = z.infer<typeof SuperadminInvoicesV1ResponseSchema>;
export interface SuperadminInvoicesV1SectionProps {
    data: SuperadminInvoicesV1Data;
}

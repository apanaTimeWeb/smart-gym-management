// RESPONSIBILITY: Defines the runtime-validated data contract for Business Overview.
import { z } from 'zod';
export const SuperadminDashboardV1DataSchema = z.object({ currency: z.string(), openingIncome: z.number(), newIncome: z.number(), growthIncome: z.number(), returningIncome: z.number(), reducedIncome: z.number(), lostIncome: z.number(), endingIncome: z.number(), existingIncomeRetained: z.number(), gymRetention: z.number(), revenueLostPercent: z.number(), customerChurn: z.number(), alerts: z.array(z.object({ id: z.string(), level: z.string(), title: z.string(), detail: z.string(), count: z.number() })), leaderboard: z.array(z.object({ name: z.string(), plan: z.string(), income: z.number(), growth: z.number(), health: z.number() })), waterfall: z.array(z.object({ label: z.string(), value: z.number() })) });
export const SuperadminDashboardV1ResponseSchema = z.object({ data: SuperadminDashboardV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminDashboardV1Data = z.infer<typeof SuperadminDashboardV1DataSchema>;
export type SuperadminDashboardV1Response = z.infer<typeof SuperadminDashboardV1ResponseSchema>;
export interface SuperadminDashboardV1SectionProps {
    data: SuperadminDashboardV1Data;
}

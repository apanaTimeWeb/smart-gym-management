// RESPONSIBILITY: Defines the runtime-validated data contract for Customer Retention & Growth Insights.
import { z } from 'zod';
export const SuperadminAnalyticsV1DataSchema = z.object({ metrics: z.object({ existingIncomeRetained: z.number(), grossIncomeRetained: z.number(), gymRetention: z.number(), revenueLost: z.number(), customerChurn: z.number() }), cohort: z.array(z.object({ month: z.string(), m1: z.number(), m2: z.number(), m3: z.number(), m6: z.number(), m12: z.number() })), movement: z.array(z.object({ label: z.string(), value: z.number() })), adoption: z.array(z.object({ feature: z.string(), available: z.number(), active: z.number(), used: z.number() })), sources: z.array(z.object({ source: z.string(), gyms: z.number(), monthlyIncome: z.number(), churn: z.number() })), concentration: z.array(z.object({ group: z.string(), share: z.number() })) });
export const SuperadminAnalyticsV1ResponseSchema = z.object({ data: SuperadminAnalyticsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminAnalyticsV1Data = z.infer<typeof SuperadminAnalyticsV1DataSchema>;
export type SuperadminAnalyticsV1Response = z.infer<typeof SuperadminAnalyticsV1ResponseSchema>;
export interface SuperadminAnalyticsV1SectionProps {
    data: SuperadminAnalyticsV1Data;
}

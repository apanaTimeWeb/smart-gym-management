// RESPONSIBILITY: Defines the runtime-validated data contract for Why Gyms Leave.
import { z } from 'zod';
export const SuperadminCancellationsV1DataSchema = z.object({ reasons: z.array(z.object({ reason: z.string(), gyms: z.number(), incomeLost: z.number() })), outcomes: z.object({ savedGyms: z.number(), lostGyms: z.number(), savedIncome: z.number(), lostIncome: z.number() }), byPlan: z.array(z.object({ plan: z.string(), churn: z.number() })) });
export const SuperadminCancellationsV1ResponseSchema = z.object({ data: SuperadminCancellationsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminCancellationsV1Data = z.infer<typeof SuperadminCancellationsV1DataSchema>;
export type SuperadminCancellationsV1Response = z.infer<typeof SuperadminCancellationsV1ResponseSchema>;
export interface SuperadminCancellationsV1SectionProps {
    data: SuperadminCancellationsV1Data;
}

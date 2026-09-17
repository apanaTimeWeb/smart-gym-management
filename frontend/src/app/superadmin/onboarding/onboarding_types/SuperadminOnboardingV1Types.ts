// RESPONSIBILITY: Defines the runtime-validated data contract for Trial Activation & Conversion.
import { z } from 'zod';
export const SuperadminOnboardingV1DataSchema = z.object({ steps: z.array(z.object({ label: z.string(), count: z.number() })), activation: z.object({ score: z.number(), averageDays: z.number(), stalled: z.number(), trialToPaid: z.number() }), stalls: z.array(z.object({ step: z.string(), gyms: z.number() })), cohort: z.array(z.object({ cohort: z.string(), activation: z.number(), conversion: z.number() })) });
export const SuperadminOnboardingV1ResponseSchema = z.object({ data: SuperadminOnboardingV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminOnboardingV1Data = z.infer<typeof SuperadminOnboardingV1DataSchema>;
export type SuperadminOnboardingV1Response = z.infer<typeof SuperadminOnboardingV1ResponseSchema>;
export interface SuperadminOnboardingV1SectionProps {
    data: SuperadminOnboardingV1Data;
}

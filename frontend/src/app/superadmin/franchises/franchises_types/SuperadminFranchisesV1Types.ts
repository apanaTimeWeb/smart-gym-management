// RESPONSIBILITY: Defines the runtime-validated data contract for Franchise 360 & Branch Comparison.
import { z } from 'zod';
export const SuperadminFranchisesV1DataSchema = z.object({ franchises: z.array(z.object({ name: z.string(), branches: z.number(), gyms: z.number(), income: z.number(), growth: z.number(), health: z.number() })), branchComparison: z.array(z.object({ branch: z.string(), franchise: z.string(), members: z.number(), income: z.number(), growth: z.number(), health: z.number() })), financials: z.array(z.object({ franchise: z.string(), royalty: z.number(), due: z.number(), contract: z.string() })) });
export const SuperadminFranchisesV1ResponseSchema = z.object({ data: SuperadminFranchisesV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminFranchisesV1Data = z.infer<typeof SuperadminFranchisesV1DataSchema>;
export type SuperadminFranchisesV1Response = z.infer<typeof SuperadminFranchisesV1ResponseSchema>;
export interface SuperadminFranchisesV1SectionProps {
    data: SuperadminFranchisesV1Data;
}

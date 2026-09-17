// RESPONSIBILITY: Defines the runtime-validated data contract for Branch Performance Comparison.
import { z } from 'zod';
export const SuperadminBranchesV1DataSchema = z.object({ branches: z.array(z.object({ name: z.string(), gym: z.string(), region: z.string(), members: z.number(), income: z.number(), growth: z.number(), health: z.number() })), filters: z.array(z.string()), periods: z.array(z.string()) });
export const SuperadminBranchesV1ResponseSchema = z.object({ data: SuperadminBranchesV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminBranchesV1Data = z.infer<typeof SuperadminBranchesV1DataSchema>;
export type SuperadminBranchesV1Response = z.infer<typeof SuperadminBranchesV1ResponseSchema>;
export interface SuperadminBranchesV1SectionProps {
    data: SuperadminBranchesV1Data;
}

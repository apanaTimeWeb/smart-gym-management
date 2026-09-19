// RESPONSIBILITY: Runtime-validated contracts for Superadmin branch performance comparison.
import { z } from 'zod';

const SuperadminBranchesV1PeriodSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminBranchesV1FilterSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminBranchesV1BranchSchema = z.object({ name: z.string(), gym: z.string(), region: z.string(), members: z.number(), income: z.number(), growth: z.number(), health: z.number() });

export const SuperadminBranchesV1DataSchema = z.object({
  branches: z.array(SuperadminBranchesV1BranchSchema),
  filters: z.array(SuperadminBranchesV1FilterSchema),
  periods: z.array(SuperadminBranchesV1PeriodSchema),
});
export const SuperadminBranchesV1ResponseSchema = z.object({ data: SuperadminBranchesV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminBranchesV1Period = z.infer<typeof SuperadminBranchesV1PeriodSchema>;
export type SuperadminBranchesV1Filter = z.infer<typeof SuperadminBranchesV1FilterSchema>;
export type SuperadminBranchesV1Data = z.infer<typeof SuperadminBranchesV1DataSchema>;
export type SuperadminBranchesV1Response = z.infer<typeof SuperadminBranchesV1ResponseSchema>;

export interface SuperadminBranchesV1SectionProps { data: SuperadminBranchesV1Data; }
export interface SuperadminBranchesV1ComparisonToolbarProps extends SuperadminBranchesV1SectionProps {
  selectedPeriodKey: string;
  selectedFilterKey: string;
  onPeriodChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

// RESPONSIBILITY: Runtime-validated contracts for Superadmin tenant business controls and its bulk actions.
import { z } from 'zod';

const SuperadminGymsV1FilterSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminGymsV1SavedViewSchema = z.object({ key: z.string(), label: z.string() });
const SuperadminGymsV1BulkActionSchema = z.enum(['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected']);
const SuperadminGymsV1RowSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  region: z.string(),
  plan: z.string(),
  income: z.number(),
  health: z.number(),
  usage: z.number(),
  trialDays: z.number(),
  paymentRecoveryOpen: z.boolean(),
  lastAction: z.string().nullable(),
});

export const SuperadminGymsV1DataSchema = z.object({
  currency: z.string(),
  segments: z.array(z.object({ name: z.string(), count: z.number(), rule: z.string() })),
  filters: z.array(SuperadminGymsV1FilterSchema),
  bulk: z.array(SuperadminGymsV1BulkActionSchema),
  saved: z.array(SuperadminGymsV1SavedViewSchema),
  rows: z.array(SuperadminGymsV1RowSchema),
});

export const SuperadminGymsV1BulkMutationRequestSchema = z.object({
  action: SuperadminGymsV1BulkActionSchema,
  gymIds: z.array(z.string()).min(1),
  targetPlan: z.string().optional(),
});

export const SuperadminGymsV1ResponseSchema = z.object({ data: SuperadminGymsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminGymsV1Filter = z.infer<typeof SuperadminGymsV1FilterSchema>;
export type SuperadminGymsV1SavedView = z.infer<typeof SuperadminGymsV1SavedViewSchema>;
export type SuperadminGymsV1BulkAction = z.infer<typeof SuperadminGymsV1BulkActionSchema>;
export type SuperadminGymsV1Data = z.infer<typeof SuperadminGymsV1DataSchema>;
export type SuperadminGymsV1BulkMutationRequest = z.infer<typeof SuperadminGymsV1BulkMutationRequestSchema>;
export type SuperadminGymsV1Response = z.infer<typeof SuperadminGymsV1ResponseSchema>;

export interface SuperadminGymsV1SectionProps {
  data: SuperadminGymsV1Data;
}

export interface SuperadminGymsV1FiltersSavedViewsAndBulkActionsSectionProps extends SuperadminGymsV1SectionProps {
  selectedFilterKey: string;
  selectedGymIds: string[];
  onFilterChange: (filterKey: string) => void;
  onSavedViewChange: (filterKey: string) => void;
  onSelectionChange: (gymIds: string[]) => void;
  onBulkAction: (action: SuperadminGymsV1BulkAction, gymIds: string[], targetPlan?: string) => Promise<void>;
  isBulkPending: boolean;
}

export interface SuperadminGymsV1TenantComparisonPanelProps extends SuperadminGymsV1SectionProps {
  selectedGymIds: string[];
  onSelectionChange: (gymIds: string[]) => void;
}

// RESPONSIBILITY: Owns TypeScript form value types for membership lifecycle forms.
import type { z } from 'zod';
import { managerPlansActivateSchema, managerPlansFreezeSchema, managerPlansRenewSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansMembershipSchemas';

export type ManagerPlansActivateForm = z.infer<typeof managerPlansActivateSchema>;
export type ManagerPlansRenewForm = z.infer<typeof managerPlansRenewSchema>;
export type ManagerPlansFreezeForm = z.infer<typeof managerPlansFreezeSchema>;

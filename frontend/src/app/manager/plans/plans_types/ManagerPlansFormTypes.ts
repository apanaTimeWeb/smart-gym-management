// RESPONSIBILITY: Owns TypeScript values and defaults for the Plan editor.
import type { z } from 'zod';
import { managerPlansFormSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansFormSchema';
export type PlanFormValues = z.infer<typeof managerPlansFormSchema>;
export const EMPTY_PLAN_FORM: PlanFormValues = { name: '', tier: 'BASIC', price1Month: '', price3Month: '', price6Month: '', price12Month: '', priceCustom: '', features: '' };

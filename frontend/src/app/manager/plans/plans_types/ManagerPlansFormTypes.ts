// RESPONSIBILITY: Owns TypeScript values and defaults for the Plan editor.
import { managerPlansFormSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansFormSchema';
import type { z } from 'zod';

export type PlanFormValues = z.infer<typeof managerPlansFormSchema>;
export const EMPTY_PLAN_FORM: PlanFormValues = { name: '', tier: 'BASIC', price1Month: '', price3Month: '', price6Month: '', price12Month: '', priceCustom: '', features: '' };

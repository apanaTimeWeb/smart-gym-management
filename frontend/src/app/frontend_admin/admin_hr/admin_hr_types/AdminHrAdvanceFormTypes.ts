import type { z } from 'zod';
import { adminHrAdvanceFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrAdvanceFormSchema.ts';

export type AdminHrAdvanceFormValues = z.infer<typeof adminHrAdvanceFormSchema>;

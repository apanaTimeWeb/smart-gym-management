import type { z } from 'zod';
import { adminHrDueFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrDueFormSchema.ts';

export type AdminHrDueFormValues = z.infer<typeof adminHrDueFormSchema>;

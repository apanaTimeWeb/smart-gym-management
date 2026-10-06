import type { z } from 'zod';
import { adminHrPaymentFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrPaymentFormSchema';

export type AdminHrPaymentFormValues = z.infer<typeof adminHrPaymentFormSchema>;

import type { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/frontend_manager/manager_profile/manager_profile_schemas/ManagerProfileFormSchemas';
import type { z } from 'zod';

export type ManagerProfileFormValues = z.infer<typeof managerProfileFormSchema>;
export type ManagerPasswordFormValues = z.infer<typeof managerPasswordFormSchema>;

// RESPONSIBILITY: Owns TypeScript form value types for profile and password editing.
import { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/manager/profile/profile_schemas/ManagerProfileFormSchemas';
import type { z } from 'zod';

export type ManagerProfileFormValues = z.infer<typeof managerProfileFormSchema>;
export type ManagerPasswordFormValues = z.infer<typeof managerPasswordFormSchema>;

// RESPONSIBILITY: Owns TypeScript form value types for profile and password editing.
import type { z } from 'zod';
import { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/manager/profile/profile_schemas/ManagerProfileFormSchemas';
export type ManagerProfileFormValues = z.infer<typeof managerProfileFormSchema>;
export type ManagerPasswordFormValues = z.infer<typeof managerPasswordFormSchema>;

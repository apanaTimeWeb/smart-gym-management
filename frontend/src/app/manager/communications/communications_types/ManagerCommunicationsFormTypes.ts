// RESPONSIBILITY: Owns TypeScript values for the campaign composer form.
import type { z } from 'zod';
import { managerCommunicationsFormSchema } from '@/app/manager/communications/communications_schemas/ManagerCommunicationsFormSchema';
export type CommFormValues = z.infer<typeof managerCommunicationsFormSchema>;

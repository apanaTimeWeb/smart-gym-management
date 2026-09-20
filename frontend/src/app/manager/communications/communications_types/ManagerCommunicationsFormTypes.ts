// RESPONSIBILITY: Owns TypeScript values for the campaign composer form.
import { managerCommunicationsFormSchema } from '@/app/manager/communications/communications_schemas/ManagerCommunicationsFormSchema';
import type { z } from 'zod';

export type CommFormValues = z.infer<typeof managerCommunicationsFormSchema>;

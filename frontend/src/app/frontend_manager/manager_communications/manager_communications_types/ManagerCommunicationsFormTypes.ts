import type { managerCommunicationsFormSchema } from '@/app/frontend_manager/manager_communications/manager_communications_schemas/ManagerCommunicationsFormSchema';
import type { z } from 'zod';

export type CommFormValues = z.infer<typeof managerCommunicationsFormSchema>;

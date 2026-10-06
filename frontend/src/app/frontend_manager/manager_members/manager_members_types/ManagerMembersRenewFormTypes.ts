import type { managerMembersRenewFormSchema } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersRenewFormSchema';
import type { z } from 'zod';


export type ManagerMembersRenewFormValues = z.infer<typeof managerMembersRenewFormSchema>;

// RESPONSIBILITY: Owns TypeScript form values for member renewal/upgrade.
import { managerMembersRenewFormSchema } from '@/app/manager/members/members_schemas/ManagerMembersRenewFormSchema';
import type { z } from 'zod';


export type ManagerMembersRenewFormValues = z.infer<typeof managerMembersRenewFormSchema>;

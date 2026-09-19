// RESPONSIBILITY: Owns TypeScript form values for member renewal/upgrade.
import type { z } from 'zod';
import { managerMembersRenewFormSchema } from '@/app/manager/members/members_schemas/ManagerMembersRenewFormSchema';

export type ManagerMembersRenewFormValues = z.infer<typeof managerMembersRenewFormSchema>;

// RESPONSIBILITY: Backward-compatible type exports for existing Manager member contracts; runtime schemas live in members_schemas.
import type { z } from 'zod';
import type { memberSchema, memberStatsSchema } from '@/app/manager/members/members_schemas/ManagerMembersEntitySchema';
import type { managerMembersFormSchema } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
export type MemberType = z.infer<typeof memberSchema>;
export type MemberStatsType = z.infer<typeof memberStatsSchema>;
export type MemberFormType = z.infer<typeof managerMembersFormSchema>;

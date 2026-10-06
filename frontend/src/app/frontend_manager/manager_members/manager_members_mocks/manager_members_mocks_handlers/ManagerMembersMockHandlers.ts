import { managerMembersMutationHandlers } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockMutationHandlers';
import { managerMembersReadHandlers } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockReadHandlers';

/** @description Aggregates the complete Manager Members MSW contract while keeping read and mutation responsibilities independently repairable. @dependencies Feature-owned read, mutation and resettable mock-state modules. @edge-case preserves one handler registration export for the global MSW bootstrap. */
export const managerMembersHandlers = [
  ...managerMembersReadHandlers,
  ...managerMembersMutationHandlers,
];

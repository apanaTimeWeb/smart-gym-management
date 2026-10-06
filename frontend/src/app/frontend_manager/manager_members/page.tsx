// RESPONSIBILITY: Server route entry for Manager Members; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerMembersMain from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_main/ManagerMembersMain';

/** @description Route-level MembersPage for the Manager frontend module. */
export default function MembersPage() {
  return <ManagerMembersMain />;
}

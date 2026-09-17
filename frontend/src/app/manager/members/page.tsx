// RESPONSIBILITY: Server route entry for Manager Members; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerMembersMain from '@/app/manager/members/members_components/ManagerMembersMain/ManagerMembersMain';

export default function MembersPage() {
  return <ManagerMembersMain />;
}

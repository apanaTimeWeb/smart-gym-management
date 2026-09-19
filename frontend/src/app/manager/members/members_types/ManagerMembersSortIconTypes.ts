// RESPONSIBILITY: Defines the prop contract for the Members sort icon.
import type { MemberSortColumn, SortDirection } from '@/app/manager/members/members_types/ManagerMembersTypes';

export interface ManagerMembersSortIconProps {
  column: MemberSortColumn;
  activeColumn: MemberSortColumn;
  direction: SortDirection;
}

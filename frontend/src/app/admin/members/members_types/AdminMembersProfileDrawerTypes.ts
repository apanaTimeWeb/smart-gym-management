// RESPONSIBILITY: Prop contract for the Admin Members profile drawer.
import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

export interface AdminMembersProfileDrawerProps {
  member: AdminMember;
  onClose: () => void;
}

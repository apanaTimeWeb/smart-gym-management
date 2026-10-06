// RESPONSIBILITY: Prop contract for the Admin Members profile drawer.
import type { AdminMember } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';

export interface AdminMembersProfileDrawerProps {
  member: AdminMember;
  onClose: () => void;
}

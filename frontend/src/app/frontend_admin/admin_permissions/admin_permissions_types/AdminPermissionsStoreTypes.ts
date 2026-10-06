// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminPermissionsQueryState, RoleType } from '@/app/frontend_admin/admin_permissions/admin_permissions_types/AdminPermissionsTypes';
export interface AdminPermissionsStore extends AdminPermissionsQueryState {
  setActiveRole: (role: RoleType | 'all') => void;
  setStaffSearch: (value: string) => void;
  setEditingStaffId: (staffId: string | null) => void;
}

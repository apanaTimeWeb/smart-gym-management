import { create } from 'zustand';
import type { AdminPermissionsStore } from '@/app/frontend_admin/admin_permissions/admin_permissions_types/AdminPermissionsStoreTypes';
// RESPONSIBILITY: Owns UI-only Permissions state. Server responses remain in TanStack Query.
/**
 * @description useAdminPermissionsStore: Owns UI-only Permissions state. Server responses remain in TanStack Query.
 * @dependencies Consumes AdminPermissionsStoreTypes, AdminPermissionsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminPermissionsStore = create<AdminPermissionsStore>((set) => ({
  activeRole: 'all',
  staffSearch: '',
  editingStaffId: null,
  setActiveRole: (activeRole) => set({ activeRole }),
  setStaffSearch: (staffSearch) => set({ staffSearch }),
  setEditingStaffId: (editingStaffId) => set({ editingStaffId }),
}));
